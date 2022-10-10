function addAlertMessage(element, alertType) {
  element.classList.add(alertType);
}

function removeAlertMessage(element, alertType) {
  element.classList.remove(alertType);
}

export { addAlertMessage, removeAlertMessage };
