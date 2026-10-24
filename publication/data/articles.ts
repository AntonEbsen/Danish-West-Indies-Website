export type Language = 'en' | 'da';
export interface Source { title: string; url: string; kind: string; locator: string }
export interface Article {
  slug: string; year: string; title: Record<Language, string>;
  summary: Record<Language, string>; paragraphs: Record<Language, string[]>;
  caution: Record<Language, string>; question: Record<Language, string>; sources: Source[];
}
export const articles: Article[] = [
  {
    slug: '1792-abolition-decree', year: '1792 / 1803',
    title: { en: 'A ban on the trade, not an end to slavery', da: 'Et forbud mod handelen, ikke en ophævelse af slaveriet' },
    summary: { en: 'Read the 1792 ordinance by distinguishing its announcement, implementation and scope.', da: 'Læs forordningen fra 1792 med blik for vedtagelse, ikrafttrædelse og rækkevidde.' },
    paragraphs: {
      en: [
        'The ordinance of 16 March 1792 announced restrictions on the transatlantic slave trade effective from the beginning of 1803. Its first clause did not abolish slavery within the Danish West Indies. [1, clause 1; 2]',
        'During the intervening period, clause 2 permitted arrivals under all flags. Clauses 4–5 changed taxes concerning enslaved women and plantation workers. Reading these provisions together shows why announcing a future restriction is not equivalent to ending the institution. [1, clauses 2, 4–5]'
      ],
      da: [
        'Forordningen af 16. marts 1792 varslede begrænsninger af den transatlantiske slavehandel fra begyndelsen af 1803. Første bestemmelse ophævede ikke slaveriet i Dansk Vestindien. [1, bestemmelse 1; 2]',
        'I overgangsperioden tillod bestemmelse 2 indførsel under alle flag. Bestemmelse 4–5 ændrede afgifter vedrørende slavegjorte kvinder og plantagearbejdere. Bestemmelserne viser tilsammen, hvorfor et varslet forbud ikke er det samme som en ophævelse af institutionen. [1, bestemmelse 2, 4–5]'
      ]
    },
    caution: { en: 'The ordinance establishes legal provisions, not their causal effects on prices, health or population. Those require additional evidence and an empirical design.', da: 'Forordningen dokumenterer lovbestemmelser, ikke deres kausale virkninger på priser, sundhed eller befolkning. Det kræver yderligere kilder og et empirisk design.' },
    question: { en: 'Which date would you use to study anticipation, and which to study implementation? Why might neither alone identify a causal effect?', da: 'Hvilken dato ville du bruge til at undersøge forventninger, og hvilken til ikrafttrædelsen? Hvorfor identificerer ingen af datoerne alene en kausal effekt?' },
    sources: [
      { title: 'Christian VII: Forordning om negerhandelen, 16 March 1792', url: 'https://danmarkshistorien.lex.dk/Forordning_om_negerhandelen,_16._marts_1792', kind: 'Primary legal text, transcribed by Danmarkshistorien / Lex', locator: 'Clauses 1, 2, 4–5; original printed collection, 1792, pp. 69–71. Historical title contains offensive terminology.' },
      { title: 'National Museum of Denmark: ordinance, object 17/2001', url: 'https://samlinger.natmus.dk/dnt/asset/25582', kind: 'Museum catalogue and interpretation', locator: 'Object description; file DNT-25582. Linked, not reproduced.' }
    ]
  },
  {
    slug: '1848-emancipation', year: '1848',
    title: { en: 'Emancipation and the limits of a proclamation', da: 'Frigivelsen og en proklamations grænser' },
    summary: { en: 'Separate the declaration of freedom from evidence about life after emancipation.', da: 'Skeln mellem den erklærede frihed og viden om livet efter frigivelsen.' },
    paragraphs: {
      en: [
        'On 3 July 1848, enslaved people demanding freedom gathered at Frederiksted. Under this pressure, Governor-General Peter von Scholten declared emancipation. This was not simply a reform bestowed from Copenhagen. [2, “Modstand mod slaveriet i Dansk Vestindien”]',
        'The proclamation declared freedom, but also addressed housing, provision grounds, paid work and support for people unable to work. HistorieLab reproduces an adapted version alongside the historical poster. The text records an official decision; it cannot by itself show how those promises were implemented. [1, source 9]'
      ],
      da: [
        'Den 3. juli 1848 samledes slavegjorte i Frederiksted med krav om frihed. Under dette pres erklærede generalguvernør Peter von Scholten slaveriet ophævet. Frigivelsen var ikke blot en reform skænket fra København. [2, “Modstand mod slaveriet i Dansk Vestindien”]',
        'Proklamationen erklærede friheden, men behandlede også boliger, provisionsjord, lønarbejde og forsørgelse af personer uden arbejdsevne. HistorieLab gengiver en bearbejdet version sammen med den historiske plakat. Teksten dokumenterer en officiel beslutning, men viser ikke i sig selv, hvordan bestemmelserne blev gennemført. [1, kilde 9]'
      ]
    },
    caution: { en: 'A government proclamation is evidence of an announced rule, not a complete account of the people who secured freedom or their subsequent living conditions.', da: 'En myndighedsproklamation dokumenterer en bekendtgjort regel, ikke hele historien om dem, der tilkæmpede sig friheden, eller deres senere levevilkår.' },
    question: { en: 'What other records would you need to investigate housing or bargaining power after emancipation?', da: 'Hvilke andre kilder ville du behøve for at undersøge boligforhold eller forhandlingsmagt efter frigivelsen?' },
    sources: [
      { title: 'HistorieLab: Tema 7 — Slavernes vej til friheden', url: 'https://historielab.dk/tema-7-slavernes-vej-til-friheden/', kind: 'Teaching edition of primary material', locator: 'Source 9, “Frihedsplakat der frigav slaverne”: adapted transcription and historical poster, 3 July 1848. Not a diplomatic transcription.' },
      { title: 'Rikke Lie Halberg: dansk slaverihistorie 1660–1848', url: 'https://lex.dk/dansk_slaverihistorie_1660-1848', kind: 'Historian-authored secondary account, Lex', locator: 'Section “Modstand mod slaveriet i Dansk Vestindien”.' }
    ]
  },
  {
    slug: '1878-fireburn-st-croix', year: '1878',
    title: { en: 'Fireburn: labour conflict after emancipation', da: 'Fireburn: arbejdskonflikt efter frigivelsen' },
    summary: { en: 'Consider what colonial court records can—and cannot—tell us about resistance.', da: 'Overvej, hvad koloniale retsakter kan og ikke kan fortælle om modstand.' },
    paragraphs: {
      en: [
        'Fireburn began on St. Croix on 1 October 1878. Slavery had ended thirty years earlier, but the labour arrangement introduced in 1849 continued to restrict plantation workers through annual contracts. Formal freedom and control over working conditions were not the same. [1, “Oprørets årsager og anledning”]',
        'Rigsarkivet lists court records from the military court at Fort Christian concerning Fireburn, dated 1878. This finding aid identifies a primary-source collection; it is not testimony itself. [2]'
      ],
      da: [
        'Fireburn begyndte på Sankt Croix den 1. oktober 1878. Slaveriet var ophævet tredive år tidligere, men arbejdsordningen fra 1849 begrænsede fortsat plantagearbejderne gennem årlige kontrakter. Formel frihed var ikke det samme som kontrol over arbejdsvilkårene. [1, “Oprørets årsager og anledning”]',
        'Rigsarkivet registrerer retsakter fra standretten i Fort Christian vedrørende Fireburn, dateret 1878. Registraturen identificerer en primær kildesamling; den er ikke i sig selv et vidneudsagn. [2]'
      ]
    },
    caution: { en: 'Records produced by a colonial court reflect its procedures and power. A name in a case file does not establish guilt or reliably identify a descendant.', da: 'Akter fra en kolonial domstol afspejler dens procedurer og magt. Et navn i en sag dokumenterer hverken skyld eller en sikker forbindelse til efterkommere.' },
    question: { en: 'Whose voices are recorded, translated or absent in a court file? How would that affect the questions you could answer?', da: 'Hvis stemmer bliver nedskrevet, oversat eller udeladt i en retssag? Hvad betyder det for de spørgsmål, du kan besvare?' },
    sources: [
      { title: 'Rikke Lie Halberg: Fireburn', url: 'https://lex.dk/Fireburn', kind: 'Historian-authored secondary account, Lex', locator: 'Section “Oprørets årsager og anledning”.' },
      { title: 'Rigsarkivet: Military court in Fort Christian concerning the Fireburn', url: 'https://arkivalieronline.rigsarkivet.dk/en/other/index-creator/118/17467397/20196384', kind: 'Archival finding aid for primary court records', locator: 'Court records (1878–1878), court of 5 October 1878; catalogue item 20196384. Full records not transcribed here.' }
    ]
  }
];
