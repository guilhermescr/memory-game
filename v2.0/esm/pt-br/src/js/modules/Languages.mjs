const US_FLAG = document.getElementById('us-flag');

function toggleLangColor(flag, $event) {
  if ($event === 'enter') {
    flag.classList.remove('language--disabled');
  } else {
    flag.classList.add('language--disabled');
  }
}

US_FLAG.addEventListener('mouseenter', () => {
  toggleLangColor(US_FLAG, 'enter');
});

US_FLAG.addEventListener('mouseleave', () => {
  toggleLangColor(US_FLAG, 'leave');
});
