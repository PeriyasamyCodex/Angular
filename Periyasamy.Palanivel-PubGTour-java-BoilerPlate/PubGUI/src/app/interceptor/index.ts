import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from '../interceptor/Jwt.interceptor';


export const httpInterceptorProviders = [

    {provide:HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}
]
