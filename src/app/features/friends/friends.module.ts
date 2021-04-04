import { FreindsService } from './services/friends.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    FriendsListComponent,
    NewsFeedComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    FreindsService
  ]
})
export class FriendsModule { }
