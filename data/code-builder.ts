import slugify from 'slugify';

export class CodeBuilder {
  private readonly assemblyAbbr = 'asm';
  private readonly ballotEntryAbbr = 'ble';
  private readonly ballotSectionAbbr = 'bls';
  private readonly candidateAbbr = 'cdt';
  private readonly electionAbbr = 'eln';
  private readonly electorateAbbr = 'etr';
  private readonly locationAbbr = 'lct';
  private readonly noteAbbr = 'nte';
  private readonly partyAbbr = 'prt';

  private readonly separator = '-';

  assembly(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.assemblyAbbr, title);
  }

  ballotEntry(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.ballotEntryAbbr, title);
  }

  ballotSection(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.ballotSectionAbbr, title);
  }

  candidate(baseCode: string, title: string, partyName: string): string {
    let partyCode = this.makeSlug(partyName);
    return this.makeCode(baseCode, this.candidateAbbr, title + this.separator + partyCode);
  }

  election(baseCode: string): string {
    return `${this.electionAbbr}${this.separator}${baseCode}`;
  }

  electorate(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.electorateAbbr, title);
  }

  location(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.locationAbbr, title);
  }

  note(baseCode: string, title: string, parentTitle: string): string {
    let noteCode = this.makeCode(baseCode, this.noteAbbr, parentTitle);
    let noteTitleCode = this.makeSlug(title);
    return [noteCode, noteTitleCode].join(this.separator);
  }

  party(baseCode: string, title: string): string {
    return this.makeCode(baseCode, this.partyAbbr, title);
  }

  defaultPartyName() {
    return 'independent';
  }

  private makeCode(baseCode: string, typeCode: string, title: string): string {
    const slug = this.makeSlug(title);
    return [
      this.electionAbbr,
      baseCode,
      typeCode,
      slug
    ].join(this.separator);
  }

  private makeSlug(value: string, locale: string = 'en'): string {
    return slugify(
      value,
      {
        replacement: this.separator,
        lower: true,
        locale: locale,
        strict: true,
      });
  }
}
