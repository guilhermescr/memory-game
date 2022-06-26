const themes = {
AdventureTime: {
  logo: `<img class="theme-image cartoon" 
  src="assets/images/themes/adventure-time-theme/adventure_time_logo.png" alt="Adventure Time Logo"  >`,

  easy: {
    Finn: `<img class="back-face" src="assets/images/themes/adventure-time-theme/easy/finn.png" alt="Finn Character">`,

    Jake: `<img class="back-face" src="assets/images/themes/adventure-time-theme/easy/jake.png" alt="Jake Character">`,

    PrincessBubblegum: `<img class="back-face" src="assets/images/themes/adventure-time-theme/easy/princess-bubblegum.png" alt="Princess Bubblegum Character">`,

    BMO: `<img class="back-face" src="assets/images/themes/adventure-time-theme/easy/bmo.png" alt="BMO Character">`,
  },

  normal: {
    IceKing: `<img class="back-face" src="assets/images/themes/adventure-time-theme/normal/ice-king.png" alt="Ice King Character">`,

    FlamePrincess: `<img class="back-face" src="assets/images/themes/adventure-time-theme/normal/flame-princess.png" alt="Flame Princess Character">`,

    Marceline: `<img class="back-face" src="assets/images/themes/adventure-time-theme/normal/marceline.png" alt="Marceline Character">`,
  },

  hard: {
    LadyRainicorn: `<img class="back-face" src="assets/images/themes/adventure-time-theme/hard/lady-rainicorn.png" alt="Lady Rainicorn Character">`,

    EarlOfLemonGrab: `<img class="back-face" src="assets/images/themes/adventure-time-theme/hard/the-earl-of-lemongrab.png" alt="The Earl Of Lemongrab Character">`,
    
    Gunter: `<img class="back-face" src="assets/images/themes/adventure-time-theme/hard/gunter.webp" alt="Gunter Character">`,
  },

  frontFace: `<img class="front-face" src="assets/images/themes/adventure-time-theme/front-face.webp" alt="Card's Front Face">`,
},

Ben10: {
  logo: `<img class="theme-image" id="ben-10" 
  src="assets/images/themes/ben-10-theme/ben-10-logo.webp" alt="Ben 10 Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

BokuNoHero: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/boku-no-hero-theme/boku-no-hero-logo.png" alt="Boku No Hero Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

Boruto: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/boruto-theme/boruto-logo.png" alt="Boruto Logo"  >`,

  easy: ``,

  normal: ``,
  
  hard: ``,

  frontFace: ``,
},

DragonBall: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/db-theme/dragon-ball-logo.png" alt="Dragon Ball Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

GilmoreGirls: {
  logo: `<img class="theme-image tv-show" 
  src="assets/images/themes/gilmore-girls-theme/gilmore-girls-logo.webp" alt="Gilmore Girls Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

NanatsuNoTaizai: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/nanatsu-no-taizai-theme/nnt-logo.png" alt="Nanatsu No Taizai Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

Naruto: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/naruto-theme/naruto-logo.png" alt="Naruto Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

OnePiece: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/one-piece/one-piece-logo.png" alt="One Piece Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},

OnePunchMan: {
  logo: `<img class="theme-image anime" 
  src="assets/images/themes/one-punch-man-theme/opm-logo.png" alt="One Punch Man Logo"  >`,

  easy: ``,

  normal: ``,

  hard: ``,

  frontFace: ``,
},
};

let themesNames = ['Adventure Time', 'Ben 10', 'Boku No Hero', 'Boruto', 'Dragon Ball', 'Gilmore Girls', 'Nanatsu No Taizai', 'Naruto', 'One Piece', 'One Punch Man'];

const themesKeys = Object.keys(themes);

export { themes, themesNames, themesKeys };