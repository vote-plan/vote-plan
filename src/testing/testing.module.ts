import { NgModule } from '@angular/core';
import { RouterLinkDirectiveStub } from './router-link-directive-stub';
import { AppModule } from '../app/app.module';

/**
 * Needed so that `aot` build is working. But it isn't used throughout our tests and/or app.
 * See https://github.com/angular/angular/issues/13590#issuecomment-279691337
 */
@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ],
  imports: [
    AppModule
  ]
})
export class TestingModule {
}
