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
  hideElements(document.querySelector('.edit_profile_menu'));
}

document
  .querySelector('.editProfileButton')
  .addEventListener('click', showEditAccountMenu);

// update profile picture
function showEditProfilePictureMenu() {
  hideElements(document.querySelector('.which_info_container'));
  revealElements(document.querySelector('.edit_profile_picture_container'));
}

function renderProfilePictures() {
  document
    .querySelectorAll('.profile_picture_container')
    .forEach(profile_pic_container => {
      profile_pic_container.innerHTML = onlineUser.userData.profilePicture;
    });
}

document
  .getElementById('editProfilePictureButton')
  .addEventListener('click', showEditProfilePictureMenu);

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
  renderUsernames,
  searchUsername,
  searchAccount,
  authError
};
