document.addEventListener('DOMContentLoaded', (e) => {
    const form = document.getElementById('presupuesto-form');
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const seguroCheckbox = document.getElementById('seguro');
    const sillabebeCheckbox = document.getElementById('sillabebe');
    const conductorAdicionalCheckbox = document.getElementById('conductor_adicional');
    const tanqueLlenoCheckbox = document.getElementById('tanque_lleno');
    const totalInput = document.getElementById('total');
    const realTotalParagraph = document.getElementById('real-total');

    const precios = {
        economico: 30,
        intermedio: 50,
        lujo: 100,
        seguro: 10,
        sillabebe: 3,
        conductor_adicional: 15,
        tanque_lleno: 20
    };

    const descuentos = {
        10: 0.20 // 20% discount
    };

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');

    const nombreRegex = /^[a-zA-Z\s]+$/;
    const apellidoRegex = /^[a-zA-Z\s]+$/;
    const telefonoRegex = /^[0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const plazoRegex = /^[0-9]+$/;

    function validarInputs() {
        if (!nombreRegex.test(nombreInput.value.trim())) return false;
        if (!apellidoRegex.test(apellidoInput.value.trim())) return false;
        if (!telefonoRegex.test(telefonoInput.value.trim())) return false;
        if (!emailRegex.test(emailInput.value.trim())) return false;
        if (!plazoRegex.test(plazoInput.value.trim())) return false;
        if (!productoSelect.value) return false;
        return true;
    }

    function calcularTotal() {
        if (!validarInputs()) {
            totalInput.value = 'Datos inválidos. Por favor, revise los campos.';
            realTotalParagraph.textContent = '';
            return;
        }

        let total = 0;
        const plazo = parseInt(plazoInput.value) || 0;

        if (productoSelect.value) {
            total += precios[productoSelect.value] * plazo;
        }

        if (seguroCheckbox.checked) total += precios.seguro * plazo;
        if (sillabebeCheckbox.checked) total += precios.sillabebe * plazo;
        if (conductorAdicionalCheckbox.checked) total += precios.conductor_adicional * plazo;
        if (tanqueLlenoCheckbox.checked) total += precios.tanque_lleno;

        let discount = 0;
        if (plazo > 10) {
            discount = descuentos[10];
        }

        const discountedTotal = total - (total * discount);
        totalInput.value = discountedTotal.toFixed(2) + '€';
        realTotalParagraph.textContent = `${total.toFixed(2)}€`;
    }

    productoSelect.addEventListener('change', calcularTotal);
    plazoInput.addEventListener('input', calcularTotal);
    seguroCheckbox.addEventListener('change', calcularTotal);
    sillabebeCheckbox.addEventListener('change', calcularTotal);
    conductorAdicionalCheckbox.addEventListener('change', calcularTotal);
    tanqueLlenoCheckbox.addEventListener('change', calcularTotal);

    nombreInput.addEventListener('input', calcularTotal);
    apellidoInput.addEventListener('input', calcularTotal);
    telefonoInput.addEventListener('input', calcularTotal);
    emailInput.addEventListener('input', calcularTotal);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validarInputs()) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        alert('Formulario enviado con éxito. Total: ' + totalInput.value);
        form.reset();
        totalInput.value = '';
        realTotalParagraph.textContent = '';
    });

    calcularTotal();
});

