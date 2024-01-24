import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class AuthServiceMock {

    constructor() { }

    public get loggedInUserValue() {

        let loggedInUserSubject = new BehaviorSubject<any>(JSON.parse('testUser'));

        return loggedInUserSubject.value;
    }

}