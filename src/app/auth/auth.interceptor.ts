import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private apiKey: string = '8dc95f1a9526424bb2a223711241811';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('weatherapi.com')) {
      const clonedReq = req.clone({
        url: `${req.url}&key=${this.apiKey}`
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
