import { renderUsernames } from '../auth/AccountMethods.mjs';
import { COMMANDS_LIST } from './Commands.mjs';

const TERMINAL = document.querySelector('.terminal');
const OPEN_MASTER_TERMINAL_BUTTON = document.querySelector(
  '.setting-button[data-setting="master-terminal"'
);
const TOGGLE_HELP_CENTER_BUTTON = document.querySelector(
  '.toggle-help-center-button'
);
let terminal_input;

function toggleHelpCenterVisibility() {
  if (TOGGLE_HELP_CENTER_BUTTON.classList.contains('less')) {
    // add plus icon
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg enable-background="new 0 0 50 50" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect height="50" width="50"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="6" x1="9" x2="41" y1="25" y2="25"/><line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="6" x1="25" x2="25" y1="9" y2="41"/></svg>
    `;

    document.querySelector('.help-center__commands-list').classList.add('less');
    document
      .querySelector('.help-center__commands-list')
      .classList.remove('more');
  } else {
    // add minus icon
    TOGGLE_HELP_CENTER_BUTTON.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 310.285 310.285" xml:space="preserve">
    <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142
      C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32
      c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"/>
    </svg>
    `;

    document
      .querySelector('.help-center__commands-list')
      .classList.remove('less');
    document.querySelector('.help-center__commands-list').classList.add('more');
  }

  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('less');
  TOGGLE_HELP_CENTER_BUTTON.classList.toggle('more');
}

function sendCommandError(error, command) {
  if (error === 'none') {
    COMMANDS_LIST.error.command(
      `mm: ${command} não é um comando válido. Cheque a Central de Ajuda.`
    );
  }

  if (error === 'quote-error') {
    let command_name = command.slice(0, command.search('"')).trim();
    let command_input = command.slice(command.search('"'));
    COMMANDS_LIST.error.command(
      `mm: A entrada -&gt; ${command_input} &lt;- só pode conter duas aspas. O formato correto é: mm ${command_name} "valor".`
    );
  }

  if (error === 'no-params') {
    COMMANDS_LIST.error.command(
      `Abortando comando devido ao valor estar vazio. O formato correto é: mm ${command} "valor".`
    );
  }

  if (error === 'no-flag-and-params') {
    COMMANDS_LIST.error.command(command);
  }

  if (error === 'param-with-flag') {
    COMMANDS_LIST.error.command(
      `Abortando comando devido ao parâmetro com bandeira. mm ${command} não aceita parâmetros com bandeiras.`
    );
  }
}

function isCommandAvailable(command) {
  if (command === 'error') {
    return false;
  } else {
    return command in COMMANDS_LIST;
  }
}

function hasManyParams(command) {
  let [hasFlags, hasQuotes] = [false, false];
  let quotes = command.split('"').length - 1;
  let flag_index = command.search('-');
  let quote_index = command.search('"');

  if (quotes === 1 || quotes === 2) {
    hasQuotes = true;
  }

  if (flag_index !== -1) {
    hasFlags = true;
  }

  if (hasQuotes && hasFlags) {
    if (quote_index < flag_index) {
      command = command.slice(0, quote_index).trim();
    } else {
      command = command.slice(0, flag_index).trim();
    }

    if (isCommandAvailable(command)) {
      sendCommandError('param-with-flag', command);
    } else {
      sendCommandError('none', command);
    }
  }
  return hasQuotes && hasFlags;
}

function addNewCommandBlock() {
  const COMMAND_BLOCKS = document.querySelector('.terminal__command-blocks');
  const NEW_COMMAND_BLOCK = document.createElement('div');
  NEW_COMMAND_BLOCK.classList.add('command-blocks__block');
  NEW_COMMAND_BLOCK.innerHTML = `
  <div class="user-info">
    <p class="user-name">?</p>
    <p>@Jogo-da-Memória</p>
  </div>

  <div class="user-input-container --current-input-block">
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
  if (!document.querySelector('.--current-input-block').lastElementChild.value)
    return;

  terminal_input = document.querySelector(
    '.--current-input-block .terminal-input'
  );

  let command = terminal_input.value.trim();
  let flag_index;

  if ((command.length && !command.includes('mm')) || command.length < 5) {
    sendCommandError('none', command);
    return;
  }
  command = command.replace('mm', '').trim();

  flag_index = command.search('-');

  if (hasManyParams(command)) return;

  // if flag is not -1, there's a flag
  if (flag_index !== -1) {
    const FLAG = command.slice(flag_index);
    command = command.replace(command.slice(flag_index), '').trim();

    isCommandAvailable(command)
      ? COMMANDS_LIST[command].command(FLAG)
      : sendCommandError('none', command);
    return;
  }

  if (command.includes('"')) {
    if (command.split('"').length - 1 !== 2) {
      sendCommandError('quote-error', command);
      return;
    }

    const PARAMETER_INDEX = command.search('"');
    command = command.replaceAll('"', '');

    const PARAMETER = command.slice(PARAMETER_INDEX);
    command = command.replace(command.slice(PARAMETER_INDEX), '').trim();

    isCommandAvailable(command)
      ? COMMANDS_LIST[command].command(PARAMETER)
      : sendCommandError('none', command);
    return;
  }

  isCommandAvailable(command)
    ? COMMANDS_LIST[command].command()
    : sendCommandError('none', command);
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

export {
  addNewCommandBlock,
  terminal_input,
  sendCommandError,
  OPEN_MASTER_TERMINAL_BUTTON
};
