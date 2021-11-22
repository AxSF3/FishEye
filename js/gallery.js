import MediaFactory from './mediaFactory.js';

export default class Gallery{
    constructor(photographer, listMedia, selector, lightbox) {
        this.photographer = photographer;
        this.listMedia = listMedia;
        this.selector = selector;
        this.lightbox = lightbox;
    }

    createGallery() {
        const gallery = document.createElement('div');
        gallery.classList.add('gallery');
        gallery.setAttribute('tabindex', '0');
        gallery.setAttribute('role', 'region');
        gallery.setAttribute('aria-label', 'galerie médias');
        this.selector.appendChild(gallery);
    }

    createMediaCard(mediaData) {
        const media = MediaFactory.createMedia(mediaData).createGalleryDom();
        media.classList.add('media-card');
        media.dataset['mediaId'] = mediaData.id;
        return media;
    }

    displayMediaGallery(mediaArray) {
        const gallery = document.querySelector('.gallery');
        const mediaGallery = document.createElement('div');
        const mediaCards = mediaArray.map(this.createMediaCard);
        mediaGallery.classList.add('media-gallery');
        console.log(mediaArray)

    
    
    
            
            // affichage du média lightbox qui correspond à la miniature sélectionnée dans la galerie





            
    

        
        // réinitialisation de la galerie
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
        
        gallery.appendChild(mediaGallery);
        mediaCards.forEach(mediaCard => {
            mediaGallery.appendChild(mediaCard);
        }); 

        mediaCards.forEach(mediaCard => {

            const mediaCardFirstChild = mediaCard.firstChild;
            const mediaCardId = mediaCard.getAttribute('data-media-id');
            const heartBlock = mediaCard.querySelector('.media-card_info__heart');
            const mediaHeartNumber = mediaCard.querySelector('.heart-number');
            const rating = document.querySelector('.rating');
            const lightboxMedias = document.querySelectorAll('.lightbox-media');


            this.addOrRemoveLike(mediaHeartNumber, heartBlock, rating);

            

            // ouverture de la lightbox affichant le média sur lequel on a cliqué
            lightboxMedias.forEach(lightboxMedia => {
            mediaCardFirstChild.addEventListener('click', () => {


            const medias = ['5234343', '623534343', '625025343', '23523434', '2523434634', '95234343', 
            '398847109', '65235234', '2525345343', '2534342'];



        console.log(mediaArray)
            

    

        lightboxMedia.parentNode.removeChild(lightboxMedia);
        
        lightboxMedia.parentNode.appendChild(mediaArray);
    

    



               
               
                
           
    
                    
/*
                    lightboxMedia.parentNode.removeChild(lightboxMedia);
                    
                    lightboxMedia.parentNode.appendChild(mediaArray);*/

            })

            });


            

        });
        
        return gallery;
        
    }

    // ajout/suppression de like
    addOrRemoveLike(likes, block, rating) {
        let likeNumber = Number(likes.innerHTML);

        block.addEventListener('click', () => {
            if (likeNumber === Number(likes.innerHTML)){
                likes.innerHTML = likeNumber + 1;
                rating.innerHTML ++;
                block.setAttribute('aria-label', 'like ajouté');
            } else {
                likes.innerHTML = likeNumber;
                rating.innerHTML --;
                block.setAttribute('aria-label', 'like retiré');
            }
        });

        block.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (likeNumber === Number(likes.innerHTML)){
                    likes.innerHTML = likeNumber + 1;
                    rating.innerHTML ++;
                    block.setAttribute('aria-label', 'like ajouté');
                } else {
                    likes.innerHTML = likeNumber;
                    rating.innerHTML --;
                    block.setAttribute('aria-label', 'like retiré');
                }
            }
        });
        return rating.innerHTML;
    }

    createBottomBox() {
        const mediasLikes = [];
        this.listMedia.forEach(media => {
            mediasLikes.push(media.likes);
        });
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const bottomBox = document.createElement('div');
        const ratingSection = document.createElement('div');
        const rating = document.createElement('div');
        const pricePerDay = document.createElement('div');
        const heart = document.createElement('i');

        bottomBox.classList.add('bottom-box');
        bottomBox.setAttribute('aria-label', 'popularité et prix');
        ratingSection.classList.add('rating-section');
        rating.classList.add('rating');
        pricePerDay.classList.add('price-per-day');
        heart.classList.add('heart','fas', 'fa-heart');
        heart.setAttribute('aria-label', 'likes');

        const totalLikes = mediasLikes.reduce(reducer);
        rating.innerHTML = totalLikes;
        pricePerDay.appendChild(document.createTextNode(`${this.photographer.price}€/jour`));

        ratingSection.append(rating, heart);
        bottomBox.append(ratingSection, pricePerDay);
        this.selector.appendChild(bottomBox);

        return bottomBox;
    }

    
}

/*
if(mediaArray.toString() === lightboxMedia.dataset['mediaId']){
    /*lightboxMedia.classList.add('active');
    console.log('bravo')
    }
*/