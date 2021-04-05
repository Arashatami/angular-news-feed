import { NewsFeed } from './../../../../core/models/news-feed';
import { Component, Input, OnInit } from '@angular/core';
import { NewsFeedService } from '../../services/news-feed.service';

@Component({
  selector: 'app-news-feed-item',
  templateUrl: './news-feed-item.component.html',
  styleUrls: ['./news-feed-item.component.scss']
})
export class NewsFeedItemComponent implements OnInit {

  _newsFeed: NewsFeed = {} as NewsFeed;
  favNewsFeeds: number[] = [];
  subscription;
  get newsFeed(): NewsFeed {
    return this._newsFeed;
  }

  @Input() set newsFeed(nf: NewsFeed) {
    this._newsFeed = nf;
  }

  constructor(
    private _newsFeedService: NewsFeedService
  ) {
    this.subscription = this._newsFeedService.FavoriteNewsFeed.subscribe(res => {
      this.favNewsFeeds = res;
    });
  }

  ngOnInit(): void {
  }

  isFavorite(id: number) {
    for (let element of this.favNewsFeeds) {
      if (element == id) {
        return true
      }
    }
    return false;
  }

  delete(newsFeed: NewsFeed) {
    this._newsFeedService.deleteFavoriteNewsFeed(newsFeed);
  }
  add(newsFeed: NewsFeed) {
    this._newsFeedService.addFavoriteNewsFeed(newsFeed);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
