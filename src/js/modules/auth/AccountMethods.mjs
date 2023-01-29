import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

import { hideElements, revealElements, timeoutItems } from '../../main.js';
import { win_streak } from '../gameAlgorithm.mjs';
import { updateSoundsStatus } from '../m-audio/audio.mjs';
import { endAuthPage, logout } from './AuthService.mjs';

let accounts = [];
const onlineUser = {
  online: false,
  userData: {}
};

function getCreationDate() {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let am_pm;

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
  localStorage.setItem('accounts', JSON.stringify(accounts));
  localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
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
  .getElementById('remove-profile-picture-button')
  .addEventListener('click', () => {
    resetProfilePictures();
    toggleKebabMenu();
  });

document
  .querySelector('.close-edit-profile-menu-icon')
  .addEventListener('click', closeEditAccountMenu);

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
  } else {
    CHECKED_RADIO_INPUT_CONTAINER.innerHTML = `
    <label for="img-file">File:</label>
    <input
      type="file"
      name="img-file"
      class="profile-picture-input"
    />
    `;
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
  if (!PROFILE_PICTURE_OPTIONS[0].checked) {
    PROFILE_PICTURE_OPTIONS[0].removeAttribute('checked');
    PROFILE_PICTURE_OPTIONS[1].setAttribute('checked', '');
    renderCheckedRadioContainer('img-link');
  } else {
    PROFILE_PICTURE_OPTIONS[0].setAttribute('checked', '');
    PROFILE_PICTURE_OPTIONS[1].removeAttribute('checked');
    renderCheckedRadioContainer('img-file');
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

function toggleReturnIconListener(cancel_image) {
  if (cancel_image) {
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', showMainMenuInEditProfile);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', cancelImagePreview);
  } else {
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', cancelImagePreview);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', showMainMenuInEditProfile);
  }
}

function previewImage() {
  let input = CHECKED_RADIO_INPUT_CONTAINER.children[1];
  if (!input.value) return;
  let imgPreview_img = document.querySelector('.image-preview__img');
  let profilePic = null;
  const EDIT_PROFILE_PICTURE_TITLE = document.querySelector(
    '.edit-profile-picture-container h3'
  );

  hideElements([
    document.querySelector('.profile-picture-options'),
    CHECKED_RADIO_INPUT_CONTAINER
  ]);
  revealElements(IMAGE_PREVIEW_CONTAINER);

  if (input.name === 'img-file') {
    let imgURL = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    imgPreview_img.src = imgURL;
    profilePic = imgURL;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      profile_picture_imgs.push(profilePic, reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  } else {
    imgPreview_img.src = input.value;
    profilePic = input.value;
    profile_picture_imgs.push(profilePic, input.value);
  }

  EDIT_PROFILE_PICTURE_TITLE.innerHTML = 'Image Preview';
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Save Changes';
  SAVE_PROFILE_PICTURE_BUTTON.removeEventListener('click', previewImage);
  SAVE_PROFILE_PICTURE_BUTTON.addEventListener(
    'click',
    handlePreviewImageClick
  );
  toggleReturnIconListener(true);
}

function cancelImagePreview() {
  const EDIT_PROFILE_PICTURE_TITLE = document.querySelector(
    '.edit-profile-picture-container h3'
  );
  let imgPreview_img = document.querySelector('.image-preview__img');

  SAVE_PROFILE_PICTURE_BUTTON.removeEventListener(
    'click',
    handlePreviewImageClick
  );
  SAVE_PROFILE_PICTURE_BUTTON.addEventListener('click', previewImage);
  toggleReturnIconListener(false);

  hideElements(IMAGE_PREVIEW_CONTAINER);
  revealElements([
    document.querySelector('.profile-picture-options'),
    CHECKED_RADIO_INPUT_CONTAINER
  ]);

  profile_picture_imgs = [];
  imgPreview_img.src = '';
  CHECKED_RADIO_INPUT_CONTAINER.children[1].value = '';
  EDIT_PROFILE_PICTURE_TITLE.innerHTML = 'Upload an image or Insert a link';
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Continue';
}

function deleteAccount(account) {
  let isOnlineUser = account === 'online_user';
  if (isOnlineUser) {
    accounts = accounts.filter(
      $account => $account.id !== onlineUser.userData.id
    );
  } else {
    accounts = accounts.filter($account => $account.id !== account.id);
  }

  if (accounts.length) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  } else {
    localStorage.removeItem('accounts');
  }
  isOnlineUser && logout();
}

PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
  profile_pic_option.addEventListener('click', changeInputForImage);
});

document
  .getElementById('edit-profile-picture-button')
  .addEventListener('click', showEditProfilePictureMenu);

SAVE_PROFILE_PICTURE_BUTTON.addEventListener('click', previewImage);

CANCEL_IMAGE_PREVIEW_BUTTON.addEventListener('click', cancelImagePreview);

document.querySelectorAll('.circle-return-icon').forEach(circle_return_icon => {
  circle_return_icon.addEventListener('click', showMainMenuInEditProfile);
});

document
  .querySelector('.delete-profile-button')
  .addEventListener('click', () => {
    deleteAccount('online_user');
  });

// kebab code
const KEBAB_ICON = document.querySelector('.kebab-icon');
const KEBAB_MENU = document.querySelector('.kebab-menu');
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

export {
  createAccount,
  updateAccount,
  accounts,
  getAccounts,
  getAccount,
  deleteAccount,
  onlineUser,
  setOnlineUser,
  isUserOnline,
  renderGeneralInfo,
  resetProfilePictures,
  renderProfilePictures,
  renderUsernames,
  searchUsername,
  searchAccount,
  authError,
  closeEditAccountMenu
};
