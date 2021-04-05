import { NewsFeed } from './../../../core/models/news-feed';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Friend } from 'src/app/core/models/friend';

@Injectable()
export class NewsFeedService {

  private _selectedFriend: Friend = {} as Friend;
  private _newsFeed$: BehaviorSubject<NewsFeed[]> = new BehaviorSubject<NewsFeed[]>([]);
  private _favNewsFeed$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.getAllNewsFeeds().subscribe();
    this.getAllFavoriteNewsFeed().subscribe();
  }

  public get NewsFeed(): Observable<NewsFeed[]> {
    return this._newsFeed$.asObservable();
  }

  public get FavoriteNewsFeed(): Observable<number[]> {
    return this._favNewsFeed$.asObservable();
  }

  public set selectedFriend(friend: Friend) {
    this._selectedFriend = friend;
    this.getNewsFeed(friend.id).subscribe(() => { });
    this.getFavoriteNewsFeed(friend.id).subscribe(() => { });
  }
  public get selectedFriend(): Friend {
    return this._selectedFriend;
  }



  public getAllNewsFeeds(): Observable<NewsFeed[]> {
    return this.http.get(`${environment.mockServer}/news-feed`).pipe(map(res => {
      this._newsFeed$.next(res as NewsFeed[]);
      return res as NewsFeed[];
    }));
  }
  private getNewsFeed(userId: number): Observable<NewsFeed[]> {
    return this.http.get(`${environment.mockServer}/news-feed/?userId=${userId}`).pipe(map(res => {
      this._newsFeed$.next(res as NewsFeed[]);
      return res as NewsFeed[];
    }));
  }

  public getFavoriteNewsFeed(userId: number): Observable<number[]> {
    return this.http.get(`${environment.mockServer}/favorite-news-feed/?userId=${userId}`).pipe(map(res => {
      const IDs: number[] = (res as NewsFeed[]).map(item => {
        return item.id;
      });
      this._favNewsFeed$.next(IDs);
      return IDs;
    }));
  }
  private getAllFavoriteNewsFeed(): Observable<number[]> {
    return this.http.get(`${environment.mockServer}/favorite-news-feed`).pipe(map(res => {
      const IDs: number[] = (res as NewsFeed[]).map(item => {
        return item.id;
      });
      this._favNewsFeed$.next(IDs);
      return IDs;
    }));
  }

  public addFavoriteNewsFeed(newsFeed: NewsFeed) {
    return this.http.post(`${environment.mockServer}/favorite-news-feed`, newsFeed).subscribe(res => {
      if (this._selectedFriend.id) {
        this.getFavoriteNewsFeed(this._selectedFriend.id).subscribe(() => { });
      }
      else {
        this.getAllFavoriteNewsFeed().subscribe(() => { });
      }
    })
  }

  public deleteFavoriteNewsFeed(newsFeed: NewsFeed) {
    return this.http.delete(`${environment.mockServer}/favorite-news-feed/${newsFeed.id}`).subscribe(res => {
      if (this._selectedFriend.id) {
        this.getFavoriteNewsFeed(this._selectedFriend.id).subscribe(() => { });
      }
      else {
        this.getAllFavoriteNewsFeed().subscribe(() => { });
      }
    })
  }



}
