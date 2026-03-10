import { Component, inject, signal } from '@angular/core';
import { Supaservice } from '../../services/supaservice';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  supaservice: Supaservice = inject(Supaservice);
  router: Router = inject(Router);

  session = signal<Session | null>({} as Session);
  searchString = "";

  search($event: string) {
    this.supaservice.setSearchString($event);
  }

  constructor() {
    this.supaservice.authChangesObservable().subscribe(({ event, session }) => {
      this.session.set(session);
    });
  }

  async logout() {
    await this.supaservice.logout();
    this.router.navigate(['/home']);
  }
}