# Vote Plan data

The `elections-data` directory in this repository stores the raw and formatted data for the Vote Plan website.

The raw data is manually downloaded from various sources, and stored in the election's `raw` directory.

Then a Python script per election in the `common` directory is written to convert the raw data into the standard json
format.

The output is one `src/assets/elections/elections.json` file and an `src/assets/elections/{election-code}.json` file per
election.

The `elections.json` file has only the election information, not the assemblies or parties. This is used to show the
list of elections on the main page.

The `{election-code}.json` file has one election and all related information for that election.

The `input.json` file can be used to add more data to the official data. This is mainly used for informational links.

Run the `process_run.py` script to generate all the `json` files in the Angular `src/assets` directory.

## Data format

All data objects have a `notes` attribute. Notes is an empty list by default. It is a list of objects with `title` (
display text), `type` (content type), `content` (text). This is where contact information is stored. For example:
occupation, phone home, email, fax, phone mobile, phone work, post, address

Attributes that are included in a freetext filter are marked with `freetext`.

Attributes that are required are marked with `required`. Other attributes are not required.

See the TypeScript classes in `src/app/elections` for details of the data format.

## Ballot paper structure

There are lots of ways to vote in an election, and therefore lots of ways that ballot papers are structured.

When adding an election, it may be necessary to add or modify the ballot structure specification.

The basic elements are the list of candidates, how the candidates are grouped (or not grouped), and how many candidates
need to be marked.

Here are the available settings:

- vote_marks: What type of markings to put in boxes. One of:
  - numbers: 1, 2, 3, etc... to indicate order of preference
  - fill: cross, tick, fill in, etc... to indicate a set of preferences over the non-filled boxes

- group_vote_method: How to fill in the ballot paper for one group of candidates. One of:
  - full_preferential: number every box on the ballot paper in your preferred order
  - optional_preferential: vote for one, some or all candidates on the ballot paper in your preferred order
  - first_past_the_post: mark exactly the required number of boxes

- group_candidates: How candidates are grouped on the ballot paper. One of:
  - one_group: all candidates are part of a single list
  - group_by_party: candidates are separated into groups based on their party

- group_vote_count_min:
  - any: zero, one, or more marks
  - at_least_one: one or more marks
  - (an integer): at least this many boxes must be marked

- group_vote_count_max:
  - any: zero, one, or more marks
  - at_most_one: exactly one mark
  - (an integer): at most this many boxes can be marked

- group_header_box_available: Whether there is a box that can be marked to indicate a vote for the entire group. One of:
  - vote_box: Does have a box that can be marked to indicate the whole group
  - no_box: Does not have a box
  - none: no group header, must be set to this if `group_candidates` is `one_group`

- group_header_vote_method: How to vote when groups have a header that can be filled in. Only valid
  when `candidate_group_header` is `vote_box`. One of:
  - full_preferential: number every box on the ballot paper in your preferred order
  - optional_preferential: vote for one, some or all candidates on the ballot paper in your preferred order
  - first_past_the_post: mark exactly the required number of boxes

- group_header_vote_count_min:
  - any: zero, one, or more marks
  - at_least_one: one or more marks
  - (an integer): at least this many boxes must be marked

- group_header_vote_count_max:
  - any: zero, one, or more marks
  - at_most_one: exactly one mark
  - (an integer): at most this many boxes can be marked
