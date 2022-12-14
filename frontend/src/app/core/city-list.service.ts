import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityListModel } from '../models/city-list.model';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class CityListService {


    // City List state:
    private cityListSubject = new BehaviorSubject<CityListModel[]>([]);

    get cityList$(): Observable<CityListModel[]> {
        return this.cityListSubject.asObservable();
    };

    private serverUrl = environment.serverUrl;

    public async loadCityList(): Promise<CityListModel[]> {
        try {
            const cityList = await firstValueFrom(this.httpClient.get<CityListModel[]>(`${this.serverUrl}city-list`));
            this.cityListSubject.next(cityList);
            return cityList; // Returns the cityList to those who want, but the essence of the function is in the distribution of the information.

        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')
            return err
        }
    };


    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }
}