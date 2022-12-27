import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { CityListService } from 'src/app/core/city-list.service';
import { CityListModel } from 'src/app/models/city-list.model'

@Component({
    selector: 'app-singin',
    templateUrl: './singin.component.html',
    styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {


    public firstStepFormGroup: any = FormGroup

    public secondStepFormGroup: any = FormGroup

    public cityList$: Observable<CityListModel[]>

    public hide = true;

    //   isLinear = false;

    constructor(private formBuilder: FormBuilder, private cityListService: CityListService,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.cityList$ = this.cityListService.cityList$
        this.cityListService.loadCityList()

        this.firstStepFormGroup = this.formBuilder.group({
            userIdNumber: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(5),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/)]],

        });

        this.secondStepFormGroup = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            cityId: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
        });
    }

    // The following function returns an error message under the input
    getErrorMessage(controllerName: string, formGroupName: string) {
        const validList = new Map([
            ['required', 'You must enter a value'],
            ['minlength', 'You have passed the minimum required characters'],
            ['maxlength', 'You have exceeded the maximum number of characters required'],
            ['min', 'The price you selected is not in the minimum range'],
            ['max', 'The price you selected is not in the maximum range'],
            ['pattern','must: number,lowercase,uppercase,special character']
        ])
        let errorMessage = '';
        if (formGroupName === 'firstStepFormGroup') {
            for (let [errorType, message] of validList) {
                switch (true) {
                    case this.firstStepFormGroup.controls[controllerName].hasError(errorType):
                        errorMessage = message
                        break;
                }
            }
        }

        if (formGroupName === 'secondStepFormGroup') {
            for (let [errorType, message] of validList) {
                switch (true) {
                    case this.secondStepFormGroup.controls[controllerName].hasError(errorType):
                        errorMessage = message
                        break;
                }
            }
        }
        return errorMessage
    }

    public sendStep(stepType: string) {

        switch (stepType) {
            case 'firstStepFormGroup':
                this.authService.singIn(this.firstStepFormGroup.value, 'firstStepFormGroup')
                break;

            case 'secondStepFormGroup':
                const combineObject = Object.assign(this.firstStepFormGroup.value, this.secondStepFormGroup.value)
                this.authService.singIn(combineObject, 'secondStepFormGroup')
                break;
        }
    }
}
