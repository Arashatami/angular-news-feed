# NewsFeed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Mock Server

It's a simple mock server with ability for authentication. [JSON Server](https://github.com/typicode/json-server) and [JSON Server Auth](https://github.com/jeremyben/json-server-auth) are used for creating this mock server.

### Resources

- `/friends`: CRUD for friends entities publicly available. Users with authentication can access them.
- `/login` and `/register`: Authentication endpoints
- `/users`: View and edit profile endpoints
- `/favorite-news-feed`: CRUD for favorite NewsFeed entities, in which each entity has a user as owner
- `/news-feed`: CRUD for NewsFeed entities

### Run Mock Server

- Install packages

  ```bash
  npm install
  ```

- Start the server

  ```bash
  npm run server
  ```

login with :
username: arash@example.com
password: 123456
