import { Component, OnInit } from '@angular/core';
import { NewsFeed } from 'src/app/core/models/news-feed';
import { NewsFeedService } from '../../services/news-feed.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  newsFeeds: NewsFeed[] = [];
  subscription;

  constructor(
    private _newsFeedService: NewsFeedService
  ) {
    this.subscription = this._newsFeedService.NewsFeed.subscribe(res => {
      this.newsFeeds = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
