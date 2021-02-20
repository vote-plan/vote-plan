# Website Features and Structure

## Overview

### Validate vote

If possible, there is an option to validate that the current set of candidates is a formal vote. If it is not a formal
vote, information about the reason why will be displayed.

### Auto save

Changes are saved as they are made.

### Generate vote plan

There is the option to create a Vote Plan - a printable view of the current set of candidates. This can be viewed as
HTML and PDF.

### Your votes are only shared if you want to share them

No data is ever sent back to the server. There is no tracking of any kind in the website. The website must be https.
Entirely in-browser, no server communication. Can share a link that will populate a ballot.

### Locally saved votes

It is possible to have more than one set of chosen candidates. The different sets can be saved locally (with a unique
name chosen by the user) and loaded again. Can save candidate sets and load candidate sets (more than one set can be
saved, can load from choice of saved sets)

### Translatable

App is translate-able and localise-able (language and/or localisation specified via url querystring)

### Easily add data

Can add new data to the `data` repo, and the existing app will use it

## Pages & URLs

All pages except the 'Electorate' page are read-only.

The 'Electorate' page is the main page where candidates can be arranged.

Each page has a freetext search that looks at the object on that page, as well as the objects linked through codes. This
allows searching for and selecting an election, assembly, electorate, candidate, or party.

Each data class has a code, which is unique to the particular entity (across all elections, assemblies, etc).

- Home page (shows upcoming and/or recent elections)
  - `/`
- About (Information about the app, data sources, acknowledgements)
  - `/about`
- Vote
  - `/vote/<electorate code>`

- Elections (list of elections)
  - `/elections`
- Election (detail of election, plus assemblies, candidates, electorates, parties)
  - `/elections/<election code>`
- Assembly (detail of assembly, plus election, candidates, electorates, parties)
  - `/assemblies/<assembly code>`
- Electorate (detail of electorate, plus election, assemblies, candidates, parties)
  - `/electorates/<electorate code>`
- Candidate (details of candidate, plus election, assemblies, electorates, parties)
  - `/candidates/<candidate code>`
- Party (details of party, plus election, assemblies, candidates, electorates)
  - `/parties/<party code>`
- Ballot section (details of Ballot section, plus election, assemblies, candidates, electorates, parties)
  - `/ballot-sections/<ballot section code>`

## Angular app structure

Use ng-bootstrap for bootstrap components.

The Angular app is structured like this:

- src/app
  - `app` (main component and module)
  - home - `/` (component)
  - about - `/about` (component)
  - page-not-found - for pages that do not exist (component)
  - shared - for re-usable components
    - app-navbar (component)
  - elections (module)
    - election (data class)
    - assembly (data class)
    - candidate (data class)
    - party (data class)
    - ballot-entry (data class)
    - election-data (service) - for saving and loading local data state, and being able to share urls with state
    - pdf-generate (service) - create pdf for printing or saving

