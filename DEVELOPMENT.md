# VotePlan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.


## Development server

Run `npm run local-server` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

If you are using a JetBrains IntelliJ IDE (e.g. WebStorm or PyCharm):

1. Start the Angular CLI Server in `Run` mode. Wait until the application has been compiled and the development server is ready.
2. Start the Angular Application in `Debug` mode.

Also have a look at the [in-depth instructions](https://www.jetbrains.com/help/idea/angular.html#angular_running_and_debugging). 


## Build

Run `npm run build` to build the project. 
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Read more at the [angular development docs](https://angular.io/guide/build).


## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

There are separate configuration files for local and CI execution.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Read more at the [angular cli docs](https://angular.io/cli).


## Further help

To get more help:
 
- on the Angular CLI use `ng help`
- go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)
- read the [angular documentation](https://angular.io/guide/setup-local)


## Website Features

*Validate vote*
If possible, there is an option to validate that the current set of candidates is a formal vote.
If it is not a formal vote, information about the reason why will be displayed.

*Auto save*
Changes are saved as they are made.

*Generate vote plan*
There is the option to create a Vote Plan - a printable view of the current set of candidates.
This can be viewed as HTML and PDF.

*Your votes are only shared if you want to share them*
No data is ever sent back to the server. 
There is no tracking of any kind in the website.
The website must be https.
Entirely in-browser, no server communication.
Can share a link that will populate a ballot.

*Locally saved votes*
It is possible to have more than one set of chosen candidates. 
The different sets can be saved locally (with a unique name chosen by the user) and loaded again.
Can save candidate sets and load candidate sets (more than one set can be saved, can load from choice of saved sets)

*Translated*
App is translate-able and localise-able (language and/or localisation specified via url querystring)

*Easily add data*
Can add new data to the `data` repo, and the existing app will use it


## Pages & URLs

All pages except the 'Electorate' page are read-only.

The 'Electorate' page is the main page where candidates can be arranged.

Each page has a freetext search that looks at the object on that page, as well as the objects linked through codes.
This allows searching for and selecting an election, assembly, electorate, candidate, or party.

Each data class has a code - this can be the full code or the short code.

- Home page (shows upcoming and/or recent elections)
    - `/`
- About (Information about the app, data sources, acknowledgements)
    - `/about`
- Vote
    - `/vote/<electorate code>`

- Elections (list of elections) 
    - `/elections`
- Election (detail of election, plus assemblies, candidates, electorates, parties) 
    - `/election/<code>`
- Assemblies (list of assemblies in election, plus election) 
    - `/assemblies/<election code>`
- Assembly (detail of assembly, plus election, candidates, electorates, parties) 
    - `/assembly/<code>`
- Electorates (list of electorates in election, plus election)
    - `/electorates/<election code>`
- Electorate (detail of electorate, plus election, assemblies, candidates, parties)
    - `/electorate/<code>`
- Candidates (list of all candidates in election, plus election)
    - `/candidates/<election code>`
- Candidate (details of candidate, plus election, assemblies, electorates, parties)
    - `/candidate/<code>`
- Parties (list of parties in election, plus election)
    - `/parties/<election code>`
- Party (details of party, plus election, assemblies, candidates, electorates)
    - `/parties/<code>`


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


## Development Notes


### Generate commands

    $ ng g component shared/app-navbar
    $ ng g component shared/app-breadcrumb

    $ ng g component main/page-not-found
    $ ng g component main/about
    $ ng g component main/news

    $ ng g module elections/elections --module app --flat --routing
    $ ng g component elections/elections-home
    $ ng g component elections/election-detail
    $ ng g component elections/assembly-detail
    $ ng g component elections/electorate-detail
    $ ng g component elections/candidate-detail
    $ ng g component elections/party-detail
    
    $ ng g component elections/vote-home
    
    $ ng g service elections/elections
    
    
    $ ng g class elections/election
    $ ng g class elections/assembly
    $ ng g class elections/electorate
    $ ng g class elections/party
    $ ng g class elections/candidate
    
    $ ng g service model/model
    
    
    
    $ ng g service shared/message


### Testing with FontAwesome

- https://github.com/FortAwesome/angular-fontawesome/issues/134#issuecomment-479964336
  "When testing components that use the <fa-icon/> component, you either have to re-import the 
  font awesome library for each component that utilizes it (painful) or use the CUSTOM_ELEMENTS_SCHEMA, 
  which is bad practice."


### Ideas

- Information from the browser could be used to initialise the filters.
- If possible, there could be real-time warnings if some set of candidates is not a formal vote.
- Candidate coordinate on ballot paper (required) (usually a number or possibly letters and numbers) (can filter by freetext search)
