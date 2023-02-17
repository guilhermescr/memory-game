import { updateApprovedValidation } from './AuthService.mjs';
import {
  AUTH_BUTTON,
  PASSWORD_INPUT,
  SUBMIT_BUTTON,
  USERNAME_INPUT
} from './FormElements.mjs';

function showRegisterMenu() {
  updateApprovedValidation(false);
  clearInputs();

  document.querySelector('#sign_up_in_title').innerHTML = 'Sign Up';
  SUBMIT_BUTTON.innerHTML = 'Sign Up';

  document.querySelector('#auth-message').innerHTML = 'Already a user?';
  AUTH_BUTTON.innerHTML = 'Login';
}

function showLoginMenu() {
  updateApprovedValidation(false);
  clearInputs();

  document.querySelector('#sign_up_in_title').innerHTML = 'Sign In';
  SUBMIT_BUTTON.innerHTML = 'Sign In';

  document.querySelector('#auth-message').innerHTML = "Don't have an account?";
  AUTH_BUTTON.innerHTML = 'Register';
}

function clearInputs() {
  [USERNAME_INPUT.value, PASSWORD_INPUT.value] = ['', ''];
}

export { showRegisterMenu, showLoginMenu };
