import csv
import json
import os
from typing import Dict, Any

from process_base import ProcessBase


class ProcessAuQldLocality(ProcessBase):
    _election_country = 'Australia'
    _election_coverage_type = 'Local Government'
    _election_institution = 'Legislative Assembly'
    _election_administrative_area = 'Queensland'
    _election_locality = ''
    _assembly_abbr = 'l'
    _assembly_title = 'Legislative Assembly'

    def _load_raw(self, file_path: str):
        result = {
            'mayors': {
                'file': os.path.join(
                    file_path, 'mayor-results.elections.qld.gov.au_Archive [20-03-07 22-46-15].har'),
                'data': [],
            },
            'councillors': {
                'file': os.path.join(
                    file_path, 'councillor-results.elections.qld.gov.au_Archive [20-03-07 22-48-46].har'),
                'data': [],
            }
        }

        ballot_order = {}

        for container, details in result.items():
            raw_data = self._read_json(details['file'])
            for entry in raw_data['log']['entries']:
                url = entry['request']['url']
                if url.endswith('AntiCSRFToken'):
                    continue
                elif url.endswith('GetEventInfo'):
                    data = json.loads(json.loads(entry['response']['content']['text'])['data'])
                    details['election_info'] = {
                        'Day': data['Day'],
                        'EndTime': data['EndTime'],
                        'EventDate': data['EventDate'],
                        'EventDateStr': data['EventDateStr'],
                        'ModifiedTime': data['ModifiedTime'],
                        'ModifiedTimeStr': data['ModifiedTimeStr'],
                        'Month': data['Month'],
                        'StartTime': data['StartTime'],
                        'Title': data['Title'],
                        'Week': data['Week'],
                        'Year': data['Year'],
                    }
                elif url.endswith('GetVoteCards'):
                    data = json.loads(entry['response']['content']['text'])['rows']
                    for row in data:
                        electorate_name = row['BoundaryElectorateName']
                        assembly_name = row['LGAreaElectorateName']
                        ballot_key = f"{assembly_name}-{electorate_name or 'mayor'}"
                        if ballot_key not in ballot_order:
                            ballot_order[ballot_key] = 0
                        ballot_order[ballot_key] += 1
                        details['data'].append({
                            'BoundaryElectorateName': electorate_name,
                            'BoundaryID': row['BoundaryID'],
                            'CandidateID': row['CandidateID'],
                            'CandidateName': row['CandidateName'],
                            'ContestID': row['ContestID'],
                            'ContestInfo': row['ContestInfo'],
                            'EventID': row['EventID'],
                            'LGAreaElectorateName': assembly_name,
                            'LGAID': row['LGAID'],
                            'PartyName': row['PartyName'],
                            'BallotOrder': ballot_order[ballot_key]
                        })

                elif url.endswith('GetDropDownList'):
                    details['drop_down_info'] = json.loads(
                        json.loads(entry['response']['content']['text'])['data'])
                else:
                    raise Exception()

        return result

    def _augment(self, result: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Gather additional information about each council."""
        super(ProcessAuQldLocality, self)._augment(result, input_data)

        council_postal_details_file = os.path.join(self._raw_dir, 'councilpostaldetails.csv')
        with open(council_postal_details_file) as f:
            reader = csv.DictReader(f, fieldnames=['name', 'address_1', 'address_2', 'state', 'postcode', 'email'])
            council_postal_details = [i for i in reader]

        council_urls_file = os.path.join(self._raw_dir, 'council-urls.csv')
        with open(council_urls_file) as f:
            reader = csv.DictReader(f, fieldnames=['url'])
            council_urls = [i for i in reader]

        councils = []
        suffixes = ['Council', 'Shire', 'City', 'Regional', 'Aboriginal']

        # name and address and email
        for item in council_postal_details:
            council = {
                'full_name': item['name'],
                'name': None,
                'categories': [],
                'address': f"{item['address_1']}, {item['address_2']}, {item['state']}, {item['postcode']}",
                'email': item['email'],
                'urls': []
            }

            name = item['name']
            for suffix in suffixes:
                if name.endswith(suffix):
                    council['categories'].append(suffix)
                    name = name.replace(suffix, '').strip()
                council['name'] = name

            councils.append(council)

        # website
        websites_with_names = [(i['name'], i['email'].split('@')[-1]) for i in councils]
        websites_only = [i['url'].replace('http://', '').replace('www.', '').strip('/').split('/')[0] for i in
                         council_urls]
        websites_all = set([i[1] for i in websites_with_names] + websites_only)

        websites_matching = [(i[0], next((w for w in websites_only if w == i[1]), None)) for i in
                             websites_with_names]

        websites_claimed = [i[1] for i in websites_matching if i[1]]
        websites_unclaimed = sorted(websites_all - set([i for i in websites_claimed]))
        names_without_websites = [(i[0], i[0].lower().replace(' ', '')) for i in websites_matching if not i[1]]
        websites_matching_round_2 = [(i[0], next((w for w in websites_unclaimed if i[1] in w), None)) for i in
                                     names_without_websites]

        for name, website in websites_with_names + websites_matching + websites_matching_round_2:
            matching_council = next((i for i in councils if i['name'] == name), None)
            if matching_council and website and website not in matching_council['urls']:
                matching_council['urls'].append(website)

        return result

    def _parse(self, election_code: str, raw_data) -> Dict[str, Any]:
        result = self._empty_result()

        result['elections'].append({
            'title': f'{self._election_year} {self._election_administrative_area} {self._election_coverage_type}',
            'description': '',
            'institution': self._election_institution,
            'locationCountry': self._election_country,
            'locationLocalityName': self._election_locality,
            'locationAdministrativeAreaName': self._election_administrative_area,
            'coverageType': self._election_coverage_type,
            'dateYear': self._election_year,
            'dateMonth': self._election_month,
            'dateDay': self._election_day,
            'code': election_code,
            'assemblies': [],
            'parties': [],
            'notes': [],
        })

        election = result['elections'][0]

        for item in raw_data['councillors']['data'] + raw_data['mayors']['data']:
            assembly_name = item['LGAreaElectorateName']
            party_name = item['PartyName']
            ballot_order = item['BallotOrder']
            electorate_name = item['BoundaryElectorateName'] or f"{assembly_name} Mayor"

            candidate_names = [i.strip() for i in item['CandidateName'].split(',') if i]
            name_last = candidate_names[0].title()
            name_first = candidate_names[1]

            assembly_code = self._create_code(election_code, assembly_name or self._unknown_assembly)
            electorate_code = self._create_code(assembly_code, electorate_name or self._unknown_electorate)
            party_code = self._create_code(election_code, party_name or self._unknown_party)
            ballot_code = self._create_code(electorate_code, ballot_order or self._unknown_ballot_entry)
            candidate_code = self._create_code(ballot_code, name_last, name_first or '')

            if all(i['code'] != assembly_code for i in result['assemblies']):
                assembly = {
                    'title': assembly_name or self._unknown_assembly,
                    'description': '',
                    'code': assembly_code,
                    'election': election_code,
                    'electorates': [],
                    'notes': [],
                }
                result['assemblies'].append(assembly)
            else:
                assembly = next(i for i in result['assemblies'] if i['code'] == assembly_code)

            if all(i['code'] != electorate_code for i in result['electorates']):
                electorate = {
                    'title': electorate_name or self._unknown_electorate,
                    'description': '',
                    'code': electorate_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'candidates': [],
                    'notes': [],
                }
                result['electorates'].append(electorate)
            else:
                electorate = next(i for i in result['electorates'] if i['code'] == electorate_code)

            if all(i['code'] != ballot_code for i in result['ballotEntries']):
                result['ballotEntries'].append({
                    'position': ballot_order,
                    'name': '',
                    'code': ballot_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'electorate': electorate_code,
                    'candidate': candidate_code,
                    'party': party_code,
                    'notes': []
                })

            if all(i['code'] != party_code for i in result['parties']):
                party = {
                    'title': party_name or self._unknown_party,
                    'description': '',
                    'code': party_code,
                    'election': election_code,
                    'candidates': [],
                    'notes': []
                }
                result['parties'].append(party)
            else:
                party = next(i for i in result['parties'] if i['code'] == party_code)

            if all(i['code'] != candidate_code for i in result['candidates']):
                result['candidates'].append({
                    'description': '',
                    'nameLast': (name_last or '').title() or self._unknown_candidate,
                    'nameFirst': (name_first or '').title(),
                    'code': candidate_code,
                    'election': election_code,
                    'assembly': assembly_code,
                    'electorate': electorate_code,
                    'ballotEntry': ballot_code,
                    'party': party_code,
                    'notes': []
                })

            # add the codes to the respective lists
            self._add_codes(election, assembly, assembly_code, party, party_code,
                            electorate, electorate_code, candidate_code)

        return result
