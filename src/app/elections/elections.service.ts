import {Injectable} from '@angular/core';
import mockData from '../../../elections-data/2015-01-31-au-qld-adminarea/data.json';

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor() {
  }

  splitCode(code: string) {
    return code;
  }

  getElection(electionCode: string) {
    return electionCode;
  }

  getAssembly(assemblyCode: string) {
    return mockData.assemblies.find(element =>
      element.codes.assembly === assemblyCode
    );
  }

  getElectorate(electorateCode: string) {
    return electorateCode;
  }

  getCandidate(candidateCode: string) {
    return candidateCode;
  }

  getParty(partyCode: string) {
    return partyCode;
  }
}
