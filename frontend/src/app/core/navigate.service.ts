import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigateService {

    // Navigate based url tree 
    public navigateByUrlTree(params: string) {
                this.router.navigate([this.router.url, `${params}`])
    }

    // Navigate based on the provided array of commands 
    // (In the use of: LoginComponent )
    public navigateByProvidedArray(params: string) {

        return this.router.navigate(['/', `${params}`])

    }

    constructor(private router: Router) { }

}
