function showDifficulties() {
  const playThemesBtns = document.querySelectorAll('.choosable-theme');
  playThemesBtns.forEach(playbutton => {
    console.log(playbutton);
  });
  document.getElementById('themesContainer').style.display = 'none';
}

export { showDifficulties };