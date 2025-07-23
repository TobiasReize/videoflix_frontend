import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const http = inject(HttpClient);
    const router = inject(Router);
    const cloned = req.clone({ withCredentials: true });
    const isRefreshRequest = req.url.includes('/token/refresh/');

    return next(cloned).pipe(
        catchError(error => {
            if (error.status === 401 && !isRefreshRequest) {
                return http.post(environment.config.REFRESH_URL, {}, { withCredentials: true }).pipe(
                    switchMap(() => next(cloned)),
                    catchError(err => {
                        router.navigateByUrl('login?credentials=false');
                        return throwError(() => err);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};
