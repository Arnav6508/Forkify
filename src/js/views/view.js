import icons from 'url:../../img/icons.svg'; //for static asstes

export default class View{
    _data;

    /**
     * Render the received element to the DOM
     * @param {Object | Object[]} data The data to be rendered
     * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
     * @returns {undefined | string} A markuo is returned of render is false
     * @this {Object} View instance
     * @author Arnav Gupta
     * @todo Finish implementation
     * 
     */

    render(data,render=true){
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);

    }

    update(data){
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup);
      // queryselectorAll returns a node list
      const newElements = Array.from(newDOM.querySelectorAll('*')); 
      const currElements = Array.from(this._parentEl.querySelectorAll('*'));

      newElements.forEach((newEl,i)=>{
        const currEl = currElements[i];

        //change text
        if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim()!==''){
          currEl.textContent = newEl.textContent;
        }

        //change attribute
        if(!newEl.isEqualNode(currEl)){
          Array.from(newEl.attributes).forEach(attr=> currEl.setAttribute(attr.name,attr.value));
        }

      })

    }

    _clear(){
        this._parentEl.innerHTML = '';
    }

    renderSpinner(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
        
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }

    renderError(message = this._errorMsg){

      const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }

    renderMessage(message = this._msg){

      const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

      this._clear();
      this._parentEl.insertAdjacentHTML('afterbegin',markup);
    }
}