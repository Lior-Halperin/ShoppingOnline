import {  Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';



@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    @ViewChild('mainContent', { read: ViewContainerRef }) ContentSidenav!: ViewContainerRef;
    @ViewChild('sidenavContent', { read: ViewContainerRef }) SidenavArea!: ViewContainerRef;

    @ViewChild(`routing`) Routing:ElementRef;

    constructor() { }


    ngOnInit(): void {
   

    }


    searches: string[] = [];









}



