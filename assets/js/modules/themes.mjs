function fillThemes() {
  let themesContainer = document.getElementById('themesContainer');

  const themes = {
  AdventureTime: `<img class="theme-image" 
  src="assets/images/adventure-time-theme/adventure_time_logo.png" alt="Adventure Time Logo">`,

  Ben10: `<img class="theme-image" id="ben-10" 
  src="assets/images/ben-10-theme/ben-10-logo.webp" alt="Ben 10 Logo">`,

  Boruto: `<img class="theme-image" 
  src="assets/images/boruto-theme/boruto-logo.png" alt="Boruto Logo">`,

  DragonBall: `<img class="theme-image" 
  src="assets/images/db-theme/dragon-ball-logo.png" alt="Dragon Ball Logo">`,

  NanatsuNoTaizai: `<img class="theme-image" 
  src="assets/images/nanatsu-no-taizai-theme/nnt-logo.png" alt="Nanatsu No Taizai Logo">`,

  Naruto: `<img class="theme-image" 
  src="assets/images/naruto-theme/naruto-logo.png" alt="Naruto Logo">`,

  OnePiece: `<img class="theme-image" 
  src="assets/images/one-piece/one-piece-logo.png" alt="One Piece Logo">`,

  OnePunchMan: `<img class="theme-image" 
  src="assets/images/one-punch-man-theme/opm-logo.png" alt="One Punch Man Logo">`,
  };

  let themesNames = Object.keys(themes);
  let themesContent = Object.values(themes);

  for (let i = 0; i < themesNames.length; i++) {
    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${themesContent[i]}
    </div>
    <h3>${themesNames[i]}</h3>
    <button class="play-themeBtn">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }
}

export { fillThemes };