import { hideElements } from '../../../main.js';

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
    }
  }
];

function renderAvatars(CHECKED_RADIO_INPUT_CONTAINER) {
  hideElements(document.querySelector('.profile-picture-options'));

  const AVATARS_CONTAINER = document.createElement('section');
  AVATARS_CONTAINER.classList.add('avatars-container');

  for (let index = 0; index < AVATARS_DATA.length; index++) {
    const { avatar_name, avatars } = AVATARS_DATA[index];

    const AVATAR_THEME = document.createElement('div');
    AVATAR_THEME.classList.add('avatars-container__avatar-theme');

    const AVATAR_THEME_TITLE = document.createElement('h4');
    AVATAR_THEME_TITLE.innerHTML = avatar_name;

    const AVATARS = document.createElement('div');
    AVATARS.classList.add('avatars');

    const AVATARS_IMAGES = Object.values(avatars);
    AVATARS_IMAGES.forEach(avatar_image => {
      const AVATAR = document.createElement('div');
      AVATAR.classList.add('avatar');
      AVATAR.innerHTML = avatar_image;
      console.log(AVATAR);
      AVATARS.appendChild(AVATAR);
    });

    AVATARS_CONTAINER.appendChild(AVATAR_THEME_TITLE);
    AVATARS_CONTAINER.appendChild(AVATARS);
  }
  CHECKED_RADIO_INPUT_CONTAINER.innerHTML = '';
  CHECKED_RADIO_INPUT_CONTAINER.appendChild(AVATARS_CONTAINER);
}

document.querySelectorAll('.avatar').forEach(avatar => {
  avatar.addEventListener('click', renderAvatars);
});

export { renderAvatars };
