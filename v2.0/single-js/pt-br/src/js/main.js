import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

// Form Elements
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

// Account Methods
let accounts = [];
const onlineUser = {
  online: false,
  userData: {},
  temporaryAccount: false
};

function getCreationDate() {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let am_pm;

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (hours > 12) {
    hours -= 12;
    am_pm = 'pm';
  } else {
    am_pm = 'am';
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}/${month}/${year}, ${hours}:${minutes}${am_pm}`;
}

function searchUsername($username) {
  const userName = accounts.find($account => $account.username === $username);
  return userName === undefined; // undefined -> username available
}

function searchAccount($username, $password) {
  if (accounts.length !== 0) {
    // check if the account already exists
    const account = accounts.find(
      $account =>
        $account.username === $username && $account.password === $password
    );
    return account;
  }
}

function createAccount($username, $password) {
  const account = searchAccount($username, $password);

  if (account === undefined) {
    const userData = {
      username: $username,
      password: $password,
      creationDate: getCreationDate(),
      profilePicture: '',
      id: uuidv4(),
      lvl: 0,
      exp: 0,
      matches: 0,
      wonMatches: 0,
      lostMatches: 0,
      achievements_data: {
        amount: 0,
        achievements: [
          {
            name: 'Flip It!',
            current_progress: 0,
            done: false
          },
          {
            name: 'Perfect Move',
            current_progress: 0,
            done: false
          },
          {
            name: 'Player Harder Than Rock',
            current_progress: 0,
            done: false
          },
          {
            name: 'Unstoppable',
            current_progress: 0,
            done: false
          },
          {
            name: '3 wins',
            current_progress: 0,
            done: false
          },
          {
            name: '5 wins',
            current_progress: 0,
            done: false
          },
          {
            name: '15 wins',
            current_progress: 0,
            done: false
          },
          {
            name: '50 wins',
            current_progress: 0,
            done: false
          },
          {
            name: '100 wins',
            current_progress: 0,
            done: false
          },
          {
            name: 'Win Streak - Easy',
            current_progress: 0,
            done: false
          },
          {
            name: 'Win Streak - Normal',
            current_progress: 0,
            done: false
          },
          {
            name: 'Win Streak - Hard',
            current_progress: 0,
            done: false
          },
          {
            name: 'Win Streak - Insane',
            current_progress: 0,
            done: false
          }
        ]
      },
      sounds: {
        music: true,
        audio: true,
        volume: 1
      },
      CurrentTemplate: 'forest_template'
    };
    accounts.push(userData);

    if (!onlineUser.temporaryAccount) {
      localStorage.setItem('accounts', JSON.stringify(accounts));
    }
  }
}

function updateAccount(properties, newData) {
  switch (properties.length) {
    case 1:
      onlineUser.userData[properties[0]] = newData;
      break;
    case 2:
      onlineUser.userData[properties[0]][properties[1]] = newData;
      break;
    case 3:
      onlineUser.userData[properties[0]][properties[1]][properties[2]] =
        newData;
      break;
    case 4:
      onlineUser.userData[properties[0]][properties[1]][properties[2]][
        properties[3]
      ] = newData;
      break;
    case 5:
      onlineUser.userData[properties[0]][properties[1]][properties[2]][
        properties[3]
      ][properties[4]] = newData;
      break;
    case 6:
      onlineUser.userData[properties[0]][properties[1]][properties[2]][
        properties[3]
      ][properties[4]][properties[5]] = newData;
      break;
    default:
      console.log('Switch not expected.');
  }
  accounts = accounts.map(account => {
    if (account.id === onlineUser.userData.id) {
      return { ...onlineUser.userData };
    } else {
      return account;
    }
  });
  if (!onlineUser.temporaryAccount) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
  }
}

function showEditAccountMenu() {
  revealElements(document.querySelector('.edit-profile-menu'));
}

function showMainMenuInEditProfile() {
  let EDIT_PROFILE_MENU_OPTIONS = document.querySelectorAll(
    '.edit-profile-menu-option'
  );

  for (let index = 0; index < EDIT_PROFILE_MENU_OPTIONS.length; index++) {
    if (index) {
      hideElements(EDIT_PROFILE_MENU_OPTIONS[index]);
    } else {
      revealElements(EDIT_PROFILE_MENU_OPTIONS[index]);
    }
  }
}

function closeEditAccountMenu() {
  cancelImagePreview();
  showMainMenuInEditProfile();
  hideElements(document.querySelector('.edit-profile-menu'));
}

document
  .querySelector('.edit-profile-button')
  .addEventListener('click', showEditAccountMenu);

document
  .querySelector('.close-edit-profile-menu-icon')
  .addEventListener('click', closeEditAccountMenu);

function deleteAccount(account) {
  const { id } = onlineUser.userData;
  let isOnlineUser = account.id === id || account === 'online_user';

  if (isOnlineUser) {
    accounts = accounts.filter($account => $account.id !== id);
  } else {
    accounts = accounts.filter($account => $account.id !== account.id);
  }

  if (accounts.length && !onlineUser.temporaryAccount) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  } else {
    localStorage.removeItem('accounts');
  }
  isOnlineUser && logout();
}

document.querySelectorAll('.circle-return-icon').forEach(circle_return_icon => {
  circle_return_icon.addEventListener('click', showMainMenuInEditProfile);
});

document
  .querySelector('.delete-profile-button')
  .addEventListener('click', () => {
    openConfirmPopup('Deletar essa conta?', 'Deletar', () => {
      deleteAccount('online_user');
    });
  });

// kebab code
const KEBAB_ICON = document.querySelector('.kebab-icon');
const KEBAB_MENU = document.querySelector('.kebab-menu');
let isKebabMenuOpen = false;

function toggleKebabMenu(kebab_state, toggleKebab) {
  if (toggleKebab) {
    isKebabMenuOpen = !kebab_state;
  } else {
    isKebabMenuOpen = kebab_state;
  }
  isKebabMenuOpen ? revealElements(KEBAB_MENU) : hideElements(KEBAB_MENU);
}

KEBAB_ICON.addEventListener('click', () => {
  toggleKebabMenu(isKebabMenuOpen, true);
});

// update username
function showEditUsernameMenu() {
  hideElements(document.querySelector('.which-info-container'));
  revealElements(document.querySelector('.edit-username-container'));
}

function renderUsernames() {
  document
    .querySelectorAll('.user-name')
    .forEach(
      usernameTag => (usernameTag.innerHTML = onlineUser.userData.username)
    );
}

function updateUsername() {
  let newUsername = document.getElementById('username-input').value;
  document.getElementById('username-input').value = '';

  if (!newUsername.length) return;

  let isUsernameAvailable = searchUsername(newUsername);
  if (isUsernameAvailable) {
    updateAccount(['username'], newUsername);
    renderUsernames();
    closeEditAccountMenu();
  } else {
    // show error to the user
    console.log(newUsername);
  }
}

document
  .getElementById('edit-username-button')
  .addEventListener('click', showEditUsernameMenu);

document
  .getElementById('save-username-button')
  .addEventListener('click', updateUsername);

function renderGeneralInfo() {
  const { creationDate, matches, wonMatches, lostMatches } =
    onlineUser.userData;

  document.getElementById('creation-date').innerHTML =
    creationDate ?? 'Unknown';
  document.getElementById('matches').innerHTML = matches;
  document.getElementById('victories').innerHTML = wonMatches;
  document.getElementById('defeats').innerHTML = lostMatches;
  document.getElementById('win-streak').innerHTML = win_streak;
}

function setOnlineUser(account) {
  onlineUser.online = true;
  onlineUser.userData = account;

  if (!onlineUser.temporaryAccount) {
    localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
  }
}

function isUserOnline() {
  const data = localStorage.getItem('onlineUser');

  if (data) {
    const onlineUserData = JSON.parse(data);
    onlineUser.online = onlineUserData.online;
    onlineUser.userData = onlineUserData.userData;

    updateSoundsStatus();
    endAuthPage();
    return true;
  }
  return false;
}

function getAccounts() {
  const data = localStorage.getItem('accounts');

  if (data) {
    accounts.push(...JSON.parse(data));
    console.log(accounts);
  } else {
    console.log('Crie uma conta e comece a jogar!');
  }
}

function getAccount(username) {
  let account = accounts.find(account => account.username === username);
  return account ?? false;
}

function authError(msg) {
  const authErrorElement = document.getElementById('auth-error');
  authErrorElement.innerHTML = msg;

  revealElements(authErrorElement);
  timeoutItems(() => {
    hideElements(authErrorElement);
  }, 3000);
}

// Auth Service
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

  if (SUBMIT_BUTTON.innerHTML === 'Cadastre-se') {
    revealElements(SUCCESS_MESSAGE_PARAGRAPH);
    SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Verificando disponibilidade...';

    timeoutItems(() => {
      let usernameAvailable = searchUsername(USERNAME_INPUT.value);

      if (usernameAvailable) {
        addAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'success');
        SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Este nome está disponível.';
      } else {
        approvedValidation = false;
        addAlertMessage(SUCCESS_MESSAGE_PARAGRAPH, 'error');
        SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Este nome não está disponível.';
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
    if (SUBMIT_BUTTON.innerHTML === 'Cadastre-se') {
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
    renderLoaderContainer('Bem-vindo(a)!');
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
        'A função <strong class="error">Terminal</strong> está disponível apenas para usuários cadastrados.'
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
    SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Verificando disponibilidade...';

    timeoutItems(() => {
      SUCCESS_MESSAGE_PARAGRAPH.classList.add('success');
      SUCCESS_MESSAGE_PARAGRAPH.innerHTML = 'Este nome está disponível.';
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
  renderLoaderContainer('Bem-vindo(a)!');
  allowGameToStart();
  endAuthPage();
});

AUTH_BUTTON.addEventListener('click', handleAuthButton);

LOGOUT_BUTTONS.forEach(logout_button => {
  logout_button.addEventListener('click', () => {
    toggleKebabMenu(false, false);

    openConfirmPopup('Deseja desconectar-se?', 'Sim', () => {
      logout();
    });
  });
});

// Auth Menus
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

  document.querySelector('#auth-message').innerHTML = 'Não tem uma conta?';
  AUTH_BUTTON.innerHTML = 'Cadastre-se';
}

function clearInputs() {
  [USERNAME_INPUT.value, PASSWORD_INPUT.value] = ['', ''];
}

// Validation Messages
const SUCCESS_MESSAGE_PARAGRAPH = document.querySelector('.success-message');

function addAlertMessage(element, alertType) {
  element.classList.add(alertType);
}

function removeAlertMessage(element, alertType) {
  element.classList.remove(alertType);
}

// Menu Actions
const SETTINGS_MENUS = document.querySelectorAll('.menu');
const MENU_SETTINGS_OPTIONS = document.querySelectorAll('.setting-option');
const SETTINGS_BUTTONS = document.querySelectorAll('.setting-button');
const CLOSE_MENU_BUTTONS = document.querySelectorAll(
  '.close-menu-container__close-icon'
);
const TOP_BAR_CONTAINER = document.querySelector('.top-bar-container');
let menuIsOpen = false;

function openMenu(dataset_name) {
  playClickSoundEffect();

  let buttonDataset;
  if (this) {
    buttonDataset = this.dataset.setting;
  } else {
    buttonDataset = dataset_name;
  }

  for (let index = 0; index < SETTINGS_MENUS.length; index++) {
    if (buttonDataset === SETTINGS_MENUS[index].dataset.setting) {
      SETTINGS_MENUS[index].classList.add('show');
      SETTINGS_MENUS[index].style.pointerEvents = 'all';
      document.body.style.pointerEvents = 'none';
      menuIsOpen = true;
    }
  }
  if (buttonDataset === 'ingame-settings') {
    TOP_BAR_CONTAINER.style.display = 'none';
  }
  if (buttonDataset === 'home-settings') {
    showSettingsMenu();
  }
}

function closeMenu() {
  SETTINGS_MENUS.forEach(SETTINGS_MENU => {
    if (SETTINGS_MENU.classList.contains('show')) {
      SETTINGS_MENU.classList.remove('show');
      SETTINGS_MENU.style.pointerEvents = '';
      document.body.style.pointerEvents = '';
      menuIsOpen = false;
    }

    if (SETTINGS_MENU.dataset.setting === 'ingame-settings') {
      TOP_BAR_CONTAINER.style.display = 'flex';
    }

    if (SETTINGS_MENU.dataset.setting === 'home-settings') {
      closeEditAccountMenu();
    }
  });
}

const PLAY_CLASSIC_MODE_BUTTON = document.getElementById(
  'play-classic-mode-button'
);
PLAY_CLASSIC_MODE_BUTTON.addEventListener('click', () => {
  closeMenu();
  fillThemes();
});

const PLAY_RANDOM_MODE_BUTTON = document.getElementById(
  'play-random-mode-button'
);
PLAY_RANDOM_MODE_BUTTON.addEventListener('click', () => {
  closeMenu();
  fillRandomThemes();
});

const SHUFFLE_THEMES_BUTTON = document.getElementById('shuffle-themes');
SHUFFLE_THEMES_BUTTON.addEventListener('click', shuffleRandomThemes);

document
  .querySelector('.random-themes-container .return-icon-container__return-icon')
  .addEventListener('click', () => {
    closeMenu();
    openMenu('play-game');
  });

document
  .querySelector('.themes-container .return-icon-container__return-icon')
  .addEventListener('click', () => {
    if (!document.querySelector('.themes').classList.contains('hide')) {
      closeMenu();
      openMenu('play-game');
    } else {
      resetThemesContainerStyles();
    }
  });

// Open / Close Menu
SETTINGS_BUTTONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('click', openMenu);
});

CLOSE_MENU_BUTTONS.forEach(CLOSE_MENU_BUTTON => {
  CLOSE_MENU_BUTTON.addEventListener('click', closeMenu);
  CLOSE_MENU_BUTTON.addEventListener('keydown', ({ key }) => {
    if (key === 'Enter') {
      closeMenu();
    }
  });
});

// Hover Sound Effects

MENU_SETTINGS_OPTIONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('mouseenter', playHoverSoundEffect);
});

MENU_SETTINGS_OPTIONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('mouseleave', stopHoverSoundEffect);
});

// Flag Hover
const US_FLAG = document.getElementById('us-flag');

function toggleLangColor(flag, $event) {
  if ($event === 'enter') {
    flag.classList.remove('language--disabled');
  } else {
    flag.classList.add('language--disabled');
  }
}

US_FLAG.addEventListener('mouseenter', () => {
  toggleLangColor(US_FLAG, 'enter');
});

US_FLAG.addEventListener('mouseleave', () => {
  toggleLangColor(US_FLAG, 'leave');
});

// Templates Data
const TEMPLATES_DATA = {
  ForestTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/forest_template/forest_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Floresta'
    },
    TemplateStyles: 'forest_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/forest_template/forest_theme.mp3'
  },
  RainbowTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/rainbow_template/rainbow_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Arco-Íris'
    },
    TemplateStyles: 'rainbow_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/rainbow_template/rainbow_theme.mp3'
  },
  MilitaryTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/military_template/military_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Militar'
    },
    TemplateStyles: 'military_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/military_template/military_theme.mp3'
  }
};

const TEMPLATES_KEYS = Object.keys(TEMPLATES_DATA);

// Templates Algorithm
const HOME_SETTINGS_RETURN_ICON = document.querySelector(
  '.home-settings-container .return-icon-container__return-icon'
);
const HOME_SETTINGS_TITLE = document.querySelector('#home-settings-title');
const CURRENT_TEMPLATE_IMAGE = document.querySelector(
  '#current-template-image'
);
const CHANGE_TEMPLATE_BUTTON = document.querySelector(
  '#change-current-template-button'
);
const TEMPLATES_CONTAINER = document.querySelector('.templates');
const TEMPLATES_NAMES = [
  'Estilo Floresta',
  'Estilo Arco-Íris',
  'Estilo Militar'
];
let currentTemplate;

// add current template image in home settings menu
function setCurrentTemplateImage() {
  TEMPLATES_KEYS.forEach((_, TEMPLATE_KEY) => {
    const { TemplateStyles } = TEMPLATES_DATA[TEMPLATES_KEYS[TEMPLATE_KEY]];
    const { src, alt } =
      TEMPLATES_DATA[TEMPLATES_KEYS[TEMPLATE_KEY]].MenuTemplate;

    if (TemplateStyles === document.body.classList[0]) {
      currentTemplate = TEMPLATES_KEYS[TEMPLATE_KEY];
      CURRENT_TEMPLATE_IMAGE.src = src;
      CURRENT_TEMPLATE_IMAGE.alt = alt;
      return;
    }
  });
}

function changeCurrentTemplate(templateClass) {
  document.body.classList = '';
  document.body.classList.add(templateClass);
}
function createTemplates() {
  for (
    let templateIndex = 0;
    templateIndex < TEMPLATES_KEYS.length;
    templateIndex++
  ) {
    const { TemplateStyles } = TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]];
    const { src, alt } =
      TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate;

    let template = document.createElement('div');
    template.classList.add('template');

    template.innerHTML = `
    <h3>${TEMPLATES_NAMES[templateIndex]}</h3>
    <img
      class="template-image"
      src=${src}
      alt=${alt}
    />
    <button id="${TEMPLATES_KEYS[templateIndex]}" class="change-template-button" type="button">Trocar</button>
    `;
    TEMPLATES_CONTAINER.appendChild(template);

    document
      .querySelector(`#${TEMPLATES_KEYS[templateIndex]}`)
      .addEventListener('click', event => {
        event.preventDefault();
        changeCurrentTemplate(TemplateStyles);
        setCurrentTemplateImage();
        updateAccount(['CurrentTemplate'], TemplateStyles);
        showSettingsMenu();
        closeMenu();
        stopHomeMusic();
        renderClickOnWindowMessage();
      });
  }
}

