### Running the project

On first run, run `npm install`, and run [Python installation and setup](#python-installation-and-setup)  
Open a terminal and run `npm start` to run the frontend  
Open another terminal and run `npm run start-python` to run the backend

### Python installation and setup

1. Download and install anaconda
2. Create the virtual environment in Backend/venv by running `python -m venv venv`. Run this at the Backend folder.
3. Activate the environment with `venv\Scripts\activate`
4. The dependencies required are in setup.py &rarr; install_requires. To install the dependencies, run `pip install -e .`. Note the dot at the end
5. Run the backend with `npm run start-python`

For point 4, if you get "pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available", ensure that your environment variables path have the following:

-   C:\Users\Public\Anaconda3\Scripts
-   C:\Users\Public\Anaconda3
-   C:\Users\Public\Anaconda3\Library\bin

### Register the app to spotify

Follow https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app, whitelist the redirectUri in Home.js, replace clientId with your clientId

### Register the app to Facebook

Go here https://developers.facebook.com/apps to create a Facebook application, and get your app id. Insert it into Home.js, look for `<your fb app id here>`.

### Things to note

1. Ensure that the project resides in a place that does not have spaces in the path. The project will not run if there are spaces.
