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
const AUTH_BUTTON = document.querySelector('#auth_button');
const PLAY_ANONYMOUSLY_BUTTON = document.querySelector('#playAnonymously');
const LOGOUT_BUTTON = document.getElementById('logoutButton');

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
  LOGOUT_BUTTON
};