function showTemplatesInMenu() {
  HOME_SETTINGS_TITLE.innerHTML = 'Estilos';
  hideElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  createTemplates();
  revealElements([HOME_SETTINGS_RETURN_ICON, TEMPLATES_CONTAINER]);
}

function showSettingsMenu() {
  closeEditAccountMenu();

  hideElements([
    TEMPLATES_CONTAINER,
    HOME_SETTINGS_RETURN_ICON,
    document.querySelector('.profile-menu')
  ]);
  revealElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  TEMPLATES_CONTAINER.innerHTML = '';
  HOME_SETTINGS_TITLE.innerHTML = 'Configurações';
}

function showUserProfileInfo() {
  hideElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  revealElements([
    HOME_SETTINGS_RETURN_ICON,
    document.querySelector('.profile-menu')
  ]);

  HOME_SETTINGS_TITLE.innerHTML = 'Informações de Perfil';

  if (!isExpProgressBarWidthUpdated.state) {
    changeExpProgressBarWidth(isExpProgressBarWidthUpdated.width === 100);
  }
}

function addForestTemplateChanges() {
  stopAllTemplateAnimations();

  startBirdAnimation();
  window.addEventListener('resize', setBirdPosition);
}

function addRainbowTemplateChanges() {
  stopAllTemplateAnimations();

  // it starts the animation too
  getViewportWidthToAdjustRainbowPosition();
}

function addMilitaryTemplateChanges() {
  stopAllTemplateAnimations();

  startArmySoldiersAnimation();
}

function stopAllTemplateAnimations() {
  resetBirdAnimation();
  resetArmySoldiersAnimation();
  resetUnicornAnimation();
}

const BODY_CLASSLIST_TEMPLATE_OPTIONS = {
  forest_template: addForestTemplateChanges,
  rainbow_template: addRainbowTemplateChanges,
  military_template: addMilitaryTemplateChanges
};

HOME_SETTINGS_RETURN_ICON.onclick = showSettingsMenu;

CURRENT_TEMPLATE_IMAGE.onclick = showTemplatesInMenu;
CHANGE_TEMPLATE_BUTTON.onclick = showTemplatesInMenu;

document
  .querySelector('.open-profile-menu')
  .addEventListener('click', event => {
    if (event.target.id !== 'logout-button') {
      showUserProfileInfo();
    }
  });

// Add Cards
let memoryDeck = document.querySelector('.memory-deck');
let createCardsTwice, btnThemeId, themesDifficultiesList;

function saveClickedBtnThemeId(clickedBtnThemeId) {
  btnThemeId = clickedBtnThemeId;
  saveCurrentThemeDifficulties();
}

function saveCurrentThemeDifficulties() {
  themesDifficultiesList = Object.keys(themes[btnThemeId].difficulties);
}

