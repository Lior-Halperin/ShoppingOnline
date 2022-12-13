import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class NavigateService {

    // Navigate based url tree 
    public navigateByUrlTree(params: string) {
                this.router.navigate([this.router.url, `${params}`])
                // console.log('navigateByUrlTree', this.router.url)

        this.activatedRoute.params.subscribe(par => {   
            // console.log('par',par) 
        })
        // console.log('activatedRoute.snapshot',this.activatedRoute.snapshot)

        // this.router.navigate([this.router.url, `${params}`])

        console.log('fsd',this.router.url)

        // this.router.
        // console.log(this.activatedRoute.queryParams)
        // this.router.parseUrl(`${params}`)
        // console.log('navigateByUrlTree', this.router.url)

        // return this.router.parseUrl(`${params}`)
    }
//queryParams


    // Navigate based on the provided array of commands 
    // (In the use of: LoginComponent )
    public navigateByProvidedArray(params: string) {

        return this.router.navigate(['/', `${params}`])

    }

    constructor(private router: Router,private activatedRoute:ActivatedRoute, private notificationService: NotificationService) { }

}
