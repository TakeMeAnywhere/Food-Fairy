import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, Redirect} from 'react-router';
import BodyPage from './components/Body';
import RecipeList from './containers/RecipeList';
import SearchBox from './containers/SearchBox';
import SelectedRecipe from './pages/Recipes/SelectedRecipe';
import AdvancedSearch from './containers/AdvancedSearch';
import SignupPage from  './pages/auth/Signup';
import SigninPage from './pages/auth/Signin';
import SignoutPage from './pages/auth/Signout';
// import RequireAuth from './pages/auth/RequireAuth';
import SavedRecipesPage from './containers/SavedRecipes';


export default (
  <Route path="/" component={BodyPage}>
    <Route path="results" component={RecipeList} />
    <Route path="SelectedRecipe" component={SelectedRecipe} />
    <Route path="advanced" component={AdvancedSearch} />
    <Route path = "signup" component = {SignupPage} />
    <Route path = "signin" component = {SigninPage} />
    <Route path = "signout" component = {SignoutPage} />
    <Route path = "saved" component = {SavedRecipesPage} />
  </Route>
)