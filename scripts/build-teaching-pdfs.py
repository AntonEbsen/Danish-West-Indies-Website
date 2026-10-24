"""Build four print handouts from the same content used by the HTML pages.

Run with the bundled Python runtime, or install requirements-teaching-pdfs.txt.
Only the public teaching JSON is read. No thesis data or archival scan is used.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path
from xml.sax.saxutils import escape

import reportlab
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "publication/data/teaching.json"
PUBLIC = ROOT / "publication/public/downloads"
OUTPUT = ROOT / "output/pdf"


def canonical_hash(content: dict) -> str:
    data = json.dumps(content, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(data).hexdigest()


def build(content: dict, lang: str, teacher: bool) -> bytes:
    font_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    for name, filename in [("Vera", "Vera.ttf"), ("Vera-Bold", "VeraBd.ttf")]:
        if name not in pdfmetrics.getRegisteredFontNames():
            pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
    copy = content[lang]
    title = copy["teacherTitle"] if teacher else copy["worksheetTitle"]
    styles = {
        "title": ParagraphStyle("title", fontName="Vera-Bold", fontSize=16, leading=19, spaceAfter=7),
        "body": ParagraphStyle("body", fontName="Vera", fontSize=9.5, leading=12.3, spaceAfter=5),
        "small": ParagraphStyle("small", fontName="Vera", fontSize=8, leading=10.1, spaceAfter=4),
        "heading": ParagraphStyle("heading", fontName="Vera-Bold", fontSize=10, leading=12.5, spaceBefore=5, spaceAfter=3, keepWithNext=True),
    }
    out = io.BytesIO()
    doc = SimpleDocTemplate(out, pagesize=A4, topMargin=14*mm, bottomMargin=15*mm,
                            leftMargin=16*mm, rightMargin=16*mm, title=title,
                            author="Anton Meier Ebsen Jørgensen", creator="Danish West Indies educational project",
                            subject="Proposed source-reading activity; AI-assisted; not classroom-tested")
    story = []

    def p(text: str, style: str = "body") -> None:
        story.append(Paragraph(escape(text), styles[style]))

    p("DANISH WEST INDIES | " + ("LÆRERNOTER" if teacher and lang == "da" else "TEACHER NOTES" if teacher else "ELEVARK" if lang == "da" else "STUDENT WORKSHEET"), "small")
    p(title, "title")
    p(copy["audience"], "small")
    p(copy["status"], "small")
    if teacher:
        for section in copy["teacherSections"]:
            p(section["title"], "heading")
            p(section["text"])
    else:
        p("Læringsmål" if lang == "da" else "Learning goals", "heading")
        for goal in copy["goals"]:
            p("- " + goal)
        p(copy["context"], "small")
        p("To kilder" if lang == "da" else "Two sources", "heading")
        p(copy["sourceA"])
        p(copy["sourceB"])
        for question in copy["questions"]:
            p(question["title"], "heading")
            p(question["prompt"])
            story.append(Spacer(1, 5))
            story.append(HRFlowable(width="100%", thickness=.3, color=colors.HexColor("#999999")))
            story.append(Spacer(1, 10))
            story.append(HRFlowable(width="100%", thickness=.3, color=colors.HexColor("#999999")))
            story.append(Spacer(1, 3))
        p(copy["exit"], "small")
    p(copy["sourceHeading"], "heading")
    p(copy["sourceNote"], "small")
    # Student PDF needs only the two source links; teacher notes also link methods.
    for link in copy["links"] if teacher else copy["links"][:2]:
        story.append(Paragraph(f'<link href="{escape(link["url"])}" color="#173b62">{escape(link["url"])}</link>', styles["small"]))

    def footer(canvas, document):
        canvas.saveState()
        canvas.setFont("Vera", 7)
        canvas.setFillColor(colors.HexColor("#444444"))
        text = f"Anton Meier Ebsen Jørgensen | {content['version']} | " + ("Selvstændigt formidlingsprojekt" if lang == "da" else "Independent educational project")
        canvas.drawString(16*mm, 9*mm, text)
        canvas.drawRightString(A4[0]-16*mm, 9*mm, str(document.page))
        canvas.restoreState()

    def invariant_canvas(*args, **kwargs):
        # BaseDocTemplate passes invariant=None; a functools.partial default
        # would be overwritten by that keyword and leak a creation timestamp.
        kwargs.update(invariant=1, pageCompression=1)
        return Canvas(*args, **kwargs)

    doc.build(story, onFirstPage=footer, onLaterPages=footer, canvasmaker=invariant_canvas)
    return out.getvalue()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Compare deterministic generated bytes without writing")
    args = parser.parse_args()
    content = json.loads(CONTENT.read_text(encoding="utf-8"))
    files = []
    for lang in ("en", "da"):
        for teacher in (False, True):
            name = f"{'teacher-notes' if teacher else 'student-worksheet'}-{lang}.pdf"
            data = build(content, lang, teacher)
            if args.check:
                if (PUBLIC / name).read_bytes() != data:
                    raise SystemExit(f"Stale or non-reproducible PDF: {name}")
            else:
                for directory in (OUTPUT, PUBLIC):
                    directory.mkdir(parents=True, exist_ok=True)
                    (directory / name).write_bytes(data)
            files.append({"name": name, "language": lang, "audience": "teacher" if teacher else "student", "sha256": hashlib.sha256(data).hexdigest()})
    manifest = {"version": content["version"], "contentSha256": canonical_hash(content), "generator": f"ReportLab {reportlab.Version}; bundled Vera fonts; invariant PDF metadata", "files": files}
    if args.check:
        if json.loads((PUBLIC / "manifest.json").read_text(encoding="utf-8")) != manifest:
            raise SystemExit("Stale teaching PDF manifest")
    else:
        (PUBLIC / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("Teaching PDFs verified" if args.check else "Built four teaching PDFs and manifest")


if __name__ == "__main__":
    main()
