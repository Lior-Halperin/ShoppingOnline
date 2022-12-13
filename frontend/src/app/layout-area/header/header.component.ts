import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { Observable,map,take , filter} from 'rxjs';
import RoleEnum from 'src/app/models/role-enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    // public isLogin$:  Observable<RoleEnum>;
    public isLogin:boolean;

    // public isLogin$:Observable<UserModel[]>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.isLogin$ = this.authService.userDetails$.pipe(map((o)=>Object(o).role))
    this.authService.permissionType$.pipe(take(1)).subscribe((role)=>{
        console.log(role)
        if(role !== null){this.isLogin = true}
    })
    // this.isLogin$ = this.authService.userDetails$.pipe(map((o)=>Object(o).role))
    // this.isLogin$ = this.authService.userDetails$.pipe(filter((o)=>Object(o).role !== null))

//    this.authService.permissionType$.pipe(take(1)).subscribe((role)=>{
//     console.log(role)
//         return role !== null ? true : false
//     })
//   }
  }
  logout(){
    // this.isLogin = false
    this.authService.logout()
}

}
