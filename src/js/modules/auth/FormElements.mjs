const SIGN_UP_IN_CONTAINER = document.querySelector('.registering-container');
const FORM = document.querySelector('.registering-container__form');
const USERNAME_INPUT = document.querySelector('.username-input');
const PASSWORD_INPUT = document.querySelector('.password-input');
const TOGGLE_PASSWORD_ICON = document.querySelector(
  '.password-container__toggle-password'
);
const PASSWORD_INFO = document.querySelector('#password-info');

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

const SUBMIT_BUTTON = document.querySelector('.form__submit-button');
const AUTH_BUTTON = document.querySelector('#auth-button');
const PLAY_ANONYMOUSLY_BUTTON = document.querySelector('#play-anonymously');
const LOGOUT_BUTTONS = document.querySelectorAll('.logout-btn');

export {
  SIGN_UP_IN_CONTAINER,
  FORM,
  USERNAME_INPUT,
  PASSWORD_INPUT,
  TOGGLE_PASSWORD_ICON,
  PASSWORD_INFO,
  SHOW_PASSWORD_EYE,
  HIDE_PASSWORD_EYE,
  SUBMIT_BUTTON,
  AUTH_BUTTON,
  PLAY_ANONYMOUSLY_BUTTON,
  LOGOUT_BUTTONS
};
