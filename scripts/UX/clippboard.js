let copyBtns = document.getElementsByClassName('copyBtn');
let copiableValues = document.getElementsByClassName('copiable_value');

[...copyBtns].forEach((btn, i) => {
  btn.addEventListener('click', () => {
    copyToClippboard([...copiableValues][i])
  });
});

function copyToClippboard(valToCopy) {
  valToCopy.focus();

  navigator.clipboard.writeText(valToCopy.value)
    .then(confirmCopy())
    .catch(err => { throw new Error(err) });
};

function confirmCopy() {
  let object = document.querySelector('object')
  let message = document.createElement('small');

  object.appendChild(message);

  message.classList.add('cpySuccess');
  message.innerText = 'Copied!';

  setTimeout(() => {
    object.removeChild(message);
  }, 1200);
};
