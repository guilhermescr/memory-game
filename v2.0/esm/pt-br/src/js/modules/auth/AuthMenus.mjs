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

  document.querySelector('#sign_up_in_title').innerHTML = 'Cadastre-se';
  SUBMIT_BUTTON.innerHTML = 'Cadastre-se';

  document.querySelector('#auth-message').innerHTML = 'Já é de casa?';
  AUTH_BUTTON.innerHTML = 'Entre';
}

function showLoginMenu() {
  updateApprovedValidation(false);
  clearInputs();

  document.querySelector('#sign_up_in_title').innerHTML = 'Login';
  SUBMIT_BUTTON.innerHTML = 'Login';

  document.querySelector('#auth-message').innerHTML = "Não tem uma conta?";
  AUTH_BUTTON.innerHTML = 'Cadastre-se';
}

function clearInputs() {
  [USERNAME_INPUT.value, PASSWORD_INPUT.value] = ['', ''];
}

export { showRegisterMenu, showLoginMenu };