function createCards(difficulty) {
  createCardsTwice = 0;

  const CARDS_LIST = {};
  /*
    The code below creates keys for CARDS_LIST. These keys are the difficulties (easy, normal, hard etc.) in themesData module.
    If we choose "easy", for example, easy has 4 objects, which are the names of the characters.
    Therefore, we get the values of the 4 objects and give it to CARDS_LIST[themesDifficulty].
  */

  themesDifficultiesList.forEach(themesDifficulty => {
    CARDS_LIST[themesDifficulty] = Object.values(
      themes[btnThemeId].difficulties[themesDifficulty]
    );
  });

  // I.e.: createCards('easy') -> all easy cards go to cards variable.
  let cards = CARDS_LIST[difficulty];

  while (createCardsTwice < 2) {
    for (let card = 0; card < cards.length; card++) {
      let memoryCard = document.createElement('div');

      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${cards[card]}
      `;
      memoryDeck.appendChild(memoryCard);
    }
    createCardsTwice++;
  }
}

function addEasyModeCards() {
  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item:not(.top-bar-container__top-bar-item.left-content__hearts-container)'
  );
  TOP_BAR_CONTAINER.classList.add('top-bar-container--background');

  closeMenu();
  resetThemesContainerStyles();

  createCards(themesDifficultiesList[0]);

  renderLoaderContainer('Renderizando cartas...');
  renderDeck();

  revealElements(topBarContainerIngameElements);
  hideElements([GAME_MENU, document.querySelector('.languages')]);
}

function addNormalModeCards() {
  createCards(themesDifficultiesList[1]);
  addEasyModeCards();
}

function addHardModeCards() {
  revealElements(document.querySelector('.left-content__hearts-container'));
  createCards(themesDifficultiesList[2]);
  addNormalModeCards();
}

// Deck Styles
const DECK_CONTAINER = document.querySelector('.deck-container');
const MEMORY_DECK = document.querySelector('.memory-deck');

function setDeckStyles() {
  let cards_amount = MEMORY_DECK.childElementCount;

  MEMORY_DECK.style.maxWidth = '';
  MEMORY_DECK.classList.remove('max-width-easy-mode');
  MEMORY_DECK.classList.remove('max-width-normal-mode');
  MEMORY_DECK.classList.remove('max-width-hard-mode');

  if (document.body.clientWidth > 1366) {
    MEMORY_DECK.style.maxWidth = '1200px';
    return;
  }

  if (cards_amount === 8) {
    MEMORY_DECK.classList.add('max-width-easy-mode');
  }
  if (cards_amount === 14) {
    MEMORY_DECK.classList.add('max-width-normal-mode');
  }
  if (cards_amount === 20) {
    MEMORY_DECK.classList.add('max-width-hard-mode');
  }
}

function renderDeck() {
  window.addEventListener('resize', setDeckStyles);
  setDeckStyles();

  DECK_CONTAINER.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
  revealElements(DECK_CONTAINER);

  timeoutItems(startGame);
}

// Fill Themes In Menu
let lockCreation = false;

function fillThemes() {
  resetThemesContainerStyles();
  if (lockCreation) return;

  let themesContainer = document.getElementById('themes-container');

  for (let index = 0; index < THEMES_LIST.length; index++) {
    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${THEMES_LOGOS[index]}
    </div>
    <h3>${THEMES_NAMES[index]}</h3>
    <button class="play-theme-btn choosable-theme" data-themeid="${THEMES_LIST[index]}">Jogar</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
  renderPlayThemeButtons();
}

// Fill Random Themes
const RANDOM_THEMES_CONTAINER = document.getElementById('random-themes-images');

function fillRandomThemes() {
  RANDOM_THEMES_CONTAINER.innerHTML = '';
  RANDOM_THEMES_TITLE.innerHTML = 'Temas Aleatórios';

  for (let index = 0; index < THEMES_LIST.length; index++) {
    let randomTheme = document.createElement('div');
    randomTheme.classList.add('random-theme');
    randomTheme.dataset.themeid = THEMES_LIST[index];
    randomTheme.dataset.themename = THEMES_NAMES[index];
    randomTheme.innerHTML = `${THEMES_LOGOS[index]}`;
    RANDOM_THEMES_CONTAINER.appendChild(randomTheme);
  }
}

// Shuffle Random Themes
const RANDOM_THEMES_TITLE = document.getElementById('random-themes-title');
let [chosenTheme, isShuffling] = [null, false];

function resetStyles(RANDOM_THEME, drawnTheme) {
  RANDOM_THEME.classList.remove('middle-theme');
  RANDOM_THEME.style.display = 'block';
  RANDOM_THEME.style.order = '';
  RANDOM_THEMES_TITLE.innerHTML = 'Temas Aleatórios';
  drawnTheme.style.order = '';
}

function shuffleRandomThemes() {
  if (isShuffling) return;
  const RANDOM_THEMES = document.querySelectorAll('.random-theme');
  let drawnTheme =
    RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];

  isShuffling = true;

  // This "while" prevents the algorithm from choosing the same theme twice.
  while (drawnTheme === chosenTheme) {
    drawnTheme =
      RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
  }
  chosenTheme = drawnTheme;

  RANDOM_THEMES.forEach(RANDOM_THEME => {
    resetStyles(RANDOM_THEME, drawnTheme);

    RANDOM_THEME.classList.add('shuffle-animation-start');

    const SHUFFLE_POSITIONS = setInterval(() => {
      let randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);

      // I just want one theme in the middle, so one theme gets order: 2;
      while (randomPos === 2) {
        randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);
      }
      RANDOM_THEME.style.order = randomPos;
    }, 1000);

    // stop shuffle animation
    setTimeout(() => {
      RANDOM_THEME.classList.remove('shuffle-animation-start');
      clearInterval(SHUFFLE_POSITIONS);

      if (RANDOM_THEME === drawnTheme) {
        drawnTheme.style.order = 2;
        drawnTheme.classList.add('middle-theme');
        RANDOM_THEMES_TITLE.innerHTML = drawnTheme.dataset.themename;
      } else {
        RANDOM_THEME.style.display = 'none';
      }
    }, 4000);
  });

  setTimeout(() => {
    saveClickedBtnThemeId(drawnTheme.dataset.themeid);
    shuffleDifficulties();
    isShuffling = false;
  }, 5100);
}

// Themes Data
const themes = {
  AdventureTime: {
    logo: `<img class="theme-image cartoon" 
  src="../src/assets/images/themes/adventure-time-theme/adventure_time_logo.png" alt="Adventure Time Logo">`,

    difficulties: {
      easy: {
        Finn: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/easy/finn.png" alt="Finn Character" data-character="Finn">`,

        Jake: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/easy/jake.png" alt="Jake Character" data-character="Jake">`,

        PrincessBubblegum: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/easy/princess-bubblegum.png" alt="Princess Bubblegum Character" data-character="PrincessBubblegum">`,

        BMO: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/easy/bmo.png" alt="BMO Character" data-character="BMO">`
      },

      normal: {
        IceKing: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/normal/ice-king.png" alt="Ice King Character" data-character="IceKing">`,

        FlamePrincess: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/normal/flame-princess.png" alt="Flame Princess Character" data-character="FlamePrincess">`,

        Marceline: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/normal/marceline.png" alt="Marceline Character" data-character="Marceline">`
      },

      hard: {
        LadyRainicorn: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/hard/lady-rainicorn.png" alt="Lady Rainicorn Character" data-character="LadyRainicorn">`,

        EarlOfLemonGrab: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/hard/the-earl-of-lemongrab.png" alt="The Earl Of Lemongrab Character" data-character="EarlOfLemonGrab">`,

        Gunter: `<img class="back-face" src="../src/assets/images/themes/adventure-time-theme/hard/gunter.webp" alt="Gunter Character" data-character="Gunter">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/adventure-time-theme/front-face.webp" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/adventure-time-theme/adventure_time_Background.jfif',

    cardBackgroundColor: '#C83700',

    soundTracks: {
      Music1:
        '../src/soundtracks/adventure-time/adventure_time_island_song_music1.mp3',
      Music2:
        '../src/soundtracks/adventure-time/adventure_time_my_best_friends_in_the_world_music2.mp3',
      Music3: ''
    }
  },

  Ben10: {
    logo: `<img class="theme-image" id="ben-10" 
  src="../src/assets/images/themes/ben-10-theme/ben-10-logo.webp" alt="Ben 10 Logo">`,

    difficulties: {
      easy: {
        Ben: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/easy/ben-tennyson.webp" alt="Ben Tennyson Character" data-character="Ben">`,
        Gwen: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/easy/gwen-tennyson.png" alt="Gwen Tennyson Character" data-character="Gwen">`,
        KevinLevin: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/easy/kevin-levin.webp" alt="Kevin Levin Character" data-character="KevinLevin">`,
        MaxTennyson: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/easy/max-tennyson.webp" alt="Max Tennyson Character" data-character="MaxTennyson">`
      },

      normal: {
        Azmuth: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/normal/azmuth.webp" alt="Azmuth Character" data-character="Azmuth">`,
        Julie: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/normal/julie.webp" alt="Julie Character" data-character="Julie">`,
        Vilgax: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/normal/vilgax.webp" alt="Vilgax Character" data-character="Vilgax">`
      },

      hard: {
        FourArms: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/hard/four-arms.png" alt="Four Arms Alien Character" data-character="FourArms">`,
        Jimmy: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/hard/jimmy.webp" alt="Jimmy Character" data-character="Jimmy">`,
        Rath: `<img class="back-face" src="../src/assets/images/themes/ben-10-theme/hard/rath.webp" alt="Rath Alien Character" data-character="Rath">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/ben-10-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/ben-10-theme/ben-10_Background.jpg',

    cardBackgroundColor: '#16AE58',

    soundTracks: {
      Music1: '../src/soundtracks/ben-10/ben_10_omniverse_music1.mp3',
      Music2: '../src/soundtracks/ben-10/ben_10_alien_force_music2.mp3',
      Music3: ''
    }
  },

  BokuNoHero: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/boku-no-hero-theme/boku-no-hero-logo.png" alt="Boku No Hero Logo">`,

    difficulties: {
      easy: {
        Bakugo: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/easy/katsuki-bakugo.png" alt="Bakugo Character" data-character="KatsukiBakugo">`,
        Izuku: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/easy/midoriya-izuku.png" alt="Izuku Character" data-character="MidoriyaIzuku">`,
        Uraraka: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/easy/ochaco-uraraka.png" alt="Uraraka Character" data-character="OchacoUraraka">`,
        Shoto: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/easy/shoto-todoroki.png" alt="Shoto Todoroki Character" data-character="ShotoTodoroki">`
      },

      normal: {
        AllMight: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/normal/all-might.webp" alt="AllMight Character" data-character="AllMight">`,
        Tokoyami: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/normal/fumikage-tokoyami.png" alt="Fumikage Tokoyami Character" data-character="FumikageTokoyami">`,
        TsuyuAsui: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/normal/tsuyu-asui.png" alt="Tsuyu Asui Character" data-character="TsuyuAsui">`
      },

      hard: {
        Tenya: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/hard/tenya-lida.png" alt="Tenya Character" data-character="TenyaLida">`,
        ShotaAizawa: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/hard/shota-aizawa.webp" alt="Shota Aizawa Character" data-character="ShotaAizawa">`,
        DenkiKaminari: `<img class="back-face" src="../src/assets/images/themes/boku-no-hero-theme/hard/denki-kaminari.png" alt="Denki Kaminari Character" data-character="DenkiKaminari">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/boku-no-hero-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/boku-no-hero-theme/boku-no-hero_Background.webp',

    cardBackgroundColor: '#FF7E00',

    soundTracks: {
      Music1: '../src/soundtracks/boku-no-hero/boku_no_hero_opening_music1.mp3',
      Music2: '',
      Music3: ''
    }
  },

  Boruto: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/boruto-theme/boruto-logo.png" alt="Boruto Logo">`,

    difficulties: {
      easy: {
        Boruto: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/easy/boruto.png" alt="Boruto Character" data-character="Boruto">`,
        Mitsuki: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/easy/mitsuki.png" alt="Mitsuki Character" data-character="Mitsuki">`,
        Sarada: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/easy/sarada.png" alt="Sarada Uchiha Character" data-character="SaradaUchiha">`,
        NarutoHokage: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/easy/naruto-hokage.png" alt="Naruto Hokage Character" data-character="NarutoHokage">`
      },

      normal: {
        ChoCho: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/normal/chocho.png" alt="Cho-cho Character" data-character="Chocho">`,
        Inojin: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/normal/inojin.png" alt="Inojin Character" data-character="Inojin">`,
        Kawaki: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/normal/kawaki.png" alt="Kawaki Character" data-character="Kawaki">`
      },

      hard: {
        DenkiKaminarimon: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/hard/denki.webp" alt="Denki Character" data-character="DenkiKaminarimon">`,
        Jigen: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/hard/jigen.png" alt="Jigen Character" data-character="Jigen">`,
        KashinKoji: `<img class="back-face" src="../src/assets/images/themes/boruto-theme/hard/kashin-koji.png" alt="Kashin Koji Character" data-character="KashinKoji">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/boruto-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/boruto-theme/boruto_Background.webp',

    cardBackgroundColor: '#FCBA21',

    soundTracks: {
      Music1: '../src/soundtracks/boruto/boruto_opening_music1.mp3',
      Music2: '',
      Music3: ''
    }
  },

  DragonBall: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/db-theme/dragon-ball-logo.png" alt="Dragon Ball Logo">`,

    difficulties: {
      easy: {
        Goku: `<img class="back-face" src="../src/assets/images/themes/db-theme/easy/goku.png" alt="Goku Character" data-character="Goku">`,
        Bulma: `<img class="back-face" src="../src/assets/images/themes/db-theme/easy/bulma.png" alt="Bulma Character" data-character="Bulma">`,
        Yamcha: `<img class="back-face" src="../src/assets/images/themes/db-theme/easy/yamcha.png" alt="Yamcha Character" data-character="Yamcha">`,
        Piccolo: `<img class="back-face" src="../src/assets/images/themes/db-theme/easy/piccolo.png" alt="Piccolo Character" data-character="Piccolo">`
      },

      normal: {
        Gohan: `<img class="back-face" src="../src/assets/images/themes/db-theme/normal/gohan.png" alt="Gohan Character" data-character="Gohan">`,
        Goten: `<img class="back-face" src="../src/assets/images/themes/db-theme/normal/goten.png" alt="Goten Character" data-character="Goten">`,
        Vegeta: `<img class="back-face" src="../src/assets/images/themes/db-theme/normal/vegeta.png" alt="Vegeta Character" data-character="Vegeta">`
      },

      hard: {
        Beerus: `<img class="back-face" src="../src/assets/images/themes/db-theme/hard/beerus.png" alt="Beerus Character" data-character="Beerus">`,
        Whis: `<img class="back-face" src="../src/assets/images/themes/db-theme/hard/whis.png" alt="Whis Character" data-character="Whis">`,
        Zeno: `<img class="back-face" src="../src/assets/images/themes/db-theme/hard/zeno.png" alt="Zeno Character" data-character="Zeno">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/db-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/db-theme/tournamentOfPowerArenaBackground.webp',

    cardBackgroundColor: '#EFCC00',

    soundTracks: {
      Music1: '../src/soundtracks/dragon-ball/dragon_ball_opening_music1.mp3',
      Music2:
        '../src/soundtracks/dragon-ball/dragon_ball_super_opening_music2.mp3',
      Music3: ''
    }
  },

  GilmoreGirls: {
    logo: `<img class="theme-image tv-show" 
  src="../src/assets/images/themes/gilmore-girls-theme/gilmore-girls-logo.webp" alt="Gilmore Girls Logo">`,

    difficulties: {
      easy: {
        Rory: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/easy/rory.png" alt="Rory Character" data-character="Rory">`,
        Lorelai: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/easy/lorelai.png" alt="Lorelai Character" data-character="Lorelai">`,
        Luke: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/easy/luke.webp" alt="Luke Character" data-character="Luke">`,
        Lane: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/easy/lane.png" alt="Lane Character" data-character="Lane">`
      },

      normal: {
        Dean: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/normal/dean.png" alt="Dean Character" data-character="Dean">`,
        Paris: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/normal/paris.png" alt="Paris Character" data-character="Paris">`,
        Tristan: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/normal/tristan.png" alt="Tristan Character" data-character="Tristan">`
      },

      hard: {
        Christopher: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/hard/christopher.png" alt="Christopher Character" data-character="Christopher">`,
        Kirk: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/hard/kirk.png" alt="Kirk Character" data-character="Kirk">`,
        MichelGerard: `<img class="back-face" src="../src/assets/images/themes/gilmore-girls-theme/hard/michel-gerard.png" alt="Michel Gerard Character" data-character="MichelGerard">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/gilmore-girls-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/gilmore-girls-theme/gilmore-girls_Background.webp',

    cardBackgroundColor: '#4C1415',

    soundTracks: {
      Music1:
        '../src/soundtracks/gilmore-girls/gilmore_girls_opening_music1.mp3',
      Music2: '',
      Music3: ''
    }
  },

  NanatsuNoTaizai: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/nanatsu-no-taizai-theme/nnt-logo.png" alt="Nanatsu No Taizai Logo">`,

    difficulties: {
      easy: {
        Meliodas: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/easy/meliodas.png" alt="Meliodas Character" data-character="Meliodas">`,
        Elizabeth: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/easy/elizabeth.png" alt="Elizabeth Character" data-character="Elizabeth">`,
        Hawk: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/easy/hawk.webp" alt="Hawk Character" data-character="Hawk">`,
        King: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/easy/king.webp" alt="King Character" data-character="King">`
      },

      normal: {
        Ban: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/normal/ban.png" alt="Ban Character" data-character="Ban">`,
        Diane: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/normal/diane.webp" alt="Diane Character" data-character="Diane">`,
        Gowther: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/normal/gowther.png" alt="Gowther Character" data-character="Gowther">`
      },

      hard: {
        Elaine: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/hard/elaine.png" alt="Elaine Character" data-character="Elaine">`,
        Merlin: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/hard/merlin.webp" alt="Merlin Character" data-character="Merlin">`,
        Escanor: `<img class="back-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/hard/escanor.png" alt="Escanor Character" data-character="Escanor">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/nanatsu-no-taizai-theme/front-face.webp" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/nanatsu-no-taizai-theme/nanatsu-no-taizai_Background.webp',

    cardBackgroundColor: '#0EC74F',

    soundTracks: {
      Music1:
        '../src/soundtracks/nanatsu-no-taizai/the_seven_deadly_sins_opening _music1.mp3',
      Music2: '',
      Music3: ''
    }
  },

  Naruto: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/naruto-theme/naruto-logo.png" alt="Naruto Logo">`,

    difficulties: {
      easy: {
        Naruto: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/easy/naruto.png" alt="Naruto Character" data-character="Naruto">`,
        Sasuke: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/easy/sasuke.png" alt="Sasuke Character" data-character="Sasuke">`,
        Sakura: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/easy/sakura.png" alt="Sakura Character" data-character="Sakura">`,
        Kakashi: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/easy/kakashi.png" alt="Kakashi Character" data-character="Kakashi">`
      },

      normal: {
        Tsunade: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/normal/tsunade.png" alt="Tsunade Character" data-character="Tsunade">`,
        Jiraya: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/normal/jiraya.png" alt="Jiraya Character" data-character="Jiraya">`,
        Orochimaru: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/normal/orochimaru.png" alt="Orochimaru Character" data-character="Orochimaru">`
      },

      hard: {
        MightGuy: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/hard/might-guy.webp" alt="Might Guy Character" data-character="MightGuy">`,
        AsumaSarutobi: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/hard/asuma.webp" alt="Asuma Sarutobi Character" data-character="Asuma">`,
        Gaara: `<img class="back-face" src="../src/assets/images/themes/naruto-theme/hard/gaara.png" alt="Gaara Character" data-character="Gaara">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/naruto-theme/front-face.png" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/naruto-theme/hokageRockBackground.webp',

    cardBackgroundColor: '#0b0b0b',

    soundTracks: {
      Music1: '../src/soundtracks/naruto/naruto_music1.mp3',
      Music2: '../src/soundtracks/naruto/naruto_akatsuki_music2.mp3',
      Music3: ''
    }
  },

  OnePiece: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/one-piece/one-piece-logo.png" alt="One Piece Logo">`,

    difficulties: {
      easy: {
        Luffy: `<img class="back-face" src="../src/assets/images/themes/one-piece/easy/luffy.webp" alt="Luffy Character" data-character="Luffy">`,
        Sanji: `<img class="back-face" src="../src/assets/images/themes/one-piece/easy/portgas-d-ace.png" alt="Portgas D. Ace Character" data-character="PortgasDAce">`,
        Zoro: `<img class="back-face" src="../src/assets/images/themes/one-piece/easy/roronoa-zoro.png" alt="Roronoa Zoro Character" data-character="RoronoaZoro">`,
        PortgasDAce: `<img class="back-face" src="../src/assets/images/themes/one-piece/easy/sanji.webp" alt="Sanji Character" data-character="Sanji">`
      },

      normal: {
        Foxy: `<img class="back-face" src="../src/assets/images/themes/one-piece/normal/foxy.webp" alt="Foxy Character" data-character="Foxy">`,
        Nami: `<img class="back-face" src="../src/assets/images/themes/one-piece/normal/nami.webp" alt="Nami Character" data-character="Nami">`,
        Usopp: `<img class="back-face" src="../src/assets/images/themes/one-piece/normal/usopp.png" alt="Usopp Character" data-character="Usopp">`
      },

      hard: {
        Brook: `<img class="back-face" src="../src/assets/images/themes/one-piece/hard/brook.png" alt="Brook Character" data-character="Brook">`,
        RobLucci: `<img class="back-face" src="../src/assets/images/themes/one-piece/hard/rob-lucci-cp9.webp" alt="Rob Lucci Character" data-character="RobLucciCP9">`,
        TonyTonyChooper: `<img class="back-face" src="../src/assets/images/themes/one-piece/hard/tony-tony-chopper.png" alt="Tony Tony Chopper Character" data-character="TonyTonyChopper">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/one-piece/front-face.webp" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/one-piece/one-piece_Background.png',

    cardBackgroundColor: '#105EDD',

    soundTracks: {
      Music1: '../src/soundtracks/one-piece/one_piece_opening_music1.mp3',
      Music2: '',
      Music3: ''
    }
  },

  OnePunchMan: {
    logo: `<img class="theme-image anime" 
  src="../src/assets/images/themes/one-punch-man-theme/opm-logo.png" alt="One Punch Man Logo">`,

    difficulties: {
      easy: {
        Saitama: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/easy/saitama.png" alt="Saitama Character" data-character="Saitama">`,
        Genos: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/easy/genos.png" alt="Genos Character" data-character="Genos">`,
        Garou: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/easy/garou.png" alt="Garou Character" data-character="Garou">`,
        King: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/easy/king.webp" alt="King Character" data-character="King">`
      },

      normal: {
        SilverFang: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/normal/silver-fang.png" alt="Silver Fang Character" data-character="SilverFang">`,
        ChildEmperor: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/normal/child-emperor.png" alt="Child Emperor Character" data-character="ChildEmperor">`,
        FlashyFlash: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/normal/flashy-flash.webp" alt="Flashy Flash Character" data-character="FlashyFlash">`
      },

      hard: {
        Tatsumaki: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/hard/tatsumaki.png" alt="Tatsumaki Character" data-character="Tatsumaki">`,
        MetalBat: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/hard/metal-bat.png" alt="Metal Bat Character" data-character="MetalBat">`,
        Blast: `<img class="back-face" src="../src/assets/images/themes/one-punch-man-theme/hard/blast.png" alt="Blast Character" data-character="Blast">`
      }
    },

    frontFace: `<img class="front-face" src="../src/assets/images/themes/one-punch-man-theme/front-face.webp" alt="Card's Front Face">`,

    bodyBackgroundImage:
      '../src/assets/images/themes/one-punch-man-theme/one-punch-man_Background.png',

    cardBackgroundColor: '#BF0000',

    soundTracks: {
      Music1: '../src/soundtracks/one-punch-man/one_punch_man_music1.mp3',
      Music2: '',
      Music3: ''
    }
  }
};

const THEMES_LIST = Object.keys(themes);
const THEMES_NAMES = [
  'Hora de Aventura',
  'Ben 10',
  'Boku No Hero',
  'Boruto',
  'Dragon Ball',
  'Gilmore Girls',
  'Nanatsu No Taizai',
  'Naruto',
  'One Piece',
  'One Punch Man'
];
const THEMES_LOGOS = [];

THEMES_LIST.forEach(THEME => {
  THEMES_LOGOS.push(themes[THEME].logo);
});

// Themes Difficulties
const THEMES_CONTAINER = document.getElementById('themes-container');
const THEMES_TITLE = document.getElementById('themes-title');

const DIFFICULTIES_CONTAINER = document.querySelector(
  '.difficulties-container'
);
const DIFFICULTY_BUTTONS = document.querySelectorAll('.difficulty-level');
const DIFFICULTY_OPTIONS = {
  Easy: addEasyModeCards,
  Normal: addNormalModeCards,
  Hard: addHardModeCards
};

let difficulty;

function resetThemesContainerStyles() {
  hideElements(DIFFICULTIES_CONTAINER);
  revealElements(THEMES_CONTAINER);
  THEMES_TITLE.innerHTML = 'Temas';
}

function showDifficulties() {
  // get clicked button dataset
  let btnThemeId = this.dataset.themeid;
  saveClickedBtnThemeId(btnThemeId);

  THEMES_TITLE.innerHTML = 'Selecione Uma Dificuldade';
  hideElements(THEMES_CONTAINER);
  revealElements(DIFFICULTIES_CONTAINER);
}

function renderPlayThemeButtons() {
  const playThemesBtns = document.querySelectorAll('.choosable-theme');
  playThemesBtns.forEach(playButton => {
    playButton.addEventListener('click', showDifficulties);
  });
}

function checkDifficulty() {
  difficulty = this.innerHTML;

  if (DIFFICULTY_OPTIONS[difficulty]) {
    DIFFICULTY_OPTIONS[difficulty]();
  }
}

function shuffleDifficulties() {
  let DIFFICULTY_NAMES = Object.keys(DIFFICULTY_OPTIONS);
  let drawnDifficultyName =
    DIFFICULTY_NAMES[Math.floor(Math.random() * DIFFICULTY_NAMES.length)];
  difficulty = drawnDifficultyName;
  DIFFICULTY_OPTIONS[drawnDifficultyName]();
}

DIFFICULTY_BUTTONS.forEach(DIFFICULTY_BUTTON => {
  DIFFICULTY_BUTTON.addEventListener('click', checkDifficulty);
});

// Main
const CLICK_ON_WINDOW_CONTAINER = document.getElementById(
  'click-on-window-message-container'
);
const LOADER_CONTAINER = document.getElementById('loader-container');
const LOADER_TITLE = document.getElementById('loader-container__loader-title');
const CONFIRM_ACTION_CONTAINER = document.querySelector(
  '.confirm-action-popup'
);
const INITIAL_PAGE_ELEMENTS = [
  'language-link',
  'registering-container',
  'username-input',
  'password-input',
  'form__submit-button',
  'play-anonymously',
  'register',
  'right-content__toggle-fullscreen-icon-container',
  'close-menu-container__close-icon'
];
let BODY_CHILDREN, confirm_button_listener, message_box;

function timeoutItems(functionItems, timing) {
  if (!timing) {
    timing = 1200;
  }

  if (typeof functionItems === 'function') {
    setTimeout(functionItems, timing);
  }

  // when functionItems is an array
  if (typeof functionItems === 'object') {
    functionItems.forEach(func => {
      setTimeout(func, timing);
    });
  }
}

function allowGameToStart() {
  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }
  if (document.body.classList[0]) {
    BODY_CLASSLIST_TEMPLATE_OPTIONS[onlineUser.userData.CurrentTemplate]();
  }
}

function renderClickOnWindowMessage() {
  document.body.appendChild(CLICK_ON_WINDOW_CONTAINER);
}

function removeClickOnWindowMessage() {
  document.body.removeChild(CLICK_ON_WINDOW_CONTAINER);
  renderLoaderContainer();
}

function renderLoaderContainer(loaderMessage) {
  document.body.appendChild(LOADER_CONTAINER);

  if (loaderMessage) {
    LOADER_TITLE.innerHTML = loaderMessage;
  } else {
    LOADER_TITLE.innerHTML = 'Carregando...';
  }
  timeoutItems(removeLoaderContainer);
}

function removeLoaderContainer() {
  document.body.appendChild(LOADER_CONTAINER);
  document.body.removeChild(LOADER_CONTAINER);
}

CLICK_ON_WINDOW_CONTAINER.onclick = () => {
  removeClickOnWindowMessage();
  allowGameToStart();
};

const ROOT_ELEMENT = document.documentElement; // <- <html> tag
const FULLSCREEN_BUTTON = document.querySelector(
  '.right-content__toggle-fullscreen-icon-container'
);
const MAXIMIZE_FULLSCREEN_ICON = `
<svg
      class="toggleFullscreenIcon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 384.97 384.97"
      style="enable-background: new 0 0 384.97 384.97"
      xml:space="preserve"
    >
      <g>
        <g id="Fullscreen">
          <path
            d="M384.97,12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833,0-11.922,5.39-11.934,12.223
			c0,6.821,5.101,11.838,11.934,11.838h96.062l-0.193,96.519c0,6.833,5.197,12.03,12.03,12.03c6.833-0.012,12.03-5.197,12.03-12.03
			l0.193-108.369c0-0.036-0.012-0.06-0.012-0.084C384.958,12.09,384.97,12.066,384.97,12.03z"
          />
          <path
            d="M120.496,0H12.403c-0.036,0-0.06,0.012-0.096,0.012C12.283,0.012,12.247,0,12.223,0C5.51,0,0.192,5.317,0.192,12.03
			L0,120.399c0,6.833,5.39,11.934,12.223,11.934c6.821,0,11.838-5.101,11.838-11.934l0.192-96.339h96.242
			c6.833,0,12.03-5.197,12.03-12.03C132.514,5.197,127.317,0,120.496,0z"
          />
          <path
            d="M120.123,360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0,257.833,0,264.667v108.092
			c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096c0,6.713,5.317,12.03,12.03,12.03h108.092
			c6.833,0,11.922-5.39,11.934-12.223C132.057,365.926,126.956,360.909,120.123,360.909z"
          />
          <path
            d="M372.747,252.913c-6.833,0-11.85,5.101-11.838,11.934v96.062h-96.242c-6.833,0-12.03,5.197-12.03,12.03
			s5.197,12.03,12.03,12.03h108.092c0.036,0,0.06-0.012,0.084-0.012c0.036-0.012,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V264.847C384.97,258.014,379.58,252.913,372.747,252.913z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
`;
const MINIMIZE_FULLSCREEN_ICON = `
<svg
      class="toggleFullscreenIcon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 385.331 385.331"
      style="enable-background: new 0 0 385.331 385.331"
      xml:space="preserve"
    >
      <g>
        <g id="Fullscreen_Exit">
          <path
            d="M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181
			c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084
			c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z"
          />
          <path
            d="M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03
			c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z"
          />
          <path
            d="M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423
			c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084
			c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z"
          />
          <path
            d="M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012
			c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242
			H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
`;

/* page starts with maximize fullscreen icon */
FULLSCREEN_BUTTON.innerHTML = MAXIMIZE_FULLSCREEN_ICON;

function toggleFullscreenIcon(isFullscreen) {
  if (isFullscreen) {
    // this icon is used in fullscreen
    FULLSCREEN_BUTTON.innerHTML = MINIMIZE_FULLSCREEN_ICON;
    FULLSCREEN_BUTTON.classList.add('fullscreen-activated');
  } else {
    // this icon isn't used in fullscreen
    FULLSCREEN_BUTTON.innerHTML = MAXIMIZE_FULLSCREEN_ICON;
    FULLSCREEN_BUTTON.classList.remove('fullscreen-activated');
  }
}

function toggleFullscreenMode() {
  let isMaximizeFullscreen = FULLSCREEN_BUTTON.classList.contains(
    'fullscreen-activated'
  );

  if (!isMaximizeFullscreen) {
    // turn on fullscreen mode
    ROOT_ELEMENT.requestFullscreen();
    toggleFullscreenIcon(true);
  } else {
    // turn off fullscreen mode
    document.exitFullscreen();
    toggleFullscreenIcon(false);
  }
}

FULLSCREEN_BUTTON.addEventListener('click', () => {
  toggleFullscreenMode();
});

function handleKeydownEvent(keydown) {
  if (keydown === 'F11') {
    toggleFullscreenIcon(true);
  }

  if (keydown === 'Escape' && menuIsOpen) {
    closeMenu();
  }
}

function revealElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach(element => {
      element.classList.remove('hide');
    });
    return;
  }
  elements.classList.remove('hide');
}

function hideElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach(element => {
      element.classList.add('hide');
    });
    return;
  }
  elements.classList.add('hide');
}

function openConfirmPopup(title, action_name, action) {
  CONFIRM_ACTION_CONTAINER.classList.add('confirm-popup');

  confirm_button_listener = () => {
    closeConfirmPopup();
    action();
  };
  CONFIRM_ACTION_CONTAINER.innerHTML = `
  <div class="confirm-action-popup__container">
    <h2 id="confirm-action-popup__title">${title}</h2>

    <div class="confirm-action-popup__confirm-buttons">
      <button
        type="button"
        class="confirm-buttons__confirm-button"
        id="confirm-button-action"
      >
        ${action_name}
      </button>

      <button
        type="button"
        class="confirm-buttons__confirm-button"
        id="cancel-confirm-popup-button"
      >
        Cancelar
      </button>
    </div>
  </div>
  `;

  document.body.appendChild(CONFIRM_ACTION_CONTAINER);
  document
    .getElementById('confirm-button-action')
    .addEventListener('click', confirm_button_listener);
  document
    .getElementById('cancel-confirm-popup-button')
    .addEventListener('click', closeConfirmPopup);
}

function closeConfirmPopup() {
  CONFIRM_ACTION_CONTAINER.classList.remove('confirm-popup');
  document
    .getElementById('confirm-button-action')
    .removeEventListener('click', confirm_button_listener);
}

function openMessageBox(msg) {
  message_box = document.createElement('div');
  message_box.classList.add('disabled-button-message-box');

  message_box.innerHTML = `
  <h2>Alerta:</h2>
  <p>${msg}</p>
  `;
  document.body.appendChild(message_box);
  setTimeout(() => {
    document
      .querySelector('.disabled-button-message-box')
      .classList.add('message-box--popup');
  }, 100);
}

function closeMessageBox() {
  document.body.removeChild(message_box);
}

function toggleElementsTabIndexWhileUserIsOffline(turnOnTabIndex) {
  BODY_CHILDREN = document.body.getElementsByTagName('*');

  for (let child = 0; child < BODY_CHILDREN.length; child++) {
    if (
      !INITIAL_PAGE_ELEMENTS.includes(BODY_CHILDREN[child].classList[0]) &&
      !INITIAL_PAGE_ELEMENTS.includes(BODY_CHILDREN[child].id)
    ) {
      if (turnOnTabIndex) {
        BODY_CHILDREN[child].removeAttribute('tabIndex');
      } else {
        BODY_CHILDREN[child].tabIndex = -1;
      }
    }
  }
}

function setDefaultSettings() {
  changeCurrentTemplate(onlineUser.userData.CurrentTemplate);
  setCurrentTemplateImage();
  setVolume(onlineUser.userData.sounds.volume);
  renderAchievements();
  resetTemporaryAchievements();
  levelUp();
  renderGeneralInfo();
  renderCurrentLevel(onlineUser.userData.lvl);
  toggleElementsTabIndexWhileUserIsOffline(true);
  hideElements(document.getElementById('combo'));

  if (onlineUser.userData.profilePicture.length) {
    renderProfilePictures(onlineUser.userData.profilePicture);
  } else {
    resetProfilePictures();
  }
}

document.body.onload = () => {
  getAccounts();
  let userIsOnline = isUserOnline();
  if (userIsOnline) {
    setDefaultSettings();
    renderClickOnWindowMessage();
  } else {
    toggleElementsTabIndexWhileUserIsOffline(false);
    removeLoaderContainer();
    removeClickOnWindowMessage();
    hideElements(FULLSCREEN_BUTTON);
  }
};

// Home
const HOME_AUDIO_TAG = document.querySelector('#home-music');
const HOME_AUDIO_SOURCE_TAG = document.querySelector('#home-music-file');
let Is_Home_Page = true;

function changeHomePageState(state) {
  Is_Home_Page = state;
}

function playHomeMusic() {
  HOME_AUDIO_SOURCE_TAG.src = TEMPLATES_DATA[currentTemplate].SoundTrack;
  HOME_AUDIO_TAG.load();
  HOME_AUDIO_TAG.play();
}

function stopHomeMusic() {
  HOME_AUDIO_TAG.pause();
  HOME_AUDIO_SOURCE_TAG.src = '';
}

// Commands
let result_element;

const COMMANDS_LIST = {
  error: {
    description: 'Esse comando envia um erro ao terminal.',
    command: function (error_message) {
      commandCall(error_message, () => {}, true);
    }
  },
  cra: {
    description: 'Esse comando mostra todas as contas cadastradas.',
    command: function (params) {
      let hasAllFlag;

      if (params) {
        hasAllFlag = params.includes('-all');
      }

      if (!hasAllFlag) {
        sendCommandError(
          'no-flag-and-params',
          `mm: cra só funciona assim: mm cra -all.`
        );
        return;
      }

      commandCall('- Juntando todas as contas existentes...', () => {
        const { username, password } = onlineUser.userData;
        if (accounts) {
          result_element.innerHTML = `<p>Contas: ${accounts.length}</p>`;

          if (accounts === 1) {
            result_element.innerHTML += `
            ${current_account}
            <ul>
              <li>- Usuário: ${username}</li>
              <li>- Senha: ${password}</li>
            </ul>
            `;
          } else {
            accounts.forEach((account, index) => {
              let on = username === account.username;
              let account_state = on ? 'Conectado' : 'Desconectado';

              result_element.innerHTML += `
              <p>Nº ${index + 1}<span class="${
                on && 'online'
              }"> (${account_state})</span>:</p>
              <ul>
                <li>- Usuário: ${account.username}</li>
                <li>- Senha: ${account.password}</li>
              </ul>
              `;
            });
          }
        } else {
          result_element.innerHTML = 'Infelizmente, conta não encontrada.';
        }
        addNewCommandBlock();
      });
    }
  },
  ga: {
    description: 'Esse comando mostra o nome + senha de uma conta especifíca.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'ga');
        return;
      }

      commandCall('- Procurando a conta...', () => {
        let username = command.replace('ga ', '');

        const ACCOUNT = getAccount(username);
        if (ACCOUNT) {
          result_element.innerHTML = `
        Conta:
        <ul>
          <li>- Usuário: ${ACCOUNT.username}</li>
          <li>- Senha: ${ACCOUNT.password}</li>
        </ul>
        `;
        } else {
          result_element.innerHTML = 'Infelizmente, conta não encontrada.';
        }
        addNewCommandBlock();
      });
    }
  },
  clear: {
    description: 'Esse comando limpa o terminal.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: clear não aceita parâmetros como "${params}". O formato correto é: mm clear.`
        );
        return;
      }

      document.querySelector('.terminal__command-blocks').innerHTML = '';
      addNewCommandBlock();
    }
  },
  logout: {
    description: 'Esse comando desconecta a sua conta.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: logout não aceita parâmetros como "${params}". O formato correto é: mm logout.`
        );
        return;
      }

      commandCall('- Shutting down...', logout);
    }
  },
  rpp: {
    description: 'Esse comando remove a sua foto de perfil.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: rpp não aceita parâmetros como "${params}". O formato correto é: mm rpp.`
        );
        return;
      }

      commandCall(
        '- Foto de perfil deletada com sucesso.',
        resetProfilePictures,
        true
      );
    }
  },
  da: {
    description:
      'Esse comando deleta uma conta especifíca ou todas as contas cadastradas.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'da');
        return;
      }

      let username, initial_message;

      if (!command.includes('-all')) {
        username = command.replace('da ', '');
        initial_message = '- Procurando a conta...';
      } else {
        initial_message = '- Coletando alguns dados...';
      }

      commandCall(
        initial_message,
        () => {
          const ACCOUNT = getAccount(username);

          function deleteAccountConfirmation(confirmation_response) {
            if (
              confirmation_response === 'y' ||
              confirmation_response === 'yes'
            ) {
              paragraph.removeChild(confirmation_input);
              result_element.removeChild(paragraph);

              paragraph.classList.add('not-selectable');
              confirmation_input.placeholder = confirmation_response;

              paragraph.appendChild(confirmation_input);
              result_element.appendChild(paragraph);

              if (!username) {
                result_element.innerHTML +=
                  '<p>- Todas as contas foram deletadas.</p>';
                localStorage.removeItem('accounts');
                logout();
              } else {
                result_element.innerHTML += '<p>- Conta deletada.</p>';
                deleteAccount(ACCOUNT);
              }
              addNewCommandBlock();
            }

            if (
              confirmation_response === 'n' ||
              confirmation_response === 'no'
            ) {
              document
                .querySelector('.--current-input-block')
                .classList.add('not-selectable');
              confirmation_input.placeholder = confirmation_response;
              addNewCommandBlock();
            }

            confirmation_input = document.querySelector(
              '.--current-input-block'
            ).lastElementChild;

            if (
              confirmation_response !== 'y' &&
              confirmation_response !== 'yes' &&
              confirmation_response !== 'n' &&
              confirmation_response !== 'no'
            ) {
              confirmation_input.value = '';
              return;
            }
            confirmation_input.blur();
            document
              .querySelector('.--current-input-block')
              .classList.remove('--current-input-block');
          }

          let paragraph = document.createElement('p');
          paragraph.classList.add('confirmation-input');
          paragraph.classList.add('--current-input-block');
          let confirmation_input = document.createElement('input');
          confirmation_input.type = 'text';
          confirmation_input.classList.add('terminal-input');
          confirmation_input.autocomplete = 'off';
          confirmation_input.spellcheck = 'false';
          confirmation_input.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
              deleteAccountConfirmation(confirmation_input.value);
            }
          });
          paragraph.innerHTML = '$ ';
          paragraph.appendChild(confirmation_input);

          if (!username) {
            // -all: it deletes all accounts
            result_element.innerHTML = `
            <p>Deletar todas as contas? (y para sim, n para não)</p>
            `;
            result_element.appendChild(paragraph);
            confirmation_input.focus();
          } else {
            // it deletes a specific account
            if (ACCOUNT) {
              result_element.innerHTML = `
            Conta:
            <ul>
              <li>- Usuário: ${ACCOUNT.username}</li>
              <li>- Senha: ${ACCOUNT.password}</li>
            </ul>
            <p>Deletar esta conta? (y para sim, n para não)</p>
            `;
              result_element.appendChild(paragraph);
              confirmation_input.focus();
            } else {
              result_element.innerHTML = 'Infelizmente, conta não encontrada.';
              addNewCommandBlock();
            }
          }
        },
        false
      );
    }
  },
  ra: {
    description:
      'Esse comando reinicia uma conquista especifíca ou todas as conquistas.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'ra');
        return;
      }

      commandCall(
        '- Coletando alguns dados...',
        () => {
          let achievement_input;

          if (!command.includes('-all')) {
            achievement_input = command.replace('ra ', '').trim();
          }

          if (achievement_input) {
            const ACHIEVEMENT = getAchievement(achievement_input)[0];

            if (ACHIEVEMENT) {
              // resets an specific achievement
              result_element.innerHTML = `Conquista: "${ACHIEVEMENT.name}" reiniciada com sucesso.`;
              resetAchievement(ACHIEVEMENT.name + ' -D');
            } else {
              result_element.innerHTML =
                'Infelizmente, conquista não encontrada.';
            }
          } else {
            // resets all the achievements
            result_element.innerHTML = `Todas as conquistas foram reiniciadas com sucesso.`;
            resetAllAchievements();
          }
          addNewCommandBlock();
        },
        false
      );
    }
  },
  rta: {
    description:
      'Esse comando reinicia as conquistas temporárias. (Vitórias seguidas etc.)',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: rta não aceita parâmetros como "${params}". O formato correto é: mm rta.`
        );
        return;
      }

      commandCall(
        '- Todas as conquistas temporárias foram reiniciadas com sucesso.',
        resetTemporaryAchievements,
        true
      );
    }
  }
};

function commandCall(initial_message, func, hasAddNewCommandBlock) {
  terminal_input.blur();
  terminal_input.setAttribute('disabled', '');

  const CURRENT_INPUT_BLOCK = document.querySelector('.--current-input-block');
  result_element = CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

  result_element.innerHTML = initial_message;
  CURRENT_INPUT_BLOCK.classList.add('not-selectable');
  CURRENT_INPUT_BLOCK.classList.remove('--current-input-block');

  const RESULT_ELEMENT_WIDTH = result_element.clientWidth;

  result_element.classList.add('--result-effect');
  const interval = setInterval(checkSessionState, 500);

  function checkSessionState() {
    if (result_element.clientWidth === RESULT_ELEMENT_WIDTH) {
      clearInterval(interval);
      result_element.classList.remove('--result-effect');
      result_element.style.borderRight = 'none';
      timeoutItems(func, 500);
      hasAddNewCommandBlock && addNewCommandBlock();
    }
  }
}

// Master Terminal
const TERMINAL = document.querySelector('.terminal');
const OPEN_MASTER_TERMINAL_BUTTON = document.querySelector(
  '.setting-button[data-setting="master-terminal"'
);
const TOGGLE_HELP_CENTER_BUTTON = document.querySelector(
  '.toggle-help-center-button'
);
let terminal_input;

function toggleHelpCenterVisibility() {
  if (TOGGLE_HELP_CENTER_BUTTON.classList.contains('less')) {
    // add plus icon
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg enable-background="new 0 0 50 50" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect height="50" width="50"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="6" x1="9" x2="41" y1="25" y2="25"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="6" x1="25" x2="25" y1="9" y2="41"/></svg>
    `;

    document.querySelector('.help-center__commands-list').classList.add('less');
    document
      .querySelector('.help-center__commands-list')
      .classList.remove('more');
  } else {
    // add minus icon
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 310.285 310.285" xml:space="preserve">
    <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142
      C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32
      c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"/>
    </svg>
    `;

    document
      .querySelector('.help-center__commands-list')
      .classList.remove('less');
    document.querySelector('.help-center__commands-list').classList.add('more');
  }

  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('less');
  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('more');
}

function sendCommandError(error, command) {
  if (error === 'none') {
    COMMANDS_LIST.error.command(
      `mm: ${command} não é um comando válido. Cheque a Central de Ajuda.`
    );
  }

  if (error === 'quote-error') {
    let command_name = command.slice(0, command.search('"')).trim();
    let command_input = command.slice(command.search('"'));
    COMMANDS_LIST.error.command(
      `mm: A entrada -&gt; ${command_input} &lt;- só pode conter duas aspas. O formato correto é: mm ${command_name} "valor".`
    );
  }

  if (error === 'no-params') {
    COMMANDS_LIST.error.command(
      `Abortando comando devido ao valor estar vazio. O formato correto é: mm ${command} "valor".`
    );
  }

  if (error === 'no-flag-and-params') {
    COMMANDS_LIST.error.command(command);
  }

  if (error === 'param-with-flag') {
    COMMANDS_LIST.error.command(
      `Abortando comando devido ao parâmetro com bandeira. mm ${command} não aceita parâmetros com bandeiras.`
    );
  }
}

function isCommandAvailable(command) {
  if (command === 'error') {
    return false;
  } else {
    return command in COMMANDS_LIST;
  }
}

function hasManyParams(command) {
  let [hasFlags, hasQuotes] = [false, false];
  let quotes = command.split('"').length - 1;
  let flag_index = command.search('-');
  let quote_index = command.search('"');

  if (quotes === 1 || quotes === 2) {
    hasQuotes = true;
  }

  if (flag_index !== -1) {
    hasFlags = true;
  }

  if (hasQuotes && hasFlags) {
    if (quote_index < flag_index) {
      command = command.slice(0, quote_index).trim();
    } else {
      command = command.slice(0, flag_index).trim();
    }

    if (isCommandAvailable(command)) {
      sendCommandError('param-with-flag', command);
    } else {
      sendCommandError('none', command);
    }
  }
  return hasQuotes && hasFlags;
}

function addNewCommandBlock() {
  const COMMAND_BLOCKS = document.querySelector('.terminal__command-blocks');
  const NEW_COMMAND_BLOCK = document.createElement('div');
  NEW_COMMAND_BLOCK.classList.add('command-blocks__block');
  NEW_COMMAND_BLOCK.innerHTML = `
  <div class="user-info">
    <p class="user-name">?</p>
    <p>@Jogo-da-Memória</p>
  </div>

  <div class="user-input-container --current-input-block">
    <label>$</label>
    <input
      type="text"
      class="terminal-input"
      spellcheck="false"
      autocomplete="off"
    />
  </div>

  <div class="command-result">
    <p class="command-result__result-message"></p>
  </div>
  `;

  COMMAND_BLOCKS.appendChild(NEW_COMMAND_BLOCK);
  COMMAND_BLOCKS.scrollTo(0, COMMAND_BLOCKS.scrollHeight);

  document.querySelector('.--current-input-block .terminal-input').focus();
  renderUsernames();
}

function handleTerminalInputSubmit() {
  if (!document.querySelector('.--current-input-block').lastElementChild.value)
    return;

  terminal_input = document.querySelector(
    '.--current-input-block .terminal-input'
  );

  let command = terminal_input.value.trim();
  let flag_index;

  if ((command.length && !command.includes('mm')) || command.length < 5) {
    sendCommandError('none', command);
    return;
  }
  command = command.replace('mm', '').trim();

  flag_index = command.search('-');

  if (hasManyParams(command)) return;

  // if flag is not -1, there's a flag
  if (flag_index !== -1) {
    const FLAG = command.slice(flag_index);
    command = command.replace(command.slice(flag_index), '').trim();

    isCommandAvailable(command)
      ? COMMANDS_LIST[command].command(FLAG)
      : sendCommandError('none', command);
    return;
  }

  if (command.includes('"')) {
    if (command.split('"').length - 1 !== 2) {
      sendCommandError('quote-error', command);
      return;
    }

    const PARAMETER_INDEX = command.search('"');
    command = command.replaceAll('"', '');

    const PARAMETER = command.slice(PARAMETER_INDEX);
    command = command.replace(command.slice(PARAMETER_INDEX), '').trim();

    isCommandAvailable(command)
      ? COMMANDS_LIST[command].command(PARAMETER)
      : sendCommandError('none', command);
    return;
  }

  isCommandAvailable(command)
    ? COMMANDS_LIST[command].command()
    : sendCommandError('none', command);
}

TOGGLE_HELP_CENTER_BUTTON.addEventListener('click', toggleHelpCenterVisibility);

TERMINAL.addEventListener('submit', event => {
  event.preventDefault();
});

TERMINAL.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleTerminalInputSubmit();
  }
});

// Game Algorithm
const SCOREBOARD = document.getElementById('score-points');
const MOVE_COUNT = document.querySelectorAll('.move-count');
const HEARTS = document.querySelectorAll('.hearts-container__heart');
const COMBO_ELEMENT = document.getElementById('combo');
const COMBO_AMOUNT_ELEMENT = document.getElementById('combo-amount');
let [win_streak, mistakes, max_combo] = [0, 0, 0];
let [isWin, isHardMatch] = [null, false];
let cards, interval;

const timing = {
  count: 0,
  start: function () {
    interval = setInterval(() => {
      timing.count++;
    }, 1000);
  },
  end: function () {
    clearInterval(interval);
  },
  render: function () {
    document.querySelectorAll('.timing-count').forEach(timing_count => {
      /*
        # s: seconds,
        # m: minutes,
        # h: hours,
        # d: days

        1 minute: 60s
        1 hour: 3600s -> (60m * 60s)
        1 day: 86400s -> (24h * 3600s)
      */

      // base unit of time in seconds
      let minute_baseUnit = 60;
      let hour_baseUnit = 60 * minute_baseUnit;
      let day_baseUnit = 24 * hour_baseUnit;

      /*
        Note: count is the amount of seconds the user spent playing a match

        - parseInt because float nums are not necessary here
        - days will be 1 or more if count is bigger than the day_baseUnit

        - On the other comment, you saw that a day is 86400. So, if I played a match for a day,
        days will be: 86400 / day_baseUnit (which is 86400). Result: 1
        
        - If I played for 2 days, the calculation will be:
        172800 / day_baseUnit (86400). Result: 2

        - If I played for less than a day, count will be any number below 86400, so:
        [ any number below 86400 / day_baseUnit -> Result: 0]
      */
      const days = parseInt(this.count / day_baseUnit);

      let seconds = this.count - days * day_baseUnit;
      const hours = parseInt(seconds / hour_baseUnit);
      seconds = seconds - hours * hour_baseUnit;
      const minutes = parseInt(seconds / minute_baseUnit);
      seconds = seconds - minutes * minute_baseUnit;

      if (days) {
        timing_count.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else if (hours) {
        timing_count.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes) {
        timing_count.innerHTML = `${minutes}m ${seconds}s`;
      } else {
        timing_count.innerHTML = `${seconds}s`;
      }
    });
  }
};

function updateWinStreak(wk) {
  win_streak = wk;
}

function startGame() {
  timing.start();
  stopHomeMusic();
  setDefaultSoundTrack();
  stopAllTemplateAnimations();

  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let firstCard, secondCard;
  let [withLives, hasFlippedCard, lockBoard, isCombo] = [
    false,
    false,
    false,
    false
  ];
  let [scorePoints, moves, cardSequence, combo_count] = [0, 0, 0, 0];
  let lives = 5;
  [mistakes, max_combo] = [0, 0];
  isHardMatch = false;
  COMBO_ELEMENT.style.top = '';
  COMBO_ELEMENT.style.left = '';
  changeHomePageState(false);

  if (
    !document
      .querySelector('.left-content__hearts-container')
      .classList.contains('hide')
  ) {
    resetHeartsColor();
    [withLives, isHardMatch] = [true, true];
  }

  [SCOREBOARD.innerHTML, scorePoints] = [0, 0];
  cards = document.querySelectorAll('.memory-card');
  changeMovesCount(0);

  function changeMovesCount(val) {
    MOVE_COUNT.forEach(moves_tag => {
      moves_tag.innerHTML = val;
    });
  }

  function resetHeartsColor() {
    for (let heart of HEARTS) {
      heart.classList.add('hearts-container__alive-heart');
      heart.classList.remove('hearts-container__dead-heart');
    }
  }

  function recoverHeart() {
    if (HEARTS[lives]) {
      HEARTS[lives].classList.remove('hearts-container__dead-heart');
      HEARTS[lives].classList.add('hearts-container__alive-heart');
      lives < 5 ? lives++ : null;
    }
  }

  function loseHeart() {
    lives--;
    HEARTS[lives].classList.remove('hearts-container__alive-heart');
    HEARTS[lives].classList.add('hearts-container__dead-heart');
    if (lives === 0) {
      setTimeout(() => {
        isWin = false;
        endGame('lostMatches', false);
      }, 800);
    }
  }

  function showCards() {
    lockBoard = true;

    cards.forEach(card => {
      card.classList.add('flip');
      setTimeout(() => {
        card.classList.remove('flip');
        lockBoard = false;
      }, 3000);
    });
  }

  function comboCards() {
    revealElements(COMBO_ELEMENT);

    COMBO_ELEMENT.classList.add('combo-animation');

    let right = secondCard.getBoundingClientRect().right;
    let top = secondCard.getBoundingClientRect().top;
    combo_count++;
    isCombo = true;

    COMBO_ELEMENT.style.top = `${top + 50}px`;
    COMBO_ELEMENT.style.left = `${right - 50}px`;

    COMBO_AMOUNT_ELEMENT.innerHTML = combo_count;

    if (combo_count > max_combo) {
      max_combo = combo_count;
    }

    timeoutItems(() => {
      hideElements(COMBO_ELEMENT);
      COMBO_ELEMENT.classList.remove('combo-animation');
      isCombo = false;
    }, 1000);

    timeoutItems(() => {
      if (!isCombo) {
        combo_count = 0;
      }
    }, 2000);
  }

  function flipCard() {
    if (lockBoard) return;

    if (!isAchievementObtained('Flip It!')) {
      updateAchievement('Flip It!', 1, true);
    }

    this.classList.add('flip');
    if (this === firstCard) return;

    moves++;
    changeMovesCount(moves);

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    // get back-face images' datasets
    let firstCardDataset = firstCard.children[1].dataset.character;
    let secondCardDataset = secondCard.children[1].dataset.character;
    let isMatch = firstCardDataset === secondCardDataset;
    let isObtained = isAchievementObtained('Perfect Move');

    if (isMatch) {
      comboCards();
      disableCards();
      cardSequence++;
      if (!isObtained && cardSequence <= 3) {
        updateAchievement('Perfect Move', cardSequence, cardSequence === 3);
      }
      withLives ? recoverHeart() : null;
    } else {
      cardSequence = 0;
      mistakes++;
      unflipCards();
      withLives ? loseHeart() : null;
    }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    scorePoints++;
    SCOREBOARD.innerHTML = scorePoints;
    if (scorePoints === cards.length / 2) {
      timeoutItems(() => {
        isWin = true;
        endGame('wonMatches', false);
      }, 1000);
    }

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPosition = Math.floor(Math.random() * cards.length);
      card.style.order = randomPosition;
    });
  })();

  function addCardsListeners() {
    cards.forEach(card => card.addEventListener('click', flipCard));
  }

  if (difficulty === 'Hard') {
    showCards();
  }

  addCardsListeners();
}

function checkResultsForAchievements() {
  if (isHardMatch && !isAchievementObtained('Player Harder Than Rock')) {
    updateAchievement('Player Harder Than Rock', 1, true);
  }

  if (!mistakes && !isAchievementObtained('Unstoppable')) {
    updateAchievement('Unstoppable', 1, true);
  }

  let win_achievements = [
    '3 wins',
    '5 wins',
    '15 wins',
    '50 wins',
    '100 wins',
    'Win Streak - Easy',
    'Win Streak - Normal',
    'Win Streak - Hard',
    'Win Streak - Insane'
  ];
  win_achievements.forEach(win_achievement => {
    if (!isAchievementObtained(win_achievement)) {
      if (win_achievement === 'Win Streak - Insane' && !isHardMatch) return;

      let achievementIndex = getAchievement(win_achievement)[1];
      const { current_progress } =
        onlineUser.userData.achievements_data.achievements[achievementIndex];
      const { total_progress } = ACHIEVEMENTS_DATA[achievementIndex];

      let progress = current_progress + 1;
      updateAchievement(win_achievement, progress, progress === total_progress);
    }
  });
}

function quitGame() {
  closeMenu();

  const { CurrentTemplate } = onlineUser.userData;
  if (isWin) {
    checkResultsForAchievements();
    renderLoaderContainer('Voltando ao Inicio...');
  } else {
    renderLoaderContainer('Se empenhe mais na proxima...');
    updateWinStreak(0);
    renderGeneralInfo();
  }
  isWin = null;

  changeHomePageState(true);
  stopSoundTrack();
  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }

  memoryDeck.innerHTML = '';

  const GAME_MENU = document.querySelector('.game-menu');

  hideElements(DECK_CONTAINER);
  fillRandomThemes();
  timeoutItems(BODY_CLASSLIST_TEMPLATE_OPTIONS[CurrentTemplate], 500);
  revealElements([GAME_MENU, document.querySelector('.languages')]);
}

function endGame(matchResult, isQuitGame) {
  timing.end();
  window.removeEventListener('resize', setDeckStyles);

  const { exp, matches } = onlineUser.userData;
  const END_GAME_TITLE = document.getElementById('match-result-title');
  const END_GAME_XP = document.getElementById('end-game-xp');
  const END_GAME_MAX_COMBO = document.getElementById('max-combo');
  let xp = 0;

  updateAccount(['matches'], matches + 1);
  updateAccount([matchResult], onlineUser.userData[matchResult] + 1);
  resetAchievement('Perfect Move');

  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item'
  );
  hideElements(topBarContainerIngameElements);
  TOP_BAR_CONTAINER.classList.remove('top-bar-container--background');

  openMenu('end-game-menu');
  timing.render();
  END_GAME_TITLE.innerHTML = isWin ? 'Vitoria!' : 'Game Over!';
  END_GAME_MAX_COMBO.innerHTML = max_combo;

  if (isQuitGame) {
    END_GAME_XP.innerHTML = 0;
    return;
  } else if (isWin) {
    xp = Math.round(Math.random() * (50 - 20) + 20);
    END_GAME_XP.innerHTML = xp;
    updateWinStreak(win_streak + 1);
  } else {
    xp = Math.round(Math.random() * (15 - 5) + 5);
    END_GAME_XP.innerHTML = xp;
  }
  let newXP = exp + xp;
  updateAccount(['exp'], newXP);
  updateExperienceBar(newXP, 0);
  renderGeneralInfo();
  levelUp();
}

document
  .querySelector('.deck-container__ingame-settings .quit-match-icon')
  .addEventListener('click', () => {
    isWin = false;
    endGame('lostMatches', true);
    quitGame();
  });
document
  .querySelector('.deck-container__end-game .quit-match-icon')
  .addEventListener('click', quitGame);

// Level Up
const LEVELS = {
  lvl1: {
    lvl: 1,
    exp: 100
  },
  lvl2: {
    lvl: 2,
    exp: 300
  },
  lvl3: {
    lvl: 3,
    exp: 500
  },
  lvl4: {
    lvl: 4,
    exp: 1000
  },
  lvl5: {
    lvl: 5,
    exp: 2000
  },
  lvl6: {
    lvl: 6,
    exp: 3500
  },
  lvl7: {
    lvl: 7,
    exp: 5000
  },
  lvl8: {
    lvl: 8,
    exp: 7000
  },
  lvl9: {
    lvl: 9,
    exp: 8000
  },
  lvl10: {
    lvl: 10,
    exp: 10000
  }
};

const EXP_CURRENT_PROGRESS_BARS = document.querySelectorAll(
  '.exp-progress__current-progress'
);
const LEVEL_CONTAINER_MIDDLE_CONTAINERS = document.querySelectorAll(
  '.level-container__middle-container'
);
const MIDDLE_CONTAINERS_CURRENT_LEVEL = document.querySelectorAll(
  '.middle-container__current-level'
);
let isExpProgressBarWidthUpdated = {
  state: false,
  width: 0
};

function levelUp() {
  isExpProgressBarWidthUpdated.state = false;

  const { lvl, exp } = onlineUser.userData;
  let next_level = lvl + 1;
  let next_level_xp = LEVELS[`lvl${next_level}`].exp;

  if (exp >= next_level_xp) {
    updateAccount(['lvl'], next_level);
    renderCurrentLevel(next_level);
    isExpProgressBarWidthUpdated.width = 100;
  } else {
    let bar_width = 100 * exp;
    isExpProgressBarWidthUpdated.width = bar_width / next_level_xp;
  }
  updateExperienceBar(exp, LEVELS[`lvl${onlineUser.userData.lvl + 1}`].exp);
}

function renderCurrentLevel(lvl) {
  MIDDLE_CONTAINERS_CURRENT_LEVEL.forEach(current_level => {
    current_level.innerHTML = lvl;
  });
}

function changeExpProgressBarWidth(is_lvl_up) {
  isExpProgressBarWidthUpdated.state = true;

  EXP_CURRENT_PROGRESS_BARS.forEach((PROGRESS_BAR, index) => {
    let middle_container = LEVEL_CONTAINER_MIDDLE_CONTAINERS[index];

    if (is_lvl_up) {
      PROGRESS_BAR.style.width = '100%';
      timeoutItems(() => {
        middle_container.style.backgroundColor = '#423535';
        PROGRESS_BAR.style.width = '0%';
        isExpProgressBarWidthUpdated.width = 0;
        levelUp();
        changeExpProgressBarWidth(false);
      }, 800);
      return;
    }

    if (isExpProgressBarWidthUpdated.width) {
      middle_container.classList.add('lvlup');
      middle_container.style.backgroundColor =
        'var(--window_message_text_color)';

      timeoutItems(() => {
        middle_container.classList.remove('lvlup');
        PROGRESS_BAR.style.width = `${isExpProgressBarWidthUpdated.width}%`;
      }, 800);
      return;
    }

    if (!isExpProgressBarWidthUpdated.width) {
      middle_container.style.backgroundColor = '#423535';
    }

    PROGRESS_BAR.style.width = `${isExpProgressBarWidthUpdated.width}%`;
  });
}

// Edit Profile Picture
// update profile picture
const PROFILE_PICTURE_OPTIONS = document.querySelectorAll(
  '.profile-picture-option'
);
const CHECKED_RADIO_INPUT_CONTAINER = document.querySelector(
  '.checked-radio-input-container'
);
const IMAGE_PREVIEW_CONTAINER = document.querySelector('.image-preview');
const SAVE_PROFILE_PICTURE_BUTTON = document.getElementById(
  'save-profile-picture-button'
);
const CANCEL_IMAGE_PREVIEW_BUTTON = document.getElementById(
  'cancel-image-preview'
);
let profile_picture_imgs = [];

function toggleReturnIconListener(currentMenu) {
  // 'preview_menu', 'main_menu', 'avatars_menu'
  if (currentMenu === 'main_menu') {
    // listener for return button in other menus
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', cancelImagePreview);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', showMainMenuInEditProfile);
  } else if (currentMenu === 'preview_menu') {
    // listener for return button in preview image menu
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', showMainMenuInEditProfile);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', cancelImagePreview);
  }
}

function showEditProfilePictureMenu() {
  hideElements(document.querySelector('.which-info-container'));
  revealElements(document.querySelector('.edit-profile-picture-container'));
}

function renderProfilePictures(data) {
  document.querySelector('.open-profile-menu').classList.add('hasPFP');
  document.querySelector('.profile-menu').classList.add('hasPFP');

  document.querySelectorAll('.user-profile-image').forEach(userProfileImage => {
    hideElements(document.querySelectorAll('.default-profile-picture'));
    revealElements(userProfileImage);
    userProfileImage.src = data;
  });
}

function renderProfilePicturesOptionsInfo() {
  const SAVE_PROFILE_PICTURE_BUTTON = document.getElementById(
    'save-profile-picture-button'
  );
  const PROFILE_PICTURE_OPTIONS = document.querySelector(
    '.profile-picture-options'
  );

  changeInputForImage();
  toggleReturnIconListener('main_menu');
  revealElements([
    SAVE_PROFILE_PICTURE_BUTTON,
    PROFILE_PICTURE_OPTIONS,
    CHECKED_RADIO_INPUT_CONTAINER
  ]);

  document.querySelector('.edit-profile-picture-container > h3').innerHTML =
    'Importe uma Imagem ou Insira um Link';
}

function renderCheckedRadioContainer(imgType) {
  if (imgType === 'img-link') {
    CHECKED_RADIO_INPUT_CONTAINER.innerHTML = `
      <label for="img-link">Link:</label>
      <input
        type="text"
        name="img-link"
        class="profile-picture-input"
      />
    `;
  }

  if (imgType === 'img-file') {
    CHECKED_RADIO_INPUT_CONTAINER.innerHTML = `
    <label for="img-file">Arquivo:</label>
    <input
      type="file"
      name="img-file"
      class="profile-picture-input"
    />
    `;
  }

  if (imgType === 'img-avatar') {
    renderAvatars(CHECKED_RADIO_INPUT_CONTAINER);
  }
}

function resetProfilePictures() {
  document.querySelector('.open-profile-menu').classList.remove('hasPFP');
  document.querySelector('.profile-menu').classList.remove('hasPFP');

  document.querySelectorAll('.user-profile-image').forEach(userProfileImage => {
    revealElements(document.querySelectorAll('.default-profile-picture'));
    hideElements(userProfileImage);
    userProfileImage.src = '';
  });

  updateProfilePicture('');
  closeEditAccountMenu();
}

function changeInputForImage() {
  if (!this) {
    let img_file = document.querySelector('.profile-picture-option#img-file');

    PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
      if (profile_pic_option === img_file) {
        profile_pic_option.setAttribute('checked', '');
        profile_pic_option.click();
        renderCheckedRadioContainer(img_file.id);
      } else {
        profile_pic_option.removeAttribute('checked');
      }
    });
  } else {
    PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
      if (profile_pic_option === this) {
        profile_pic_option.setAttribute('checked', '');
        renderCheckedRadioContainer(this.id);
      } else {
        profile_pic_option.removeAttribute('checked');
      }
    });
  }
}

function updateProfilePicture(file) {
  updateAccount(['profilePicture'], file);
}

function handlePreviewImageClick() {
  let [profilePic, img_file] = profile_picture_imgs;

  renderProfilePictures(profilePic);
  updateProfilePicture(img_file);
  closeEditAccountMenu();
}

function previewImage(avatar_img) {
  hideElements([
    document.querySelector('.profile-picture-options'),
    CHECKED_RADIO_INPUT_CONTAINER
  ]);
  revealElements(IMAGE_PREVIEW_CONTAINER);

  const EDIT_PROFILE_PICTURE_TITLE = document.querySelector(
    '.edit-profile-picture-container h3'
  );
  const IMAGE_PREVIEW_ELEMENT = document.querySelector('.image-preview__img');

  if (
    CHECKED_RADIO_INPUT_CONTAINER.children[0].classList.contains(
      'avatars-container'
    )
  ) {
    const SRC = avatar_img
      .slice(avatar_img.search('src="') + 5, avatar_img.search('alt') - 1)
      .replaceAll('"', '');

    IMAGE_PREVIEW_ELEMENT.src = SRC;
    profile_picture_imgs.push(SRC, SRC);
  } else {
    let input = CHECKED_RADIO_INPUT_CONTAINER.children[1];
    if (!input.value) return;
    let profilePic = null;

    if (input.name === 'img-file') {
      let imgURL = (window.URL ? URL : webkitURL).createObjectURL(
        input.files[0]
      );
      IMAGE_PREVIEW_ELEMENT.src = imgURL;
      profilePic = imgURL;

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        profile_picture_imgs.push(profilePic, reader.result);
      });
      reader.readAsDataURL(input.files[0]);
    } else {
      IMAGE_PREVIEW_ELEMENT.src = input.value;
      profilePic = input.value;
      profile_picture_imgs.push(profilePic, input.value);
    }
  }

  EDIT_PROFILE_PICTURE_TITLE.innerHTML = 'Pré-View da Imagem';
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Salvar Mudanças';
  SAVE_PROFILE_PICTURE_BUTTON.removeEventListener('click', previewImage);
  SAVE_PROFILE_PICTURE_BUTTON.addEventListener(
    'click',
    handlePreviewImageClick
  );
  toggleReturnIconListener('preview_menu');
}

function cancelImagePreview() {
  const IMAGE_PREVIEW_ELEMENT = document.querySelector('.image-preview__img');

  SAVE_PROFILE_PICTURE_BUTTON.removeEventListener(
    'click',
    handlePreviewImageClick
  );
  SAVE_PROFILE_PICTURE_BUTTON.addEventListener('click', previewImage);
  toggleReturnIconListener('main_menu');

  hideElements(IMAGE_PREVIEW_CONTAINER);

  if (CHECKED_RADIO_INPUT_CONTAINER.children[1]) {
    CHECKED_RADIO_INPUT_CONTAINER.children[1].value = '';
  }

  renderProfilePicturesOptionsInfo();
  profile_picture_imgs = [];
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Continuar';

  if (IMAGE_PREVIEW_ELEMENT.src.includes('avatars')) {
    document.querySelector('.profile-picture-option#img-avatar').click();
  }
  IMAGE_PREVIEW_ELEMENT.src = '';
}

document
  .getElementById('remove-profile-picture-button')
  .addEventListener('click', () => {
    toggleKebabMenu(false, false);

    openConfirmPopup('Remover Foto de Perfil?', 'Remover', () => {
      resetProfilePictures();
    });
  });

PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
  profile_pic_option.addEventListener('click', changeInputForImage);
});

document
  .getElementById('edit-profile-picture-button')
  .addEventListener('click', showEditProfilePictureMenu);

SAVE_PROFILE_PICTURE_BUTTON.addEventListener('click', previewImage);

CANCEL_IMAGE_PREVIEW_BUTTON.addEventListener('click', cancelImagePreview);

// Avatars
const AVATARS_DATA = [
  {
    avatar_name: 'Animals',
    avatars: {
      Avatar1: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/bear-avatar.png"
        alt="Bear Avatar"
      />
      `,
      Avatar2: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/cat-avatar.png"
        alt="Cat Avatar"
      />
      `,
      Avatar3: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/dog-avatar.png"
        alt="Dog Avatar"
      />
      `,
      Avatar4: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/lion-avatar.png"
        alt="Lion Avatar"
      />
      `,
      Avatar5: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/fox-avatar.png"
        alt="Fox Avatar"
      />
      `,
      Avatar6: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/giraffe-avatar.png"
        alt="Giraffe Avatar"
      />
      `,
      Avatar7: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/rabbit-avatar.png"
        alt="Rabbit Avatar"
      />
      `,
      Avatar8: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/animals-avatars/toucan-avatar.png"
        alt="Toucan Avatar"
      />
      `
    },
    backgrounds: {
      0: '--brown-background',
      1: '--gray-background',
      2: '--white-background',
      3: '--yellow-background',
      4: '--orange-background',
      5: '--yellow-background',
      6: '--orange-background',
      7: '--yellow-background'
    }
  },
  {
    avatar_name: 'Dragon Ball',
    avatars: {
      Avatar1: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/android-18-avatar.png"
        alt="Android 18 Avatar"
      />
      `,
      Avatar2: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/bulma-avatar.png"
        alt="Bulma Avatar"
      />
      `,
      Avatar3: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/gohan-avatar.png"
        alt="Gohan Avatar"
      />
      `,
      Avatar4: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/goku-avatar.png"
        alt="Goku Avatar"
      />
      `,
      Avatar5: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/caulifla-avatar.png"
        alt="Caulifla Avatar"
      />
      `,
      Avatar6: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/chi-chi-avatar.webp"
        alt="Chi Chi Avatar"
      />
      `,
      Avatar7: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/kuririn-avatar.png"
        alt="Kuririn Avatar"
      />
      `,
      Avatar8: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/dragon-ball-avatars/vegeta-avatar.png"
        alt="Vegeta Avatar"
      />
      `
    },
    backgrounds: {
      0: '--yellow-background',
      1: '--blue-background',
      2: '--orange-background',
      3: '--orange-background',
      4: '--pink-background',
      5: '--pink-background',
      6: '--orange-background',
      7: '--blue-background'
    }
  },
  {
    avatar_name: 'General',
    avatars: {
      Avatar1: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/cloud-avatar.png"
        alt="Cloud Avatar"
      />
      `,
      Avatar2: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/grass-smiley-avatar.png"
        alt="Grass Smiley Avatar"
      />
      `,
      Avatar3: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/guy-with-omnitrix-avatar.webp"
        alt="Guy with Omnitrix Avatar"
      />
      `,
      Avatar4: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/baby-avatar.webp"
        alt="Baby Avatar"
      />
      `,
      Avatar5: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/smiling-jerry-avatar.png"
        alt="Smiling Jerry Avatar"
      />
      `,
      Avatar6: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/stickman-avatar.webp"
        alt="Stickman Avatar"
      />
      `,
      Avatar7: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/sun-avatar.png"
        alt="Sun Avatar"
      />
      `,
      Avatar8: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/general-avatars/unicorn-avatar.png"
        alt="Unicorn Avatar"
      />
      `
    },
    backgrounds: {
      0: '--blue-background',
      1: '--green-background',
      2: '--green-background',
      3: '--white-background',
      4: '--gray-background',
      5: '--white-background',
      6: '--yellow-background',
      7: '--pink-background'
    }
  },
  {
    avatar_name: 'Professions',
    avatars: {
      Avatar1: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/astronaut-avatar.png"
        alt="Astronaut Avatar"
      />
      `,
      Avatar2: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/hacker-avatar.png"
        alt="Hacker Avatar"
      />
      `,
      Avatar3: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/engineer-avatar.png"
        alt="Engineer Avatar"
      />
      `,
      Avatar4: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/lumberjack-avatar.png"
        alt="Lumberjack Avatar"
      />
      `,
      Avatar5: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/man-doctor-avatar.png"
        alt="Doctor (Man) Avatar"
      />
      `,
      Avatar6: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/soldier-avatar.webp"
        alt="Soldier Avatar"
      />
      `,
      Avatar7: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/teacher-avatar.png"
        alt="Teacher Avatar"
      />
      `,
      Avatar8: `
      <img
        class="avatar__img"
        src="../src/assets/images/avatars/professions-avatars/woman-doctor-avatar.png"
        alt="Doctor (Woman) Avatar"
      />
      `
    },
    backgrounds: {
      0: '--white-background',
      1: '--gray-background',
      2: '--orange-background',
      3: '--red-background',
      4: '--white-background',
      5: '--green-background',
      6: '--yellow-background',
      7: '--brown-background'
    }
  }
];

