import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ClientMessage } from '../models/client-message.model';

const routePrefix = "/api/clientMessage";

@Injectable({
  providedIn: 'root'
})
export class ClientMessageService extends HttpService<ClientMessage> {

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

  getClientMessageDetail<T>(clientMessageId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${clientMessageId}`).pipe(catchError(this.handleError));
  }

  addClientMessageDetail<T>(clientMessage: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, clientMessage).pipe(catchError(this.handleError));
  }

  updateClientMessageDetail<T>(clientMessageId: number, clientMessage  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${clientMessageId}`, clientMessage).pipe(catchError(this.handleError));
  }
}
