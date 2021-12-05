export default class Lightbox {
    constructor(medias, currentMedia) {
        
      this.element = document.getElementById('lightbox');
      this.content = document.getElementById('lightbox-content');
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.close = this.close.bind(this);
      this.medias = medias;
      this.currentMedia = currentMedia;
      this.createMedias();
      this.element.classList.add('open');
      this.registerEvents();
      
    }




/*

createMedias() {
     
    this.content.innerHTML = '';
      
    this.medias.forEach((media) => {
        
        console.log(media)

        
        let mediaDom;
        let videoTag; 

        if(media.hasOwnProperty('image')) { 
          
          mediaDom = document.createElement('img') 
          mediaDom.src = media.image;
          mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.image}`;
      
        }
        else {
        videoTag = document.createElement('video');
        mediaDom = document.createElement('source') 
        videoTag.appendChild(mediaDom);
        mediaDom.src = media.video;
        mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.video}`;
        

      }






      
        if (parseInt( media.id) === parseInt( this.currentMedia)) {
            
          mediaDom.classList.add('active');
          
         
          
        }
        this.content.appendChild(mediaDom);
        console.log(mediaDom)
        console.log(videoTag)
        console.log(this.currentMedia)
        
      });
    }

*/


createMedias() {

  this.content.innerHTML = '';

  this.medias.forEach((media) => {

    let mediaDom;
    let videoSrc = document.createElement('source');

    if (media.hasOwnProperty('image')) {
      mediaDom = document.createElement('img');
      mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.image}`;
    }
    else {
      mediaDom = document.createElement('video');
      mediaDom.setAttribute("controls","controls")
      
      mediaDom.appendChild(videoSrc);
      videoSrc.src = `resources/${media.photographerId}/Resized_images/${media.video}`;
      
    }

    if (parseInt(media.id) === parseInt(this.currentMedia)) {
      mediaDom.classList.add('active');
      videoSrc.classList.add('active');
    }

    this.content.appendChild(mediaDom);
    console.log(mediaDom)
  });
}

    
    close() {
      //Supprimer les événements tous les événements avec removeEventListener
      this.element.classList.remove('open');
      this.element.querySelector('#lightbox-next').removeEventListener('click', this.next);
      this.element.querySelector('#lightbox-previous').removeEventListener('click', this.previous);
      this.element.querySelector('#lightbox-close-btn').removeEventListener('click', this.close);
      console.log('juste ici')
    }
    
    registerEvents() {
      this.element.querySelector('#lightbox-next').addEventListener('click', this.next);
      this.element.querySelector('#lightbox-previous').addEventListener('click', this.previous);
      this.element.querySelector('#lightbox-close-btn').addEventListener('click', this.close);
    }
    /*
    next() {
      console.log('ici')


      let currentElement = this.content.querySelector('img.active');
      currentElement.classList.remove('active');
      
      if (currentElement.nextSibling === null) {
        currentElement = this.content.querySelector('img:first-child');
        console.log(currentElement)
      } else {
        currentElement = currentElement.nextSibling;
        console.log(currentElement)
      }
      currentElement.classList.add('active');
      console.log(currentElement)

      console.log(this.content)
     
    }
*/





    next() {
      console.log('ici')

      let currentElement;
      currentElement = this.content.querySelector('lightbox-content active');
      currentElement.classList.remove('active');
      
      if (currentElement.nextSibling === null) {
        currentElement = this.content.querySelector('lightbox-content');
        console.log(currentElement)
      } else {
        currentElement = currentElement.nextSibling;
        console.log(currentElement)
      }
      currentElement.classList.add('active');


      console.log(currentElement)

      console.log(this.content)
     
    }






    
    previous() {
      let currentElement = this.content.querySelector('lightbox-content active');
      currentElement.classList.remove('active');
      if (currentElement.previousSibling === null) {
        currentElement = this.content.querySelector('lightbox-content');
      } else {
        currentElement = currentElement.previousSibling;
      }
      currentElement.classList.add('active');
    }
  }
 
