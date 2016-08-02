const jwt = require('jwt-simple');
const config = require('../config/app_key');
const User = require('./usersModel');
const Recipe = require('../recipes/recipesModel');
/*
  # Takes in a user
  @sub => subject
  @iat => issued_at
  # Ouputs a JWT token
*/
function userToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

/*
  # At this point, user has already been authenticated before
    # Just need to give them a token
*/
exports.signin = function(req, res, next) {
  res.send({ token: userToken(req.user) });
}

exports.getUserRecipes = function (req, res) {
  var username = req.username;
  User.findOne({username: username}, function (err, user){
    if (err) { return next(err); }
    if (user) {
      res.send(200, user.recipes);
    }
  })
}

/*
  # Takes in a user
  @sub => subject
  @iat => issued_at
  # Ouputs a JWT token
*/
exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    //422 => unprocessable data
    return res.status(422).send({ error: 'You must provide username and password'});
  }

  User.findOne({username: username}, function(err, existingUser) {
    if (err) { return next(err); }
    if (existingUser) {
        //422 => unprocessable data
      return res.status(422).send({error: 'Username is already in use'});
    }
    const user = new User({
      username: username,
      password: password
    });
      //save if no error and username not taken
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({token: userToken(user)});
    })
  })
}

exports.fetchAllRecipes = function(req, res, next) {
  const username = req.body.username;
  User.findOne({username: username})
  .populate('recipes')
  .exec(function(err, user) {
    if (err) { return next(err); }
    res.send(user);
  })

}

exports.saveRecipe = function(req, res, next) {
  const username = req.body.username;
  User.findOne({username: username}, function(err, user) {
    if (err) { return next(err); }
      Recipe.create({
        title: req.body.title,
        image: req.body.image,
        likes: req.body.likes,
        summary: req.body.summary,
        steps: req.body.steps,
        missedIngredients: req.body.missedIngredients,
        usedIngredients: req.body.usedIngredients
      }, function(err, created) {
        if (err) { return next(err); }
        user.recipes.push(created);
        user.save();
    })
    res.send('Successfully saved Recipe');
  })
}

exports.removeRecipe = function(req, res, next) {
  Recipe.findByIdAndRemove(req.params.id, function(err) {
    if (err) { return next(err); }
    res.send('Recipe Deleted');
  })
}
