export default class MediaFactory {
  static createMedia(mediaData) {
    if (mediaData.hasOwnProperty('image')) return new Image(mediaData.image, mediaData.photographerId, mediaData.price, mediaData.likes, mediaData.id);
    else if (mediaData.hasOwnProperty('video')) return new Video(mediaData.video, mediaData.photographerId, mediaData.price, mediaData.likes, mediaData.id);
  }
}
  
export class Video {
  constructor(fileName, photographerId, price, likes, id) {
    this.fileName = fileName;
    this.photographerId = photographerId;
    this.price = price;
    this.likes = likes;
    this.titleContent = this.fileName.slice(0, this.fileName.length-4).replaceAll('_', ' ');
    this.id = id;
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
    const price = document.createElement('div');
    
    mediaVideo.classList.add('media-video');
    mediaVideo.setAttribute('tabindex', '0');
    mediaVideo.setAttribute('title', `${this.titleContent}`);
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
    price.classList.add('price');

    title.appendChild(document.createTextNode(`${this.titleContent}`));
    price.appendChild(document.createTextNode(`${this.price}€`));
    mediaVideoSrc.src = `ressources/${this.photographerId}/Resized_images/${this.fileName}`;
    heartNumber.innerHTML = this.likes;

    mediaVideo.appendChild(mediaVideoSrc);
    mediaCardInfo.appendChild(mediaCardInfoText);
    mediaCardInfoText.append(title, price);
    mediaCardInfoHeart.append(heartNumber,heart);
    mediaCardInfo.appendChild(mediaCardInfoHeart);

    cardVideo.append(mediaVideo, mediaCardInfo);

    cardVideo.dataset['mediaTitle'] = this.titleContent;

    return cardVideo;
  }


}

export class Image {
  constructor(fileName, photographerId, price, likes, id) {
    this.fileName = fileName;
    this.photographerId = photographerId;
    this.price = price;
    this.likes = likes;
    this.titleContent = this.fileName.slice(0, this.fileName.length-4).replaceAll('_', ' ');
    this.id = id;
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
    const price = document.createElement('div');

    mediaImage.setAttribute('tabindex', '0');
    mediaImage.setAttribute('alt', `${this.titleContent}`);

    mediaCardInfo.classList.add('media-card_info');
    mediaCardInfoText.classList.add('media-card_info__text');

    mediaCardInfoHeart.classList.add('media-card_info__heart');
    mediaCardInfoHeart.setAttribute('tabindex', '0');
    mediaCardInfoHeart.setAttribute('aria-label', `${this.likes} likes cliquez pour ajouter un like`);

    heartNumber.classList.add('heart-number');
    heart.classList.add('fas', 'fa-heart');
    heart.setAttribute('title', 'likes');

    title.classList.add('title');
    price.classList.add('price');

    title.appendChild(document.createTextNode(`${this.titleContent}`));
    price.appendChild(document.createTextNode(`${this.price}€`));

    mediaImage.src = `ressources/${this.photographerId}/Resized_images/${this.fileName}`;
    heartNumber.innerHTML = this.likes;

    mediaCardInfo.appendChild(mediaCardInfoText);
    mediaCardInfoText.append(title, price);
    mediaCardInfoHeart.append(heartNumber, heart);
    mediaCardInfo.appendChild(mediaCardInfoHeart);

    cardImage.append(mediaImage, mediaCardInfo);

    cardImage.dataset['mediaTitle'] = this.titleContent;

    return cardImage;
  }


}
