# README #

This README documents what steps are necessary to get your application up and running.

### First Steps ###

First, check in your command terminal if you have node and git installed
```
#!bash

node --version
git --version
```
If installed, you will see an output of the version of each software. Otherwise you will get an error.
    
### Install required software ###

* [Node.js v6.4.0](https://nodejs.org/en/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Meteor](https://www.meteor.com/install)
* If you prefer managing git with a GUI [SourceTree](https://www.sourcetreeapp.com/)

### Download the repository ###

#### With SourceTree ####

1. In Bitbucket click on `Clone`
2. Click `Clone in SourceTree`

#### Via command line ####

1. In Bitbucket click on `Clone`
2. Click on `SSH`
2. Select `HTTPS`
1. Copy the url
1. Switch to Terminal
1. `cd` to where you would like to place your project
1. type `git clone ` and paste

### Start the project ###

1. In Terminal `cd` to be inside the project directory `cd path/to/discuvr`
1. Type `meteor npm install`
1. You're good to go.
1. To get the server running locally, simply type `meteor` and you can access the server on `localhost:3000`
1. To run it on your connected Android phone, instead of the previous step, type `meteor run android-device` (make sure you have developer options enabled on your phone)

Please add to the readme if you see any holes, and give me a buzz if you have any problems.