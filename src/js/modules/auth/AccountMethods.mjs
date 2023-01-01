import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

import { hideElements, revealElements, timeoutItems } from '../../main.js';
import { updateSoundsStatus } from '../m-audio/audio.mjs';
import { endAuthPage } from './AuthService.mjs';

let accounts = [];
const onlineUser = {
  online: false,
  userData: {}
};

function searchUsername($username) {
  const userName = accounts.find($account => $account.username === $username);
  return userName === undefined; // check if username is available
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
      profilePicture: '',
      id: uuidv4(),
      exp: 0,
      matches: 0,
      wonMatches: 0,
      lostMatches: 0,
      achievements: {
        amount: 0
      },
      sounds: {
        music: true,
        audio: true,
        volume: 1
      },
      CurrentTemplate: 'forest_template'
    };
    accounts.push(userData);

    localStorage.setItem('accounts', JSON.stringify(accounts));
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
  localStorage.setItem('accounts', JSON.stringify(accounts));
  localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
}

function showEditAccountMenu() {
  revealElements(document.querySelector('.edit_profile_menu'));
}

function closeEditAccountMenu() {
  let EDIT_PROFILE_MENU_OPTIONS = document.querySelectorAll(
    '.edit_profile_menu_option'
  );

  for (let index = 0; index < EDIT_PROFILE_MENU_OPTIONS.length; index++) {
    if (index !== 0) {
      hideElements(EDIT_PROFILE_MENU_OPTIONS[index]);
    } else {
      revealElements(EDIT_PROFILE_MENU_OPTIONS[index]);
    }
  }

  hideElements(document.querySelector('.edit_profile_menu'));
}

document
  .querySelector('.editProfileButton')
  .addEventListener('click', showEditAccountMenu);

document
  .getElementById('removeProfilePictureButton')
  .addEventListener('click', () => {
    resetProfilePictures();
    toggleKebabMenu();
  });

document
  .querySelector('.close_edit_profile_menu_icon')
  .addEventListener('click', closeEditAccountMenu);

// update profile picture
const PROFILE_PICTURE_OPTIONS = document.querySelectorAll(
  '.profile_picture_option'
);
const CHECKED_RADIO_INPUT_CONTAINER = document.querySelector(
  '.checked_radio_input_container'
);

function showEditProfilePictureMenu() {
  hideElements(document.querySelector('.which_info_container'));
  revealElements(document.querySelector('.edit_profile_picture_container'));
}

function renderProfilePictures(data) {
  document.querySelector('.open_profile_menu').classList.add('hasPFP');
  document.querySelector('.profile_menu').classList.add('hasPFP');

  document.querySelectorAll('.userProfileImage').forEach(userProfileImage => {
    hideElements(document.querySelectorAll('.default_profile_picture'));
    revealElements(userProfileImage);
    userProfileImage.src = data;
  });
}

function renderCheckedRadioContainer(imgType) {
  if (imgType === 'imgLink') {
    CHECKED_RADIO_INPUT_CONTAINER.innerHTML = `
      <label for="imgLink">Link:</label>
      <input
        type="text"
        name="imgLink"
        class="profilePictureInput"
      />
    `;
  } else {
    CHECKED_RADIO_INPUT_CONTAINER.innerHTML = `
    <label for="imgFile">File:</label>
    <input
      type="file"
      name="imgFile"
      class="profilePictureInput"
    />
    `;
  }
}

function resetProfilePictures() {
  document.querySelector('.open_profile_menu').classList.remove('hasPFP');
  document.querySelector('.profile_menu').classList.remove('hasPFP');

  document.querySelectorAll('.userProfileImage').forEach(userProfileImage => {
    revealElements(document.querySelectorAll('.default_profile_picture'));
    hideElements(userProfileImage);
    userProfileImage.src = '';
  });

  updateAccount(['profilePicture'], '');
  closeEditAccountMenu();
}

function changeInputForImage() {
  if (!PROFILE_PICTURE_OPTIONS[0].checked) {
    PROFILE_PICTURE_OPTIONS[0].removeAttribute('checked');
    PROFILE_PICTURE_OPTIONS[1].setAttribute('checked', '');
    renderCheckedRadioContainer('imgLink');
  } else {
    PROFILE_PICTURE_OPTIONS[0].setAttribute('checked', '');
    PROFILE_PICTURE_OPTIONS[1].removeAttribute('checked');
    renderCheckedRadioContainer('imgFile');
  }
}

function updateProfilePicture() {
  let input = CHECKED_RADIO_INPUT_CONTAINER.children[1];

  if (input.name === 'imgFile') {
    let imgURL = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    renderProfilePictures(imgURL);

    const reader = new FileReader();
    let img;

    reader.addEventListener('load', () => {
      img = reader.result;
      updateAccount(['profilePicture'], img);
    });
    reader.readAsDataURL(input.files[0]);
  } else {
    updateAccount(['profilePicture'], input.value);
    renderProfilePictures(input.value);
  }
  input.value = '';
  closeEditAccountMenu();
}

PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
  profile_pic_option.addEventListener('click', changeInputForImage);
});

document
  .getElementById('editProfilePictureButton')
  .addEventListener('click', showEditProfilePictureMenu);

document
  .getElementById('saveProfilePictureButton')
  .addEventListener('click', updateProfilePicture);

// kebab code
const KEBAB_ICON = document.querySelector('.kebabIcon');
const KEBAB_MENU = document.querySelector('.kebab_menu');
let isKebabMenuOpen = false;

function toggleKebabMenu() {
  if (!isKebabMenuOpen) {
    revealElements(KEBAB_MENU);
  } else {
    hideElements(KEBAB_MENU);
  }

  isKebabMenuOpen = !isKebabMenuOpen;
}

KEBAB_ICON.addEventListener('click', toggleKebabMenu);

// update username
function showEditUsernameMenu() {
  hideElements(document.querySelector('.which_info_container'));
  revealElements(document.querySelector('.edit_username_container'));
}

function renderUsernames() {
  document
    .querySelectorAll('.user_name')
    .forEach(
      usernameTag => (usernameTag.innerHTML = onlineUser.userData.username)
    );
}

function updateUsername() {
  let newUsername = document.getElementById('usernameInput').value;
  document.getElementById('usernameInput').value = '';

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
  .getElementById('editUsernameButton')
  .addEventListener('click', showEditUsernameMenu);

document
  .getElementById('saveUsernameButton')
  .addEventListener('click', updateUsername);

function setOnlineUser(account) {
  onlineUser.online = true;
  onlineUser.userData = account;
  console.log(onlineUser);

  localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
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
    console.log('Create an account and start playing!');
  }
}

function authError(msg) {
  const authErrorElement = document.getElementById('authError');
  authErrorElement.innerHTML = msg;

  revealElements(authErrorElement);
  timeoutItems(() => {
    hideElements(authErrorElement);
  }, 3000);
}

export {
  createAccount,
  updateAccount,
  getAccounts,
  onlineUser,
  setOnlineUser,
  isUserOnline,
  resetProfilePictures,
  renderProfilePictures,
  renderUsernames,
  searchUsername,
  searchAccount,
  authError
};
