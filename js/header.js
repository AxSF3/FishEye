export default class Header { // Créer une class "Header"
  constructor(selector, photographerList) { // Créer le constructor avec comme paramètre "selector" et "photographerList"
    this.selector = selector;
    this.photographerList = photographerList;
  }

  /* Créer une fonction pour créer le header en HTML */

  createHeader() {
    const headerElements = document.createElement('div');
    headerElements.classList.add('header-elements');

    const logoLink = document.createElement('a');
    logoLink.setAttribute('href', 'index.html');
    logoLink.setAttribute('aria-current', 'page');
    logoLink.classList.add('logo');

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', 'img/Logo_FishEye.png');
    logoImg.setAttribute('alt', 'Logo FishEye');

    const goToMain = document.createElement('a');
    goToMain.setAttribute('href', '#section-homepage');
    goToMain.classList.add('gotomain');
    goToMain.setAttribute('tabindex', '6');
    goToMain.appendChild(document.createTextNode('Passer au contenu'));

    const navbar = this.createNavbar();

    logoLink.appendChild(logoImg);
    headerElements.append(logoLink, goToMain, navbar);
    this.selector.appendChild(headerElements);
  }

  /* Créer la barre de navigation en HTML avec les tags */

  createNavbar() {
    const navbar = document.createElement('nav');
    navbar.setAttribute('role', 'nav');
    navbar.setAttribute('tabindex', '0');
    navbar.setAttribute('aria-label', 'navigation principale');
    const tagsName = ['portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'events'];

    tagsName.forEach((tagName) => {
      const tag = this.photographerList.createTag(navbar, tagName);
      tag.classList.add('navigation-item');
      tag.setAttribute('tabindex', '0');
      return tag;
    });
    return navbar;
  }
}
