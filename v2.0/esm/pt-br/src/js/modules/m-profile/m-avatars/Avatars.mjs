import { hideElements, revealElements } from '../../../main.js';
import { showMainMenuInEditProfile } from '../../auth/AccountMethods.mjs';
import {
  cancelImagePreview,
  previewImage,
  renderProfilePicturesOptionsInfo
} from '../EditProfilePicture.mjs';

const AVATARS_DATA = [
  {
    avatar_name: 'Animais',
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
    avatar_name: 'Geral',
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
    avatar_name: 'Profissões',
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
    'Avatars';

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

export { renderAvatars };
