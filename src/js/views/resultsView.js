import previewView from './previewView.js';
import View from './view.js';

class ResultsView extends View{
    _parentEl = document.querySelector('.results');
    _errorMsg = 'No recipes found for your query !'
    _msg = '';

    _generateMarkup(){
        return this._data
        .map(result=>previewView.render(result,false))
        .join('');
    }
}

export default new ResultsView();