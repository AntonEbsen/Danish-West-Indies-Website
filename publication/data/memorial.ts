import type { Language, Source } from './articles';
export interface MemorialPerson {
  slug: string; name: string; description: Record<Language, string>;
  paragraphs: Record<Language, string[]>; uncertainty: Record<Language, string>;
  sources: Source[];
}
export const memorialPeople: MemorialPerson[] = [
  {
    slug: 'hans-jonathan', name: 'Hans Jonathan (Hans Jónatan)',
    description: { en: 'Born enslaved on St. Croix in 1784; later lived in Iceland, where he died in 1827.', da: 'Født som slavegjort på Sankt Croix i 1784; levede senere i Island, hvor han døde i 1827.' },
    paragraphs: {
      en: ['Hans Jonathan was taken to Copenhagen. After a court upheld Henriette Schimmelmann’s claim over him in 1802, he escaped to Iceland. His life continued at Djúpivogur, where he worked in trade and established a family. [1, “Kunne man være slavegjort i Danmark?” and “I Island”]', 'A memorial sculpture at Djúpivogur commemorates him. This profile remembers a life extending beyond the legal categories imposed on him; it does not supply a reconstructed voice or personal testimony. [2]'],
      da: ['Hans Jonathan blev ført til København. Efter at en domstol i 1802 anerkendte Henriette Schimmelmanns krav på ham, flygtede han til Island. Hans liv fortsatte i Djúpivogur, hvor han arbejdede med handel og stiftede familie. [1, “Kunne man være slavegjort i Danmark?” og “I Island”]', 'En skulptur i Djúpivogur mindes ham. Profilen erindrer et liv ud over de påtvungne juridiske kategorier; den gengiver ingen rekonstrueret stemme eller personligt vidnesbyrd. [2]']
    },
    uncertainty: { en: 'The linked accounts differ on details such as his age when taken to Copenhagen. This profile does not fix that age, assert a genealogy or identify living descendants.', da: 'De linkede fremstillinger er forskellige om blandt andet hans alder ved ankomsten til København. Profilen fastslår ikke alderen, en slægtslinje eller identiteten på nulevende efterkommere.' },
    sources: [
      { title: 'Erik Gøbel: Hans Jonathan', url: 'https://lex.dk/Hans_Jonathan', kind: 'Historian-authored biography, Lex', locator: 'Sections on the 1802 court decision and life in Iceland; birth/death information.' },
      { title: 'Visit Austurland: LIBERTY and Hans Jonathan', url: 'https://www.east.is/en/unsorted/other-attractions/liberty-and-hans-jonathan', kind: 'Regional heritage / memorial interpretation', locator: 'Biographical overview and description of the memorial at Djúpivogur. No image copied.' }
    ]
  },
  {
    slug: 'queen-mary', name: 'Mary Thomas (Queen Mary)',
    description: { en: 'An Antigua-born worker associated with the 1878 Fireburn uprising on St. Croix.', da: 'En arbejder født på Antigua med en central rolle i Fireburn-oprøret på Sankt Croix i 1878.' },
    paragraphs: {
      en: ['Mary Thomas is remembered as Queen Mary, one of the women associated with Fireburn. Her history belongs to the struggle over labour conditions after emancipation; she should not automatically be described as a person born enslaved. [1; 2, “Queen Mary”]', 'She was imprisoned in Copenhagen in 1882. In December 1887 she was transferred back to St. Croix to continue her sentence. Halberg reproduces the relevant prison-register entry. [1, “Dom og løsladelse”; 2]'],
      da: ['Mary Thomas huskes som Queen Mary, en af kvinderne knyttet til Fireburn. Hendes historie vedrører kampen om arbejdsvilkår efter frigivelsen; hun bør ikke automatisk beskrives som født slavegjort. [1; 2, “Queen Mary”]', 'Hun blev fængslet i København i 1882. I december 1887 blev hun sendt tilbage til Sankt Croix for at fortsætte afsoningen. Halberg gengiver den relevante indførsel i fængselsprotokollen. [1, “Dom og løsladelse”; 2]']
    },
    uncertainty: { en: 'The sources date her birth differently: around 1842 in Halberg’s biography and around 1848 in the USVI government account. No single birth year is asserted here. Prison authorities’ descriptions are not her own words.', da: 'Kilderne daterer fødslen forskelligt: omkring 1842 hos Halberg og omkring 1848 i USVI-regeringens fremstilling. Her fastslås intet bestemt fødselsår. Fængselsmyndighedernes beskrivelser er ikke hendes egne ord.' },
    sources: [
      { title: 'Rikke Lie Halberg: Mary Thomas', url: 'https://lex.dk/Mary_Thomas', kind: 'Historian-authored biography with a reproduced primary prison-register entry', locator: 'Sections “Dom og løsladelse” and “Tilværelsen før Fireburn”. The original handwritten register has not been independently transcribed for this site.' },
      { title: 'Government of the U.S. Virgin Islands: 8 Women Who Changed VI History', url: 'https://www.vi.gov/8-women-who-changed-vi-history/', kind: 'Government commemorative account', locator: 'Section “Queen Mary”; birth dating and transfer back to Christiansted in 1887.' }
    ]
  }
];
