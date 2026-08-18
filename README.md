# danishwestindies.org

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![License: MIT](https://img.shields.io/badge/Code_License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Official source code and data repository for **[danishwestindies.org](https://danishwestindies.org)** — an open-access digital history and economic data platform dedicated to researching, visualizing, and communicating the economic history of the Danish West Indies (St. Thomas, St. John, and St. Croix) and the transatlantic slave trade.

---

## Overview

`danishwestindies.org` serves as a public knowledge hub and research repository. The platform bridges rigorous quantitative economic history with accessible public history, providing researchers, educators, students, and the general public with open data, interactive visual analytical tools, and historical synthesis.

### Key Objectives
* **Open Science & Reproducibility:** Provide open access to cleaned historical datasets, codebooks, and analytical scripts covering colonial trade, demographic trends, and sugar production.
* **Public History & Education:** Translate academic research into accessible syntheses, interactive timelines, and educational materials regarding Denmark's colonial legacy and the transatlantic slave trade.
* **Interactive Data Visualization:** Enable users to explore multi-variable historical trends through interactive web charts, maps, and trade flow models.

---

## Site Architecture & Tech Stack

The platform is engineered as a static, performant, and low-maintenance web application to ensure long-term sustainability and fast loading times globally.

* **Static Site Generator:** [Hugo](https://gohugo.io/) (or [Jekyll](https://jekyllrb.com/))
* **Frontend Framework / Styling:** HTML5, CSS3, [Tailwind CSS](https://tailwindcss.com/)
* **Data Visualization:** [Plotly.js](https://plotly.com/javascript/) / [D3.js](https://d3js.org/) / Embedded Python HTML exports
* **Hosting & Deployment:** [GitHub Pages](https://pages.github.com/) / [Netlify](https://www.netlify.com/)
* **Domain:** `danishwestindies.org`

---

## Repository Structure

```text
danish-west-indies-website/
├── assets/                  # Raw CSS, JavaScript, and image assets
├── content/                 # Markdown content files
│   ├── articles/            # Synthesized research articles and topic deep-dives
│   ├── data/                # Open data documentation and codebooks
│   └── timeline/            # Historical timeline events
├── data/                    # Structured JSON/YAML data files used for site builds
├── static/                  # Static files served directly (PDFs, raw CSV datasets)
│   └── datasets/            # Publicly downloadable CSV/Parquet files
├── layouts/                 # HTML templates and components
├── static.config.toml       # Site configuration file
└── README.md                # Repository documentation
