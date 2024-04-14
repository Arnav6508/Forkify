import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentEl = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentEl.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup(){
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        //page 1 and there are other pages
        if(this._data.page===1 && numPages>1){
            return this._nextButton(2);
        }

        //page 1 and there are other pages
        if(this._data.page===1){
            return '';
        }

        //last page
        if(this._data.page===numPages && numPages>1){
            return this._prevButton(numPages-1);
        }

        //other page
        if(this._data.page<numPages){
            const s1 =this._prevButton(this._data.page-1);
            const s2 =this._nextButton(this._data.page+1);
            const s=s1+s2;
            return s;
        }
    }

    _prevButton(pageNum){
        return `
            <button data-goto="${pageNum}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${pageNum}</span>
            </button>
            `;
    }

    _nextButton(pageNum){
        return `
            <button data-goto="${pageNum}" class="btn--inline pagination__btn--next">
                <span>Page ${pageNum}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
    }

}

export default new PaginationView();