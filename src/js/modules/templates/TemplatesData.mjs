import {
  resetBirdAnimation,
  setBirdPosition,
  startBirdAnimation
} from '../animations/forest_theme/BirdAnimation.mjs';
import {
  resetArmySoldiersAnimation,
  startArmySoldiersAnimation
} from '../animations/military_template/ArmySoldiersAnimation.js';

const TEMPLATES_DATA = {
  ForestTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/forest_template/forest_template_menu.png',
      alt: 'Image shows menu in Forest Template'
    },
    TemplateStyles: 'forest_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/forest_template/forest_theme.mp3'
  },
  RainbowTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/rainbow_template/rainbow_template_menu.png',
      alt: 'Image shows menu in Rainbow Template'
    },
    TemplateStyles: 'rainbow_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/rainbow_template/rainbow_theme.mp3'
  },
  MilitaryTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/military_template/military_template_menu.png',
      alt: 'Image shows menu in Military Template'
    },
    TemplateStyles: 'military_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/military_template/military_theme.mp3'
  }
};

const TEMPLATES_KEYS = Object.keys(TEMPLATES_DATA);

function addForestTemplateChanges() {
  resetBirdAnimation();
  resetArmySoldiersAnimation();

  startBirdAnimation();
  window.addEventListener('resize', setBirdPosition);
}

function addRainbowTemplateChanges() {
  resetBirdAnimation();
  resetArmySoldiersAnimation();
}

function addMilitaryTemplateChanges() {
  resetBirdAnimation();
  resetArmySoldiersAnimation();

  startArmySoldiersAnimation();
}

const BODY_CLASSLIST_TEMPLATE_OPTIONS = {
  forest_template: addForestTemplateChanges,
  rainbow_template: addRainbowTemplateChanges,
  military_template: addMilitaryTemplateChanges
};

export { TEMPLATES_DATA, TEMPLATES_KEYS, BODY_CLASSLIST_TEMPLATE_OPTIONS };
