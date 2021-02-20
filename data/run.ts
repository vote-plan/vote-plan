import {Parser as ParserAuQld20150131} from './2015-01-31-au-qld-adminarea/parser';
import {Parser as ParserAuQld201711251} from './2017-11-25-au-qld-adminarea/parser';
import {Parser as ParserAu20160702} from './2016-07-02-au-nat-country/parser';
import {Parser as ParserAu20190518} from './2019-05-18-au-nat-country/parser';
import {Parser as ParserAu20161015} from './2016-10-15-au-act-adminarea/parser';
import {ParserAuQldCandidatesText} from './parser-au-qld-candidates-text';
import {ParserAuQldPartiesText} from './parser-au-qld-parties-text';
import {CodeBuilder} from './code-builder';
import * as path from 'path';
import {ParserAuCsv} from './parser-au-csv';
import {ParserAuActCsv} from './parser-au-act-csv';


/*
 * Command line arguments
 */
const args = process.argv.slice(2);
const writeDir = path.resolve(args[0]);


/*
 * Shared parsers.
 */
const codeBuilder = new CodeBuilder();
const parserAuQldCandidatesText = new ParserAuQldCandidatesText(codeBuilder);
const parserAuQldPartiesText = new ParserAuQldPartiesText(codeBuilder);
const parserAuCsv = new ParserAuCsv(codeBuilder);
const parserAuActCsv = new ParserAuActCsv(codeBuilder);

/*
 * Election-specific parsers.
 */
const parserAuQld20150131 = new ParserAuQld20150131(codeBuilder, parserAuQldCandidatesText, parserAuQldPartiesText);
parserAuQld20150131.write(writeDir, parserAuQld20150131.parse());

const parserAuQld201711251 = new ParserAuQld201711251(codeBuilder, parserAuQldCandidatesText, parserAuQldPartiesText);
parserAuQld201711251.write(writeDir, parserAuQld201711251.parse());

const parserAu20160702 = new ParserAu20160702(codeBuilder, parserAuCsv);
parserAu20160702.write(writeDir, parserAu20160702.parse());

const parserAu20190518 = new ParserAu20190518(codeBuilder, parserAuCsv);
parserAu20190518.write(writeDir, parserAu20190518.parse());

const parserAu20161015 = new ParserAu20161015(codeBuilder, parserAuActCsv);
parserAu20161015.write(writeDir, parserAu20161015.parse());

/*
 * Write to output directory.
 */
// args[0]
