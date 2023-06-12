import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ClassRoom } from '../models/class-room.model';

const routePrefix = "/api/classRoom";

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService extends HttpService<ClassRoom> {

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

  getClassRoomDetail<T>(classRoomId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${classRoomId}`).pipe(catchError(this.handleError));
  }

  addClassRoomDetail<T>(classRoom: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, classRoom).pipe(catchError(this.handleError));
  }

  updateClassRoomDetail<T>(classRoomId: number, classRoom  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${classRoomId}`, classRoom).pipe(catchError(this.handleError));
  }
}
