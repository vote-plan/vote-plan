# Overview of [Vote Plan](https://www.voteplan.org)

The purpose of this website is to aid people with deciding on their vote.

This is helpful because it can be difficult to take the time to decipher a ballot paper in a busy voting place.

Preparing your vote beforehand takes the guess work out of filling out the ballot paper.


## Flow for preparing a vote

The website supports creating voting plans for more than one election.


### Election

Attributes:

- Name (required) (can filter by freetext search)
- Name in English (optional) (can filter by freetext search)
- Name of institution (optional) (usually a Parliament or Congress or local government)
- Description (optional)
- Country (required) (can filter via list)
- Language (required) (can filter via list)
- Locality (optional) (usually a city) (can filter via freetext search)
- Administrative Area (optional) (usually a State or Province or County or Council) (can filter via freetext search)
- Year (required) (can filter via list)
- Month (required)
- Day (optional)
- List of links as key pairs: title (key) = url (value)

Information from the browser could be used to initialise the filters.

Once an election is selected, then the list of ballot papers for that election are shown.


### Assembly

Attributes:

- Assembly Name (required) (usually House or Representatives or Senate) (can filter by freetext search)
- List of links as key pairs: title (key) = url (value)
- Description (optional)

Once an assembly is selected, then the list of electorates is shown.

### Electorate

Attributes:

- Name (required) (can filter by freetext search)
- List of links as key pairs: title (key) = url (value)
- Description (optional)
- machine-readable description of the ballot paper layout

Once an electorate is selected, the list of candidates is shown.


### Candidate

Attributes:

- Name (required) (as per name used to run in election) (can filter by freetext search)
- Party (optional) (usually has a party, independent candidates will not) (can filter by freetext search)
- Photo (optional) (image)
- List of links as key pairs: title (key) = url (value)
- Contacts as key pairs: type (key) - detail (value)
- Description (optional)
- Coordinate on ballot paper (required) (usually a number or possibly letters and numbers) (can filter by freetext search)

Candidates can be ordered / ranked / selected depending on the requirements of the election.
If possible, there may be real-time warnings if some set of candidates is not a formal vote.


## Pages & URLs

All pages except the 'Electorate' page are read-only.

The 'Electorate' page is the main page where candidates can be arranged.

- Home page - has a freetext search that allows selecting an election, assembly, electorate, candidate, or party.
    - `/`, `/<lang-locale>`
- Elections (list of elections) 
    - `/elections`
- Assemblies (Details about election and list of assemblies) 
    - `/elections/<election id>/assemblies`
- Assembly (Details about assembly and list of electorates)
    - `/elections/<election id>/assemblies/<assembly id>`
- Electorates (Details about assembly and list of electorates)
    - `/elections/<election id>/assemblies/<assembly id>/electorates`
- Electorate (Details about electorate and list of candidates)
    - `/elections/<election id>/assemblies/<assembly id>/electorates/<electorate id>`
- Candidates (Details about election and list of all candidates in election)
    - `/elections/<election id>/candidates`
- Parties (Details about election and list of parties and candidates in the parties, with independents)
    - `/elections/<election id>/parties`
- About (Information about the app, data sources, acknowledgements)
    - `/about`


## Structure

Use ng-bootstrap for bootstrap components.

The Angular app is structured like this:
- src/app
    - model (module)
        - election, assembly, candidate, party (data classes)
        - external-data, local-data, pdf-generate (services)
    - ui-core (module)
        - home, about (components)
        - election,  assembly, candidate, party  (components)


## Website Features

- Entirely in-browser, no server communication
- Can add new data to the `data` repo, and the existing app will use it
- App is translate-able and localised (language and/or localisation specified via url path or url querystring)
- Can save candidate sets and load candidate sets (more than one set can be saved, can load from choice of saved sets)

If possible, there is an option to validate that the current set of candidates is a formal vote.
If it is not a formal vote, information about the reason why will be displayed.

Changes are saved as they are made.

There is the option to create a Vote Plan - a printable view of the current set of candidates.
This can be viewed as HTML and PDF.

No data is ever sent back to the server. 
There is no tracking of any kind in the website.
The website must be https.

It is possible to have more than one set of candidates. 
The different sets can be saved locally (with a unique name chosen by the user) and loaded again.

