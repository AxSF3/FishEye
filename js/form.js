export default class Form {
  constructor(photographerName, selector, app) {
    this.photographerName = photographerName;
    this.selector = selector;
    this.app = app;
  }

  createForm() {
    const formWindow = document.createElement('div');
    const formContent = document.createElement('div');
    const formMask = document.createElement('div');
    const close = document.createElement('span');
    const formBody = document.createElement('div');
    const formTitle = document.createElement('h1');
    const recipientName = document.createElement('div');
    const form = document.createElement('form');

    const firstName = document.createElement('div');
    const firstNameLabel = document.createElement('label');
    const firstNameInput = document.createElement('input');
    const firstNameError = document.createElement('div');

    const lastName = document.createElement('div');
    const lastNameLabel = document.createElement('label');
    const lastNameInput = document.createElement('input');
    const lastNameError = document.createElement('div');

    const email = document.createElement('div');
    const emailLabel = document.createElement('label');
    const emailInput = document.createElement('input');
    const emailError = document.createElement('div');

    const message = document.createElement('div');
    const messageLabel = document.createElement('label');
    const messageInput = document.createElement('textarea');
    const messageError = document.createElement('div');

    const submitBtn = document.createElement('button');
    const confirmationMsg = document.createElement('div');

    formWindow.classList.add('form-window');
    formWindow.setAttribute('role', 'dialog');
    formWindow.setAttribute('aria-hidden', 'true');
    formWindow.setAttribute('aria-modal', 'false');
    formWindow.setAttribute('aria-labelledby', 'modal-heading');

    formContent.classList.add('form-content');
    formContent.setAttribute('tabindex', '0');

    formMask.classList.add('form-mask');

    close.classList.add('close');
    close.setAttribute('aria-label', 'icône croix fermer modale');
    close.setAttribute('alt', 'icône croix fermer modale');
    close.setAttribute('tabindex', '0');
    close.setAttribute('role', 'button');

    formBody.classList.add('form-body');

    formTitle.classList.add('form-title');
    formTitle.setAttribute('id', 'modal-heading');
    formTitle.innerHTML = 'Contactez-moi <br>';

    recipientName.classList.add('recipient-name');
    recipientName.appendChild(document.createTextNode(`${this.photographerName.name}`));

    form.setAttribute('class', 'contact');
    form.setAttribute('name', 'contact');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');
    form.setAttribute('onsubmit', 'return validate()');
    form.setAttribute('novalidate', 'novalidate');

    const formData = [firstName, lastName, email, message];
    formData.forEach((element) => element.classList.add('formData'));
    firstName.classList.add('first-name');
    lastName.classList.add('last-name');
    email.classList.add('email');
    message.classList.add('message');

    firstNameLabel.setAttribute('for', 'first');
    lastNameLabel.setAttribute('for', 'last');
    emailLabel.setAttribute('for', 'email');
    messageLabel.setAttribute('for', 'message');

    firstNameLabel.appendChild(document.createTextNode('Prénom'));
    lastNameLabel.appendChild(document.createTextNode('Nom'));
    emailLabel.appendChild(document.createTextNode('E-mail'));
    messageLabel.appendChild(document.createTextNode('Message'));

    const allInputs = [firstNameInput, lastNameInput, emailInput, messageInput];
    allInputs.forEach((input) => input.classList.add('text-control'));

    firstNameInput.setAttribute('type', 'text');
    firstNameInput.setAttribute('name', 'first');
    firstNameInput.setAttribute('minlength', '2');
    firstNameInput.setAttribute('aria-required', 'true');
    firstNameInput.setAttribute('aria-label', 'Entrer votre prénom');

    lastNameInput.setAttribute('type', 'text');
    lastNameInput.setAttribute('name', 'last');
    lastNameInput.setAttribute('minlength', '2');
    lastNameInput.setAttribute('aria-required', 'true');
    lastNameInput.setAttribute('aria-label', 'Entrer votre nom');

    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('aria-required', 'true');
    emailInput.setAttribute('aria-label', 'Entrer votre mail');

    messageInput.classList.add('textcontrolmessage');
    messageInput.setAttribute('type', 'text');
    messageInput.setAttribute('name', 'message');
    messageInput.setAttribute('aria-required', 'true');
    messageInput.setAttribute('aria-label', 'Entrer votre message');

    firstNameError.setAttribute('id', 'firstnameerror');
    lastNameError.setAttribute('id', 'lastnameerror');
    emailError.setAttribute('id', 'emailerror');
    messageError.setAttribute('id', 'messageerror');

    const errors = [firstNameError, lastNameError, emailError, messageError];
    errors.forEach((error) => error.classList.add('error'));

    firstNameError.appendChild(document.createTextNode('Veuillez entrer votre prénom de 2 caractères minimum'));
    lastNameError.appendChild(document.createTextNode('Veuillez entrer votre nom de 2 caractères minimum'));
    emailError.appendChild(document.createTextNode('Veuillez renseigner une adresse mail valide'));
    messageError.appendChild(document.createTextNode('Votre message doit faire minimum 20 caractères'));

    submitBtn.classList.add('btn-submit', 'button');
    submitBtn.setAttribute('aria-label', 'Envoyer');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Envoyer');
    submitBtn.appendChild(document.createTextNode('Envoyer'));

    confirmationMsg.classList.add('confirmationmsg');
    confirmationMsg.setAttribute('tabindex', '0');
    confirmationMsg.setAttribute('aria-label', `Message envoyé à ${this.photographerName.name}`);
    confirmationMsg.innerHTML = `Merci !<br> Votre message a été envoyé <br> à ${this.photographerName.name}.`;

    formWindow.append(formContent, formMask);
    formContent.append(close, formBody, confirmationMsg);
    formBody.append(formTitle, form, submitBtn);
    formTitle.appendChild(recipientName);
    form.append(firstName, lastName, email, message);
    firstName.append(firstNameLabel, firstNameInput, firstNameError);
    lastName.append(lastNameLabel, lastNameInput, lastNameError);
    email.append(emailLabel, emailInput, emailError);
    message.append(messageLabel, messageInput, messageError);

    this.selector.appendChild(formWindow);

    // événements

    // vérification du formulaire
    // à la soumission du formulaire
    form.addEventListener('submit', (event) => {
      this.validate(event);
    });

    // au clic sur bouton de soumission
    submitBtn.addEventListener('click', (event) => {
      this.validate(event);
    });

    // à chaque pression sur touche Entrée quand input sélectionné
    allInputs.forEach((input) => {
      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.validate(event);
        }
      });
    });

    confirmationMsg.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.closeForm();
      }
    });
  }

  launchForm() {
    const formWindow = document.querySelector('.form-window');
    const formMask = document.querySelector('.form-mask');
    const close = document.querySelector('.close');

    formWindow.style.display = 'flex';
    formWindow.removeAttribute('aria-hidden');
    formWindow.setAttribute('aria-modal', 'true');

    this.app.setAttribute('aria-hidden', 'true');

    const first = document.querySelector('input[name=first]');
    first.focus();

    // événements fermeture modale
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeForm();
      }
    });

    close.addEventListener('click', this.closeForm);
    close.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.closeForm();
      }
    });

    formMask.addEventListener('click', () => {
      this.closeForm();
    });
  }

  closeForm() {
    const formWindow = document.querySelector('.form-window');
    const contactButton = document.querySelector('.btn-contact');
    formWindow.style.display = 'none';
    formWindow.setAttribute('aria-hidden', 'true');
    contactButton.focus();
  }

  validate(e) {
    e.preventDefault();
    const form = document.querySelector('.contact');
    const confirmationMsg = document.querySelector('.confirmationmsg');
    const submitBtn = document.querySelector('.btn-submit');

    const first = document.querySelector('input[name=first]');
    const last = document.querySelector('input[name=last]');
    const email = document.querySelector('input[name=email]');
    const message = document.querySelector('textarea[name=message]');
    const firstError = document.getElementById('firstnameerror');
    const lastError = document.getElementById('lastnameerror');
    const emailError = document.getElementById('emailerror');
    const messageError = document.getElementById('messageerror');
    const errors = [firstError, lastError, emailError, messageError];

    // regex pour validation des champs input
    const verifName = /^([A-z0-9[\]\-'"/])*[^\s]\1*$/;
    // const verifName = /^[a-z ,.'-]+$/i;
    const verifEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

    // check first name
    if (!verifName.test(first.value)) {
      firstError.style.visibility = 'visible';
      first.style.borderColor = '#e74c3c';
      first.classList.add('apply-shake');
    } else {
      firstError.style.visibility = 'hidden';
      first.style.borderColor = '#2ecc71';
    }

    // check last name
    if (!verifName.test(last.value)) {
      lastError.style.visibility = 'visible';
      last.style.borderColor = '#e74c3c';
      last.classList.add('apply-shake');
    } else {
      lastError.style.visibility = 'hidden';
      last.style.borderColor = '#2ecc71';
    }

    // check email
    if (!verifEmail.test(email.value)) {
      emailError.style.visibility = 'visible';
      email.style.borderColor = '#e74c3c';
      email.classList.add('apply-shake');
    } else {
      emailError.style.visibility = 'hidden';
      email.style.borderColor = '#2ecc71';
    }

    // check message

    // controler la longueur d'un texte
    function isLongEnough(currentLength, minimumLength) {
      return currentLength >= minimumLength;
    }

    const isMessageValid = isLongEnough(message.value.length, 20);

    if (isMessageValid === false) {
      messageError.style.visibility = 'visible';
      message.style.borderColor = '#e74c3c';
      message.classList.add('apply-shake');
    } else {
      messageError.style.visibility = 'hidden';
      message.style.borderColor = '#2ecc71';
    }

    if (firstError.style.visibility === 'hidden' && lastError.style.visibility === 'hidden' && emailError.style.visibility === 'hidden' && isMessageValid === true) {
      form.style.visibility = 'hidden';
      submitBtn.style.visibility = 'hidden';
      errors.forEach((error) => error.style.visibility = 'hidden');
      confirmationMsg.classList.add('active');
      confirmationMsg.focus();
    }

    // ENLEVER LA CLASSE POUR QUE L'ANIMATION FONCTIONNE A L'INFINI

    first.addEventListener('animationend', () => {
      first.classList.remove('apply-shake');
    });

    last.addEventListener('animationend', () => {
      last.classList.remove('apply-shake');
    });

    email.addEventListener('animationend', () => {
      email.classList.remove('apply-shake');
    });

    message.addEventListener('animationend', () => {
      message.classList.remove('apply-shake');
    });
  }
}
