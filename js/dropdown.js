export default class Dropdown {
  constructor(listMedia, selector, gallery) {
    this.listMedia = listMedia;
    this.selector = selector;
    this.gallery = gallery;
  }

  createDropdownMenu() {
    const mediaSelection = document.createElement('div');
    const orderBy = document.createElement('label');
    const dropdown = document.createElement('div');
    const dropdownToggle = document.createElement('button');
    const arrow = document.createElement('div');
    const dropdownMenu = document.createElement('ul');
    const listItemPopularity = document.createElement('li');
    const optionPopularity = document.createElement('button');
    const listItemDate = document.createElement('li');
    const optionDate = document.createElement('button');
    const listItemTitle = document.createElement('li');
    const optionTitle = document.createElement('button');
    const options = [optionPopularity, optionDate, optionTitle];

    mediaSelection.classList.add('media-selection');
    orderBy.classList.add('orderby');
    orderBy.setAttribute('id', 'orderby');

    dropdown.classList.add('dropdown');
    dropdown.setAttribute('aria-labelledby', 'orderby');

    dropdownToggle.classList.add('dropdown-toggle');
    dropdownToggle.setAttribute('aria-haspopup', 'listbox');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.setAttribute('role', 'button');
    dropdownToggle.setAttribute('alt', 'Menu déroulant');

    arrow.classList.add('arrow');
    arrow.setAttribute('aria-label', 'flèche vers le bas menu fermé');

    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.setAttribute('role', 'listbox');

    optionPopularity.classList.add('option', 'option-popularity');
    optionPopularity.setAttribute('id', 'popularity');
    optionPopularity.setAttribute('aria-label', 'trier par popularité');
    optionDate.classList.add('option', 'option-date');
    optionDate.setAttribute('id', 'date');
    optionDate.setAttribute('aria-label', 'trier par date');
    optionTitle.classList.add('option', 'option-title');
    optionTitle.setAttribute('id', 'title');
    optionTitle.setAttribute('aria-label', 'trier par titre');

    orderBy.appendChild(document.createTextNode('Trier par'));
    optionPopularity.appendChild(document.createTextNode('Popularité'));
    optionDate.appendChild(document.createTextNode('Date'));
    optionTitle.appendChild(document.createTextNode('Titre'));

    listItemPopularity.appendChild(optionPopularity);
    listItemDate.appendChild(optionDate);
    listItemTitle.appendChild(optionTitle);
    dropdownMenu.append(listItemPopularity, listItemDate, listItemTitle);
    dropdown.append(dropdownToggle, arrow, dropdownMenu);
    mediaSelection.append(orderBy, dropdown);
    this.selector.appendChild(mediaSelection);

    dropdownToggle.textContent = 'Popularité';

    // au survol du dropdown, les options apparaissent
    dropdown.addEventListener('mouseover', () => {
      this.openDropdownMenu();
      arrow.setAttribute('aria-label', 'flèche vers le haut menu ouvert');
    });

    // quand le curseur sort du dropdown, les options disparaissent
    dropdown.addEventListener('mouseout', () => {
      if (arrow.classList.contains('active')) {
        this.closeDropdownMenu();
        arrow.setAttribute('title', 'flèche vers le bas menu fermé');
      }
    });

    // navigation clavier
    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !(arrow.classList.contains('active'))) {
        this.openDropdownMenu();
        arrow.setAttribute('title', 'flèche vers le haut menu ouvert');
      } else if (event.key === 'Escape') {
        this.closeDropdownMenu();
        arrow.setAttribute('title', 'flèche vers le bas menu fermé');
      }
    });

    // au clic sur une option, son contenu apparaît dans le toggle et elle disparaît de la liste
    // les autres apparaissent
    // la galerie est triée en fonction du contenu du toggle
    options.forEach((option) => {
      option.addEventListener('click', () => {
        this.selectOption(options, option);
        this.closeDropdownMenu();
        arrow.setAttribute('title', 'flèche vers le bas menu fermé');
      });
    });
  }

  selectOption(options, option) {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const optionId = option.getAttribute('id');
    dropdownToggle.setAttribute('aria-activedescendant', `${optionId}`);
    dropdownToggle.textContent = option.textContent;
    const toggleContentAfterSelection = dropdownToggle.textContent;
    // options qui ne correspondent pas à celle du toggle sont affichées
    options.forEach((otherOptions) => otherOptions.style.display = 'block');
    // option qui correspond au toggle disparaît
    option.style.display = 'none';
    return this.sortGallery(toggleContentAfterSelection);
  }

  // galerie triée par défaut en fonction de la popularité
  initializeDropdownMenu() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const toggleContent = dropdownToggle.textContent;
    const sortedRelevantMediasPopularity = this.sortRelevantMedias(toggleContent, this.listMedia);
    this.gallery.displayMediaGallery(sortedRelevantMediasPopularity);
  }

  openDropdownMenu() {
    const optionPopularity = document.querySelector('.option-popularity');
    const optionDate = document.querySelector('.option-date');
    const optionTitle = document.querySelector('.option-title');
    const menuDropDown = document.querySelector('.dropdown-menu');
    const arrow = document.querySelector('.arrow');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const options = [optionPopularity, optionDate, optionTitle];

    dropdownToggle.setAttribute('aria-expanded', 'true');
    arrow.classList.add('active');

    menuDropDown.style.display = 'none';
    menuDropDown.style.display = 'block';

    options.forEach((option) => {
      // l'option correspondant au toggle n'apparaît pas
      if (dropdownToggle.textContent === option.textContent) {
        option.style.display = 'none';
      }
    });
  }

  closeDropdownMenu() {
    const arrow = document.querySelector('.arrow');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const menuDropDown = document.querySelector('.dropdown-menu');

    dropdownToggle.setAttribute('aria-expanded', 'false');
    arrow.classList.remove('active');
    menuDropDown.style.display = 'none';
  }

  // fonction de tri de la galerie en fonction de l'option choisie
  sortGallery(sortCategory) {
    const sortedRelevantMedias = this.sortRelevantMedias(sortCategory, this.listMedia);

    this.gallery.displayMediaGallery(sortedRelevantMedias);

    const heroTags = document.querySelectorAll('.tag');
    heroTags.forEach((otherHeroTags) => otherHeroTags.classList.remove('active'));
  }

  // fonction de tri des médias
  sortRelevantMedias(dropdownContent, relevantMediasArray) {
    if (dropdownContent === 'Popularité') {
      return relevantMediasArray.sort((a, b) => b.likes - a.likes);
    } if (dropdownContent === 'Date') {
      return relevantMediasArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    } if (dropdownContent === 'Titre') {
      return relevantMediasArray.sort((a, b) => {
        const titreA = a.image || a.video;
        const titreB = b.image || b.video;
        if (titreA < titreB) {
          return -1;
        }
        if (titreA > titreB) {
          return 1;
        }
        return 0;
      });
    }
    return dropdownContent;
  }
}
