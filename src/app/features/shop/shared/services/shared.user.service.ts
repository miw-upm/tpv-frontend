import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@core/end-points';
import {User} from "@core/models/user.model";

@Injectable({providedIn: 'root'})
export class SharedUserService {
    private static readonly MOBILE = '/mobile';

    constructor(private readonly httpService: HttpService) {
    }

    findByMobile(mobile: string): Observable<User> {
        return this.httpService
            .get(EndPoints.USERS + SharedUserService.MOBILE +'/'+mobile);
    }

}
