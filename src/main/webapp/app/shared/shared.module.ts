import { NgModule } from '@angular/core';
import { StarterSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [StarterSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginComponent],
  exports: [
    StarterSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginComponent,
    HasAnyAuthorityDirective,
  ],
})
export class StarterSharedModule {}
