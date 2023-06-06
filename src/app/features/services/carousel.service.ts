import { Injectable } from '@angular/core';
import { Carousel } from '../models/carousel.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

const routePrefix = "/api/carousel";

@Injectable({
  providedIn: 'root'
})

export class CarouselService extends HttpService<Carousel> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getCarouselDetail<T>(carouselId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${carouselId}`).pipe(catchError(this.handleError));
  }

  addCarouselDetail<T>(carousel: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, carousel).pipe(catchError(this.handleError));
  }

  updateCarouselDetail<T>(carouselId: number, carousel  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${carouselId}`, carousel).pipe(catchError(this.handleError));
  }

}
