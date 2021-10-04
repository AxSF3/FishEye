import PhotographerList from './photographerList.js';
import Header from './header.js';

export default class HomePage {

  static getData() {
    return fetch('data.json') /* Appeler l'API Fetch */
    .then(response => response.json()) /*  Convertir res en données JSON */
    .then(data => { /* Traiter les données JSON */
      HomePage.data;
      return data;
    })

  }
  
  

  static init() {
    const dataPromise = HomePage.getData();

    window.onload = () => {

      dataPromise.then(data => {
        const photographers = data.photographers;
        const header = document.querySelector('.header-index');
        const mainTitle = document.querySelector('.main-title');
        const sectionHomepage = document.querySelector('#section-homepage');
    
        const photographerList = new PhotographerList(sectionHomepage, photographers);
        const headerContent = new Header(header, photographerList);
        headerContent.createHeader();
        mainTitle.appendChild(document.createTextNode('Nos photographes'));
        photographerList.displayRelevantCards();
        sectionHomepage.setAttribute('tabindex', '5');
        sectionHomepage.setAttribute('aria-label', 'cartes des photographes');
      });
      
    };
  }
}

