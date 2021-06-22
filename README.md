
# GET-A Web Application [Client]
Get-A is a web application for helps students finding the tutors
**This is a client side of GET-A Web Application Project.**
## Website Features
-  **For Visitor**
	- Show the ranking of tutor and online course
	- Show Detail of offline course and online course
	- Show the search result of tutor and course from search keywords
-  **For learner (Student)**
	- Enroll the offline course
	- Buy the coin for using in this web
	- Buy the clip of online course
	- Follow interested tutors
-  **For tutor**
	- Show statistic data for online course and offline course.
	- Manage offline course and online course
-  **For admin**
	- Manage coin system [promotion and rate exchange]
	- Manage identity verification of tutor
## Prerequisite
- Firebase
- Longdo Map

## System Requirement
- OS: Windows 7-10/Mac OSX/Linux
- Node.js: 14.17.0 or 15.14.0
## Setup
- clone project
```
git clone https://github.com/orbitalno11/get-a-client.git
```
- install require dependencies
```
npm ci
```
- setup environment by create `.env` file in `root` of project fill this information
```
REACT_APP_DEFAULT_API_VERSION=
REACT_APP_API_URL=
REACT_APP_MAP_URL=
REACT_APP_LONGDO_MAP_KEY=

REACT_APP_GOOGLE_API_KEY=
REACT_APP_GOOGLE_AUTH_DOMAIN=
REACT_APP_GOOGLE_PROJECT_ID=
REACT_APP_GOOGLE_STORAGE_BUCKET=
REACT_APP_GOOGLE_MESSAGING_SENDER_ID=
REACT_APP_GOOGLE_APP_ID=
REACT_APP_GOOGLE_MEASUREMENT_ID=
```
## Starting server
- starting server `npm start`
## License
This project is a part of CSS491 Project Proposal and CSS492 Project Study of Applied Computer Science, Department of Mathematics, KMUTT
