import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {


    public firstStepFormGroup: any = FormGroup

    public secondStepFormGroup: any = FormGroup
    
    public hide = true;


    //   isLinear = false;
    
      constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstStepFormGroup = this.formBuilder.group({
        userIdNumber: ['', Validators.required,Validators.maxLength(20), Validators.minLength(5)],
        email: ['', Validators.required,Validators.maxLength(50), Validators.minLength(5)],
        password: ['', Validators.required,Validators.maxLength(16), Validators.minLength(5)],

      });

      this.secondStepFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required,Validators.maxLength(15), Validators.minLength(2)],
        firstName: ['', Validators.required,Validators.maxLength(20), Validators.minLength(2)],
        lastName: ['', Validators.required,Validators.maxLength(20), Validators.minLength(2)],
        cityId: ['', Validators.required],
        street: ['', Validators.required,Validators.maxLength(30), Validators.minLength(2)],
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
    ])
    let errorMessage = '';
    if(formGroupName === 'firstStepFormGroup' ){
        for (let [errorType, message] of validList) {
            switch (true) {
                case this.firstStepFormGroup.controls[controllerName].hasError(errorType):
                    // console.log(errorType, message)
                    errorMessage = message
                    break;
            }
        }
    }

    if(formGroupName === 'secondStepFormGroup' ){
        for (let [errorType, message] of validList) {
            switch (true) {
                case this.secondStepFormGroup.controls[controllerName].hasError(errorType):
                    // console.log(errorType, message)
                    errorMessage = message
                    break;
            }
        }
    }

    return errorMessage
}
}
