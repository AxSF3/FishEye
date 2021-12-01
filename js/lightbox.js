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






createMedias() {
     
    this.content.innerHTML = '';
      
    this.medias.forEach((media) => {
        
        console.log(media)
       
        const mediaDom = document.createElement('img');
        

        
        mediaDom.src = media.image;
        mediaDom.src = media.video;
        mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.image}`;
        /*mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.video}`;*/
      
        if (parseInt( media.id) === parseInt( this.currentMedia)) {
            
          mediaDom.classList.add('active');
         
          
        }
        this.content.appendChild(mediaDom);
        console.log(mediaDom)
        console.log(this.currentMedia)
        
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
    
    previous() {
      let currentElement = this.content.querySelector('img.active');
      currentElement.classList.remove('active');
      if (currentElement.previousSibling === null) {
        currentElement = this.content.querySelector('img:last-child');
      } else {
        currentElement = currentElement.previousSibling;
      }
      currentElement.classList.add('active');
    }
  }
 
