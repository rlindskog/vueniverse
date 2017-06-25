Welcome to Vueniverse!
===================
<img height="300px" src="https://cdn.rawgit.com/rlindskog/vueniverse/master/template/src/client/assets/img/vueniverse_logo.svg"/>
Vueniverse is a full-stack JavaScript starter project. Some of the features that comes baked in include:

 - PWA by default, 100 lighthouse PWA score.
 - Universal es2015 JavaScript.  No more context switching between client/server code!
 - A REST API, and full user authentication.
 - Client Side routing, Server Side Rendering and Global State Management thanks to Vuejs and Nuxtjs!
 - Abstracted WebPack build process.
 - Universal HMR for a clean development process, thanks to Nuxtjs and BackPack.
 - Ready for deployment with [NOW](https://zeit.co/now)

[Live Demo](https://vueniverse-yctqddmeez.now.sh/) It might take a while to load if it's [asleep](https://zeit.co/docs/deployment-types/node#deployment-inactivity).

*You must have [vue-cli](https://github.com/vuejs/vue-cli)* installed.

    npm install -g vue-cli

**Create Project**

    vue init rlindskog/vueniverse {{ your-project-name }}
    cd {{ your-project-name }}
    npm install

**Run a development MongoDB database (in a seperate terminal window)**

    npm run dev-db

**Run in development**

    npm run dev

**Build for production**

    npm run build

**Run in production**

    npm run start

**Deploy with [NOW](https://zeit.co/now)**

    npm install -g now-cli

You will have to make a database else where, I recommend the [Atlas free teir](https://www.mongodb.com/cloud/atlas). When you do, paste the url to the DB_URL variable in secrets.json.  Also add a SECRET variable.

Then run...

    npm run deploy

If you have any problems, please don't hesitate to create an issue!

**FUTURE TODO**
 - vue-cli option to choose bewteen PostgreSQL and MongoDB (MongoDB currently implemented)
 - vue-cli option to choose bewteen AirBNB and Standard Linting Style.
 - vue-cli option to include tests.
 - Create an admin interface!
 - Create a few more NPM convenience commands, such as "create-super-user" and "create-module" (MVC module in the REST API + Admin interface page).
 
**Pull requests welcome!**
