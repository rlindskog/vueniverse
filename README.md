Welcome to Vueniverse!
===================
<img height="300px" src="https://cdn.rawgit.com/rlindskog/vueniverse/master/template/src/client/assets/img/vueniverse_logo.svg"/>
Vueniverse is a full-stack JavaScript starter project. Some of the features that comes baked in include:

 - PWA by default, 100/100 lighthouse PWA score.
 - Universal es2015 JavaScript.  No more context switching between client/server code!
 - A REST API, and full user authentication with JWT, Redis blacklisting, and MongoDB.
 - Client Side routing, Server Side Rendering and Global State Management thanks to Vuejs and Nuxtjs!
 - Abstracted WebPack build process.
 - Universal HMR for a clean development process, thanks to Nuxtjs and BackPack.
 - Ready for deployment with [NOW](https://zeit.co/now)

[Live Demo](https://vueniverse.now.sh) It might take a while to load if it's [asleep](https://zeit.co/docs/deployment-types/node#deployment-inactivity).

*You must have [vue-cli](https://github.com/vuejs/vue-cli)* installed.

    npm install -g vue-cli

**Create Project**

    vue init rlindskog/vueniverse {{ your-project-name }}
    cd {{ your-project-name }}
    npm install

**Start a MongoDB database locally**

    npm run start-db

**Stop the MongoDB database locally**

    npm run stop-db

**Run in development**

    npm run dev

**Build for production**

    npm run build

**Run in production (runs the database and application in a subprocess)**

    npm run start
    
**Stop production running (stops the database and application)**

    npm run stop

**Start a Redis database locally (use this if chose the redis session option)**

[Install](https://redis.io/topics/quickstart)

    $ wget http://download.redis.io/redis-stable.tar.gz
    $ tar xvzf redis-stable.tar.gz
    $ cd redis-stable
    $ make
    $ # wait for it to install...
    $ sudo cp src/redis-server /usr/local/bin/
    $ sudo cp src/redis-cli /usr/local/bin/

Then run
    
    redis-server

**Deploy with [NOW](https://zeit.co/now)**

    npm install -g now-cli

You will have to make a database else where, I recommend the [Atlas free teir](https://www.mongodb.com/cloud/atlas). When you do, paste the url to the DB_URL and a random SECRET variable to the secrets.json file.

Also, if you decided to use the Redis option instead of in-memory (highly recommended), then you will have to create a Redis session store else where as well.  I recommend the [Redis Labs](https://redislabs.com/) free tier. Once you make your Redis session, add SESSION_HOST, SESSION_PORT, and SESSION_PASSWORD to the secrets.json file.

Then run...

    npm run deploy

If you have any problems, please don't hesitate to create an issue!

**FUTURE TODO**
 - Create an admin interface! (currently working on)
 - Create a few more NPM convenience commands, such as "create-admin-user" and "create-app" (which would create an MVC folder in the API, and add a page on the admin interface).
 - vue-cli option to choose between PostgreSQL and MongoDB (MongoDB currently implemented)
 - vue-cli option to choose between AirBNB and Standard Linting Style.
 - vue-cli option to include unit/e2e tests.

 
**Pull requests welcome!**
