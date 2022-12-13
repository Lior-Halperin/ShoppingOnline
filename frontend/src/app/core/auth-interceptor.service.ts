import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

// See this explainer video: https://www.youtube.com/watch?v=suTtA0Hlwlk

@Injectable()

// A function that is activated automatically at each Request or Response

export class AuthInterceptorService implements HttpInterceptor {

    // public token$: Observable<string>;

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // this.token$ =  this.authService.token$
        // const localToken = this.token$.pipe(take(1)).subscribe((token) => { console.log(token)})

        const token = localStorage.getItem("token");
        if (token) {
            const cloned = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(request)
        }
    }

    // constructor(private authService: AuthService) { }
}
