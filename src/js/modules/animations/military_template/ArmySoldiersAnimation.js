let ARMY_SOLDIERS_ANIMATION_INTERVAL, LEFT_SOLDIER, RIGHT_SOLDIER, BULLET;

function startArmySoldiersAnimation() {
  document.querySelector('.template_animation').innerHTML = `
  <img class="army_soldier" id="left_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <img class="army_soldier" id="right_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <div id="bullet"></div>
  `;

  LEFT_SOLDIER = document.querySelector('#left_army_soldier');
  RIGHT_SOLDIER = document.querySelector('#right_army_soldier');
  BULLET = document.querySelector('#bullet');

  startArmySoldiersAnimationInterval();
}

function startArmySoldiersAnimationInterval() {
  leftSoldierShoot();
  rightSoldierGoesUp();
  rightSoldierShootToTheBottom();
  leftSoldierGoesUp();
  rightSoldierGoesDown();
  rightSoldierShootToTheTop();
  leftSoldierGoesDown();

  ARMY_SOLDIERS_ANIMATION_INTERVAL = setInterval(() => {
    leftSoldierShoot();
    rightSoldierGoesUp();
    rightSoldierShootToTheBottom();
    leftSoldierGoesUp();
    rightSoldierGoesDown();
    rightSoldierShootToTheTop();
    leftSoldierGoesDown();
  }, 6500);
}

function resetArmySoldiersAnimation() {
  clearInterval(ARMY_SOLDIERS_ANIMATION_INTERVAL);
  document.querySelector('.template_animation').innerHTML = '';
}

function leftSoldierShoot() {
  BULLET.style.display = 'block';
  // 2 seconds
  BULLET.classList.add('HorizontalBulletAnimation');

  // bullet end
  setTimeout(() => {
    BULLET.classList.remove('HorizontalBulletAnimation');
    BULLET.style.display = 'none';
  }, 1500);
}

function rightSoldierGoesUp() {
  // right soldier start
  setTimeout(() => {
    RIGHT_SOLDIER.classList.add('RightSoldierAnimation');
    rightSoldierStands();
  }, 600);
}

function rightSoldierStands() {
  setTimeout(() => {
    RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(0deg)';
    RIGHT_SOLDIER.style.top = '5%';
    RIGHT_SOLDIER.classList.remove('RightSoldierAnimation');
  }, 1000);
}

function rightSoldierShootToTheBottom() {
  setTimeout(() => {
    BULLET.style.display = 'block';
    BULLET.classList.add('RightSoldierShootToTheBottomAnimation');
  }, 1600);
}

function leftSoldierGoesUp() {
  setTimeout(() => {
    // left soldier start
    LEFT_SOLDIER.classList.add('LeftSoldierAnimation');
    setTimeout(() => {
      BULLET.classList.remove('RightSoldierShootToTheBottomAnimation');
      BULLET.style.display = 'none';
      BULLET.style.top = '10%';

      LEFT_SOLDIER.style.top = '5%';
      LEFT_SOLDIER.classList.remove('LeftSoldierAnimation');
      leftSoldierShoot();
    }, 1000);
  }, 2000);
}

function rightSoldierGoesDown() {
  setTimeout(() => {
    RIGHT_SOLDIER.classList.add('RightSoldierGoesDown');
    setTimeout(() => {
      RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(-15deg)';
      RIGHT_SOLDIER.style.top = '30%';
      RIGHT_SOLDIER.classList.remove('RightSoldierGoesDown');
    }, 1000);
  }, 3600);
}

function rightSoldierShootToTheTop() {
  setTimeout(() => {
    BULLET.style.display = 'block';
    BULLET.classList.add('RightSoldierShootToTheTopAnimation');

    setTimeout(() => {
      BULLET.style.display = 'none';
      BULLET.classList.remove('RightSoldierShootToTheTopAnimation');
    }, 1500);
  }, 4600);
}

function leftSoldierGoesDown() {
  setTimeout(() => {
    LEFT_SOLDIER.classList.add('LeftSoldierGoesDown');

    setTimeout(() => {
      LEFT_SOLDIER.style.top = '30%';
      LEFT_SOLDIER.classList.remove('LeftSoldierGoesDown');
      BULLET.style.top = '36%';
    }, 1000);
  }, 5000);
}

export { startArmySoldiersAnimation, resetArmySoldiersAnimation };
