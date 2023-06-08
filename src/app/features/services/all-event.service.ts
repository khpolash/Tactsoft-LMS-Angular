import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AllEvent } from '../models/allEvent.model';

const routePrefix = "/api/allEvent";

@Injectable({
  providedIn: 'root'
})
export class AllEventService extends HttpService<AllEvent> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getAllEventDetail<T>(allEventId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${allEventId}`).pipe(catchError(this.handleError));
  }

  addAllEventDetail<T>(allEvent: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, allEvent).pipe(catchError(this.handleError));
  }

  updateAllEventDetail<T>(allEventId: number, allEvent  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${allEventId}`, allEvent).pipe(catchError(this.handleError));
  }

}
