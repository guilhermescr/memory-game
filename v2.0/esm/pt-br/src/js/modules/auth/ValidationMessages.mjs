const SUCCESS_MESSAGE_PARAGRAPH = document.querySelector('.success-message');

function addAlertMessage(element, alertType) {
  element.classList.add(alertType);
}

function removeAlertMessage(element, alertType) {
  element.classList.remove(alertType);
}

export { SUCCESS_MESSAGE_PARAGRAPH, addAlertMessage, removeAlertMessage };
