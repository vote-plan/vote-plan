import {DataSet} from '../src/app/elections/data-set';

export interface Parser {
  parse(baseCode?: string, input?: any): DataSet;
}
