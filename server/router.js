const controllers = require('./controllers');
const mid = require('./middleware');

//takes in mid and controllers folders
// calls each endpoint/function
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPosts', mid.requiresLogin, controllers.Post.getPosts);
  app.get('/getAllPosts', controllers.Post.getAllPosts);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Post.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Post.make);
  app.post('/passUpdate', mid.requiresLogin, controllers.Account.passUpdate);
  app.post('/deletePosts', mid.requiresLogin, controllers.Post.deleteAll);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
