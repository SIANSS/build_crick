
module.exports = function(app, passport) {
  var getUrl = window.location;
  var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  console.log(baseUrl);

    app.get(baseUrl + '/', function(req, res) {
      res.render('index.ejs', {
        user : req.user
      });
    });

    app.get(baseUrl + '/signup', function(req, res) {
      res.render('register.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
    }));

    app.get(baseUrl + '/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage')});
    });
    //
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));
    //
    app.get(baseUrl + '/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('loginMessage')});
    });
    //
    app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/connect/local',
      failureFlash : true
    }));
    //
    app.get(baseUrl + '/unlink/local', function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/');
      });
    });

  };

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
    return next();

    res.redirect('/');
  }
