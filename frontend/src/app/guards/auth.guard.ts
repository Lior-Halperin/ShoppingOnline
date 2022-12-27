import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router:Router, private activatedRoute: ActivatedRoute) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            const result$ = this.authService.permissionType$.pipe(map(role => {
                const permissionType =  role !== null ? state.url.includes(`${role.toLowerCase()}`) : false ;
                return permissionType ? true :  this.router.parseUrl('/login')
            }));
    
            return result$
        }



}
