let ARMY_SOLDIERS_ANIMATION_INTERVAL, LEFT_SOLDIER, RIGHT_SOLDIER, BULLET;
let ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST = [];

function startArmySoldiersAnimation() {
  document.querySelector('.template_animation').innerHTML = `
  <img class="army_soldier" id="left_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <img class="army_soldier" id="right_army_soldier" src="../src/assets/images/templates/military_template/toy_army_soldier.png" alt="Toy Army Soldier">

  <div id="bullet"></div>
  `;

  LEFT_SOLDIER = document.querySelector('#left_army_soldier');
  RIGHT_SOLDIER = document.querySelector('#right_army_soldier');
  BULLET = document.querySelector('#bullet');

  setArmySoldiersActions();
  ARMY_SOLDIERS_ANIMATION_INTERVAL = setInterval(setArmySoldiersActions, 6500);
}

function setArmySoldiersActions() {
  leftSoldierShoot();
  rightSoldierGoesUp();
  rightSoldierShootToTheBottom();
  leftSoldierGoesUp();
  rightSoldierGoesDown();
  rightSoldierShootToTheTop();
  leftSoldierGoesDown();
}

function resetArmySoldiersAnimation() {
  clearInterval(ARMY_SOLDIERS_ANIMATION_INTERVAL);

  // clear time out
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.forEach(
    ARMY_SOLDIERS_ANIMATION_TIMEOUT => {
      clearTimeout(ARMY_SOLDIERS_ANIMATION_TIMEOUT);
    }
  );

  document.querySelector('.template_animation').innerHTML = '';
}

function leftSoldierShoot() {
  BULLET.style.display = 'block';
  BULLET.classList.add('HorizontalBulletAnimation');

  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.classList.remove('HorizontalBulletAnimation');
      BULLET.style.display = 'none';
    }, 1500)
  );
}

function rightSoldierGoesUp() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.classList.add('RightSoldierAnimation');
      rightSoldierStands();
    }, 600)
  );
}

function rightSoldierStands() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(0deg)';
      RIGHT_SOLDIER.style.top = '5%';
      RIGHT_SOLDIER.classList.remove('RightSoldierAnimation');
    }, 1000)
  );
}

function rightSoldierShootToTheBottom() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.style.display = 'block';
      BULLET.classList.add('RightSoldierShootToTheBottomAnimation');
    }, 1600)
  );
}

function leftSoldierGoesUp() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      LEFT_SOLDIER.classList.add('LeftSoldierAnimation');
      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          BULLET.classList.remove('RightSoldierShootToTheBottomAnimation');
          BULLET.style.display = 'none';
          BULLET.style.top = '10%';

          LEFT_SOLDIER.style.top = '5%';
          LEFT_SOLDIER.classList.remove('LeftSoldierAnimation');
          leftSoldierShoot();
        }, 1000)
      );
    }, 2000)
  );
}

function rightSoldierGoesDown() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      RIGHT_SOLDIER.classList.add('RightSoldierGoesDown');
      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          RIGHT_SOLDIER.style.transform = 'rotateY(180deg) rotate(-15deg)';
          RIGHT_SOLDIER.style.top = '30%';
          RIGHT_SOLDIER.classList.remove('RightSoldierGoesDown');
        }, 1000)
      );
    }, 3600)
  );
}

function rightSoldierShootToTheTop() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      BULLET.style.display = 'block';
      BULLET.classList.add('RightSoldierShootToTheTopAnimation');

      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          BULLET.style.display = 'none';
          BULLET.classList.remove('RightSoldierShootToTheTopAnimation');
        }, 1500)
      );
    }, 4600)
  );
}

function leftSoldierGoesDown() {
  ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
    setTimeout(() => {
      LEFT_SOLDIER.classList.add('LeftSoldierGoesDown');

      ARMY_SOLDIERS_ANIMATION_TIMEOUT_LIST.push(
        setTimeout(() => {
          LEFT_SOLDIER.style.top = '30%';
          LEFT_SOLDIER.classList.remove('LeftSoldierGoesDown');
          BULLET.style.top = '36%';
        }, 1000)
      );
    }, 5000)
  );
}

export { startArmySoldiersAnimation, resetArmySoldiersAnimation };
