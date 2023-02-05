import { timeoutItems } from '../../main.js';
import {
  accounts,
  getAccount,
  deleteAccount,
  onlineUser
} from '../auth/AccountMethods.mjs';
import { logout } from '../auth/AuthService.mjs';
import {
  getAchievement,
  resetAchievement,
  resetAllAchievements,
  resetTemporaryAchievements
} from '../m-profile/achievements/Achievements.mjs';
import { resetProfilePictures } from '../m-profile/EditProfilePicture.mjs';
import { addNewCommandBlock, terminal_input } from './MasterTerminal.mjs';

// COME BACK IF ANYTHING GOES WRONG!!!
let result_element;

const COMMANDS_LIST = {
  error: {
    description: 'This command sends an error to the terminal.',
    command: function (error_message) {
      commandCall(error_message, () => {}, true);
    }
  },
  cra: {
    description: 'This command checks all registered accounts.',
    command: function () {
      commandCall('- Gathering all the existing accounts...', () => {
        const { username, password } = onlineUser.userData;
        if (accounts) {
          result_element.innerHTML = `<p>Amount: ${accounts.length}</p>`;

          if (accounts === 1) {
            result_element.innerHTML += `
            ${current_account}
            <ul>
              <li>- Username: ${username}</li>
              <li>- Password: ${password}</li>
            </ul>
            `;
          } else {
            accounts.forEach((account, index) => {
              let on = username === account.username;
              let account_state = on ? 'Online' : 'Offline';

              result_element.innerHTML += `
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
          result_element.innerHTML = 'Unfortunately, account not found.';
        }
        addNewCommandBlock();
      });
    }
  },
  ga: {
    description:
      'This command gets an account and returns username + password.',
    command: function (command) {
      commandCall('- Looking for the account...', () => {
        let username = command.replace('ga ', '');

        const ACCOUNT = getAccount(username);
        if (ACCOUNT) {
          result_element.innerHTML = `
        Account:
        <ul>
          <li>- Username: ${ACCOUNT.username}</li>
          <li>- Password: ${ACCOUNT.password}</li>
        </ul>
        `;
        } else {
          result_element.innerHTML = 'Unfortunately, account not found.';
        }
        addNewCommandBlock();
      });
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
      commandCall('- Shutting down...', logout);
    }
  },
  rpp: {
    description: 'This command resets the profile picture.',
    command: function () {
      commandCall(
        '- Profile Picture Reset Complete.',
        resetProfilePictures,
        true
      );
    }
  },
  da: {
    description: 'This command deletes a specific account.',
    command: function (command) {
      let username, initial_message;

      if (command) {
        username = command.replace('da ', '');
        initial_message = '- Looking for the account...';
      } else {
        initial_message = '- Gathering some data...';
      }

      commandCall(
        initial_message,
        () => {
          const ACCOUNT = getAccount(username);

          function deleteAccountConfirmation(confirmation_response) {
            if (
              confirmation_response === 'y' ||
              confirmation_response === 'yes'
            ) {
              paragraph.removeChild(confirmation_input);
              result_element.removeChild(paragraph);

              paragraph.classList.add('not-selectable');
              confirmation_input.placeholder = confirmation_response;

              paragraph.appendChild(confirmation_input);
              result_element.appendChild(paragraph);

              if (!username) {
                result_element.innerHTML += '<p>- All accounts deleted.</p>';
                localStorage.removeItem('accounts');
                logout();
              } else {
                result_element.innerHTML += '<p>- Account deleted.</p>';
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
            result_element.innerHTML = `
            <p>Delete all the registered accounts? (y for yes, n for no)</p>
            `;
            result_element.appendChild(paragraph);
            confirmation_input.focus();
          } else {
            // it deletes a specific account
            if (ACCOUNT) {
              result_element.innerHTML = `
            Account:
            <ul>
              <li>- Username: ${ACCOUNT.username}</li>
              <li>- Password: ${ACCOUNT.password}</li>
            </ul>
            <p>Delete this account? (y for yes, n for no)</p>
            `;
              result_element.appendChild(paragraph);
              confirmation_input.focus();
            } else {
              result_element.innerHTML = 'Unfortunately, account not found.';
              addNewCommandBlock();
            }
          }
        },
        false
      );
    }
  },
  ra: {
    description: 'This command resets a specific achievement.',
    command: function (command) {
      commandCall(
        '- Gathering some data...',
        () => {
          let achievement_input;

          if (command) {
            achievement_input = command.replace('ra ', '').trim();
          }

          if (achievement_input) {
            const ACHIEVEMENT = getAchievement(achievement_input)[0];

            if (ACHIEVEMENT) {
              result_element.innerHTML = `Achievement: "${ACHIEVEMENT.name}" Reset Complete.`;
              resetAchievement(ACHIEVEMENT.name + ' -D');
            } else {
              result_element.innerHTML =
                'Unfortunately, achievement not found.';
            }
          } else {
            result_element.innerHTML = `All Achievements Reset Complete.`;
            resetAllAchievements();
          }
          addNewCommandBlock();
        },
        false
      );
    }
  },
  rta: {
    description:
      'This command resets the temporary achievements. (win streak etc.)',
    command: function () {
      commandCall(
        '- Temporary Achievements Reset Complete.',
        resetTemporaryAchievements,
        true
      );
    }
  }
};

function commandCall(initial_message, func, hasAddNewCommandBlock) {
  terminal_input.blur();
  terminal_input.setAttribute('disabled', '');

  const CURRENT_INPUT_BLOCK = document.querySelector('.--current-input-block');
  result_element = CURRENT_INPUT_BLOCK.nextElementSibling.firstElementChild;

  result_element.innerHTML = initial_message;
  CURRENT_INPUT_BLOCK.classList.add('not-selectable');
  CURRENT_INPUT_BLOCK.classList.remove('--current-input-block');

  const RESULT_ELEMENT_WIDTH = result_element.clientWidth;

  result_element.classList.add('--result-effect');
  const interval = setInterval(checkSessionState, 500);

  function checkSessionState() {
    if (result_element.clientWidth === RESULT_ELEMENT_WIDTH) {
      clearInterval(interval);
      result_element.classList.remove('--result-effect');
      result_element.style.borderRight = 'none';
      timeoutItems(func, 500);
      hasAddNewCommandBlock && addNewCommandBlock();
    }
  }
}

export { COMMANDS_LIST };
