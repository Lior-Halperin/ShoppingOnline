import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import Role from '../models/role-enum';
import { NavigateService } from './navigate.service';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'

})

export class AuthService {

    // User details state:
    private userDetailsSubject = new BehaviorSubject<UserModel[]>([]);

    get userDetails$(): Observable<UserModel[]> {
        return this.userDetailsSubject.asObservable();
    };

    // Permission types
    private permissionTypeSubject = new BehaviorSubject<Role>(null)

    get permissionType$(): Observable<Role> {
        return this.permissionTypeSubject.asObservable();
    };


    private serverUrl = environment.serverUrl;

    private helper = new JwtHelperService();

    public initialOperation() {
        try {
            if (this.permissionTypeSubject.value === null) {
                const token = localStorage.getItem("token");// Get token from storage
                const decodedToken = token !== null && this.helper.decodeToken(token);// Deciphering the token we received

                if (decodedToken !== null && decodedToken.hasOwnProperty('user')) {
                    this.userDetailsSubject.next(decodedToken.user) // Converting the current state user to the user sitting inside the token we received.
                    this.permissionTypeSubject.next(decodedToken.user.role)
                    this.navigateService.navigateByProvidedArray(`${decodedToken.user.role.toLowerCase()}`)
                }
            }

        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')
        }

    }

    public async login(credentials: CredentialsModel) {
        try {
            // Get token form the backend
            const token = await firstValueFrom(this.httpClient.post<string>(`${this.serverUrl}/auth/login`, credentials))
            // Save token in storage!
            localStorage.setItem("token", token)

            if (this.permissionTypeSubject.value === Role.Admin) {
                this.navigateService.navigateByProvidedArray(`${this.permissionTypeSubject.value.toLowerCase()}`)
            }
            this.initialOperation()
            this.notificationService.showNotification('You have successfully login ', 'success')
        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')
        }
    };



    public logout(): void {
        try {
            localStorage.removeItem("token"); // Clear token from storage.
            this.permissionTypeSubject.next(null)
            this.navigateService.navigateByProvidedArray('/')
            this.notificationService.showNotification('You have successfully logged out ', 'success')
        }
        catch (err: any) {
            this.notificationService.showNotification(err.error, 'error')

        }

    };

    public async singIn(registerDetails: UserModel, stepType: string) {
        try {
            switch(stepType){
                case 'firstStepFormGroup':
                    const firstStepResult =  await firstValueFrom(this.httpClient.patch<UserModel[]>(`${this.serverUrl}register-step1`, registerDetails))
                   
                    break;
                    case 'secondStepFormGroup':
                        const secondStepResult =  await firstValueFrom(this.httpClient.post<string>(`${this.serverUrl}register-step2`, registerDetails))

                        const cart = localStorage.getItem("cart");
                        cart !== null && localStorage.removeItem("cart");
                        localStorage.setItem("token", secondStepResult)
                        this.initialOperation()
                        break;
            }

        }
        catch (err: any) {
            this.notificationService.showNotification(err.error, 'error')
        }
    }

    constructor(private httpClient: HttpClient, private navigateService: NavigateService,
        private notificationService: NotificationService) { }
}
