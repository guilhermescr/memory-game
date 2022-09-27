const TEMPLATES_DATA = {
  ForestTemplate: {
    BackgroundImage:
      '../src/assets/images/templates/forest_template/forest_background.jpg',
    MenuTemplate: {
      src: '../src/assets/images/templates/forest_template/forest_template_menu.png',
      alt: 'Forest Template'
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
      alt: 'Rainbow Template'
    },
    TemplateStyles: 'rainbow_template',
    SoundTrack: ''
  },
  MilitaryTemplate: {
    BackgroundImage: '../images/templates/',
    MenuTemplate: {
      src: '',
      alt: 'Military Template'
    },
    TemplateStyles: 'military_template',
    SoundTrack: ''
  }
};

const TEMPLATES_KEYS = Object.keys(TEMPLATES_DATA);

export { TEMPLATES_DATA, TEMPLATES_KEYS};