function renderAvatars(CHECKED_RADIO_INPUT_CONTAINER) {
  const SAVE_PROFILE_PICTURE_BUTTON = document.getElementById(
    'save-profile-picture-button'
  );
  const PROFILE_PICTURE_OPTIONS = document.querySelector(
    '.profile-picture-options'
  );
  let circle_return_icon = document.querySelector(
    '.edit-profile-picture-container .circle-return-icon'
  );

  hideElements([PROFILE_PICTURE_OPTIONS, SAVE_PROFILE_PICTURE_BUTTON]);
  document.querySelector('.edit-profile-picture-container > h3').innerHTML =
    'Avatares';

  circle_return_icon.removeEventListener('click', showMainMenuInEditProfile);

  circle_return_icon.addEventListener(
    'click',
    renderProfilePicturesOptionsInfo
  );

  const AVATARS_CONTAINER = document.createElement('section');
  AVATARS_CONTAINER.classList.add('avatars-container');

  for (let index = 0; index < AVATARS_DATA.length; index++) {
    const { avatar_name, avatars, backgrounds } = AVATARS_DATA[index];

    const AVATAR_THEME = document.createElement('div');
    AVATAR_THEME.classList.add('avatars-container__avatar-theme');

    const AVATAR_THEME_TITLE = document.createElement('h4');
    AVATAR_THEME_TITLE.innerHTML = avatar_name;

    const AVATARS = document.createElement('div');
    AVATARS.classList.add('avatars');

    const AVATARS_IMAGES = Object.values(avatars);
    AVATARS_IMAGES.forEach((avatar_image, avatar_image_index) => {
      const AVATAR = document.createElement('div');
      AVATAR.addEventListener('click', () => {
        revealElements(SAVE_PROFILE_PICTURE_BUTTON);
        previewImage(avatar_image);
        circle_return_icon.removeEventListener(
          'click',
          renderProfilePicturesOptionsInfo
        );
        circle_return_icon.addEventListener('click', cancelImagePreview);
      });
      AVATAR.classList.add('avatar');
      AVATAR.classList.add(backgrounds[avatar_image_index]);
      AVATAR.innerHTML = avatar_image;
      AVATARS.appendChild(AVATAR);
    });

    AVATAR_THEME.appendChild(AVATAR_THEME_TITLE);
    AVATAR_THEME.appendChild(AVATARS);
    AVATARS_CONTAINER.appendChild(AVATAR_THEME);
  }
  CHECKED_RADIO_INPUT_CONTAINER.innerHTML = '';
  CHECKED_RADIO_INPUT_CONTAINER.appendChild(AVATARS_CONTAINER);
}

