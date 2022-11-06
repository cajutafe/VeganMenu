import vanillaValidatorJS from './vanillaValidatorJS.js';

const signUpForm = document.querySelector('.signUpForm');
signUpForm.setAttribute('novalidate', true);

signUpForm.addEventListener('submit', e => {

  e.preventDefault();

  const signUpFormValidated = vanillaValidatorJS(signUpForm, {
    rules: {
      nombre: {
        required: true,
        minlength: 1,
        maxlength: 20
      },
      apell: {
        required: true,
        minlength: 1,
        maxlength: 100
      },
      signUpEmail: {
        required: true,
        email: true
      },
      passSignUp1: {
        required: true,
        minlength: 6
      },
      passSignUp2: {
        required: true,
        equalTo: 'passSignUp1'
      }
    }
  })

  // FORM Registro validado correctamente
  if (signUpFormValidated) {
    const formData = new FormData(signUpForm);
    let reqData = {};
    //Rellena un objeto con los datos del form
    formData.forEach((value, key) => reqData[key] = value);
    // Envio de los datos (JSON) al servidor mediante petición asíncrona "fetch"
    fetch('users/signUp', {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(message => {
        document.querySelector('.responseSignUP').textContent = message;
      })
      .catch(error => console.log(error))
  }
})

const signInForm = document.querySelector('.signInForm');
signInForm.setAttribute('novalidate', true);

signInForm.addEventListener('submit', e => {

  e.preventDefault();

  const signInFormValidated = vanillaValidatorJS(signInForm, {
    rules: {
      signInEmail: {
        required: true,
        email: true
      },
      signInPass: {
        required: true,
      }
    }
  })

  //Form validado correctamente
  if (signInFormValidated) {
    const formData = new FormData(signInForm);
    let reqData = {};
    // Rellena un objeto con los datos del form
    formData.forEach((value, key) => reqData[key] = value);
    //Envio de los datos (JSON) al server mediante peticiónasíncrona "fetch"
    fetch('users/signIn', {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => response.json())
      .then(message => {
        document.querySelector('.responseSignIn').textContent = message;
        if (message === 'Datos de entrada correctos!') {
          location.href = '/';
        }
      })
      .catch(error => console.log(error))
  }

})

