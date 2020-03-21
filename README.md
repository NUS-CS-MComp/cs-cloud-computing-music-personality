# SpotLight: Shed Light on your Personality with Spotify

> Picture this: You are in a social gathering with an unfamiliar stranger, and you do not really how to continue the conversation. The background music changes to a cheery song, ”Happy” to liven the atmosphere. You may find yourself nodding and smiling to the rhythm, and the stranger smilingly comments: ”Nice song right, what kind of artists or songs are you into”. The conversation can then pick up from there, as you both start to find similar interests together.

Interestingly, in a fast-changing world, the appreciation of music still remains a very relevant theme across diﬀerent generations. Researchers have concluded that an individ-ual’s taste in music is in fact related to his or her own personality and attitudes.1 This exciting insight motivated our group to embark on this project, where we want to make use of a person’s Spotify music feed to shed light on his or her personality; therefore, SpotLight!

## Getting Started

### Running the project

On first run, run `npm install`, and run [Python installation and setup](#python-installation-and-setup)
Open a terminal and run `npm start` to run the frontend
Open another terminal and run `npm run start-python` to run the backend

### Python installation and setup

1. Download and install anaconda, or just install Python 3
2. The dependencies required are in setup.py &rarr; install_requires. To install the dependencies, run `pip install -e .`. Note the dot at the end
3. Run the backend with `npm run start-python`
4. (If using VSCode) Add the Python extension (ms-python.python) for linting. If you have multiple Python versions installed, open the command palette and search for `Python select interpreter`. Select the one used to run this project.
5. (If using VSCode) Add the Python-autopep8 extension (himanoa.python-autopep8) for formatting. You might want to enable format on save on your editor

(Optional)

1. Download and install anaconda, or just install Python 3
2. Create the virtual environment in Backend/venv by running `python -m venv venv`. Run this at the Backend folder.
3. Activate the environment with `venv\Scripts\activate`
4. The dependencies required are in setup.py &rarr; install_requires. To install the dependencies, run `pip install -e .`. Note the dot at the end
5. Run the backend with `npm run start-python`

Note:

-   Might need to install pylint globally

For point 4, if you get "pip is configured with locations that require TLS/SSL, however the ssl module in Python is not available", ensure that your environment variables path have the following:

-   C:\Users\Public\Anaconda3\Scripts
-   C:\Users\Public\Anaconda3
-   C:\Users\Public\Anaconda3\Library\bin

### Register the app to spotify

Follow https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app, whitelist the redirectUri in Home.js, replace `spotifyClientId` with your clientId

### Register the app to Facebook

Go here https://developers.facebook.com/apps to create a Facebook application, and get your app id. Insert it into Home.js, look for `facebookAppId`.

### Things to note

1. Ensure that the project resides in a place that does not have spaces in the path. The project will not run if there are spaces.
