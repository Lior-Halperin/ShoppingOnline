import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// See this explainer video: https://www.youtube.com/watch?v=suTtA0Hlwlk

@Injectable()

// A function that is activated automatically at each Request or Response

export class AuthInterceptorService implements HttpInterceptor {


    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
}
