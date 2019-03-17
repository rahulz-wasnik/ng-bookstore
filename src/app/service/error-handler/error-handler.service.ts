import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    handleError(error: HttpErrorResponse): Observable<any> {
        if(error.error instanceof ErrorEvent) {
            console.error('An error has occured:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${JSON.stringify(error.error)}`);
            
        }
        return throwError(error);
    }
}