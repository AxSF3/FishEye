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
        /*const lightbox = new Lightbox();*/
        
        const gallery = new Gallery(relevantPhotographer, relevantMediasDefault, photographerPageMain/*, lightbox*/);
        const hero = new Hero(relevantPhotographer, photographerPageMain, form, relevantMediasDefault, gallery);
        const dropdownMenu = new Dropdown(relevantMediasDefault, photographerPageMain, gallery/*, lightbox*/);
        
  

       



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
    
        dropdownMenu.createDropdownMenu();
        gallery.createGallery();
        gallery.createBottomBox();
        dropdownMenu.initializeDropdownMenu();
        
        console.log(document.querySelector('.media-card'));
        

/*
        document.querySelectorAll('.media-card').forEach((media)  => {

          media.addEventListener('load', () => {

            console.log('test')
  
           
  
            new Lightbox(
              [
                {
                  id: 5234343,
                  url: "resources/243/Resized_images/Animals_Wild_Horses_in_the_mountains.mp4"
                  
                },
                {
                  id: 623534343,
                  url: "resources/243/Resized_images/Travel_Lonesome.jpg"
                },
                {
                  id: 625025343,
                  url: "resources/243/Resized_images/Travel_HillsideColor.jpg"
                },
                {
                  id: 23523434,
                  url: "resources/243/Resized_images/Event_BenevidesWedding.jpg"
                },
                {
                  id: 2523434634,
                  url: "resources/243/Resized_images/Portrait_Nora.jpg"
                },
                {
                  id: 95234343,
                  url: "resources/243/Resized_images/Animals_Rainbow.jpg"
                },
                {
                  id: 398847109,
                  url: "resources/243/Resized_images/Portrait_Background.jpg"
                },
                {
                  id: 65235234,
                  url: "resources/243/Resized_images/Event_PintoWedding.jpg"
                },
                {
                  id: 2525345343,
                  url: "resources/243/Resized_images/Portrait_Wednesday.jpg"
                },
                {
                  id: 2534342,
                  url: "resources/243/Resized_images/Event_SeasideWedding.jpg"
                }
              ], 
              5234343,
              623534343,
              625025343,
              23523434,
              2523434634,
              95234343,
              398847109,
              65235234,
              2525345343,
              2534342

            )
            })
        })*/
        
        

      });
      
    };
  }  

}