import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StarterSharedModule } from 'app/shared/shared.module';

import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings/settings.component';
import { accountState } from './account.route';

@NgModule({
  imports: [StarterSharedModule, RouterModule.forChild(accountState)],
  declarations: [ActivateComponent, PasswordComponent, PasswordStrengthBarComponent, SettingsComponent],
})
export class AccountModule {}
