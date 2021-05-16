import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toasters: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if(evt.body && evt.body.success)
            this.toasters.success(evt.body.success.message, evt.body.success.title);
        }
      }),
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          try {
            let errorMessage: string;
            switch (err.status) {
              case 400:
                errorMessage = "Bad Request.";
                break;
              /*case 401:
                errorMessage = "You need to log in to do this action.";
                break;
              case 403:
                errorMessage = "You don't have permission to access the requested resource.";
                break;
              case 404:
                errorMessage = "The requested resource does not exist.";
                break;
              case 412:
                errorMessage = "Precondition Failed.";
                break;*/
              case 500:
                errorMessage = "Internal Server Error.";
                break;
              case 503:
                errorMessage = "The requested service is not available.";
                break;
              case 422:
                if (err.error.error.code == "ER_DUP_ENTRY") {
                  let msg = err.error.error.message.split('key ');
                  msg[1] = msg[1].replace('\'', '');
                  msg[1] = msg[1].replace('\'', '');
                  if (msg[1] == 'cpf') {
                    errorMessage = "CPF já cadastrado"
                  } else {
                    errorMessage = "E-mail já cadastrado"
                  }
                } else {
                  errorMessage = "Validation Error!";
                }
                break;
              default:
                errorMessage = "Something went wrong!";
            }
            if (errorMessage) {
              this.toasters.error(errorMessage);
            } else {
              this.toasters.error(err.error.message, err.error.title);
            }
          } catch(e) {
            this.toasters.error('An error occurred', '');
          }
          //log error
        }
        return of(err);
      }));
  }
}
