const BRAZIL_FLAG = document.getElementById('brazil-flag');

function toggleLangColor(flag, $event) {
  if ($event === 'enter') {
    flag.classList.remove('language--disabled');
  } else {
    flag.classList.add('language--disabled');
  }
}

BRAZIL_FLAG.addEventListener('mouseenter', () => {
  toggleLangColor(BRAZIL_FLAG, 'enter');
});
BRAZIL_FLAG.addEventListener('mouseleave', () => {
  toggleLangColor(BRAZIL_FLAG, 'leave');
});
