import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { take} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public isLogin:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.permissionType$.pipe(take(1)).subscribe((role)=>{
        console.log(role)
        if(role !== null){this.isLogin = true}
    })

  }
  logout(){
    this.authService.logout()
}

}
