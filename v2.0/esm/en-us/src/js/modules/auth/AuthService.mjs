import {
  allowGameToStart,
  closeMessageBox,
  handleKeydownEvent,
  hideElements,
  openConfirmPopup,
  openMessageBox,
  renderLoaderContainer,
  revealElements,
  setDefaultSettings,
  timeoutItems,
  toggleFullscreenIcon
} from '../../main.js';
import { showLoginMenu, showRegisterMenu } from './AuthMenus.mjs';
import {
  addAlertMessage,
  removeAlertMessage,
  SUCCESS_MESSAGE_PARAGRAPH
} from './ValidationMessages.mjs';
import {
  searchAccount,
  createAccount,
  getAccounts,
  searchUsername,
  authError,
  setOnlineUser,
  renderUsernames,
  toggleKebabMenu,
  onlineUser
} from './AccountMethods.mjs';
import {
  AUTH_BUTTON,
  FORM,
  HIDE_PASSWORD_EYE,
  LOGOUT_BUTTONS,
  PASSWORD_INFO,
  PASSWORD_INPUT,
  PLAY_ANONYMOUSLY_BUTTON,
  SHOW_PASSWORD_EYE,
  SIGN_UP_IN_CONTAINER,
  SUBMIT_BUTTON,
  TOGGLE_PASSWORD_ICON,
  USERNAME_INPUT
} from './FormElements.mjs';
import { openMenu } from '../MenuActions.mjs';
import { OPEN_MASTER_TERMINAL_BUTTON } from '../terminal/MasterTerminal.mjs';

const REGEX = new RegExp(
  '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$'
);

let type = 'password';
let approvedValidation = false;

function updateApprovedValidation(boolean) {
  approvedValidation = boolean;
}

function handleUsernameChange() {
  removeAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'success');
  removeAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'error');
  hideElements(document.getElementById('auth-error'));

  if (USERNAME_INPUT.value.length === 0) {
    hideElements(SUCCESS_MESSAGE_PARAGRAPH);
    revealElements(document.querySelector('.error-message'));
    return;
  }

  hideElements(document.querySelector('.error-message'));

  if (SUBMIT_BUTTON.innerHTML === 'Sign Up') {
    revealElements(SUCCESS_MESSAGE_PARAGRAPH);
    SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Checking username...';

    timeoutItems(() => {
      let usernameAvailable = searchUsername(USERNAME_INPUT.value);

      if (usernameAvailable) {
        addAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'success');
        SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'This username is available.';
      } else {
        approvedValidation = false;
        addAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'error');
        SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'This username is not available.';
      }
    });
  }
}

function handlePasswordChange() {
  updateApprovedValidation(false);
  removeAlertMessage(PASSWORD_INFO, 'error');
  hideElements(document.getElementById('auth-error'));

  if (PASSWORD_INPUT.value.length === 0) {
    hideElements(TOGGLE_PASSWORD_ICON);
    type === 'text' ? togglePasswordVisibility() : null;
    return;
  }
  revealElements(TOGGLE_PASSWORD_ICON);

  if (REGEX.test(PASSWORD_INPUT.value)) {
    updateApprovedValidation(true);
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
    revealElements(document.querySelector('.error-message'));
  }
  if (PASSWORD_INPUT.value.length === 0 || !approvedValidation) {
    addAlertMessage(PASSWORD_INFO, 'error');
  }
  if (approvedValidation) {
    if (SUBMIT_BUTTON.innerHTML === 'Sign Up') {
      let usernameAvailable = searchUsername(USERNAME_INPUT.value);

      if (usernameAvailable) {
        createAccount(USERNAME_INPUT.value, PASSWORD_INPUT.value);
        showLoginMenu();
      } else {
        authError('Please, create an account with another name.');
      }
    } else {
      login(USERNAME_INPUT.value, PASSWORD_INPUT.value);
    }
  }
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

function login($username, $password) {
  const account = searchAccount($username, $password);

  if (account !== undefined) {
    setOnlineUser(account);
    setDefaultSettings();
    renderLoaderContainer('Welcome!');
    allowGameToStart();
    endAuthPage();
  } else {
    authError('Account not found.');
  }
}

function endAuthPage() {
  if (onlineUser.temporaryAccount) {
    OPEN_MASTER_TERMINAL_BUTTON.addEventListener('mouseenter', () => {
      openMessageBox(
        'The function <strong class="error">Master Terminal</strong> is only for registered accounts.'
      );
    });

    OPEN_MASTER_TERMINAL_BUTTON.addEventListener('mouseleave', closeMessageBox);
  }

  document.body.style.overflowY = 'hidden';
  document.body.removeChild(SIGN_UP_IN_CONTAINER);

  renderUsernames();

  window.addEventListener('keydown', function (event) {
    let { key } = event;
    handleKeydownEvent(key);
  });

  window.addEventListener('resize', () => {
    if (
      !(
        screen.width === window.innerWidth &&
        screen.height === window.innerHeight
      )
    ) {
      toggleFullscreenIcon(false);
    } else {
      toggleFullscreenIcon(true);
    }
  });

  revealElements(
    document.querySelector('.right-content__toggle-fullscreen-icon-container')
  );
}

function logout() {
  localStorage.removeItem('onlineUser');
  window.location.reload();
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

  hideElements(document.querySelector('.error-message'));
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

PLAY_ANONYMOUSLY_BUTTON.addEventListener('click', () => {
  OPEN_MASTER_TERMINAL_BUTTON.classList.add('button--disabled');
  OPEN_MASTER_TERMINAL_BUTTON.removeEventListener('click', openMenu);

  onlineUser.temporaryAccount = true;

  let username = 'userr';
  let password = '@userr123';

  createAccount(username, password);
  const account = searchAccount(username, password);

  setOnlineUser(account);
  setDefaultSettings();
  renderLoaderContainer('Welcome!');
  allowGameToStart();
  endAuthPage();
});

AUTH_BUTTON.addEventListener('click', handleAuthButton);

LOGOUT_BUTTONS.forEach(logout_button => {
  logout_button.addEventListener('click', () => {
    toggleKebabMenu(false, false);

    openConfirmPopup('Logout?', 'Logout', () => {
      logout();
    });
  });
});

export { getAccounts, endAuthPage, updateApprovedValidation, logout };
