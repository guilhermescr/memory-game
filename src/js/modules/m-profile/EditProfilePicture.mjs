import { hideElements, revealElements } from '../../main.js';
import {
  closeEditAccountMenu,
  showMainMenuInEditProfile,
  toggleKebabMenu,
  updateAccount
} from '../auth/AccountMethods.mjs';
import { renderAvatars } from './m-avatars/Avatars.mjs';

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

function toggleReturnIconListener(cancel_image) {
  if (cancel_image) {
    // listener for return button in preview image menu
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', showMainMenuInEditProfile);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', cancelImagePreview);
  } else {
    // listener for return button in other menus
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .removeEventListener('click', cancelImagePreview);
    document
      .querySelector('.edit-profile-picture-container .circle-return-icon')
      .addEventListener('click', showMainMenuInEditProfile);
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
    <label for="img-file">File:</label>
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
  PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
    if (profile_pic_option === this) {
      profile_pic_option.setAttribute('checked', '');
      renderCheckedRadioContainer(this.id);
    } else {
      profile_pic_option.removeAttribute('checked');
    }
  });
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
  // reveal this document.querySelector('.profile-picture-options'),
  revealElements([CHECKED_RADIO_INPUT_CONTAINER]);

  profile_picture_imgs = [];
  imgPreview_img.src = '';
  // CHECKED_RADIO_INPUT_CONTAINER.children[1].value = '';
  EDIT_PROFILE_PICTURE_TITLE.innerHTML = 'Upload an image or Insert a link';
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Continue';
}

document
  .getElementById('remove-profile-picture-button')
  .addEventListener('click', () => {
    resetProfilePictures();
    toggleKebabMenu();
  });

PROFILE_PICTURE_OPTIONS.forEach(profile_pic_option => {
  profile_pic_option.addEventListener('click', changeInputForImage);
});

document
  .getElementById('edit-profile-picture-button')
  .addEventListener('click', showEditProfilePictureMenu);

SAVE_PROFILE_PICTURE_BUTTON.addEventListener('click', previewImage);

CANCEL_IMAGE_PREVIEW_BUTTON.addEventListener('click', cancelImagePreview);

export { renderProfilePictures, resetProfilePictures, cancelImagePreview };
