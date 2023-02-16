const BRAZIL_FLAG = document.getElementById('brazil-flag');

function showLangColor() {
  BRAZIL_FLAG.classList.remove('language--disabled');
}

function hideLangColor() {
  BRAZIL_FLAG.classList.add('language--disabled');
}

BRAZIL_FLAG.addEventListener('mouseenter', showLangColor);

BRAZIL_FLAG.addEventListener('mouseleave', hideLangColor);
