import vanillaValidatorJS from './vanillaValidatorJS.js';

const forgotPassForm = document.querySelector('.forgotPassForm');
forgotPassForm.setAttribute('novalidate', true);

forgotPassForm.addEventListener('submit', e => {

    e.preventDefault();

    const forgotPassFormValidated = vanillaValidatorJS(forgotPassForm, {
        rules: {
            forgotPassEmail: {
                required: true,
                email: true
            }
        }
    })

    // FORM Registro validado correctamente
    if (forgotPassFormValidated) {
        const formData = new FormData(forgotPassForm);
        let reqData = {};
        //Rellena un objeto con los datos del form
        formData.forEach((value, key) => reqData[key] = value);
        // Envio de los datos (JSON) al servidor mediante petición asíncrona "fetch"
        fetch('forgotPass', {
            method: 'POST',
            body: JSON.stringify(reqData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(message => {
                document.querySelector('.responseforgotPass').textContent = message;
            })
            .catch(error => console.log(error))
    }
})