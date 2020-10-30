import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { StarterSharedModule } from 'app/shared/shared.module';
import { StarterCoreModule } from 'app/core/core.module';
import { StarterAppRoutingModule } from './app-routing.module';
import { StarterEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { LoginComponent } from './shared/login/login.component';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    StarterSharedModule,
    StarterCoreModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    StarterEntityModule,
    StarterAppRoutingModule,
    ChartsModule,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    DashboardComponent,
  ],
  providers: [ThemeService],
  bootstrap: [MainComponent],
})
export class StarterAppModule {}
