import { NewsFeedService } from './services/news-feed.service';
import { FreindsService } from './services/friends.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

const Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    FriendsListComponent,
    NewsFeedComponent
  ],
  imports: [
    RouterModule.forChild(Routes),
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    FreindsService,
    NewsFeedService
  ]
})
export class FriendsModule { }
