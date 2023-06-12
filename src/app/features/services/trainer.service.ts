import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Trainer } from '../models/trainer.model';

const routePrefix = "/api/trainer";

@Injectable({
  providedIn: 'root'
})
export class TrainerService extends HttpService<Trainer> {

  constructor(http: HttpClient) {
    super(http, routePrefix);
  }
  getDropdownByState<T>(stateId: number, searchText?: string): Observable<T[]> {
    let params = new HttpParams()
    .set("searchText", searchText)
    .set("stateId", stateId);
    // if (searchText) params.set("searchText", searchText);

    return this.http.get<T[]>(`${this.BaseUrl}/dropdown?${params.toString()}`).pipe(catchError(this.handleError));
  }

  getTrainerDetail<T>(trainerId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${trainerId}`).pipe(catchError(this.handleError));
  }

  addTrainerDetail<T>(trainer: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, trainer).pipe(catchError(this.handleError));
  }

  updateTrainerDetail<T>(trainerId: number, trainer  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${trainerId}`, trainer).pipe(catchError(this.handleError));
  }
}
