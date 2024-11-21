let copyBtns = document.getElementsByClassName('copy-btn');
let copiableValues = document.getElementsByClassName('copiable_value');

[...copyBtns].forEach((btn, i) => {
  btn.addEventListener('click', () => {
    copyToClippboard([...copiableValues][i]);
  });
});

function copyToClippboard(valToCopy) {
  valToCopy.focus();

  navigator.clipboard
    .writeText(valToCopy.value)
    .then(confirmCopy())
    .catch((err) => {
      throw new Error(err);
    });
}

function confirmCopy() {
  let appFrame = document.querySelector('#appFrame');
  let message = document.createElement('small');

  appFrame.appendChild(message);

  message.classList.add('copy-success');
  message.innerText = 'Copied!';

  setTimeout(() => {
    appFrame.removeChild(message);
  }, 1200);
}
