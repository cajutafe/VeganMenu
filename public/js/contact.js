import vanillaValidatorJS from './vanillaValidatorJS.js';

const form = document.querySelector('form');
form.setAttribute('novalidate', true);

form.addEventListener('submit', e => {

  e.preventDefault();

  const contactFormValidated = vanillaValidatorJS(form, {
    rules: {
      nombre: {
        required: true,
        minlength: 1,
        maxlength: 20
      },
      email: {
        required: true,
        email: true
      },
      mensaje: {
        required: true,
        minlength: 10,
        maxlength: 100
      }
    }
  })

  // form validado correctamente 
  if (contactFormValidated) {
    const formData = new FormData(form);
    let reqData = {};
    // rellena un objeto con los datos del form
    formData.forEach((value, key) => reqData[key] = value);
    // envio de los datos (JSON) al server mediante petición asíncrona "fetch"
    fetch('contacto/emailSend', {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(message => {
      document.querySelector('.response').textContent = message;
    })
    .catch(error => console.log(error))
  }

})