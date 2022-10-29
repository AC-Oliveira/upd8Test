const inputCPF = document.getElementById('InputCPF');
const inputName = document.getElementById('InputName');
const InputDate = document.getElementById('InputDate');
const InputSexF = document.getElementById('sexF');
const InputSexM = document.getElementById('sexM');
const InputAddress = document.getElementById('InputAddress');
const InputState = document.getElementById('InputState');
const InputCity = document.getElementById('InputCity');
const btnSubmit = document.getElementById('btnSubmit');
const btnClear = document.getElementById('btnClear');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const user = {
    CPF: inputCPF.value,
    Name: inputName.value,
    BirthDate: InputDate.value,
    Address: InputAddress.value,
    State: InputState.value,
    City: InputCity.value,
    Sex: InputSexM.checked ? 'M' : 'F',
  };
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:7145/api/User',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    processData: false,
    data: JSON.stringify(user),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});

btnClear.addEventListener('click', (e) => {
  e.preventDefault();
  inputCPF.value = '';
  inputName.value = '';
  InputDate.value = '';
  InputAddress.value = '';
  InputState.value = '';
  InputCity.value = '';
  InputSexM.checked = false;
  InputSexF.checked = true;
});
