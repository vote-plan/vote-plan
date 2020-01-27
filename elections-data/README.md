# Vote Plan data

The `elections-data` directory in this repository stores the raw and formatted data for the Vote Plan website.

The raw data is manually downloaded from various sources, and stored in the election's `raw` directory.

Then a Python script per election in the `common` directory is written to convert the raw data into the standard json format.

See `elections-data/common/example.yml` for the data.json format.

## Data format

All data objects have a `notes` attribute.
Notes is an empty list by default.
It is a list of objects with `title` (display text), `type` (content type), `content` (text).
This is where contact information is stored.
For example: occupation, phone home, email, fax, phone mobile, phone work, post, address

Attributes that are included in a freetext filter are marked with `freetext`.

Attributes that are required are marked with `required`. Other attributes are not required.

### Election

Once an election is selected, then the list of ballot papers for that election are shown.

- title: name of the election (required, freetext)
- institution: usually a parliament or Congress or local government (optional, freetext)
- description: a summary of the election (optional)
- location - country: name of the country (required, freetext)
- location - locality: usually a city (optional, freetext)
- location - administrative area: usually a State or Province or County or Council (optional, freetext)
- date - year: (required, freetext)
- date - month: (optional)
- date - day: (optional)
- codes - assemblies: (0, 1, 2, ...)
- codes - election: (1)
- codes - parties: (0, 1, 2, ...)

### Assembly

Once an assembly is selected, then the list of electorates is shown.

- title: usually house or representatives or senate or similar (required, freetext)
- description: (optional)
- codes - assembly: (1)
- codes - election: (1)
- codes - electorates: (0, 1, 2, ...)

### Electorate

Once an electorate is selected, the list of candidates is shown.

- title: (required, freetext)
- description: (optional)
- machine-readable description of the ballot paper layout (required, todo)
- codes - assembly: (1)
- codes - election: (1)
- codes - candidates: (0, 1, 2, ...)
- codes - electorate: (1)

### Candidate

Candidates can be ordered / ranked / selected depending on the requirements of the election.

Photos of candidates are stored in a `photos` directory in the elections data directory.
The photos are named `<the full candidate code>.jpg`.

- name - first: as per name used to run in election (required, freetext)
- name - last: as per name used to run in election (required, freetext)
- description: (optional)
- codes - candidate (1)
- codes - assembly: (1)
- codes - ballot_entry: (1)
- codes - party: (1)
- codes - election: (1)
- codes - electorate: (1)

### Party

- title: (required, freetext)
- description: (optional)
- codes - candidates (0, 1, 2, ...)
- codes - party (1)
- codes - election (1)


### Ballot entry

- position: (required, freetext?)
- codes - assembly (1)
- codes - candidate: (1)
- codes - ballot_entry: (1)
- codes - election: (1)
- codes - electorate: (1)
- codes - party: (1)
