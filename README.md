### Running the project

On first run, run `npm install`  
Open a terminal and run `npm run dev` to run both the frontend and backend together

### Register the app to spotify

Follow https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app, whitelist the redirectUri in Home.js, replace clientId with your clientId

### Register the app to Facebook

Go here https://developers.facebook.com/apps to create a Facebook application, and get your app id. Insert it into Home.js, look for `<your fb app id here>`.

### Things to note

1. Ensure that the project resides in a place that does not have spaces in the path. The project will not run if there are spaces.
