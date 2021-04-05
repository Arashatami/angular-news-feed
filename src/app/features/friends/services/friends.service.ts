import { Friend } from '../../../core/models/friend';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class FriendsService {

  private _friends$: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);

  public get Friends(): Observable<Friend[]> {
    return this._friends$.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {
    this.getAllFriends().subscribe();
  }

  public getAllFriends(): Observable<Friend[]> {
    return this.http.get(`${environment.mockServer}/friends`).pipe(map(res => {
      this._friends$.next(res as Friend[]);
      return res as Friend[];
    }));
  }
}
