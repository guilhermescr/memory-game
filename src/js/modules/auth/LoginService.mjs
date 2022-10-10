import {
  allowGameToStart,
  handleKeydownEvent,
  hideElements,
  renderLoaderContainer,
  revealElements,
  timeoutItems
} from '../../main.js';
import { addAlertMessage, removeAlertMessage } from './ValidationMessages.mjs';

const SIGN_UP_IN_CONTAINER = document.querySelector('.sign_up_in_container');
const FORM = document.querySelector('#sign_up_in_form');
const USERNAME_INPUT = document.querySelector('.usernameInput');
const PASSWORD_INPUT = document.querySelector('.passwordInput');
const TOGGLE_PASSWORD_ICON = document.querySelector('.togglePassword');
const PASSWORD_INFO = document.querySelector('#passwordInfo');

const SHOW_PASSWORD_EYE = `
<img
src="../src/assets/images/icons/eye-password-show.svg"
alt="Show Password Eye Icon"
/>`;
const HIDE_PASSWORD_EYE = `
<img
  src="../src/assets/images/icons/eye-password-hide.svg"
  alt="Hide Password Eye Icon"
/>`;

const SUBMIT_BUTTON = document.querySelector('.submitButton');
const PLAY_ANONYMOUSLY_BUTTON = document.querySelector('#playAnonymously');
const SUCCESS_MESSAGE_PARAGRAPH = document.querySelector('.successMessage');

const REGEX = new RegExp(
  '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$'
);

const AUTH_BUTTON = document.querySelector('#auth_button');

let type = 'password';
let approvedValidation = false;

function handleUsernameChange() {
  removeAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'success');

  if (USERNAME_INPUT.value.length === 0) {
    hideElements(SUCCESS_MESSAGE_PARAGRAPH);
    revealElements(document.querySelector('.errorMessage'));
    return;
  }

  hideElements(document.querySelector('.errorMessage'));
  revealElements(SUCCESS_MESSAGE_PARAGRAPH);
  SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Checking username...';

  timeoutItems(() => {
    SUCCESS_MESSAGE_PARAGRAPH.classList.add('success');
    SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'This username is available.';
  });
}

function handlePasswordChange() {
  approvedValidation = false;
  removeAlertMessage(PASSWORD_INFO, 'error');

  if (PASSWORD_INPUT.value.length === 0) {
    hideElements(TOGGLE_PASSWORD_ICON);
    type === 'text' ? togglePasswordVisibility() : null;
    return;
  }
  revealElements(TOGGLE_PASSWORD_ICON);

  if (REGEX.test(PASSWORD_INPUT.value)) {
    approvedValidation = true;
    return;
  }

  if (!REGEX.test(PASSWORD_INPUT.value)) {
    addAlertMessage(PASSWORD_INFO, 'error');
    return;
  }
}

function togglePasswordVisibility() {
  PASSWORD_INPUT.focus();

  if (PASSWORD_INPUT.getAttribute('type') === 'text') {
    type = 'password';
    TOGGLE_PASSWORD_ICON.innerHTML = SHOW_PASSWORD_EYE;
  } else {
    type = 'text';
    TOGGLE_PASSWORD_ICON.innerHTML = HIDE_PASSWORD_EYE;
  }
  PASSWORD_INPUT.setAttribute('type', type);
}

function handleSubmit() {
  if (USERNAME_INPUT.value.length === 0) {
    revealElements(document.querySelector('.errorMessage'));
  }
  if (PASSWORD_INPUT.value.length === 0 || !approvedValidation) {
    addAlertMessage(PASSWORD_INFO, 'error');
  }
  if (approvedValidation) {
    endAuthPage();
  }
}

function showRegisterMenu() {
  clearInputs();

  document.querySelector('#sign_up_in_title').innerHTML = 'Sign Up';
  SUBMIT_BUTTON.innerHTML = 'Sign Up';

  document.querySelector('#auth_message').innerHTML = 'Already a user?';
  AUTH_BUTTON.innerHTML = 'Login';
}

function showLoginMenu() {
  clearInputs();

  document.querySelector('#sign_up_in_title').innerHTML = 'Sign In';
  SUBMIT_BUTTON.innerHTML = 'Sign In';

  document.querySelector('#auth_message').innerHTML = "Don't have an account?";
  AUTH_BUTTON.innerHTML = 'Register';
}

function handleAuthButton() {
  if (AUTH_BUTTON.classList.contains('login')) {
    AUTH_BUTTON.classList.remove('login');
    AUTH_BUTTON.classList.add('register');
    showRegisterMenu();
  } else {
    AUTH_BUTTON.classList.add('login');
    AUTH_BUTTON.classList.remove('register');
    showLoginMenu();
  }
}

function endAuthPage() {
  document.body.style.overflowY = 'hidden';

  allowGameToStart();
  renderLoaderContainer();
  document.body.removeChild(SIGN_UP_IN_CONTAINER);

  window.addEventListener('keydown', function (event) {
    let { key } = event;
    handleKeydownEvent(key);
  });

  revealElements(document.querySelector('.toggleFullscreenIcon_container'));
}

function clearInputs() {
  [USERNAME_INPUT.value, PASSWORD_INPUT.value] = ['', ''];
}

USERNAME_INPUT.addEventListener('input', handleUsernameChange);

USERNAME_INPUT.addEventListener('focus', () => {
  if (USERNAME_INPUT.value.length !== 0) {
    revealElements(SUCCESS_MESSAGE_PARAGRAPH);
    SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Checking username...';

    timeoutItems(() => {
      SUCCESS_MESSAGE_PARAGRAPH.classList.add('success');
      SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'This username is available.';
    });
  }
});

USERNAME_INPUT.addEventListener('focusout', () => {
  removeAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'success');

  hideElements(document.querySelector('.errorMessage'));
  hideElements(SUCCESS_MESSAGE_PARAGRAPH);
});

PASSWORD_INPUT.addEventListener('input', handlePasswordChange);

TOGGLE_PASSWORD_ICON.addEventListener('click', togglePasswordVisibility);

FORM.addEventListener('submit', event => {
  event.preventDefault();
});

SUBMIT_BUTTON.addEventListener('click', event => {
  event.preventDefault();
  handleSubmit();
});

PLAY_ANONYMOUSLY_BUTTON.addEventListener('click', endAuthPage);

AUTH_BUTTON.addEventListener('click', handleAuthButton);

export { endAuthPage };
