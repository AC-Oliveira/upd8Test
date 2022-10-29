let data;
const tBodyRef = document
  .getElementById('usersTable')
  .getElementsByTagName('tbody')[0];

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

const clearForm = () => {
  inputCPF.value = '';
  inputName.value = '';
  InputDate.value = '';
  InputAddress.value = '';
  InputState.value = '';
  InputCity.value = '';
  InputSexM.checked = false;
  InputSexF.checked = false;
  console.log('clearForm');
};
btnClear.addEventListener('click', clearForm);

const searchUsers = async () => {
  console.log('searchUsers');
  const user = {
    Sex: InputSexM.checked ? 'M' : 'F',
    CPF: inputCPF.value,
    Name: inputName.value,
    BirthDate: InputDate.value,
    Address: InputAddress.value,
    State: InputState.value,
    City: InputCity.value,
  };

  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:7145/api/User/search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    processData: false,
    data: JSON.stringify(user),
  };

  $.ajax(settings).done(function (response) {
    tBodyRef.innerHTML = '';
    response.forEach(addRows);
    // tBodyRef.innerHTML = '';
    // response.forEach(addRows);
  });
};
btnSubmit.addEventListener('click', searchUsers);

const addRows = (user) => {
  const updateUser = () => {
    console.log('updateUser');
    const newUser = {
      CPF: inputCPF.value,
      Name: inputName.value,
      BirthDate: InputDate.value,
      Address: InputAddress.value,
      State: InputState.value,
      City: InputCity.value,
      Sex: InputSexM.checked ? 'M' : InputSexF.checked ? 'F' : '',
      Id: user.id,
    };
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://localhost:7145/api/User`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      processData: false,
      data: JSON.stringify(newUser),
    };

    $.ajax(settings).done(function (response) {
      window.location.reload();
    });
  };
  const row = tBodyRef.insertRow();
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Remover';
  deleteButton.id = `delete-${user.id}`;
  deleteButton.addEventListener('click', () => {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://localhost:7145/api/User/${user.id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      processData: false,
      data: '',
    };

    $.ajax(settings).done(function (response) {
      window.location.reload();
    });
  });
  deleteButton.classList.add(...['btn', 'btn-danger']);

  const editButton = document.createElement('button');
  editButton.innerHTML = 'Editar';
  editButton.id = `edit-${user.id}`;

  const changeListeners = () => {
    console.log('changeListeners');
    btnSubmit.innerHTML = 'Buscar';
    btnClear.innerHTML = 'Limpar';
    btnSubmit.removeEventListener('click', updateUser);
    btnClear.removeEventListener('click', changeListeners);
    btnSubmit.addEventListener('click', searchUsers);
    btnClear.addEventListener('click', clearForm);
  };

  editButton.addEventListener('click', () => {
    console.log('editListener');
    inputCPF.value = user.cpf;
    inputName.value = user.name;
    InputDate.value = user.birthDate;
    InputAddress.value = user.address;
    InputState.value = user.state;
    InputCity.value = user.city;
    InputSexM.checked = user.sex === 'M';
    InputSexF.checked = user.sex === 'F';
    btnSubmit.innerHTML = 'Salvar';
    btnClear.innerHTML = 'Cancelar';
    btnSubmit.removeEventListener('click', searchUsers);
    btnSubmit.addEventListener('click', updateUser);
    btnClear.removeEventListener('click', clearForm);
    btnClear.addEventListener('click', changeListeners);
  });
  editButton.classList.add(...['btn', 'btn-success']);

  row.insertCell().appendChild(deleteButton);
  row.insertCell().appendChild(editButton);
  row.insertCell().appendChild(document.createTextNode(user.name));
  row.insertCell().appendChild(document.createTextNode(user.cpf));
  row.insertCell().appendChild(document.createTextNode(user.birthDate));
  row.insertCell().appendChild(document.createTextNode(user.sex));
  row.insertCell().appendChild(document.createTextNode(user.address));
  row.insertCell().appendChild(document.createTextNode(user.state));
  row.insertCell().appendChild(document.createTextNode(user.city));
};

const getAllUsers = async () => {
  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://localhost:7145/api/User',
    method: 'GET',
    headers: {},
  };

  await $.ajax(settings).done(function (response) {
    data = response;
    data.forEach(addRows);
  });
};

window.onload = getAllUsers;
