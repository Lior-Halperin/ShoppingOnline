import { AfterViewInit, Component, ContentChild, ElementRef, OnChanges, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, filter, map, Observable, tap, take } from 'rxjs';

import { CartService } from 'src/app/core/cart.service';
import { CartModel } from 'src/app/models/cart.model';
// import { CardComponent } from '../card/card.component';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('mainContent', { read: ViewContainerRef }) ContentSidenav!: ViewContainerRef;
    @ViewChild('sidenavContent', { read: ViewContainerRef }) SidenavArea!: ViewContainerRef;

    // @ViewChild(`routing`, { read: ViewContainerRef }) Routing!:ViewContainerRef;
    @ViewChild(`routing`) Routing:ElementRef;

    constructor() { }


    ngOnInit(): void {
   

    }

    // logout(){
    //     this.authService.logout()
    // }

    searches: string[] = [];

    ngAfterViewInit(): void {
        // this.selectedControl.setValue("1")
        // console.log(this.Routing)

    }

    ngOnChanges(): void {
        // console.log(this.cart$)

    }



    //   ngOnInit(): void {
    //     // this.createComponentMainBasedOnConfig()
    //     // this.cardService.createComponentMainBasedOnConfig()
    //     // this.mainSidenavMain = this.cardService.createComponentMainBasedOnConfig()
    //     // this.cardService.createComponentMainBasedOnConfig(this.mainSidenavMain)
    //     // console.log(typeof this.cardService.createComponentMainBasedOnConfig)
    //   }



    //       createComponentMainBasedOnConfig() {
    //         this.cardService.componentConfig.forEach(async componentConfig=>{
    //           const componentInstance = await componentConfig.component();
    //           const componentRef =  this.mainSidenavMain.createComponent(componentInstance);

    //           Object.entries(componentConfig.inputs).forEach(([key,value]) => {
    //             componentRef.setInput(key , value)

    //           })

    //     })
    //   }

    // async importCard() {
    //     const componentConfig = { lior :() => import('../card/card.component').then(card => card.CardComponent)};
    //     const componentInstance = await componentConfig.lior()
    // return componentInstance
    // }

    // DataViewConstructorntainerRef

    // async createComponentMainBasedOnConfig() {
    //     const mainSidenavMain:any = null

    //   const componentInstance = { lior :() => import('../card/card.component').then(card => card.CardComponent)};
    //   const mor = await componentInstance.lior()


    //   const componentRef =  this.mainSidenavMain.createComponent(mor);
    // const componentRef =  mainSidenavMain.createComponent(mor);
    // console.log(typeof mor)

    // return mainSidenavMain
    // return new Promise<ViewContainerRef>((resolve) => {
    //     resolve(mainSidenavMain);
    // })


    // console.log(componentRef.instance)
    // console.log(componentRef.injector)
    //   componentRef.setInput("name","dfs")


    //     Object.entries(this.products$).forEach(([key,value]) => {
    //     componentRef.setInput(key , value)
    //     console.log(key)
    //   })

    //   Object.entries(componentConfig.inputs).forEach(([key,value]) => {
    //     componentRef.setInput(key , value)
    //   })

    // })
    // }


}
// console.log(this.router.routerState.snapshot.url )// result = admin
// this.router.navigateByUrl("/products");


