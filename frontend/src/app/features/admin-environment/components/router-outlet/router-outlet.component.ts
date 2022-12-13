import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
//   styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent implements OnInit {

//   constructor(private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
    // this.activatedRoute.params.subscribe(par => {   
    //     console.log('par',par) 
    // })

    // console.log(this.activatedRoute.routeConfig.path)
    // console.log(this.activatedRoute.snapshot)

    // console.log('activatedRoute.snapshot',this.activatedRoute.snapshot)

  }

}
