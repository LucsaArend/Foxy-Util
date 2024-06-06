$( document ).ready(function() {
    registerFAMaskDocEvents();
});

function FA_Mask_Register(){
    registerFAMaskDocEvents();
}

function registerFAMaskDocEvents() {
    $("input[data-type='cep']").on('keyup blur input', function() {
        const inputValue = $(this).val();
        const formattedCNAE = formatCNAE(inputValue);
        $(this).val(formattedCNAE);
    });
}

function formatCNAE(input) {
    // Remover todos os caracteres não numéricos
    let numero = input.replace(/\D/g, '');

    // Verificar se o número tem o formato esperado (7 dígitos, 1 dígito, 2 dígitos)
    if (numero.length === 10) {
        let parte1 = numero.slice(0, 4);
        let parte2 = numero.slice(4, 5);
        let parte3 = numero.slice(5, 7);
        return `${parte1}-${parte2}/0${parte3}`;
    }else{
        return numero.slice(0, 8)
    }
}
