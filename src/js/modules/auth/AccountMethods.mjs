import { hideElements, revealElements, timeoutItems } from '../../main.js';
import { endAuthPage } from './AuthService.mjs';

const accounts = [];
const onlineUser = {
  online: false,
  userData: {}
};

function searchUsername($username) {
  const userName = accounts.find($account => $account.username === $username);
  return userName === undefined; // check if username is available
}

function searchAccount($username, $password) {
  if (accounts.length !== 0) {
    // check if the account already exists
    const account = accounts.find(
      $account =>
        $account.username === $username && $account.password === $password
    );
    return account;
  }
}

function createAccount($username, $password) {
  const account = searchAccount($username, $password);

  if (account === undefined) {
    const userData = {
      username: $username,
      password: $password,
      profilePicture: '',
      exp: 0,
      matches: 0,
      wonMatches: 0,
      ties: 0,
      lostMatches: 0,
      achievements: {
        amount: 0
      }
    };
    accounts.push(userData);

    localStorage.setItem('accounts', JSON.stringify(accounts));
  }
}

function setOnlineUser(account) {
  onlineUser.online = true;
  onlineUser.userData = account;
  console.log(onlineUser);

  localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
}

function isUserOnline() {
  const data = localStorage.getItem('onlineUser');

  if (data) {
    const onlineUserData = JSON.parse(data);
    onlineUser.online = true;
    onlineUser.userData = onlineUserData;
    endAuthPage();

    console.log(onlineUser);
  }
}

function getAccounts() {
  const data = localStorage.getItem('accounts');

  if (data) {
    accounts.push(...JSON.parse(data));
    console.log(accounts);
  } else {
    console.log('Create an account and start playing!');
  }
}

function authError(msg) {
  const authErrorElement = document.getElementById('authError');
  authErrorElement.innerHTML = msg;

  revealElements(authErrorElement);
  timeoutItems(() => {
    hideElements(authErrorElement);
  }, 3000);
}

export {
  createAccount,
  getAccounts,
  setOnlineUser,
  isUserOnline,
  searchUsername,
  searchAccount,
  authError
};
