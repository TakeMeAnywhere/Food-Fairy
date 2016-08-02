const helpers = require('./helpers');
const usersController = require('../users/usersController');
const passportHelpers = require('../passport/passport_strategies');
const passport = require('passport');

  //Pass this in to secure certain routes
    //jwt will automatically try to create a session...Stop it
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app, express) {

  // Route for fetching all Recipes
  app.get('/user/fetchAllRecipes', requireAuth, usersController.fetchAllRecipes);
  app.post('/user/saveRecipe', requireAuth, usersController.saveRecipe);
  app.delete('/user/removeRecipe/:id', requireAuth, usersController.removeRecipe);

  app.post('/api/saved', function(req, res){
    //should take in username
    console.log("Saved Recipes Request in Routes", req.body);
     usersController.getUserRecipes(req.body.id, function(recipes){
      //this should be an array of the user recipes as objects
      var allRecipes = [];
      recipes.forEach(function(recipe){
        //push the result of the request to the allRecipes
        allRecipes.push(helpers.searchSpoonacular(recipe.id))
      })
      res.send(response, allRecipes);
    });
  })

  //Routes for signin/signout
  app.post('/user/signup', usersController.signup);
  app.post('/user/signin', requireSignin, usersController.signin);

  //Route for API
  app.post('/api/recipes', function(req, res){
    // console.log("In routes, post req", req.body);
    helpers.searchSpoonacular({query: req.body.query, max : 10}, function(response){
      console.log("response", response);
      res.send(response);
    });
  })

  app.post('/api/getInstructions', function(req, res){
    helpers.searchInstructions(req.body.id, function(response){
      res.send(response);
    });
  })

  app.post('/api/getSummary', function(req, res){
    console.log("Routes heard getSummary, req.body: ", req.body);
    helpers.searchSummary(req.body.id, function(response){
      res.send(response);
    });
  })

  app.post('/api/advrecipes', function(req, res){
    console.log("Advanced Recipes Request in Routes", req.body);
    helpers.complexSearch({query: req.body.query, max : 10}, function(response){
      console.log("response", response);
      res.send(response);
    });
  })

}



// module.exports = function(app, express) {

//   app.post('/api/advrecipes', function(req, res){
//     console.log("Advanced Recipes Request in Routes", req.body);
//     helpers.complexSearch({query: req.body.query, max : 10}, function(response){
//       console.log("response", response);
//       res.send(response);
//     });
//   })
// }

  //   // retrieve all recipes from db
  // app.get('/api/recipes', recipesController.getAllRecipes);

  //   // add recipes to mongo database and retrieve all recipes
  // app.post('/api/recipes', recipesController.addRecipe);

  //   //remove recipe and send back all recipes
  // app.delete('/api/recipes/:recipe_id', recipesController.removeRecipe);


  /*
  * NONE OF THESE ARE BEING USED
  */

  // // get all searches from db
  // // currently not being used
  // app.get('/api/searches', function(req, res){
  //   Search.find({}).exec(function(err, recipes){
  //     if(err){
  //       res.send(err);
  //     } else {
  //       res.json(recipes);
  //     }
  //   });
  // });


  // // add search and send back all searches
  // // currently not being used
  // app.post('/api/searches', function(req, res){

  //   var inbound = req.body;
  //   console.log('got to post', inbound);

  //   var search = new Search({
  //     query: inbound.query
  //   });

  //   search.save(function(err, data){
  //     if(err){
  //       res.send(err);
  //     } else {
  //       Search.find(function(err, data) {
  //         if(err){
  //           res.send(err);
  //         } else {
  //           res.json(data);
  //         }
  //       });
  //     }
  //   });
  // });


  // // remove search and send back all search
  // // currently not being used
  // app.delete('/api/searches/:search', function(req, res){
  //   Search.remove({ _id : req.params.search_id }, function(err, search){
  //     if(err){
  //       res.send(err);
  //     } else {
  //       Search.find(function(err, searches){
  //         if(err){
  //           res.send(err);
  //         } else {
  //           res.json(searches);
  //         }
  //       });
  //     }
  //   });
  // });
