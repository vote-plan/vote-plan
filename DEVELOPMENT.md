# VotePlan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Generate commands

    $ ng g component page-not-found
    $ ng g component about
    $ ng g component home

    $ ng g module elections/elections --module app --flat --routing
    $ ng g component elections/elections
    $ ng g component elections/election-list
    $ ng g component elections/election
    $ ng g component elections/assembly-list
    $ ng g component elections/assembly
    $ ng g component elections/electorate
    $ ng g component elections/electorate-list
    $ ng g component elections/party-list
    $ ng g component elections/party
    $ ng g component elections/candidate
    $ ng g component elections/candidate-list
    
    $ ng g class model/Election
    $ ng g class model/Assembly
    $ ng g class model/electorate
    $ ng g class model/party
    $ ng g class model/candidate
    
    $ ng g service model/model
    
    $ ng g component shared/app-navbar
    $ ng g component shared/app-breadcrumb
    
    $ ng g service shared/message


## Testing with FontAwesome

- https://github.com/FortAwesome/angular-fontawesome/issues/134#issuecomment-479964336
  "When testing components that use the <fa-icon/> component, you either have to re-import the 
  font awesome library for each component that utilizes it (painful) or use the CUSTOM_ELEMENTS_SCHEMA, 
  which is bad practice."

