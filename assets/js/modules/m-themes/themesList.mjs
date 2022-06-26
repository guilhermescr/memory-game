const themes = {
AdventureTime: `<img class="theme-image cartoon" 
src="assets/images/themes/adventure-time-theme/adventure_time_logo.png" alt="Adventure Time Logo"  >`,

Ben10: `<img class="theme-image" id="ben-10" 
src="assets/images/themes/ben-10-theme/ben-10-logo.webp" alt="Ben 10 Logo"  >`,

BokuNoHero: `<img class="theme-image anime" 
src="assets/images/themes/boku-no-hero-theme/boku-no-hero-logo.png" alt="Boku No Hero Logo"  >`,

Boruto: `<img class="theme-image anime" 
src="assets/images/themes/boruto-theme/boruto-logo.png" alt="Boruto Logo"  >`,

DragonBall: `<img class="theme-image anime" 
src="assets/images/themes/db-theme/dragon-ball-logo.png" alt="Dragon Ball Logo"  >`,

GilmoreGirls: `<img class="theme-image tv-show" 
src="assets/images/themes/gilmore-girls-theme/gilmore-girls-logo.webp" alt="Gilmore Girls Logo"  >`,

NanatsuNoTaizai: `<img class="theme-image anime" 
src="assets/images/themes/nanatsu-no-taizai-theme/nnt-logo.png" alt="Nanatsu No Taizai Logo"  >`,

Naruto: `<img class="theme-image anime" 
src="assets/images/themes/naruto-theme/naruto-logo.png" alt="Naruto Logo"  >`,

OnePiece: `<img class="theme-image anime" 
src="assets/images/themes/one-piece/one-piece-logo.png" alt="One Piece Logo"  >`,

OnePunchMan: `<img class="theme-image anime" 
src="assets/images/themes/one-punch-man-theme/opm-logo.png" alt="One Punch Man Logo"  >`,
};

let themesNames = ['Adventure Time', 'Ben 10', 'Boku No Hero', 'Boruto', 'Dragon Ball', 'Gilmore Girls', 'Nanatsu No Taizai', 'Naruto', 'One Piece', 'One Punch Man'];

const themesKeys = Object.keys(themes);

export { themes, themesNames, themesKeys };