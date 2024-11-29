import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private apiKey: string = '8dc95f1a9526424bb2a223711241811';

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (req.url.includes('weatherapi.com')) {
      const clonedReq: HttpRequest<T> = req.clone({
        url: `${req.url}&key=${this.apiKey}`
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
