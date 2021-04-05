import { NewsFeedService } from './services/news-feed.service';
import { FriendsService } from './services/friends.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MenuService } from './services/menu.service';
import { NewsFeedItemComponent } from './components/news-feed-item/news-feed-item.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from 'src/app/core/interceptor/http-request-interceptor.service';
import { HttpResponseInterceptor } from 'src/app/core/interceptor/http-response-interceptor.service';

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
    NewsFeedComponent,
    NewsFeedItemComponent
  ],
  imports: [
    RouterModule.forChild(Routes),
    CommonModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    FriendsService,
    NewsFeedService,
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    }
  ]
})
export class FriendsModule { }
