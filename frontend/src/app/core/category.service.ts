import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    private categoryListSubject = new BehaviorSubject<CategoryModel[]>([]); // BehaviorSubject Updates those who have subscribe for the event what the current value is now and will continue to update when it changes

    get categoryList$(): Observable<CategoryModel[]> { // Used to listen only, not to throw event.
        return this.categoryListSubject.asObservable();
    };


    private serverUrl = environment.serverUrl;

    public async loadCategory(): Promise<CategoryModel[]> {
        try {
            const category = await firstValueFrom(this.httpClient.get<CategoryModel[]>(`${this.serverUrl}category-list`));
            this.categoryListSubject.next(category);
            return category; // Returns the category to those who want, but the essence of the function is in the distribution of the information.

        }
        catch (err: any) {
            this.notificationService.showNotification(err,'error')
            return err
        }
    };


    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }
}

