let copyBtns = document.getElementsByClassName('copy-btn');
let copiableValues = document.getElementsByClassName('copiable_value');

[...copyBtns].forEach((btn, i) => {
  btn.addEventListener('click', () => {
    copyToClipboard([...copiableValues][i]);
  });
});

function copyToClipboard(valToCopy) {
  if (!valToCopy.value) {
    confirmCopy('Field is emprty');
    return;
  }

  navigator.clipboard
    .writeText(valToCopy.value)
    .then(confirmCopy)
    .catch((err) => {
      throw new Error(err);
    });
}

function confirmCopy(msg = 'Copied') {
  let appFrame = document.querySelector('#appFrame');
  let message = document.createElement('small');

  appFrame.appendChild(message);

  message.classList.add('copy-success');
  message.innerText = msg;

  setTimeout(() => {
    appFrame.removeChild(message);
  }, 1200);
}
