const TEMPLATES_DATA = {
  ForestTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/forest_template/forest_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Floresta'
    },
    TemplateStyles: 'forest_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/forest_template/forest_theme.mp3'
  },
  RainbowTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/rainbow_template/rainbow_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Arco-Íris'
    },
    TemplateStyles: 'rainbow_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/rainbow_template/rainbow_theme.mp3'
  },
  MilitaryTemplate: {
    MenuTemplate: {
      src: '../src/assets/images/templates/military_template/military_template_menu.png',
      alt: 'Imagem mostra o menu do Estilo Militar'
    },
    TemplateStyles: 'military_template',
    SoundTrack:
      '../src/soundtracks/home_sounds/templates/military_template/military_theme.mp3'
  }
};

const TEMPLATES_KEYS = Object.keys(TEMPLATES_DATA);

export { TEMPLATES_DATA, TEMPLATES_KEYS };
