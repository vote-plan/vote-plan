const fs = require('fs');
const path = require('path');
import * as JSZip from 'jszip';

export class Run {
  /**
   * Walk a directory structure.
   * @param dir starting directory
   */
  async* walk(dir: string): AsyncGenerator<string> {
    for await (const d of await fs.promises.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) {
        yield* this.walk(entry);
      } else if (d.isFile()) {
        yield entry;
      }
    }
  }

  /**
   * Read the contents of a zip file.
   * @param file The zip file.
   */
  async* readZipFile(file: string): AsyncGenerator<[string, JSZip.JSZipObject]> {
    const buffer = await fs.promises.readFile(file);
    const zipFile = await JSZip.loadAsync(buffer);
    const result = new Array<[string, JSZip.JSZipObject]>();
    zipFile.forEach((relativePath: string, zipEntry: JSZip.JSZipObject) => {
      result.push([relativePath, zipEntry]);
    });
    for await (const i of result) {
      yield i;
    }
  }

  /**
   * Parse raw election data into standard data structures.
   */
  async run(): Promise<void> {
    for await (const p of this.walk('../data')) {
      if (!p) {
        continue;
      }
      if (p.endsWith('.zip')) {
        console.log('zip file: ', p);
        const zipFileItems = this.readZipFile(p);
        for await (const [relativePath, zipEntry] of zipFileItems) {
          console.log('zip entry: ', relativePath);
        }

      }

    }
  }
}

const run = new Run();
run.run();