document.querySelectorAll('.avatar').forEach(avatar => {
  avatar.addEventListener('click', renderAvatars);
});

// Profile Section: General Info
const ACHIEVEMENTS_CONTAINER = document.querySelector('.achievements-section');
const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const OPEN_ACHIEVEMENTS_BUTTON = document.getElementById(
  'open-achievements-button'
);
const OPEN_GENERAL_INFO_BUTTON = document.getElementById(
  'open-general-info-button'
);

function showGeneralInfoSection() {
  if (GENERAL_INFO_CONTAINER.classList.contains('hide')) {
    OPEN_GENERAL_INFO_BUTTON.classList.add('profile-info-option--active');
    OPEN_ACHIEVEMENTS_BUTTON.classList.remove('profile-info-option--active');
    revealElements(GENERAL_INFO_CONTAINER);
    hideElements(ACHIEVEMENTS_CONTAINER);
  }
}

OPEN_GENERAL_INFO_BUTTON.addEventListener('click', showGeneralInfoSection);

// Achievements List
const ACHIEVEMENTS_DATA = [
  {
    title: 'Flip It!',
    description: 'Vire a sua primeira carta',
    xp: 20,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Perfect Move',
    description: 'Faça três combinações em uma partida',
    xp: 80,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Player Harder Than Rock',
    description: 'Vença sua primeira partida difícil',
    xp: 100,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Unstoppable',
    description: 'Vença uma partida sem perder uma combinação',
    xp: 180,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: '3 wins',
    description: 'Vença 3 partidas',
    xp: 300,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: '5 wins',
    description: 'Vença 5 partidas',
    xp: 500,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: '15 wins',
    description: 'Vença 15 partidas',
    xp: 1000,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 15,
    iterator_progress_bar_width: 100 / 15
  },
  {
    title: '50 wins',
    description: 'Vença 50 partidas',
    xp: 2000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 50,
    iterator_progress_bar_width: 100 / 50
  },
  {
    title: '100 wins',
    description: 'Vença 100 partidas',
    xp: 4000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 100,
    iterator_progress_bar_width: 100 / 100
  },
  {
    title: 'Win Streak - Easy',
    description: 'Consiga 3 vitórias seguidas em qualquer dificuldade',
    xp: 500,
    badge: 'win_streak_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Win Streak - Normal',
    description: 'Consiga 5 vitórias seguidas em qualquer dificuldade',
    xp: 600,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: 'Win Streak - Hard',
    description: 'Consiga 10 vitórias seguidas em qualquer dificuldade',
    xp: 1000,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 10,
    iterator_progress_bar_width: 100 / 10
  },
  {
    title: 'Win Streak - Insane',
    description: 'Consiga 20 vitórias seguidas em qualquer dificuldade',
    xp: 5000,
    badge: 'win_streak_badge',
    hierarchy: 'gold',
    total_progress: 20,
    iterator_progress_bar_width: 100 / 20
  }
];

