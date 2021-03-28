# Website Features and Structure

## Overview

These are the intended features. No all these features are implemented yet.

### Validate vote

If possible, there is an option to validate that the current set of candidates is a formal vote. If it is not a formal
vote, information about the reason why will be displayed.

### Auto save

Changes are saved as they are made.

### Generate vote plan

There is the option to create a Vote Plan - a printable view of the current set of candidates. This can be viewed as
HTML and PDF.

### Your votes are only shared if you want to share them

Best-effort to have no tracking or data sent back to the server.
The website must be https.
Can share a link that will populate a ballot.

### Locally saved votes

It is possible to have more than one set of chosen candidates. The different sets can be saved locally (with a unique
name chosen by the user) and loaded again. Can save candidate sets and load candidate sets (more than one set can be
saved, can load from choice of saved sets).

### Translatable

App is translate-able and localise-able (language and/or localisation specified via url querystring or browser header)

### Easily add data

Can add new data to the `data` repo, and the existing app will use it


## IDE Setup

If you are using a JetBrains IntelliJ IDE (e.g. WebStorm or PyCharm):

1. Start the Angular CLI Server in `Run` mode. Wait until the application has been compiled and the development server
   is ready.
2. Start the Angular Application in `Debug` mode.

Also have a look at the [in-depth instructions](https://www.jetbrains.com/help/idea/angular.html).

Also see the documentation for [angular local setup](https://angular.io/guide/setup-local)

Read more about building at the [angular development docs](https://angular.io/guide/build).

## File Structure

- `.github` - Github issue settings and build configuration
- `e2e` - angular end-to-end tests
- `src` - the angular application


# Angular Local Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
