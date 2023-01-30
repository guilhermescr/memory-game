import { renderUsernames } from '../auth/AccountMethods.mjs';
import { COMMANDS_LIST } from './Commands.mjs';

const TERMINAL = document.querySelector('.terminal');
const TOGGLE_HELP_CENTER_BUTTON = document.querySelector(
  '.toggle-help-center-button'
);
let terminal_input;

function toggleHelpCenterVisibility() {
  if (TOGGLE_HELP_CENTER_BUTTON.classList.contains('less')) {
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 310.285 310.285" xml:space="preserve">
    <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142
      C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32
      c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"/>
    </svg>
    `;
  } else {
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg enable-background="new 0 0 50 50" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect height="50" width="50"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="9" x2="41" y1="25" y2="25"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="25" x2="25" y1="9" y2="41"/></svg>
    `;
  }

  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('less');
  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('more');
}

function sendCommandNotFoundError() {}

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
  if (!document.querySelector('.--current-input-block')) return;

  terminal_input = document.querySelector(
    '.--current-input-block .terminal-input'
  );

  let command = terminal_input.value.trim();

  if (command.length && !command.includes('mm')) {
    sendCommandNotFoundError();
    terminal_input.value = '';
    return;
  }
  command = command.replace('mm', '').trim();
  let flag_index = command.search('-all');

  // if flag is not -1, there's a flag
  if (flag_index !== -1) {
    // const FLAG = command.slice(flag_index);
    command = command.replace(command.slice(flag_index), '').trim();

    COMMANDS_LIST[command].command();
    return;
  }

  if (command.includes('"')) {
    const PARAMETER_INDEX = command.search('"');
    command = command.replaceAll('"', '');

    const PARAMETER = command.slice(PARAMETER_INDEX);
    command = command.replace(command.slice(PARAMETER_INDEX), '').trim();

    COMMANDS_LIST[command].command(PARAMETER);
    return;
  }

  if (command in COMMANDS_LIST) {
    COMMANDS_LIST[command].command();
  }
}

TOGGLE_HELP_CENTER_BUTTON.addEventListener('click', toggleHelpCenterVisibility);

TERMINAL.addEventListener('submit', event => {
  event.preventDefault();
});

TERMINAL.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
});

export { addNewCommandBlock, terminal_input };
