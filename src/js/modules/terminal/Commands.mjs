import { timeoutItems } from '../../main.js';
import {
  accounts,
  getAccount,
  deleteAccount,
  onlineUser,
  resetProfilePictures
} from '../auth/AccountMethods.mjs';
import { logout } from '../auth/AuthService.mjs';
import {
  getAchievement,
  resetAchievement,
  resetAllAchievements,
  resetTemporaryAchievements
} from '../m-profile/achievements/Achievements.mjs';
import { addNewCommandBlock, terminal_input } from './MasterTerminal.mjs';

const COMMANDS_LIST = {
  cra: {
    description: 'This command checks all registered accounts.',
    command: function () {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Gathering all the existing accounts...';
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
          timeoutItems(() => {
            if (accounts) {
              RESULT_ELEMENT.innerHTML = `<p>Amount: ${accounts.length}</p>`;

              if (accounts === 1) {
                RESULT_ELEMENT.innerHTML += `
                ${current_account}
                <ul>
                  <li>- Username: ${onlineUser.userData.username}</li>
                  <li>- Password: ${onlineUser.userData.password}</li>
                </ul>
                `;
              } else {
                accounts.forEach((account, index) => {
                  let on = onlineUser.userData.username === account.username;
                  let account_state = on ? 'Online' : 'Offline';

                  RESULT_ELEMENT.innerHTML += `
                  <p>Nº ${index + 1}<span class="${
                    on && 'online'
                  }"> (${account_state})</span>:</p>
                  <ul>
                    <li>- Username: ${account.username}</li>
                    <li>- Password: ${account.password}</li>
                  </ul>
                  `;
                });
              }
            } else {
              RESULT_ELEMENT.innerHTML = 'Unfortunately, account not found.';
            }
            addNewCommandBlock();
          }, 500);
        }
      }
    }
  },
  ga: {
    description:
      'This command gets an account and returns username + password.',
    command: function (command) {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      let username = command.replace('ga ', '');

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
          timeoutItems(() => {
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
  clear: {
    description: 'This command logs you out.',
    command: function () {
      document.querySelector('.terminal__command-blocks').innerHTML = '';
      addNewCommandBlock();
    }
  },
  logout: {
    description: 'This command logs you out.',
    command: function () {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

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
          timeoutItems(logout, 500);
        }
      }
    }
  },
  rpp: {
    description: 'This command resets the profile picture.',
    command: function () {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Profile Picture Reset Complete.';
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
          timeoutItems(resetProfilePictures, 500);
          addNewCommandBlock();
        }
      }
    }
  },
  da: {
    description: 'This command deletes a specific account.',
    command: function (command) {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      let username;

      if (command) {
        username = command.replace('da ', '');
        RESULT_ELEMENT.innerHTML = '- Looking for the account...';
      } else {
        RESULT_ELEMENT.innerHTML = '- Gathering some data...';
      }

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
          timeoutItems(() => {
            const ACCOUNT = getAccount(username);

            function deleteAccountConfirmation(confirmation_response) {
              if (
                confirmation_response === 'y' ||
                confirmation_response === 'yes'
              ) {
                paragraph.removeChild(confirmation_input);
                RESULT_ELEMENT.removeChild(paragraph);

                paragraph.classList.add('not-selectable');
                confirmation_input.placeholder = confirmation_response;

                paragraph.appendChild(confirmation_input);
                RESULT_ELEMENT.appendChild(paragraph);

                if (!username) {
                  RESULT_ELEMENT.innerHTML += '<p>- All accounts deleted.</p>';
                  localStorage.removeItem('accounts');
                  logout();
                } else {
                  RESULT_ELEMENT.innerHTML += '<p>- Account deleted.</p>';
                  deleteAccount(ACCOUNT);
                }
                addNewCommandBlock();
              }

              if (
                confirmation_response === 'n' ||
                confirmation_response === 'no'
              ) {
                document
                  .querySelector('.--current-input-block')
                  .classList.add('not-selectable');
                confirmation_input.placeholder = confirmation_response;
                addNewCommandBlock();
              }

              confirmation_input = document.querySelector(
                '.--current-input-block'
              ).lastElementChild;

              if (
                confirmation_response !== 'y' &&
                confirmation_response !== 'yes' &&
                confirmation_response !== 'n' &&
                confirmation_response !== 'no'
              ) {
                confirmation_input.value = '';
                return;
              }
              confirmation_input.blur();
              document
                .querySelector('.--current-input-block')
                .classList.remove('--current-input-block');
            }

            let paragraph = document.createElement('p');
            paragraph.classList.add('confirmation-input');
            paragraph.classList.add('--current-input-block');
            let confirmation_input = document.createElement('input');
            confirmation_input.type = 'text';
            confirmation_input.classList.add('terminal-input');
            confirmation_input.autocomplete = 'off';
            confirmation_input.spellcheck = 'false';
            confirmation_input.addEventListener('keydown', event => {
              if (event.key === 'Enter') {
                deleteAccountConfirmation(confirmation_input.value);
              }
            });
            paragraph.innerHTML = '$ ';
            paragraph.appendChild(confirmation_input);

            if (!username) {
              // -all: it deletes all accounts
              RESULT_ELEMENT.innerHTML = `
                <p>Delete all the registered accounts? (y for yes, n for no)</p>
                `;
              RESULT_ELEMENT.appendChild(paragraph);
              confirmation_input.focus();
            } else {
              // it deletes a specific account
              if (ACCOUNT) {
                RESULT_ELEMENT.innerHTML = `
                Account:
                <ul>
                  <li>- Username: ${ACCOUNT.username}</li>
                  <li>- Password: ${ACCOUNT.password}</li>
                </ul>
                <p>Delete this account? (y for yes, n for no)</p>
                `;
                RESULT_ELEMENT.appendChild(paragraph);
                confirmation_input.focus();
              } else {
                RESULT_ELEMENT.innerHTML = 'Unfortunately, account not found.';
                addNewCommandBlock();
              }
            }
          }, 500);
        }
      }
    }
  },
  ra: {
    description: 'This command resets a specific achievement.',
    command: function (command) {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      let achievement_input;
      if (command) {
        achievement_input = command.replace('ra ', '').trim();
      }

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Gathering some data...';
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
          timeoutItems(() => {
            if (achievement_input) {
              const ACHIEVEMENT = getAchievement(achievement_input)[0];

              if (ACHIEVEMENT) {
                RESULT_ELEMENT.innerHTML = `Achievement: "${ACHIEVEMENT.name}" Reset Complete.`;
                resetAchievement(ACHIEVEMENT.name + ' -D');
                addNewCommandBlock();
              } else {
                RESULT_ELEMENT.innerHTML =
                  'Unfortunately, achievement not found.';
              }
            } else {
              RESULT_ELEMENT.innerHTML = `All Achievements Reset Complete.`;
              resetAllAchievements();
              addNewCommandBlock();
            }
          }, 500);
        }
      }
    }
  },
  rta: {
    description:
      'This command resets the temporary achievements. (win streak etc.)',
    command: function () {
      terminal_input.blur();
      terminal_input.setAttribute('disabled', '');

      const CURRENT_INPUT_BLOCK = document.querySelector(
        '.--current-input-block'
      );
      const RESULT_ELEMENT =
        CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

      RESULT_ELEMENT.innerHTML = '- Temporary Achievements Reset Complete.';
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
          timeoutItems(resetTemporaryAchievements, 500);
          addNewCommandBlock();
        }
      }
    }
  }
};

export { COMMANDS_LIST };
