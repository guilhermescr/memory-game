const PAGE_CONTENT = {
  pt_br: {
    html_lang: 'pt-BR',
    title: 'Jogo da Memória | Início',
    body: 'pt_br',
    h1: 'Jogo da Memória',
    main_h2: 'Bem-vindos ao Jogo da Memória - 2023!',
    shortcuts_title: 'Atalhos',
    shortcut1_title: 'Trocar Modo Escuro/Claro:',
    shortcut2_title: 'Trocar Idioma:',
    shortcut3_title: 'Abrir/Fechar Menu:',
    shortcut1_key: 'Tecla: C',
    shortcut2_key: 'Tecla: L',
    shortcut3_key: 'Tecla: M',
    versions_title: 'Versões',
    v1_title: 'Versão 1.0',
    v2_title: 'Versão 2.0',
    simple_version: 'Versão Simples',
    v_option1: 'Versão Completa - Opção 1',
    v_option2: 'Versão Completa - Opção 2',
    repository_text: 'Repositório'
  },
  en_us: {
    html_lang: 'en',
    title: 'Memory Game | Home',
    body: 'en_us',
    h1: 'Memory Game',
    main_h2: 'Welcome to the Memory Game - 2023!',
    shortcuts_title: 'Shortcuts',
    shortcut1_title: 'Switch Dark/Light Mode:',
    shortcut2_title: 'Switch Language:',
    shortcut3_title: 'Open/Close Menu:',
    shortcut1_key: 'Key: C',
    shortcut2_key: 'Key: L',
    shortcut3_key: 'Key: M',
    versions_title: 'Versions',
    v1_title: 'Version 1.0',
    v2_title: 'Version 2.0',
    simple_version: 'Simple Version',
    v_option1: 'Complete Version - Option 1',
    v_option2: 'Complete Version - Option 2',
    repository_text: 'Repository'
  }
};

const PAGE_ELEMENTS = {
  html_lang: document.querySelector('html'),
  title: document.querySelector('title'),
  body: document.body,
  h1: document.querySelector('h1'),
  main_h2: document.querySelector('.main > h2'),
  shortcuts_title: document.querySelector('.shortcuts > h3'),
  shortcut1_title: document.querySelector('#color-mode-shortcut > h4'),
  shortcut2_title: document.querySelector('#languages-shortcut > h4'),
  shortcut3_title: document.querySelector('#toggle-menu-shortcut > h4'),
  shortcut1_key: document.querySelector('#color-mode-shortcut > p'),
  shortcut2_key: document.querySelector('#languages-shortcut > p'),
  shortcut3_key: document.querySelector('#toggle-menu-shortcut > p'),
  versions_title: document.querySelector('.versions__title'),
  v1_title: document.querySelector('.v1-title'),
  v2_title: document.querySelector('.v2-title'),
  simple_version: document.querySelector('#simple-version'),
  v_option1: document.querySelector('#v-option1'),
  v_option2: document.querySelector('#v-option2'),
  repository_text: document.querySelector('#repository-txt')
};

const LANGUAGES_MENU = document.querySelector('.languages-menu');
const GLOBE_BUTTON = document.querySelector('#globe-icon');
const LANGUAGE_OPTION_BUTTONS = document.querySelectorAll('.language-option');

const LIGHT_MODE_ICON = `
<svg
  class="color-mode__icon"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 16 16"
  xml:space="preserve"
>
  <g>
    <path
      d="M8,3C5.243,3,3,5.243,3,8c0,2.757,2.243,5,5,5s5-2.243,5-5C13,5.243,10.757,3,8,3z M8,11c-1.654,0-3-1.346-3-3s1.346-3,3-3
s3,1.346,3,3S9.654,11,8,11z"
    />
    <rect x="7" width="2" height="2" />
    <rect x="7" y="14" width="2" height="2" />
    <rect x="14" y="7" width="2" height="2" />
    <rect y="7" width="2" height="2" />
    <rect
      x="11.95"
      y="11.95"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.3639 12.9501)"
      width="2"
      height="2"
    />
    <rect
      x="2.05"
      y="2.05"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.2635 3.0503)"
      width="2"
      height="2"
    />
    <rect
      x="2.05"
      y="11.95"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.2636 5.95)"
      width="2"
      height="2"
    />
    <rect
      x="11.95"
      y="2.05"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 1.6359 10.05)"
      width="2"
      height="2"
    />
  </g>
</svg>
`;
const DARK_MODE_ICON = `
<svg
  class="color-mode__icon"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`;
const TOGGLE_COLOR_MODE_BUTTON = document.querySelector('.color-mode__button');
let current_language = document.body.classList[0];

function toggleBodyClasses($type, $element) {
  if ($type === 'lang') {
    $element.classList.toggle('en_us');
    $element.classList.toggle('pt_br');
  }

  if ($type === 'color-mode') {
    $element.classList.toggle('light_mode');
    $element.classList.toggle('dark_mode');

    TOGGLE_COLOR_MODE_BUTTON.classList.toggle('color-mode__sun');
    TOGGLE_COLOR_MODE_BUTTON.classList.toggle('color-mode__moon');
    TOGGLE_COLOR_MODE_BUTTON.innerHTML = $element.classList.contains(
      'dark_mode'
    )
      ? DARK_MODE_ICON
      : LIGHT_MODE_ICON;
  }
}

function toggleLanguagesMenu() {
  LANGUAGES_MENU.classList.toggle('hide');
}

function togglePageLanguage(lang) {
  const ELEMENTS_NAME = Object.keys(PAGE_ELEMENTS);
  current_language = /br/i.test(lang) ? 'pt_br' : 'en_us';

  ELEMENTS_NAME.forEach(element_name => {
    const PAGE_ELEMENT = PAGE_ELEMENTS[element_name];
    const CONTENT = PAGE_CONTENT[current_language][element_name];

    if (element_name.includes('html')) {
      PAGE_ELEMENT.setAttribute('lang', CONTENT);
    } else if (element_name.includes('body')) {
      toggleBodyClasses('lang', PAGE_ELEMENT);
    } else {
      PAGE_ELEMENT.innerHTML = CONTENT;
    }
  });
}

function handleShortcut({ key }) {
  if (key === 'c') {
    toggleBodyClasses('color-mode', document.body);
  }

  if (key === 'l') {
    togglePageLanguage(current_language === 'pt_br' ? 'en_us' : 'pt_br');
  }

  if (key === 'm') {
    toggleLanguagesMenu();
  }
}

window.addEventListener('keydown', handleShortcut);

LANGUAGE_OPTION_BUTTONS.forEach(language_option_button => {
  language_option_button.addEventListener('click', function () {
    togglePageLanguage(this.innerHTML);
    toggleLanguagesMenu();
  });
});

GLOBE_BUTTON.addEventListener('click', toggleLanguagesMenu);

TOGGLE_COLOR_MODE_BUTTON.addEventListener('click', () => {
  toggleBodyClasses('color-mode', document.body);
});