// Achievements Badges
function renderBadge(achievement_data) {
  const { badge, hierarchy } = achievement_data;

  if (badge === 'card_badge') {
    return `
    <div class="card-badge">
      <div class="card">
        <p>
          <img
            src="../src/assets/images/themes/adventure-time-theme/front-face.webp"
            alt="Card - Front Face"
          />
        </p>
      </div>
      <div class="card flipped">
        <p>
          <img
            src="../src/assets/images/themes/adventure-time-theme/easy/finn.png"
            alt="Flipped Card"
          />
        </p>
      </div>
    </div>
    `;
  }

  if (badge === 'crown_badge') {
    return `
    <div class="crown-badge">
      <div class="crown-badge__crown --${hierarchy}"></div>
      <div class="crown-badge__bottom-piece --${hierarchy}"></div>
    </div>
    `;
  }

  if (badge === 'win_streak_badge') {
    return `
    <div class="win-streak-badge">
      <img
        src="../src/assets/images/icons/${hierarchy}-trophy.png"
        alt="Trophy Icon"
      />
    </div>
    `;
  }
}

// Achievements Algorithm
const ACHIEVEMENTS = document.querySelector(
  '.achievements-section__achievements'
);

const ACHIEVEMENT_POPUP_CONTAINER =
  document.querySelector('.achievement-popup');

