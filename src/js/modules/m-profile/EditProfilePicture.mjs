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
    'Upload an image or Insert a link';
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

  EDIT_PROFILE_PICTURE_TITLE.innerHTML = 'Image Preview';
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Save Changes';
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
  SAVE_PROFILE_PICTURE_BUTTON.innerHTML = 'Continue';

  if (IMAGE_PREVIEW_ELEMENT.src.includes('avatars')) {
    document.querySelector('.profile-picture-option#img-avatar').click();
  }
  IMAGE_PREVIEW_ELEMENT.src = '';
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

export {
  renderCheckedRadioContainer,
  renderProfilePictures,
  renderProfilePicturesOptionsInfo,
  resetProfilePictures,
  previewImage,
  cancelImagePreview,
  toggleReturnIconListener
};
