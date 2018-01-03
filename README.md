NotesApp
========

A simple note taking application using: ES6, React, Redux and an HTTP RESTful API.

![notes list](http://imgur.com/qV0vrtw.png)

Getting Started
===============

Note: Requires ```mongodb``` server to be running on port ```:27017```, we also require ```npm``` or ```yarn```

1. Clone repo and go into folder
2. ```yarn install```
3. Fire up both ```yarn start-api```(server) and ```yarn start```(client) 
4. Add some notes

Features
========

- Create Note
- Update Note
- Delete Note
- Fetch Notes


Tech Used
=========

Client: 
- React (create-react-app)
- Redux (react-redux)
- React router (react-router-dom)
- moment (dates)
- isomorphic-fetch (fetch API)
- Bulma CSS Framework
- Webpack


Server:
- ExpressJS
- Mongoose (Object modeling)
- MongoDB
- Babel Node
- Morgan (logging)

Todo
====

- Use Jest for tests
- Host