let isPopUpActive = false;
let achievement_popup_queue = [];

function showAchievementsSection() {
  if (ACHIEVEMENTS_CONTAINER.classList.contains('hide')) {
    OPEN_ACHIEVEMENTS_BUTTON.classList.add('profile-info-option--active');
    OPEN_GENERAL_INFO_BUTTON.classList.remove('profile-info-option--active');

    hideElements(GENERAL_INFO_CONTAINER);
    revealElements(ACHIEVEMENTS_CONTAINER);
  }
  ACHIEVEMENTS.scrollTo(0, 0);
}

OPEN_ACHIEVEMENTS_BUTTON.addEventListener('click', showAchievementsSection);

function renderTotalAchievements() {
  const { amount } = onlineUser.userData.achievements_data;
  document.getElementById(
    'total-achievements'
  ).innerHTML = `${amount}/${ACHIEVEMENTS_DATA.length}`;
}

function renderAchievements() {
  renderTotalAchievements();

  for (let index = 0; index < ACHIEVEMENTS_DATA.length; index++) {
    const { current_progress } =
      onlineUser.userData.achievements_data.achievements[index];

    let achievement_container = document.createElement('div');
    achievement_container.classList.add('achievements__achievement');
    achievement_container.dataset.achievement = ACHIEVEMENTS_DATA[index].title;

    achievement_container.innerHTML = `
    <div class="achievement__badge-container">
      <div class="badge-container__custom-border">
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
      </div>

      ${renderBadge(ACHIEVEMENTS_DATA[index])}
    </div>

    <div class="achievement__achievement-info">
      <h4 class="achievement-info__title">${ACHIEVEMENTS_DATA[index].title}</h4>
      <p>${ACHIEVEMENTS_DATA[index].description}</p>
    </div>

    <p class="achievement__achievement-xp">${ACHIEVEMENTS_DATA[index].xp}XP</p>

    <div class="achievement__progress-bar">
      <div class="progress-bar__current-progress"></div>
      <p><span data-achievementprogress="${ACHIEVEMENTS_DATA[index].title}">${
      onlineUser.userData.achievements_data.achievements[index].current_progress
    }</span>/${ACHIEVEMENTS_DATA[index].total_progress}</p>
    </div>
    `;
    ACHIEVEMENTS.appendChild(achievement_container);
    setAchievementProgressBarWidth(
      ACHIEVEMENTS_DATA[index].title,
      index,
      current_progress,
      false
    );
  }
}

function setAchievementProgressBarWidth(
  achievementTitle,
  achievementIndex,
  current_progress,
  isPopUp
) {
  const { iterator_progress_bar_width, total_progress } =
    ACHIEVEMENTS_DATA[achievementIndex];
  let progress_bar_width = parseInt(
    current_progress * iterator_progress_bar_width
  );
  let progress_bar;

  if (isPopUp) {
    progress_bar = document.querySelector(
      `.achievement-popup[data-achievement="${achievementTitle}"] .progress-bar__current-progress`
    );
  } else {
    progress_bar = document.querySelector(
      `.achievements__achievement[data-achievement="${achievementTitle}"] .progress-bar__current-progress`
    );
  }

  if (current_progress === total_progress) {
    progress_bar.style.width = '100%';
  } else {
    progress_bar.style.width = `${progress_bar_width}%`;
  }

  document
    .querySelectorAll(`span[data-achievementprogress="${achievementTitle}"]`)
    .forEach(achievement_current_progress => {
      achievement_current_progress.innerHTML = current_progress;
    });
}

function popupAchievement(achievementIndex) {
  isPopUpActive = true;

  ACHIEVEMENT_POPUP_CONTAINER.innerHTML = '';

  const { current_progress } =
    onlineUser.userData.achievements_data.achievements[achievementIndex];

  const { title, description, xp, total_progress } =
    ACHIEVEMENTS_DATA[achievementIndex];

  ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement =
    ACHIEVEMENTS_DATA[achievementIndex].title;

  ACHIEVEMENT_POPUP_CONTAINER.innerHTML = `
    <div class="achievement__badge-container">
      <div class="badge-container__custom-border">
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
      </div>

      ${renderBadge(ACHIEVEMENTS_DATA[achievementIndex])}
    </div>

    <div class="achievement__achievement-info">
      <h4 class="achievement-info__title">${title}</h4>
      <p>${description}</p>
    </div>

    <p class="achievement__achievement-xp">${xp}XP</p>

    <div class="achievement__progress-bar">
      <div class="progress-bar__current-progress"></div>
      <p><span data-achievementprogress="${title}">${current_progress}</span>/${total_progress}</p>
    </div>
    `;

  setAchievementProgressBarWidth(
    title,
    achievementIndex,
    current_progress,
    true
  );
  ACHIEVEMENT_POPUP_CONTAINER.classList.add('achievement-popup--show');
  timeoutItems(() => {
    ACHIEVEMENT_POPUP_CONTAINER.classList.remove('achievement-popup--show');
    ACHIEVEMENT_POPUP_CONTAINER.removeAttribute('data-achievement');
    ACHIEVEMENT_POPUP_CONTAINER.innerHTML = '';
    isPopUpActive = false;

    if (achievement_popup_queue.length) {
      timeoutItems(() => {
        popupAchievement(achievement_popup_queue[0]);
        achievement_popup_queue.shift();
      }, 300);
    }
  }, 2000);
}

function getAchievement(achievementTitle) {
  let { achievements } = onlineUser.userData.achievements_data;
  let achievement_data = [];
  achievements.find((achievement, achievementIndex) => {
    if (achievement.name === achievementTitle) {
      achievement_data.push(achievement, achievementIndex);
    }
  });
  return achievement_data;
}

function isAchievementObtained(achievementTitle) {
  return onlineUser.userData.achievements_data.achievements[
    getAchievement(achievementTitle)[1]
  ].done;
}

function updateExperienceBar(exp, total_exp) {
  document.querySelectorAll('.xp-amount').forEach((xp_tag, index) => {
    xp_tag.innerHTML = exp;
    document.querySelectorAll('.next-level-xp')[index].innerHTML = total_exp;
  });
}

function updateAchievement(achievementTitle, currentProgress, isObtained) {
  const { exp } = onlineUser.userData;
  const { amount } = onlineUser.userData.achievements_data;

  let achievement = getAchievement(achievementTitle);
  let [_, achievementIndex] = achievement;

  updateAccount(
    ['achievements_data', 'achievements', achievementIndex, 'current_progress'],
    currentProgress
  );
  updateAccount(
    ['achievements_data', 'achievements', achievementIndex, 'done'],
    isObtained
  );

  if (
    isPopUpActive &&
    ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement === achievementTitle
  ) {
    setAchievementProgressBarWidth(
      achievementTitle,
      achievementIndex,
      currentProgress,
      true
    );
  }

  if (!isPopUpActive && currentProgress) {
    popupAchievement(achievementIndex);
  }

  if (
    isPopUpActive &&
    ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement !== achievementTitle
  ) {
    achievement_popup_queue.push(achievementIndex);
  }

  setAchievementProgressBarWidth(
    achievementTitle,
    achievementIndex,
    currentProgress,
    false
  );

  if (isObtained) {
    let newXP = exp + ACHIEVEMENTS_DATA[achievementIndex].xp;
    updateAccount(['exp'], newXP);
    updateExperienceBar(newXP, 0);
    levelUp();
    updateAccount(['achievements_data', 'amount'], amount + 1);
    renderTotalAchievements();
  }
}

function resetAllAchievements() {
  achievement_popup_queue = [];

  ACHIEVEMENTS_DATA.forEach(achievement => {
    updateAchievement(achievement.title, 0, false);
  });
  updateAccount(['achievements_data', 'amount'], 0);
  updateAccount(['exp'], 0);
  updateAccount(['lvl'], 0);
  updateAccount(['matches'], 0);
  updateAccount(['wonMatches'], 0);
  updateAccount(['lostMatches'], 0);
  levelUp();
  updateWinStreak(0);
  renderCurrentLevel(0);
  renderGeneralInfo();
  renderTotalAchievements();
}

function resetAchievement(achievementTitle) {
  const { exp } = onlineUser.userData;
  const { amount } = onlineUser.userData.achievements_data;

  if (achievementTitle.includes('-D')) {
    achievementTitle = achievementTitle.replace('-D', '').trim();
    let achievementIndex = getAchievement(achievementTitle)[1];
    let achievement_obtained = isAchievementObtained(achievementTitle);

    if (achievement_obtained) {
      let newXP = exp - ACHIEVEMENTS_DATA[achievementIndex].xp;
      exp > 0 && updateAccount(['exp'], newXP);
      levelUp();
    }

    if (amount && achievement_obtained) {
      amount && updateAccount(['achievements_data', 'amount'], amount - 1);
      renderTotalAchievements();
    }

    updateAchievement(achievementTitle, 0, false);
    return;
  }

  if (!isAchievementObtained(achievementTitle)) {
    updateAchievement(achievementTitle, 0, false);
  }
}

function resetTemporaryAchievements() {
  resetAchievement('Perfect Move');
  resetAchievement('Win Streak - Easy');
  resetAchievement('Win Streak - Normal');
  resetAchievement('Win Streak - Hard');
  resetAchievement('Win Streak - Insane');
  updateWinStreak(0);
  document.getElementById('win-streak').innerHTML = 0;
}

// Audio
const MUSIC_AUDIO_TAGS = document.querySelectorAll('.music-audio-tag');
const THEME_AUDIO_TAG = document.getElementById('theme-music');
const THEME_AUDIO_SOURCE_TAG = document.getElementById('theme-sound-track');
const VOLUME_INPUTS = document.querySelectorAll('.volume-input');
let [MusicIsActive, AudioIsActive] = [true, true];

function updateSoundsStatus() {
  let soundButtons;
  const { audio, music } = onlineUser.userData.sounds;
  [AudioIsActive, MusicIsActive] = [audio, music];

  soundButtons = document.querySelectorAll('.switch-sound-button');
  if (!AudioIsActive) {
    switchSoundButtonCSS(soundButtons);
  }

  soundButtons = document.querySelectorAll('.switch-music-button');
  if (!MusicIsActive) {
    switchSoundButtonCSS(soundButtons);
  }
}

function getPlayMusicButtons() {
  const PLAY_MUSIC_BUTTONS = document.querySelectorAll('.has-music');

  PLAY_MUSIC_BUTTONS.forEach(PLAY_MUSIC_BUTTON => {
    PLAY_MUSIC_BUTTON.addEventListener('click', function () {
      playSoundTrack(this);
    });
  });
}

