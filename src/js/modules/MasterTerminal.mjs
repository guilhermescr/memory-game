import {
  getAccount,
  renderUsernames,
  resetProfilePictures
} from './auth/AccountMethods.mjs';
import { logout } from './auth/AuthService.mjs';
import { resetTemporaryAchievements } from './m-profile/achievements/Achievements.mjs';

const TERMINAL = document.querySelector('.terminal');
let input;

const COMMANDS_LIST = {
  cra: {
    description: 'This command checks all registered accounts.',
    command: function (flag) {}
  },
  ga: {
    description:
      'This command gets an account and returns username + password.',
    command: function (command) {
      input.blur();
      input.setAttribute('disabled', '');

      let username = command.replace('ga ', '').replaceAll('"', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Looking for the account...';
      CURRENT_INPUT_BLOCK.classList.add('not-selectable');
      CURRENT_INPUT_BLOCK.classList.remove('--current-input-block');

      const RESULT_ELEMENT_WIDTH = RESULT_ELEMENT.clientWidth;

      RESULT_ELEMENT.classList.add('--result-effect');
      const interval = setInterval(checkSessionState, 500);

      function checkSessionState() {
        if (RESULT_ELEMENT.clientWidth === RESULT_ELEMENT_WIDTH) {
          clearInterval(interval);
          RESULT_ELEMENT.classList.remove('--result-effect');
          RESULT_ELEMENT.style.borderRight = 'none';
          setTimeout(() => {
            const ACCOUNT = getAccount(username);
            if (ACCOUNT) {
              RESULT_ELEMENT.innerHTML = `
            Account:
            <ul>
              <li>- Username: ${ACCOUNT.username}</li>
              <li>- Password: ${ACCOUNT.password}</li>
            </ul>
            `;
            } else {
              RESULT_ELEMENT.innerHTML = 'Unfortunately, account not found.';
            }
            addNewCommandBlock();
          }, 500);
        }
      }
    }
  },
  rpp: {
    description: 'This command resets the profile picture.',
    command: function () {
      resetProfilePictures();
    }
  },
  logout: {
    description: 'This command logs you out.',
    command: function () {
      input.blur();
      input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Shutting down...';
      CURRENT_INPUT_BLOCK.classList.add('not-selectable');
      CURRENT_INPUT_BLOCK.classList.remove('--current-input-block');

      const RESULT_ELEMENT_WIDTH = RESULT_ELEMENT.clientWidth;

      RESULT_ELEMENT.classList.add('--result-effect');
      const interval = setInterval(checkSessionState, 500);

      function checkSessionState() {
        if (RESULT_ELEMENT.clientWidth === RESULT_ELEMENT_WIDTH) {
          clearInterval(interval);
          RESULT_ELEMENT.classList.remove('--result-effect');
          RESULT_ELEMENT.style.borderRight = 'none';
          setTimeout(logout, 500);
        }
      }
    }
  },
  da: {
    description: 'This command deletes a specific account.',
    command: function (flag) {}
  },
  ra: {
    description: 'This command resets a specific achievement.',
    command: function (flag) {}
  },
  rta: {
    description:
      'This command resets the temporary achievements. (win streak etc.)',
    command: function () {
      input.blur();
      input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Temporary Achievements Reset Complete';
      CURRENT_INPUT_BLOCK.classList.add('not-selectable');
      CURRENT_INPUT_BLOCK.classList.remove('--current-input-block');

      const RESULT_ELEMENT_WIDTH = RESULT_ELEMENT.clientWidth;

      RESULT_ELEMENT.classList.add('--result-effect');
      const interval = setInterval(checkSessionState, 500);

      function checkSessionState() {
        if (RESULT_ELEMENT.clientWidth === RESULT_ELEMENT_WIDTH) {
          clearInterval(interval);
          RESULT_ELEMENT.classList.remove('--result-effect');
          RESULT_ELEMENT.style.borderRight = 'none';
          setTimeout(resetTemporaryAchievements, 500);
          addNewCommandBlock();
        }
      }
    }
  }
};

function addNewCommandBlock() {
  const COMMAND_BLOCKS = document.querySelector('.terminal__command-blocks');
  const NEW_COMMAND_BLOCK = document.createElement('div');
  NEW_COMMAND_BLOCK.classList.add('command-blocks__block');
  NEW_COMMAND_BLOCK.innerHTML = `
  <div class="user-info">
    <p class="user-name">?</p>
    <p>@Memory-Game</p>
  </div>

  <div class="user-input --current-input-block">
    <label>$</label>
    <input
      type="text"
      class="terminal-input"
      spellcheck="false"
      autocomplete="off"
    />
  </div>

  <div class="command-result">
    <p class="command-result__result-message"></p>
  </div>
  `;

  COMMAND_BLOCKS.appendChild(NEW_COMMAND_BLOCK);
  COMMAND_BLOCKS.scrollTo(0, COMMAND_BLOCKS.scrollHeight);

  document.querySelector('.--current-input-block .terminal-input').focus();
  renderUsernames();
}

function handleSubmit() {
  input = document.querySelector('.--current-input-block .terminal-input');

  let command = input.value;

  if (!command.includes('mm')) {
    // returns an error on the terminal
    return;
  }

  const FLAG_INDEX = command.search('-all');
  // if flag is not -1, there's a flag
  if (FLAG_INDEX !== -1) {
    const FLAG = command.slice(FLAG_INDEX);
    command = command
      .replace('mm', '')
      .replace(command.slice(FLAG_INDEX), '')
      .trim();
    COMMANDS_LIST[command].command(FLAG);
  } else {
    command = command.replace('mm ', '');

    if (command.includes('ga')) {
      COMMANDS_LIST['ga'].command(command);
    }

    if (command.includes('rta')) {
      COMMANDS_LIST['rta'].command(command);
    }
  }
}

TERMINAL.addEventListener('submit', event => {
  event.preventDefault();
});

TERMINAL.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
});
