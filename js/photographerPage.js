import Form from './form.js';
import Lightbox from './lightbox.js';
import Gallery from './gallery.js';
import Hero from './hero.js';
import Dropdown from './dropdown.js';

export default class PhotographerPage {
 
  static getData(){
    return fetch('data.json')
    .then(response => response.json())
    .then(data => {
      PhotographerPage.addMediaDescription(data);
      return data;
    })

  }

  static addMediaDescription(data){
    const medias = data.media;
    medias.forEach(media => {
      media.description = 'description';
    });
    return data;
  }

  static init(){
    const dataPromise = PhotographerPage.getData();

    window.onload = () => {

      dataPromise.then(data => {
        const photographers = data.photographers;
        const medias = data.media;
        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get('id');
    
        // Récupère données du photographe pertinent
        const relevantPhotographer = photographers.find(photographer => {
          const photographerIdString = photographer.id.toString();
          return photographerIdString === paramId;
        });
    
        // Récupère médias pertinents
        function getRelevantMedias(urlId) {
          const relevantMedias = medias.filter(media => media.photographerId.toString() === urlId);
          return relevantMedias;
        }
        const relevantMediasDefault = getRelevantMedias(paramId);
    
        // Elément DOM main
        const photographerPageMain = document.querySelector('.photographer-page_main');
        const modals = document.querySelector('.modals');

        const form = new Form (relevantPhotographer, modals, photographerPageMain);
        const lightbox = new Lightbox(modals, photographerPageMain);
        const gallery = new Gallery(relevantPhotographer, relevantMediasDefault, photographerPageMain, lightbox);
        const hero = new Hero(relevantPhotographer, photographerPageMain, form, relevantMediasDefault, gallery);
        const dropdownMenu = new Dropdown(relevantMediasDefault, photographerPageMain, gallery, lightbox);
        
        // Récupère éléments nécessaire pour dropdown + tags
        /*
        const tagElement = document.getElementsByClassName('tag');
        
        const activeElement = document.getElementsByClassName('active');

        const optionsElement = dropdownMenu.createDropdownMenu;

        const test = lightbox.openLightbox;
        const test1 = hero.getRelevantMedias;




        console.log(tagElement);
        console.log(activeElement);
        console.log(optionsElement);

        */

      

        hero.createDomHero();
        form.createForm();
        lightbox.createLightbox();
        dropdownMenu.createDropdownMenu();
        gallery.createGallery();
        gallery.createBottomBox();
        dropdownMenu.initializeDropdownMenu();

        
/*
        const gallerySection = document.querySelector('.gallery');
        
        gallerySection.setAttribute('tabindex', '3');
        gallerySection.setAttribute('role', 'tab');*/
      });
      
    };
  }  

}