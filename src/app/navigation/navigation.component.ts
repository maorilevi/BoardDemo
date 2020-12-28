import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  currentUser = new BehaviorSubject<User>(null);
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver) {}

  onSignOut(): void {

    this.authenticationService.logout().subscribe(res => {
      console.log(res);
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.authenticationService.CurrentUser.subscribe(user => {
      console.log(user);
      this.currentUser.next(user);
    });
  }
}
