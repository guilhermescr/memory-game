import { revealElements, timeoutItems } from '../../main.js';
import {
  resetBirdAnimation,
  setBirdPosition,
  startBirdAnimation
} from '../animations/forest_theme/BirdAnimation.mjs';
import { showCurrentTemplateImage } from './TemplatesAlgorithm.mjs';

const TEMPLATES_DATA = {
  ForestTemplate: {
    BackgroundImage:
      '../src/assets/images/templates/forest_template/forest_background.jpg',
    MenuTemplate: {
      src: '../src/assets/images/templates/forest_template/forest_template_menu.png',
      alt: 'Image shows menu in Forest Template'
    },
    TemplateStyles: 'forest_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/forest_template/forest_theme.mp3'
  },
  RainbowTemplate: {
    BackgroundImage:
      '../images/templates/rainbow_template/rainbow_background.jpg',
    MenuTemplate: {
      src: '../src/assets/images/templates/rainbow_template/rainbow_template_menu.png',
      alt: 'Image shows menu in Rainbow Template'
    },
    TemplateStyles: 'rainbow_template',
    SoundTrack: ''
  },
  MilitaryTemplate: {
    BackgroundImage: '../images/templates/',
    MenuTemplate: {
      src: '',
      alt: 'Image shows menu in Military Template'
    },
    TemplateStyles: 'military_template',
    SoundTrack: ''
  }
};

const TEMPLATES_KEYS = Object.keys(TEMPLATES_DATA);

function addForestTemplateChanges() {
  timeoutItems([
    startBirdAnimation,
    setBirdPosition,
    showCurrentTemplateImage
  ]);
  revealElements(document.querySelector('.bird_animated_gif_container'));
  window.addEventListener('resize', setBirdPosition);
}

function addRainbowTemplateChanges() {
  resetBirdAnimation();
  console.log("It's working!");
}

function addMilitaryTemplateChanges() {
  resetBirdAnimation();
  console.log("It's working!");
}

const BODY_CLASSLIST_TEMPLATE_OPTIONS = {
  forest_template: addForestTemplateChanges,
  rainbow_template: addRainbowTemplateChanges,
  military_template: addMilitaryTemplateChanges
};

export { TEMPLATES_DATA, TEMPLATES_KEYS, BODY_CLASSLIST_TEMPLATE_OPTIONS };
