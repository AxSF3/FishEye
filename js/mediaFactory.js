export default class MediaFactory {
  static createMedia(mediaData) {
   
    if (mediaData.hasOwnProperty('image')) return new Image(mediaData.image, mediaData.photographerId, mediaData.likes, mediaData.id, mediaData.desc);
    else if (mediaData.hasOwnProperty('video')) return new Video(mediaData.video, mediaData.photographerId, mediaData.likes, mediaData.id, mediaData.desc);
    else {
      console.log(mediaData);
    }
  }

}

export class Video {
  constructor(fileName, photographerId, likes, id, desc) {
    this.fileName = fileName;
    this.photographerId = photographerId;
    this.likes = likes;
    this.titleContent = this.fileName.slice(0, this.fileName.length-4).replaceAll('_', ' ');
    this.id = id;
    this.desc = desc;

  }

  // Création élément DOM média de la galerie
  createGalleryDom() {
    const cardVideo = document.createElement('figure');
    const mediaVideo = document.createElement('video');
    const mediaVideoSrc = document.createElement('source');
    const mediaCardInfo = document.createElement('figcaption');
    const mediaCardInfoText = document.createElement('div');
    const mediaCardInfoHeart = document.createElement('div');
    const heartNumber = document.createElement('div');
    const heart = document.createElement('i');
    const title = document.createElement('div');
    
    mediaVideo.classList.add('media-video');
    mediaVideo.setAttribute('tabindex', '0');
    mediaVideo.setAttribute('title', `${this.desc}`);
    mediaVideo.setAttribute('controls', 'controls');
    mediaVideo.setAttribute('muted', 'muted');

    mediaCardInfo.classList.add('media-card_info');
    mediaCardInfoText.classList.add('media-card_info__text');

    mediaCardInfoHeart.classList.add('media-card_info__heart');
    mediaCardInfoHeart.setAttribute('tabindex', '0');
    mediaCardInfoHeart.setAttribute('aria-label', `${this.likes} likes cliquez pour ajouter un like`);

    heartNumber.classList.add('heart-number');
    heart.classList.add('fas', 'fa-heart');
    heart.setAttribute('title', 'likes');

    title.classList.add('title');
    title.appendChild(document.createTextNode(`${this.titleContent}`));
    mediaVideoSrc.src = `resources/${this.photographerId}/Resized_images/${this.fileName}`;
    heartNumber.innerHTML = this.likes;

    mediaVideo.appendChild(mediaVideoSrc);
    mediaCardInfo.appendChild(mediaCardInfoText);
    mediaCardInfoText.append(title);
    mediaCardInfoHeart.append(heartNumber,heart);
    mediaCardInfo.appendChild(mediaCardInfoHeart);

    cardVideo.append(mediaVideo, mediaCardInfo);

    cardVideo.dataset['mediaTitle'] = this.titleContent;

    return cardVideo;
  }



}



export class Image {
  constructor(fileName, photographerId, likes, id, desc) {
  
    this.fileName = fileName;
    this.photographerId = photographerId;
    this.likes = likes;
    this.titleContent = this.fileName.slice(0, this.fileName.length-4).replaceAll('_', ' ');
    this.id = id;
    this.desc = desc;
    
  }

  // Création élément DOM média de la galerie
  createGalleryDom() {
    const cardImage = document.createElement('figure');
    const mediaImage = document.createElement('img');
    const mediaCardInfo = document.createElement('figcaption');
    const mediaCardInfoText = document.createElement('div');
    const mediaCardInfoHeart = document.createElement('div');
    const heartNumber = document.createElement('div');
    const heart = document.createElement('i');
    const title = document.createElement('div');

    mediaImage.setAttribute('tabindex', '0');
    mediaImage.setAttribute('alt', `${this.desc}`);

    mediaCardInfo.classList.add('media-card_info');
    mediaCardInfoText.classList.add('media-card_info__text');

    mediaCardInfoHeart.classList.add('media-card_info__heart');
    mediaCardInfoHeart.setAttribute('tabindex', '0');
    mediaCardInfoHeart.setAttribute('aria-label', `${this.likes} likes cliquez pour ajouter un like`);

    heartNumber.classList.add('heart-number');
    heart.classList.add('fas', 'fa-heart');
    heart.setAttribute('title', 'likes');

    title.classList.add('title');
    title.appendChild(document.createTextNode(`${this.titleContent}`));

    mediaImage.src = `resources/${this.photographerId}/Resized_images/${this.fileName}`;
    heartNumber.innerHTML = this.likes;

    mediaCardInfo.appendChild(mediaCardInfoText);
    mediaCardInfoText.append(title/*, price*/);
    mediaCardInfoHeart.append(heartNumber, heart);
    mediaCardInfo.appendChild(mediaCardInfoHeart);

    cardImage.append(mediaImage, mediaCardInfo);

    cardImage.dataset['mediaTitle'] = this.titleContent;

    return cardImage;
  }


}
