import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  constructor(
    config: NgbDropdownConfig,
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {}

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  getUserName(): string {
    return this.isAuthenticated() ? this.accountService.getUserName() : '用户';
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    const body = document.querySelector('body');
    if (!body?.classList?.contains('sidebar-toggle-display') && !body?.classList?.contains('sidebar-absolute')) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body?.classList.add('sidebar-icon-only');
      } else {
        body?.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }
}
