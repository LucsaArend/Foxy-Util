function validarFormulario(prID,prSetFoco = false,prSetEvent = true) {
    let retorno = true;
    let formulario = document.getElementById(prID);
    // Obtenha todos os elementos <select> dentro do formulário
    let selects = formulario.querySelectorAll('select');
    for (let i = 0; i < selects.length; i++) {
        if (selects[i].hasAttribute('required')) {
            if (!selects[i].value) {
                retorno = false;
                selects[i].classList.add("is-invalid");
            } else {
                selects[i].classList.remove("is-invalid");
            }
            if (prSetEvent) {
                selects[i].addEventListener('change', function() {
                    validarFormulario(prID,false,false);
                });
            }
        }
    }
    // Obtenha todos os elementtos <input> dentro do formulário
    let inputs = formulario.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i ++) {
        if (inputs[i].hasAttribute('required')) {
            if (prSetEvent) {
                inputs[i].addEventListener('keydown', function() {
                    validarFormulario(prID,false,false);
                });
            }
            if (inputs[i].hasAttribute('minlength')) {
                if (!inputs[i].value) {
                    retorno = false;
                    inputs[i].classList.add("is-invalid");
                    continue;
                }
                if (inputs[i].value.length < inputs[i].minLength) {
                    retorno = false;
                    inputs[i].classList.add("is-invalid");
                } else {
                    inputs[i].classList.remove("is-invalid");
                }
            }
            if (inputs[i].hasAttribute('maxlength')) {
                if (!inputs[i].value) {
                    retorno = false;
                    inputs[i].classList.add("is-invalid");
                    continue;
                }
                if (inputs[i].value.length > inputs[i].maxLength) {
                    retorno = false;
                    inputs[i].classList.add("is-invalid");
                } else {
                    inputs[i].classList.remove("is-invalid");
                }
            }
        }
    }
    return retorno;
}