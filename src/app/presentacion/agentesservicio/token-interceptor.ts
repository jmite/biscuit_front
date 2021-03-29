import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from '../forms/utils/global.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor {

  constructor(public globalData: GlobalService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.globalData.usuario && this.globalData.usuario.tokenAccess) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' +this.globalData.usuario.tokenAccess
        }
      });
    }
    //return next.handle(request);

    return next.handle(request).pipe(
      //retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
         if (error instanceof HttpErrorResponse){
           switch(error.status){
            case 403:
               this.handle403Error(error, request, next);
            break;
            default:
              return next.handle(request);
           }
             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }
        //window.alert(errorMessage);
        //return throwError(errorMessage);
      }));
  }

  handle403Error(error, request: HttpRequest<any>, next: HttpHandler){
    this.router.navigate(['/403']);
    /*request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' +this.globalData.usuario.tokenAccess
      }
    });*/
    return next.handle(request);
  }

}
