Welcome to Vueniverse!
===================
<img height="300px" src="https://cdn.rawgit.com/rlindskog/vueniverse/master/template/src/client/assets/img/vueniverse_logo.svg"/>
Vueniverse is a full-stack JavaScript starter project. Some of the features that comes baked in include:

 - Universal es2015 JavaScript.  No more context switch between client/server code!
 - A REST API, and full user authentication
 - Client Side routing, Server Side Rendering, Global State Management thanks to Vuejs and Nuxtjs!
 - Abstracted WebPack build process.
 - Universal HMR for a clean development process, thanks to Nuxtjs and BackPack.

*You must have [vue-cli](https://github.com/vuejs/vue-cli)* installed.

    npm install -g vue-cli

**Create Project**

    vue init rlindskog/vueniverse {{ your-project-name }}
    cd {{ your-project-name }}
    npm install

**Create and run a MongoDB database (in a seperate terminal window)**

    mkdir ./db
    npm run dev-db

**Run in development**

    npm run dev

**Build for production**

    npm run build

**Run in production**

    npm run start
