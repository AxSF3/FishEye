import { ELEMENTHTML} from "./constant.js";


export const showAllTags = () => {
  ELEMENTHTML.worker.forEach((item) => (item.style.display = "initial")); /* FONCTION POUR AFFICHER LES TAGS */
};

