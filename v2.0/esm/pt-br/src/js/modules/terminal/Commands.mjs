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
import {
  addNewCommandBlock,
  sendCommandError,
  terminal_input
} from './MasterTerminal.mjs';

let result_element;

const COMMANDS_LIST = {
  error: {
    description: 'Esse comando envia um erro ao terminal.',
    command: function (error_message) {
      commandCall(error_message, () => {}, true);
    }
  },
  cra: {
    description: 'Esse comando mostra todas as contas cadastradas.',
    command: function (params) {
      let hasAllFlag;

      if (params) {
        hasAllFlag = params.includes('-all');
      }

      if (!hasAllFlag) {
        sendCommandError(
          'no-flag-and-params',
          `mm: cra só funciona assim: mm cra -all.`
        );
        return;
      }

      commandCall('- Juntando todas as contas existentes...', () => {
        const { username, password } = onlineUser.userData;
        if (accounts) {
          result_element.innerHTML = `<p>Contas: ${accounts.length}</p>`;

          if (accounts === 1) {
            result_element.innerHTML += `
            ${current_account}
            <ul>
              <li>- Usuário: ${username}</li>
              <li>- Senha: ${password}</li>
            </ul>
            `;
          } else {
            accounts.forEach((account, index) => {
              let on = username === account.username;
              let account_state = on ? 'Conectado' : 'Desconectado';

              result_element.innerHTML += `
              <p>Nº ${index + 1}<span class="${
                on && 'online'
              }"> (${account_state})</span>:</p>
              <ul>
                <li>- Usuário: ${account.username}</li>
                <li>- Senha: ${account.password}</li>
              </ul>
              `;
            });
          }
        } else {
          result_element.innerHTML = 'Infelizmente, conta não encontrada.';
        }
        addNewCommandBlock();
      });
    }
  },
  ga: {
    description: 'Esse comando mostra o nome + senha de uma conta especifíca.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'ga');
        return;
      }

      commandCall('- Procurando a conta...', () => {
        let username = command.replace('ga ', '');

        const ACCOUNT = getAccount(username);
        if (ACCOUNT) {
          result_element.innerHTML = `
        Conta:
        <ul>
          <li>- Usuário: ${ACCOUNT.username}</li>
          <li>- Senha: ${ACCOUNT.password}</li>
        </ul>
        `;
        } else {
          result_element.innerHTML = 'Infelizmente, conta não encontrada.';
        }
        addNewCommandBlock();
      });
    }
  },
  clear: {
    description: 'Esse comando limpa o terminal.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: clear não aceita parâmetros como "${params}". O formato correto é: mm clear.`
        );
        return;
      }

      document.querySelector('.terminal__command-blocks').innerHTML = '';
      addNewCommandBlock();
    }
  },
  logout: {
    description: 'Esse comando desconecta a sua conta.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: logout não aceita parâmetros como "${params}". O formato correto é: mm logout.`
        );
        return;
      }

      commandCall('- Shutting down...', logout);
    }
  },
  rpp: {
    description: 'Esse comando remove a sua foto de perfil.',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: rpp não aceita parâmetros como "${params}". O formato correto é: mm rpp.`
        );
        return;
      }

      commandCall(
        '- Foto de perfil deletada com sucesso.',
        resetProfilePictures,
        true
      );
    }
  },
  da: {
    description:
      'Esse comando deleta uma conta especifíca ou todas as contas cadastradas.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'da');
        return;
      }

      let username, initial_message;

      if (!command.includes('-all')) {
        username = command.replace('da ', '');
        initial_message = '- Procurando a conta...';
      } else {
        initial_message = '- Coletando alguns dados...';
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
                result_element.innerHTML +=
                  '<p>- Todas as contas foram deletadas.</p>';
                localStorage.removeItem('accounts');
                logout();
              } else {
                result_element.innerHTML += '<p>- Conta deletada.</p>';
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
            <p>Deletar todas as contas? (y para sim, n para não)</p>
            `;
            result_element.appendChild(paragraph);
            confirmation_input.focus();
          } else {
            // it deletes a specific account
            if (ACCOUNT) {
              result_element.innerHTML = `
            Conta:
            <ul>
              <li>- Usuário: ${ACCOUNT.username}</li>
              <li>- Senha: ${ACCOUNT.password}</li>
            </ul>
            <p>Deletar esta conta? (y para sim, n para não)</p>
            `;
              result_element.appendChild(paragraph);
              confirmation_input.focus();
            } else {
              result_element.innerHTML = 'Infelizmente, conta não encontrada.';
              addNewCommandBlock();
            }
          }
        },
        false
      );
    }
  },
  ra: {
    description:
      'Esse comando reinicia uma conquista especifíca ou todas as conquistas.',
    command: function (command) {
      if (!command) {
        sendCommandError('no-params', 'ra');
        return;
      }

      commandCall(
        '- Coletando alguns dados...',
        () => {
          let achievement_input;

          if (!command.includes('-all')) {
            achievement_input = command.replace('ra ', '').trim();
          }

          if (achievement_input) {
            const ACHIEVEMENT = getAchievement(achievement_input)[0];

            if (ACHIEVEMENT) {
              // resets an specific achievement
              result_element.innerHTML = `Conquista: "${ACHIEVEMENT.name}" reiniciada com sucesso.`;
              resetAchievement(ACHIEVEMENT.name + ' -D');
            } else {
              result_element.innerHTML =
                'Infelizmente, conquista não encontrada.';
            }
          } else {
            // resets all the achievements
            result_element.innerHTML = `Todas as conquistas foram reiniciadas com sucesso.`;
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
      'Esse comando reinicia as conquistas temporárias. (Vitórias seguidas etc.)',
    command: function (params) {
      if (params) {
        sendCommandError(
          'no-flag-and-params',
          `mm: rta não aceita parâmetros como "${params}". O formato correto é: mm rta.`
        );
        return;
      }

      commandCall(
        '- Todas as conquistas temporárias foram reiniciadas com sucesso.',
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
