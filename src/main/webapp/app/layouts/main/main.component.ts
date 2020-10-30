import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  ActivatedRouteSnapshot,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;

  showSidebar = true;
  showNavbar = true;
  showFooter = true;
  isLoading = false;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      // Spinner for lazyload modules
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }

      if (event instanceof NavigationEnd) {
        // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
        this.handleSidebarAndNavbarAndFooter(event);
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();

      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }

  private handleSidebarAndNavbarAndFooter(event: NavigationEnd): void {
    if (event['url'] === '/login' || event['url'] === '/404' || event['url'] === '/500' || event['urlAfterRedirects'] === '/login') {
      this.showSidebar = false;
      this.showNavbar = false;
      this.showFooter = false;
      document.querySelector('.main-panel')?.classList.add('w-100');
      document.querySelector('.page-body-wrapper')?.classList.add('full-page-wrapper');
      document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg');
      document.querySelector('.content-wrapper')?.classList.remove('auth', 'lock-full-bg');
      if (event['url'] === '/404' || event['url'] === '/500') {
        document.querySelector('.content-wrapper')?.classList.add('p-0');
      }
    } else {
      this.showSidebar = true;
      this.showNavbar = true;
      this.showFooter = true;
      document.querySelector('.main-panel')?.classList.remove('w-100');
      document.querySelector('.page-body-wrapper')?.classList.remove('full-page-wrapper');
      document.querySelector('.content-wrapper')?.classList.remove('auth', 'auth-img-bg');
      document.querySelector('.content-wrapper')?.classList.remove('p-0');
    }
  }
}
