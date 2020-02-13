import csv
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
        return {}

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
        # TODO: each local government election is held at the same time.
        # TODO: once more data is available, generate an assembly per local government, with associated information.
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

        result['assemblies'] = [{
            'title': self._assembly_title,
            'description': '',
            'code': self._create_code(election_code, self._assembly_abbr),
            'election': election_code,
            'electorates': [],
            'notes': [],
        }]

        result['parties'].append({
            'title': 'Independents',
            'description': '',
            'code': self._create_code(election_code, self._independents_party),
            'election': election_code,
            'candidates': [],
            'notes': [],
        })

        return result