function renderPlayMusicButtons() {
  const SOUNDTRACKS_AMOUNT = Object.keys(themes[btnThemeId].soundTracks).length;
  let musicButtonsContainer = document.querySelector('.music-options');
  musicButtonsContainer.innerHTML = '';

  for (let index = 1; index <= SOUNDTRACKS_AMOUNT; index++) {
    const MUSIC = `
    <div class="music">
      <button data-music="Music${index}" class="play-music-button has-music">Música ${index}</button>
    </div>
    `;

    const MUSIC_COMING_SOON = `
    <div class="music">
      <button data-music="ComingSoon" class="play-music-button">Em Breve...</button>
    </div>
    `;

    musicButtonsContainer.innerHTML += themes[btnThemeId].soundTracks[
      `Music${index}`
    ]
      ? MUSIC
      : MUSIC_COMING_SOON;
  }
  getPlayMusicButtons();
}

function setDefaultSoundTrack() {
  THEME_AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks.Music1;
  THEME_AUDIO_TAG.load();
}

function playDefaultSoundTrack() {
  setDefaultSoundTrack();
  THEME_AUDIO_TAG.load();
  THEME_AUDIO_TAG.play();
}

function playSoundTrack(playMusicButton) {
  if (!MusicIsActive) return;

  let chosenMusic = playMusicButton.dataset.music;
  THEME_AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks[chosenMusic];
  THEME_AUDIO_TAG.load();
  THEME_AUDIO_TAG.play();
}

function unpauseSoundTrack() {
  THEME_AUDIO_SOURCE_TAG.src === ''
    ? playDefaultSoundTrack()
    : THEME_AUDIO_TAG.play();
}

function pauseSoundTrack() {
  THEME_AUDIO_TAG.pause();
}

function stopSoundTrack() {
  THEME_AUDIO_TAG.pause();
  THEME_AUDIO_SOURCE_TAG.src = '';
}

// VOLUME_INPUT parameter is the range input for volume
function setVolume(VOLUME_INPUT) {
  let volumeValue;
  // setVolume(1) || setVolume(inputElement) -> number or HTML element
  if (VOLUME_INPUT.value) {
    volumeValue = VOLUME_INPUT.value;
  } else {
    volumeValue = VOLUME_INPUT;
  }

  for (let index = 0; index < MUSIC_AUDIO_TAGS.length; index++) {
    // all audio tags used for music and all range inputs receive the current volume.
    MUSIC_AUDIO_TAGS[index].volume = volumeValue;
    if (VOLUME_INPUTS[index]) {
      VOLUME_INPUTS[index].value = volumeValue;
      updateAccount(['sounds', 'volume'], Number(volumeValue));
    }
  }
}

// SOUND EFFECTS
const HOVER_SOUND_EFFECT = document.getElementById('hover-sound-effect');
const CLICK_SOUND_EFFECT = document.getElementById('click-setting-effect');

/* console.clear() has been used to hide the following error:
Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
*/
function playHoverSoundEffect() {
  if (!AudioIsActive) return;
  HOVER_SOUND_EFFECT.load();
  HOVER_SOUND_EFFECT.play();
  console.clear();
}

function stopHoverSoundEffect() {
  HOVER_SOUND_EFFECT.pause();
}

function playClickSoundEffect() {
  if (!AudioIsActive) return;
  HOVER_SOUND_EFFECT.pause();
  CLICK_SOUND_EFFECT.load();
  CLICK_SOUND_EFFECT.play();
  console.clear();
}

// Switch Audio Settings
const SWITCH_BUTTONS = document.querySelectorAll('.switch-button');
let audioButtons;

function switchAudioStyles(SwitchButton) {
  if (
    SwitchButton.classList.contains('switch-music-button') ||
    SwitchButton === 'switch-music-button'
  ) {
    audioButtons = document.querySelectorAll('.switch-music-button');
    switchMusic();
  } else {
    audioButtons = document.querySelectorAll('.switch-sound-button');
    switchSound();
  }

  switchSoundButtonCSS(audioButtons);
}

function switchSoundButtonCSS(soundButtons) {
  soundButtons.forEach(soundButton => {
    // turn off
    if (soundButton.classList.contains('active')) {
      soundButton.innerHTML = 'Off';
      soundButton.parentElement.classList.remove(
        'switch-audio-container--active'
      );
    } else {
      // turn on
      soundButton.innerHTML = 'On';
      soundButton.parentElement.classList.add('switch-audio-container--active');
    }
    soundButton.classList.toggle('active');
  });
}

function switchMusic() {
  MusicIsActive = !MusicIsActive;
  onlineUser.userData.sounds.music = MusicIsActive;

  if (!onlineUser.temporaryAccount) {
    localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
  }

  if (Is_Home_Page) {
    MusicIsActive ? playHomeMusic() : stopHomeMusic();
  } else {
    MusicIsActive ? unpauseSoundTrack() : pauseSoundTrack();
  }
}

function switchSound() {
  AudioIsActive = !AudioIsActive;
  updateAccount(['sounds', 'audio'], AudioIsActive);
}

SWITCH_BUTTONS.forEach(SWITCH_BUTTON => {
  SWITCH_BUTTON.addEventListener('click', function () {
    switchAudioStyles(this);
  });
});

VOLUME_INPUTS.forEach(VOLUME_INPUT => {
  VOLUME_INPUT.addEventListener('input', function () {
    setVolume(this);
  });
});

// Animations - Forest Template
// Bird Animation
const TEMPLATE_ANIMATION_CONTAINER = document.querySelector(
  '.game-menu__template-animation'
);
let birdAnimationInterval, perchedBirdTimeout, flyingBirdTimeout;

function startBirdAnimation() {
  TEMPLATE_ANIMATION_CONTAINER.innerHTML = `
  <img
    id="bird_image"
    src="../src/assets/gifs/single-bird-flying.gif"
    alt="Bird flying around"
  />
  `;
  TEMPLATE_ANIMATION_CONTAINER.classList.add('flying-animation');
  switchBirdState();
  setBirdPosition();
  setBirdAnimationInterval();
}

function setBirdAnimationInterval() {
  birdAnimationInterval = setInterval(switchBirdState, 20000);
}

function setBirdPosition() {
  // get title (h1) top and right position
  let titleTopPosition = document
    .getElementById('title-container__title')
    .getBoundingClientRect()
    .top.toFixed();

  let titleRightPosition = document
    .getElementById('title-container__title')
    .getBoundingClientRect()
    .right.toFixed();

  // set bird position through CSS variable at :root
  let root = document.querySelector(':root');

  root.style.setProperty(
    '--bird_top_position_animation',
    titleTopPosition + 'px'
  );
  root.style.setProperty(
    '--bird_left_position_animation',
    titleRightPosition - 35 + 'px'
  );

  /* W3Schools helped me to code the setBirdPosition algorithm:
    - https://www.w3schools.com/css/css3_variables_javascript.asp
  */
}

function resetBirdAnimation() {
  window.removeEventListener('resize', setBirdPosition, false);
  clearInterval(birdAnimationInterval);
  clearTimeout(perchedBirdTimeout);
  clearTimeout(flyingBirdTimeout);
  TEMPLATE_ANIMATION_CONTAINER.classList.remove('flying-animation');
  TEMPLATE_ANIMATION_CONTAINER.innerHTML = '';
}

function switchBirdState() {
  perchedBirdTimeout = setTimeout(() => {
    TEMPLATE_ANIMATION_CONTAINER.firstElementChild.src =
      '../src/assets/images/templates/forest_template/perched_bird.png';
  }, 8000);

  flyingBirdTimeout = setTimeout(() => {
    TEMPLATE_ANIMATION_CONTAINER.firstElementChild.src =
      '../src/assets/gifs/single-bird-flying.gif';
  }, 14000);
}

// Animations - Rainbow Template
let rainbow_template_timeouts = [];
let rainbow_template_viewport_width = document.body.clientWidth;
let isMobileScreen = rainbow_template_viewport_width <= 580;
let isLargerScreen = !isMobileScreen;
let isBreakpointUpdated = false;

let rainbow,
  left_unicorn,
  right_unicorn,
  rainbow_template_interval,
  start_rainbow_animation_class,
  end_rainbow_animation_class;

function getViewportWidthToAdjustRainbowPosition() {
  rainbow_template_viewport_width = document.body.clientWidth;
  isMobileScreen = document.body.clientWidth <= 580;

  if (isMobileScreen) {
    start_rainbow_animation_class = 'mobile-rainbow--start-animation';
    end_rainbow_animation_class = 'mobile-rainbow--end-animation';

    if (isLargerScreen) {
      isLargerScreen = false;
      isBreakpointUpdated = false;
    }
  } else {
    start_rainbow_animation_class = 'larger-screen-rainbow--start-animation';
    end_rainbow_animation_class = 'larger-screen-rainbow--end-animation';

    if (!isLargerScreen) {
      isLargerScreen = true;
      isBreakpointUpdated = false;
    }
  }

  if (!isBreakpointUpdated) {
    isBreakpointUpdated = true;
    resetUnicornAnimation();
    startUnicornAnimation();
  }
}

function startUnicornAnimation() {
  window.addEventListener('resize', getViewportWidthToAdjustRainbowPosition);

  if (rainbow_template_interval) {
    clearInterval(rainbow_template_interval);
  }

  let renderRainbowTemplateAnimationTimeout = setTimeout(() => {
    TEMPLATE_ANIMATION_CONTAINER.innerHTML = `
    <img
      id="left-corner-unicorn"
      class="rainbow-template__unicorn"
      src="../src/assets/images/templates/rainbow_template/unicorn-with-mouth-open.png"
      alt="Unicorn with its mouth open"
    />
    <img
      id="right-corner-unicorn"
      class="rainbow-template__unicorn"
      src="../src/assets/images/templates/rainbow_template/unicorn-with-mouth-open.png"
      alt="Unicorn with its mouth open"
    />
    <div class="rainbow"></div>
    `;
    rainbow_template_timeouts.push(renderRainbowTemplateAnimationTimeout);

    rainbow = document.querySelector('.rainbow');
    left_unicorn = document.getElementById('left-corner-unicorn');
    right_unicorn = document.getElementById('right-corner-unicorn');

    /*
    Rainbow Template | Animation Timings
    - 400
    - 1300
    - 4300
    - 5400
    - 9400
    */

    leftUnicornComes();
    startRainbowAnimation();
    rightUnicornComes();
    endRainbowAnimation();
    leftAndRightUnicornLeave();
    restartUnicornAnimation();
  }, 1000);
}

function restartUnicornAnimation() {
  rainbow_template_interval = setInterval(startUnicornAnimation, 9400);
}

function resetUnicornAnimation() {
  if (rainbow_template_timeouts) {
    rainbow_template_timeouts.forEach(rainbow_template_timeout => {
      clearTimeout(rainbow_template_timeout);
    });
  }

  if (rainbow_template_interval) {
    clearInterval(rainbow_template_interval);
  }

  window.removeEventListener('resize', getViewportWidthToAdjustRainbowPosition);

  TEMPLATE_ANIMATION_CONTAINER.innerHTML = '';
  [rainbow, left_unicorn, right_unicorn, rainbow_template_interval] = [
    null,
    null,
    null,
    null
  ];

  rainbow_template_timeouts = [];
  rainbow_template_viewport_width = document.body.clientWidth;

  isMobileScreen = rainbow_template_viewport_width <= 580;
  isLargerScreen = !isMobileScreen;
  isBreakpointUpdated = false;
}

function leftUnicornComes() {
  let leftUnicornTimeout = setTimeout(() => {
    left_unicorn.classList.add('left-unicorn-comes');
  }, 400);
  rainbow_template_timeouts.push(leftUnicornTimeout);
}

function rightUnicornComes() {
  let rightUnicornTimeout = setTimeout(() => {
    right_unicorn.classList.add('right-unicorn-comes');
  }, 4300);
  rainbow_template_timeouts.push(rightUnicornTimeout);
}

function startRainbowAnimation() {
  let startRainbowAnimationTimeout = setTimeout(() => {
    rainbow.classList.add(start_rainbow_animation_class);
  }, 1300);
  rainbow_template_timeouts.push(startRainbowAnimationTimeout);
}

function endRainbowAnimation() {
  let endRainbowAnimationTimeout = setTimeout(() => {
    rainbow.classList.remove(start_rainbow_animation_class);
    rainbow.classList.add(end_rainbow_animation_class);
  }, 5400);
  rainbow_template_timeouts.push(endRainbowAnimationTimeout);
}

function leftAndRightUnicornLeave() {
  let leftAndRightUnicornLeaveTimeout = setTimeout(() => {
    left_unicorn.classList.remove('left-unicorn-comes');
    right_unicorn.classList.remove('right-unicorn-comes');
  }, 9400);
  rainbow_template_timeouts.push(leftAndRightUnicornLeaveTimeout);
}

// Animations - Military Template
let ARMY_SOLDIERS_ANIMATION_INTERVAL, LEFT_SOLDIER, RIGHT_SOLDIER, BULLET;
let ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST = [];

function startArmySoldiersAnimation() {
  document.querySelector('.game-menu__template-animation').innerHTML = `
  <img class="army_soldier" id="left_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <img class="army_soldier" id="right_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <div id="bullet"></div>
  `;

  LEFT_SOLDIER = document.querySelector('#left_army_soldier');
  RIGHT_SOLDIER = document.querySelector('#right_army_soldier');
  BULLET = document.querySelector('#bullet');

  setArmySoldiersActions();
  ARMY_SOLDIERS_ANIMATION_INTERVAL = setInterval(setArmySoldiersActions, 6500);
}

function setArmySoldiersActions() {
  leftSoldierShoot();
  rightSoldierGoesUp();
  rightSoldierShootToTheBottom();
  leftSoldierGoesUp();
  rightSoldierGoesDown();
  rightSoldierShootToTheTop();
  leftSoldierGoesDown();
}

function resetArmySoldiersAnimation() {
  clearInterval(ARMY_SOLDIERS_ANIMATION_INTERVAL);

  // clear time out
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.forEach(
    ARMY_SOLDIERS_ANIMATION_TIMEOUT => {
      clearTimeout(ARMY_SOLDIERS_ANIMATION_TIMEOUT);
    }
  );

  document.querySelector('.game-menu__template-animation').innerHTML = '';
}

function leftSoldierShoot() {
  BULLET.style.display = 'block';
  BULLET.classList.add('HorizontalBulletAnimation');

  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.classList.remove('HorizontalBulletAnimation');
      BULLET.style.display = 'none';
    }, 1500)
  );
}

function rightSoldierGoesUp() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.classList.add('RightSoldierAnimation');
      rightSoldierStands();
    }, 600)
  );
}

function rightSoldierStands() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(0deg)';
      RIGHT_SOLDIER.style.top = '5%';
      RIGHT_SOLDIER.classList.remove('RightSoldierAnimation');
    }, 1000)
  );
}

function rightSoldierShootToTheBottom() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.style.display = 'block';
      BULLET.classList.add('RightSoldierShootToTheBottomAnimation');
    }, 1600)
  );
}

function leftSoldierGoesUp() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      LEFT_SOLDIER.classList.add('LeftSoldierAnimation');
      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          BULLET.classList.remove('RightSoldierShootToTheBottomAnimation');
          BULLET.style.display = 'none';
          BULLET.style.top = '10%';

          LEFT_SOLDIER.style.top = '5%';
          LEFT_SOLDIER.classList.remove('LeftSoldierAnimation');
          leftSoldierShoot();
        }, 1000)
      );
    }, 2000)
  );
}

function rightSoldierGoesDown() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.classList.add('RightSoldierGoesDown');
      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(-15deg)';
          RIGHT_SOLDIER.style.top = '30%';
          RIGHT_SOLDIER.classList.remove('RightSoldierGoesDown');
        }, 1000)
      );
    }, 3600)
  );
}

function rightSoldierShootToTheTop() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.style.display = 'block';
      BULLET.classList.add('RightSoldierShootToTheTopAnimation');

      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          BULLET.style.display = 'none';
          BULLET.classList.remove('RightSoldierShootToTheTopAnimation');
        }, 1500)
      );
    }, 4600)
  );
}

function leftSoldierGoesDown() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      LEFT_SOLDIER.classList.add('LeftSoldierGoesDown');

      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          LEFT_SOLDIER.style.top = '30%';
          LEFT_SOLDIER.classList.remove('LeftSoldierGoesDown');
          BULLET.style.top = '36%';
        }, 1000)
      );
    }, 5000)
  );
}
