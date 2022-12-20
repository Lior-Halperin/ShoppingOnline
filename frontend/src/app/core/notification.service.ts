import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../shared/components/notification/notification.component';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    public showNotification(displayMessage: any, messageType: 'error' | 'success', buttonText?: string,) {

        if (messageType === 'error') {

            // case 1:reporting a single error from backend by mongoose schema
            typeof displayMessage.error === 'string' && (displayMessage = displayMessage.error)

            // typeof displayMessage.message === 'string' && (displayMessage = displayMessage.message)

            // case 2: No error message defined
            typeof displayMessage === undefined && (displayMessage = "Some error, please try again.")

        }


        this.snackBar.openFromComponent(NotificationComponent, {
            data: {
                message: displayMessage,
                buttonText: buttonText,
                type: messageType
            },
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: messageType,

        })
    }
}
