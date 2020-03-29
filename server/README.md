# Flask Backend for SpotLight

> Please refer to README in [top page](https://github.com/terryluzj/cs-spotlight-personality-in-music/) for project setup related to the backend application.

## Available endpoints

> For dispatching details, visit folder `api/routes` for more information.

### `/oauth`

-   `POST /oauth/{provider_name}` Generic OAuth handler endpoint for access token retrieval
-   `POST /oauth/twitter/init` Twitter OAuth handler for oauth token generation
-   `POST /oauth/twitter/verify` Twitter OAuth verifier for oauth token retrieval

### `/social`

For social media content related endpoints, supplemented with OAuth handling endpoints:

-   `GET /social/{provider_name}/posts` Fetch user posts from a provider platform

### `/spotify`

For Spotify resource related endpoints:

-   `GET /spotify/audio-features` Audio features of song track
-   `GET /spotify/category` Category list of songs
-   `GET /spotify/recent` Recent listening history of user
-   `GET /spotify/recent/audio-features` Aggregated audio features of recent played tracks of user

### `/user`

For user information related endpoints:

-   `POST /user/authenticate` Authenticate user by session cookies
-   `GET /user/profile/{provider_name}` Retrieve user information from OAuth provider
