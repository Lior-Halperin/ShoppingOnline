import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { Observable, filter, map, tap, take } from 'rxjs';
import { NavigateService } from 'src/app/core/navigate.service';
import RoleEnum from 'src/app/models/role-enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public hide = true;
    public isLogin = false;
    public hideSingIn = true
    public userDetails$: Observable<UserModel>;

    // public userDetails$: Observable<UserModel[]>;

    credentials: CredentialsModel = { email: "", password: "" }

    loginForm: FormGroup;

    singIn() {
        this.hideSingIn = !this.hideSingIn
    }
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private navigateService: NavigateService) { }

    ngOnInit(): void {
        this.userDetails$ = this.authService.userDetails$.pipe(map((o) => Object(o)))
        this.authService.permissionType$.pipe(take(1)).subscribe((role) => {
            if (role === RoleEnum.Client) { this.isLogin = true }
            role === RoleEnum.Admin && this.navigateService.navigateByProvidedArray(`${role.toLowerCase()}`)
        })


        this.loginForm = this.formBuilder.group(
            {
                email: [this.credentials.email, [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(2)]],
                password: [this.credentials.password, [Validators.required, Validators.maxLength(16), Validators.minLength(4)]]
            }
        )

    }

    ngOnChanges(): void {


    }

    onLogin() {
        console.log('test login')
        this.credentials = this.loginForm.value
        this.authService.login(this.credentials)
    }

    onStartShopping() {
        console.log("Start Shopping")
    }

    private afterLoginDetails = [
        { shoppingStatus: 'open cart', message: "you have a open cart", price: 1, date: '20/2/2022', textButton: "Continue shopping" },
        { shoppingStatus: 'closed cart', message: "What a pleasure to have you back", price: 1, date: '20/2/2022', textButton: "Start Shopping" },
        { shoppingStatus: 'new', message: "Welcome to your first purchase", price: "", date: "", textButton: "Start Shopping" },

    ];

}
