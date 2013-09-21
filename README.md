Angular Application Template
========================

This project contains client and server subprojects.

## Installation

* Install node.js (0.10 or later should work)
* Install grunt-cli

    npm install -g grunt-cli

### Application server

App server is used to serve client code and static files.

    cd server
    npm install

### Client project

Client project providers frontend application for the end-users.

    cd client
    npm install

## Building

Build the client project

    cd client
    grunt build

## Running

Start the server

    cd server
    node app.js

## Development

Continuous building is useful for developing client project. Grunt monitors for project files and automatically builds project on file changes.

    cd client
    grunt watch:build

By default `watch:build` does not run JSHint tool. To enable it use `all` parameter.

    cd client
    grunt watch:all

## Code Analysis

Project contains JSHint tool which is can be used to analyse Javascript code. It reports any errors if code does not comply with the coding rules.

    grunt jshint
