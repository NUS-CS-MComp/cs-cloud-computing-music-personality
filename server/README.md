# Flask Backend for SpotLight

> Please refer to README in [top page](https://github.com/terryluzj/cs-spotlight-personality-in-music/) for project setup related to the backend application.

## Available endpoints

> For dispatching details, visit folder `api/routes` for more information.

### `/social`

For social media content related endpoints, supplemented with OAuth handling endpoints:

-   `GET /social/facebook/post` Facebook user posts
-   `POST /social/reddit/oauth` Reddit OAuth handler for access token retrieval
-   `POST /social/twitter/oauth` Twitter OAuth handler for oauth token generation
-   `POST /social/twitter/oauth/verify` Twitter OAuth verifier for oauth token retrieval

### `/spotify`

For Spotify resource related endpoints:

-   `GET /spotify/audio-features` Audio features of song track
-   `GET /spotify/category` Category list of songs
-   `GET /spotify/recent` Recent listening history of user
-   `GET /spotify/recent/audio-features` Aggregated audio features of recent played tracks of user
