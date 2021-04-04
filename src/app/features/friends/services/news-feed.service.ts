import { NewsFeed } from './../../../core/models/news-feed';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsFeedService {

  private _newsFeed$: BehaviorSubject<NewsFeed[]> = new BehaviorSubject<NewsFeed[]>([]);

  public get Friends(): Observable<NewsFeed[]> {
    return this._newsFeed$.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {
    this.getAllNewsFeeds().subscribe();
  }

  public getAllNewsFeeds(): Observable<NewsFeed[]> {
    return this.http.get(`${environment.mockServer}/news-feed`).pipe(map(res => {
      this._newsFeed$.next(res as NewsFeed[]);
      return res as NewsFeed[];
    }));
  }
  public getNewsFeed(userId: number): Observable<NewsFeed[]> {
    return this.http.get(`${environment.mockServer}/news-feed/?userId=${userId}`).pipe(map(res => {
      this._newsFeed$.next(res as NewsFeed[]);
      return res as NewsFeed[];
    }));
  }

}
