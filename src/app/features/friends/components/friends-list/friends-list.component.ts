import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/core/models/friend';
import { FriendsService } from '../../services/friends.service';
import { NewsFeedService } from '../../services/news-feed.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  friends: Friend[] = [];
  selectedFriend: Friend;
  subscription;
  constructor(
    private _friendService: FriendsService,
    private _newsFeedService: NewsFeedService
  ) {
    this.subscription = this._friendService.Friends.subscribe(res => {
      this.friends = res;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selecteFriend(friend: Friend) {
    this.selectedFriend = friend;
    this._newsFeedService.selectedFriend = friend;
  }

}
