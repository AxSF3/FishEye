import { ELEMENTHTML } from "./constant.js";
import { showAllTags } from "./function.js";

fetch("./data.json") /* Appeler l'API Fetch */
  .then((res) => res.json()) /*  Convertir res en données JSON */
  .then((data) => { /* Traiter les données JSON */

    
    const photographers = data.photographers; /* Stocker les données JSON dans une constante */
    


    /* item = data.phototographer , key = index du tableau */

    /* Afficher la description du profil */

    ELEMENTHTML.namePhotographer.forEach((item, key) => {
      item.textContent = photographers[key].name;
    });
    ELEMENTHTML.country.forEach((item, key) => {
      item.textContent = photographers[key].city + ", " + photographers[key].country;
    });
    ELEMENTHTML.slogan.forEach((item, key) => {
      item.textContent = photographers[key].tagline;
    });
    ELEMENTHTML.namePhotographer.forEach((item, key) => {
      item.textContent = photographers[key].name;
    });
    ELEMENTHTML.price.forEach((item, key) => {
      item.textContent = photographers[key].price + "€/jour";
    });

    const array = [];

    photographers.map((item) => array.push(item.tags)); /* Créer un nouveau tableau et ajouter les tags de chaque photographes */
    const arrayTags = array.flat(); /* Créer un nouveau tableau avec les éléments séparés en stockant dans une const */


    for (const val in arrayTags) {
      ELEMENTHTML.tags[val].textContent = `#${arrayTags[val]}`; /* Afficher les tags sous les profils */
    }

    /* FAIRE APPARAITRE LE PROFIL EN FONCTION DU TAG CHOISI PAR L'UTILISATEUR
       FAIRE APPAITRE ELEMENT ALL ET LE RENDRE FONCTIONNEL */
    
    ELEMENTHTML.tagNavigation.forEach((el) =>
      el.addEventListener("click", () => {
        const element = el.innerHTML.substring(1).toLowerCase(); /* PERMET DE RETOURNER LES TAGS AVEC SUBSTRING EN MINISCULE POUR APRES FAIRE UNE BOUCLE */
        for (let index in array) {
          
          ELEMENTHTML.worker[index].style.display = "initial"; /* FAIRE APPARAITRE LES PROFILS */
          ELEMENTHTML.allTags.classList.remove("hiddenElement") /* FAIRE APPARAITRE ELEMENT ALL */
          ELEMENTHTML.allTags.addEventListener("click", showAllTags) /* RENDRE FONCTIONNEL ELEMENT ALL */
          !array[index].includes(element) ? ELEMENTHTML.worker[index].style.display = "none" : ""; /* LES PHOTOGRAPHES DISPARAISSENT EN FONCTION DU TAG CLIQUÉ */
          
        }
      })
    );
    
    
    /* MÊME SYSTEME QUE PLUS HAUT MAIS POUR LES TAGS DE DESCRIPTION DE PROFIL */

    ELEMENTHTML.photographertag.forEach((el) =>
      el.addEventListener("click", () => {
        const element = el.innerHTML.substring(1).toLowerCase();
        for (let index in array) {

          ELEMENTHTML.worker[index].style.display = "initial";
          !array[index].includes(element) ? ELEMENTHTML.worker[index].style.display = "none" : "";
        
        }
      })
    );






    });

    














