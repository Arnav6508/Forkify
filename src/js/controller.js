import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import {MODAL_CLOSE_SEC} from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot) module.hot.accept();

const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1);

    if(!id) return;

    recipeView.renderSpinner();

    //update results view to mark selected serach results
    // resultsView.render(model.getSearchResultsPage());
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    
    //loading recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state;

    //rendering recipe
    recipeView.render(model.state.recipe);

  }catch(err){
    recipeView.renderError(err);
  }
}
// showRecipe();

const controlSearchResults = async function(){
  try{  
    resultsView.renderSpinner();

    // get search query
    const query  =searchView.getQuery();

    if(!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render result
    resultsView.render(model.getSearchResultsPage());

    //render intial pagination buttons
    paginationView.render(model.state.search);

  }catch(err){
    console.error(err);
  }
}

const controlPagination = function(pageNum){
  // render result
  resultsView.render(model.getSearchResultsPage(pageNum));

  //render intial pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //update recipe servings
  model.updateServings(newServings);

  //update recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmarks = function(){

  // add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  // console.log(model.state.bookmarks);
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{
    //show spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //render bookmarks
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null,'',`#${model.state.recipe.id}`) //1 state 2 title 3 url
    // window.history.back();

    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    },1000*MODAL_CLOSE_SEC);

  }catch(err){
    console.error(err);
    addRecipeView.renderError(err);
  }
  
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.addHandlerRender(controlBookmarks);
}
init();

