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
      let mediaDom;
      const videoSrc = document.createElement('source');

      if (Object.prototype.hasOwnProperty.call(media, 'image')) {
        mediaDom = document.createElement('img');
        mediaDom.src = `resources/${media.photographerId}/Resized_images/${media.image}`;
      } else {
        mediaDom = document.createElement('video');
        mediaDom.setAttribute('controls', 'controls');

        mediaDom.appendChild(videoSrc);
        videoSrc.src = `resources/${media.photographerId}/Resized_images/${media.video}`;
      }

      if (parseInt(media.id, 10) === parseInt(this.currentMedia, 10)) {
        mediaDom.classList.add('active');
      }

      this.content.appendChild(mediaDom);
    });
  }

  close() {
    // Supprimer les événements tous les événements avec removeEventListener
    this.element.classList.remove('open');
    this.element.querySelector('#lightbox-next').removeEventListener('click', this.next);
    this.element.querySelector('#lightbox-previous').removeEventListener('click', this.previous);
    this.element.querySelector('#lightbox-close-btn').removeEventListener('click', this.close);

    document.querySelector('.lightbox-mask').style.display = 'none';
    document.querySelector('.media-video').setAttribute('controls', 'controls');
  }

  registerEvents() {
    this.element.querySelector('#lightbox-next').addEventListener('click', this.next);
    this.element.querySelector('#lightbox-previous').addEventListener('click', this.previous);
    this.element.querySelector('#lightbox-close-btn').addEventListener('click', this.close);
  }

  next() {
    let currentElement;
    currentElement = this.content.querySelector('.active');
    currentElement.classList.remove('active');

    if (currentElement.nextSibling === null) {
      currentElement = this.content.firstChild;
    } else {
      currentElement = currentElement.nextSibling;
    }
    currentElement.classList.add('active');
  }

  previous() {
    let currentElement = this.content.querySelector('.active');
    currentElement.classList.remove('active');
    if (currentElement.previousSibling === null) {
      currentElement = this.content.lastChild;
    } else {
      currentElement = currentElement.previousSibling;
    }
    currentElement.classList.add('active');
  }
}
