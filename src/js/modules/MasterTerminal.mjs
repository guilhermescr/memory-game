import { resetProfilePictures } from './auth/AccountMethods.mjs';
import { logout } from './auth/AuthService.mjs';

const TERMINAL = document.querySelector('.terminal');
const COMMANDS_LIST = {
  cra: {
    description: 'This command checks all registered accounts.',
    command: function () {}
  },
  ga: {
    description:
      'This command gets an account and returns username + password.',
    command: function () {}
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
      logout();
    }
  },
  da: {
    description: 'This command deletes a specific account.',
    command: function () {}
  },
  ra: {
    description: 'This command resets a specific achievement.',
    command: function () {}
  },
  rta: {
    description:
      'This command resets the temporary achievements. (win streak etc.)',
    command: function () {}
  }
};

TERMINAL.addEventListener('submit', event => {
  event.preventDefault();
  /*
  const INPUT = document.querySelector('.--focused-input .terminal-input');

  if (!INPUT.value.includes('mm')) {
    // returns an error on the terminal
    return;
  }

  const FLAG_INDEX = INPUT.value.search('-all');
  if (FLAG_INDEX !== -1) {
    const FLAG = INPUT.value.slice(FLAG_INDEX);
    COMMANDS_LIST['ra'].command(FLAG);
  } else {
    const INPUT_COMMAND = INPUT.value.replace('mm ', '');
    COMMANDS_LIST[INPUT_COMMAND].command();
  }
  */
});
