// Jquery Dependency
// A $( document ).ready() block.
$( document ).ready(function() {
    registerFACurrencyEvents();
});

function FA_Currency_Register(){
    registerFACurrencyEvents();
}

function registerFACurrencyEvents() {
    $("input[data-type='currency']").on({
        keyup: function() {
            formatCurrency($(this));
        },
        blur: function() {
            formatCurrency($(this), "blur");
        },
        onfocusOut: function() {
            formatCurrency($(this), "fix2");
        },
        focusout: function() {
            formatCurrency($(this), "fix2");
        }
    });
    $("input[data-type='currencyFone']").on({
        keyup: function() {
            formatCurrencyFone($(this));
        },
        blur: function() {
            formatCurrencyFone($(this));
        },
        onfocusOut: function() {
            formatCurrencyFone($(this));
        },
        focusout: function() {
            formatCurrencyFone($(this));
        }
    });
}

function foxCurrencyFloat(prInputID) {
    let value = $('#'+prInputID).val();
    if (value.indexOf(",") >= 0) {
        let partRight = value.substring(value.indexOf(",")+1,value.length);
        let partLeft = value.substring(0,value.indexOf(","));
        return getFoxAsomeNumbers(partLeft) + '.' + partRight;
    } else {
        return getFoxAsomeNumbers(value);
    }
}

function formatNumber(n) {
    // format number 1000000 to 1.234,56
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
//Return numbers
function getFoxAsomeNumbers(n) {
    // format number 1000000 to 123456
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")
}
function formatFloatCurrency(input){
    //Format float values to string with mask R$ Real Brasil
    //inputString Example: "1000.52"
    // get input value
    if(typeof input !== 'number'){
        return 'R$ 0,00';
    } else {
        let input_val = input.toString();
        input_val = parseFloat(input_val).toFixed(2);
        input_val = input_val.toString();
        input_val = input_val.replace('.',',');

        // check for decimal
        if (input_val.indexOf(",") >= 0) {
            if (input_val.indexOf(",") === (input_val.length -1)) {
                return;
            }
            let partRight = input_val.substring(input_val.indexOf(",")+1,input_val.length);
            let partLeft = input_val.substring(0,input_val.indexOf(","));
            //alert(partRight);
            //alert(partLeft);
            return 'R$ ' + formatNumber(partLeft)  + ',' + partRight;
            //alert(number);
        } else {
            return 'R$ ' + formatNumber(input_val) + ',00'
        }
    }
}
function formatCurrency(input, prAux) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    let input_val = input.val();

    // don't validate empty input
    if (input_val === "") { return; }

    // check for decimal
    let number = input_val;
    if (input_val.indexOf(",") >= 0) {
        if (input_val.indexOf(",") === (input_val.length -1)) {
            return;
        }
        let partRight = input_val.substring(input_val.indexOf(",")+1,input_val.length);
        let partLeft = input_val.substring(0,input_val.indexOf(","));
        //alert(partRight);
        //alert(partLeft);
        number = formatNumber(partLeft) + ',' + partRight;
        //alert(number);
    } else {
        number = formatNumber(input_val);
    }
    // send updated string to input
    if ((prAux === "fix2") && number.length > 0) {
        if (input_val.indexOf(",") <= 0) {
            input.val('R$ ' + number + ',00');
        }
    } else {
        input.val('R$ ' + number);
    }

    // original length
    let original_len = input_val.length;
    // initial caret position
    let caret_pos = input.prop("selectionStart");
    // put caret back in the right position
    let updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

function formatCurrencyFone(input) {
    // Remove tudo que não for dígito do telefone
    let valueInput = input.val()
    valueInput = valueInput.toString();
    valueInput = valueInput.replace(/\D/g, '');

    // Verifica o tamanho do telefone para determinar a máscara adequada
    if (valueInput.length <= 10) {
        // Formato: (99) 9999-9999
        valueInput = valueInput.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        // Formato: (99) 99999-9999
        valueInput = valueInput.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    input.val(valueInput);
}

function formatFone(input) {
    // Remove tudo que não for dígito do telefone
    input = input.val()
    input = input.toString();
    input = input.replace(/\D/g, '');

    // Verifica o tamanho do telefone para determinar a máscara adequada
    if (input.length <= 10) {
        // Formato: (99) 9999-9999
        input = input.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        // Formato: (99) 99999-9999
        input = input.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return input
}

