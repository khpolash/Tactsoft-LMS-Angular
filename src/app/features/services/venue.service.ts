import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Venue } from '../models/venue.model';

const routePrefix = "/api/venue";

@Injectable({
  providedIn: 'root'
})
export class VenueService extends HttpService<Venue> {

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

  getVenueDetail<T>(venueId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${venueId}`).pipe(catchError(this.handleError));
  }

  addVenueDetail<T>(venue: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, venue).pipe(catchError(this.handleError));
  }

  updateVenueDetail<T>(venueId: number, venue  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${venueId}`, venue).pipe(catchError(this.handleError));
  }
}
