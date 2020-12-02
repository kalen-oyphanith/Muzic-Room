const controllers = require('./controllers');
const mid = require('./middleware');

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
  app.post('/deletePost', mid.requiresLogin, controllers.Post.deletePost);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
