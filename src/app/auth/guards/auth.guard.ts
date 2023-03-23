import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.checkAuth().pipe(
  //     tap((isAuth) => {
  //       if (!isAuth) {
  //         this.router.navigate(['./auth/login']);
  //       }
  //     })
  //   );

  //   // return this.isLogin();
  // }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    return this.authService.checkAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
  //   return this.authService.checkAuth().pipe(
  //     tap((isAuth) => {
  //       if (!isAuth) {
  //         this.router.navigate(['./auth/login']);
  //       }
  //     })
  //   );
  //   // return this.isLogin();
  // }

  isLogin() {
    return this.authService.auth.id ? true : false;
  }
}
