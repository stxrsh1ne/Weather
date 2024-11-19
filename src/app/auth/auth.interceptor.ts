import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: req.url.concat('&appid=a46177408fc7fee00cf7abe9b1093cea')
    });
    return next.handle(newReq);
  }
}
