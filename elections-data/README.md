# Vote Plan data

The `elections-data` directory in this repository stores the raw and formatted data for the Vote Plan website.

The raw data is manually downloaded from various sources, and stored in the election's `raw` directory.

Then a Python script per election in the `common` directory is written to convert the raw data into the standard json format.

The output is one `src/assets/elections/elections.json` file and an `src/assets/elections/{election-code}.json` file per election.

The `elections.json` file has only the election information, not the assemblies or parties.
This is used to show the list of elections on the main page.

The `{election-code}.json` file has one election and all related information for that election.

The `input.json` file can be used to add more data to the official data. This is mainly used for informational links. 

Run the `process_run.py` script to generate all the `json` files in the Angular `src/assets` directory. 


## Data format

All data objects have a `notes` attribute.
Notes is an empty list by default.
It is a list of objects with `title` (display text), `type` (content type), `content` (text).
This is where contact information is stored.
For example: occupation, phone home, email, fax, phone mobile, phone work, post, address

Attributes that are included in a freetext filter are marked with `freetext`.

Attributes that are required are marked with `required`. Other attributes are not required.

See the TypeScript classes in `src/app/elections` for details of the data format.
