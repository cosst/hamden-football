# Hamden Football

An interface for viewing more in-depth analysis of my ESPN Fantasy Football league. Silly I know. This was primarily a project for me to get more comfortable with React and practice manipulating (and finding) data from ESPN's somewhat dormant FF API.

## See It Live

[https://hamden-football.herokuapp.com/](https://hamden-football.herokuapp.com/)

## Local Installation

1. Install [Node](https://nodejs.org/en/) if you don't already have it installed. Version 6+ required to run the app.
2. Install [yarn](https://yarnpkg.com/en/).
3. Navigate to the project root and install yarn dependencies with `yarn install`
4. For the client I used [Create React App](https://github.com/facebookincubator/create-react-app). While you don't need to install anything additional, this does mean that you need to also navigate to /client and run `yarn install` again there to add the client-specific dependencies.

## Other Configuration Notes

The app makes use of [espn-ff-api](https://www.npmjs.com/package/espn-ff-api), though it does so using a modified version located at /espn-ff-api. All usage of the package in this project refers to the 'local' /espn-ff-api folder.

The unique cookie values can be set from the espn.js file. LeagueId & SeasonId variables are also set there.

## Running The Development Server

To run the server, go to the project root and run:
```
yarn start
```

To run the client-side locally, go to /client and run:
```
yarn start
```

The app should open automatically in your browser.