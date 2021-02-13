# Local Development

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
- go check out the [Angular CLI](https://github.com/angular/angular-cli)
- read the [angular documentation](https://angular.io/guide/setup-local)

## File Structure

- `.github` - Github issue settings and build configuration
- `docs`  - the Github folder used to publish GitHub Pages. The application is compiled into this directory, and should be committed and pushed to Github to deploy the site.
- `e2e` - angular end-to-end tests
- `elections-data` - contains the election data. See the [readme](../elections-data/README.md) for more information.
- `read` - the project development documentation
- `src` - the angular application

## Generate commands

```bash
ng g component shared/app-navbar
ng g component shared/app-breadcrumb
ng g component main/page-not-found
ng g component main/about
ng g component main/news
ng g component main/help

ng g module elections/elections --module app --flat --routing

ng g component elections/elections-home
ng g component elections/election-detail
ng g component elections/assembly-detail
ng g component elections/electorate-detail
ng g component elections/candidate-detail
ng g component elections/party-detail
ng g component elections/vote-home

ng g service elections/elections

ng g class elections/election
ng g class elections/assembly
ng g class elections/electorate
ng g class elections/party
ng g class elections/candidate

ng g service model/model
ng g service shared/message
```

## Testing with FontAwesome

- https://github.com/FortAwesome/angular-fontawesome/issues/134#issuecomment-479964336
  "When testing components that use the <fa-icon/> component, you either have to re-import the
  font awesome library for each component that utilizes it (painful) or use the CUSTOM_ELEMENTS_SCHEMA,
  which is bad practice."


## Ideas

- Information from the browser could be used to initialise the filters.
- If possible, there could be real-time warnings if some set of candidates is not a formal vote.
- Candidate coordinate on ballot paper (required) (usually a number or possibly letters and numbers) (can filter by freetext search)
