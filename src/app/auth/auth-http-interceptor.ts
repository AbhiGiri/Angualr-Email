import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true
    })

    return next.handle(modifiedReq)
      .pipe(
        filter(val => val.type === HttpEventType.Sent),
        tap(val => {
          console.log(val);

          // if(val.type === HttpEventType.Sent) {
          //   console.log("Request is sent to server");
          // }

          // if(val.type === HttpEventType.Response) {
          //   console.log("Got a response from api", val);
          // }

        })
      );
  }
}
