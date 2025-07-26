import { requestGenerator } from './request-generator.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productForm').addEventListener('submit', saveProduct);
});


function validateIds() {
  const productoId = document.getElementById('idProduct').value.trim();
  const errorDiv = document.getElementById('error-id');

  errorDiv.textContent = '';
  document.getElementById('idProduct').classList.remove('error', 'valid');

  if (!productoId) {
    errorDiv.textContent = 'El código del producto no puede estar en blanco.';
    document.getElementById('idProduct').classList.add('error');
    return false;
  }

  if (productoId.length < 5 || productoId.length > 15) {
    errorDiv.textContent = 'El código del producto debe tener entre 5 y 15 caracteres.';
    document.getElementById('idProduct').classList.add('error');
    return false;
  }

  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
  if (!regex.test(productoId)) {
    errorDiv.textContent = 'El código del producto debe contener letras y números';
    document.getElementById('idProduct').classList.add('error');
    return false;
  }

  document.getElementById('idProduct').classList.add('valid');
  return true;
}

function validateName() {
  const productoName = document.getElementById('nameProduct').value.trim();
  const errorDiv = document.getElementById('error-name');

  errorDiv.textContent = '';
  document.getElementById('nameProduct').classList.remove('error', 'valid');

  if (!productoName) {
    errorDiv.textContent = 'El nombre del producto no puede estar en blanco.';
    document.getElementById('nameProduct').classList.add('error');
    return false;
  }

  if (productoName.length < 2 || productoName.length > 50) {
    errorDiv.textContent = 'El nombre del producto debe tener entre 2 y 50 caracteres.';
    document.getElementById('nameProduct').classList.add('error');
    return false;
  }

  document.getElementById('nameProduct').classList.add('valid');
  return true;
}

function validatePrice() {
  const productPrice = document.getElementById('priceProduct').value.trim();
  const errorDiv = document.getElementById('error_price');

  errorDiv.textContent = '';
  document.getElementById('priceProduct').classList.remove('error', 'valid');

  if (!productPrice) {
    errorDiv.textContent = 'El precio del producto no puede estar en blanco.';
    document.getElementById('priceProduct').classList.add('error');
    return false;
  }

  const regex = /^\d+(\.\d{1,2})?$/;
  if (!regex.test(productPrice) || parseFloat(productPrice) <= 0) {
      errorDiv.textContent = 'El precio del producto debe ser un número positivo con hasta dos decimales.';
      document.getElementById('priceProduct').classList.add('error');
      return false;
  }

  document.getElementById('priceProduct').classList.add('valid');
  return true;
}

function validateMaterials() {
  const checkboxes = document.querySelectorAll('input[name="materialsCheckbox[]"]:checked');
  const errorDiv = document.getElementById('error-materials');
  console.log('Checkboxes seleccionados:', checkboxes.length);
  errorDiv.textContent = '';

  if (checkboxes.length < 2) {
    errorDiv.textContent = 'Debe seleccionar al menos dos materiales para el producto.';
    return false;
  }

  return true;
}

function validateWarehouses() {
  const warehouse = document.getElementById('warehouseProduct').value;
  const errorDiv = document.getElementById('error_warehouse');

  errorDiv.textContent = '';
  document.getElementById('warehouseProduct').classList.remove('error', 'valid');

  if (!warehouse) {
    errorDiv.textContent = 'Debe seleccionar una bodega.';
    document.getElementById('warehouseProduct').classList.add('error');
    return false;
  }

  document.getElementById('warehouseProduct').classList.add('valid');
  return true;
}

function validateBranches() {
  const branches = document.getElementById('brancheProduct').value;
  const errorDiv = document.getElementById('error_branche');

  errorDiv.textContent = '';
  document.getElementById('brancheProduct').classList.remove('error', 'valid');

  if (!branches) {
    errorDiv.textContent = 'Debe seleccionar una sucursal para la bodega seleccionada.';
    document.getElementById('brancheProduct').classList.add('error');
    return false;
  }

  document.getElementById('brancheProduct').classList.add('valid');
  return true;
}

function validateCurrencie() {
  const currencie = document.getElementById('currencyProduct').value;
  const errorDiv = document.getElementById('error_currency');

  errorDiv.textContent = '';
  document.getElementById('currencyProduct').classList.remove('error', 'valid');

  if (!currencie) {
    errorDiv.textContent = 'Debe seleccionar una moneda para el producto.';
    document.getElementById('currencyProduct').classList.add('error');
    return false;
  }

  document.getElementById('currencyProduct').classList.add('valid');
  return true;
}

function validateDescription() {
  const description = document.getElementById('descriptionProduct').value.trim();
  const errorDiv = document.getElementById('error-description');

  errorDiv.textContent = '';
  document.getElementById('descriptionProduct').classList.remove('error', 'valid');

  if (!description) {
    errorDiv.textContent = 'La descripción del producto no puede estar en blanco.';
    document.getElementById('descriptionProduct').classList.add('error');
    return false;
  }

  if (description.length < 10 || description.length > 1000) {
    errorDiv.textContent = 'La descripción del producto debe tener entre 10 y 1000 caracteres.';
    document.getElementById('descriptionProduct').classList.add('error');
    return false;
  }

  document.getElementById('descriptionProduct').classList.add('valid');
  return true;
}

async function saveProduct(e) {
  e.preventDefault();

  const validations = [
    validateIds(),
    validateName(),
    validatePrice(),
    validateMaterials(),
    validateWarehouses(),
    validateBranches(),
    validateCurrencie(),
    validateDescription()
  ];

  if (!validations.every(v => v)) {
    alert('Por favor, corrija los errores en el formulario antes de continuar.');
    return;
  }

  const idProduct = document.getElementById('idProduct').value.trim();

  try {
    const response = await requestGenerator('php/verify_id.php', 'POST', 'codigo=' + encodeURIComponent(idProduct));

    if (response.exist) {
      alert('El código del producto ya está registrado.');
      document.getElementById('idProduct').classList.add('error');
      document.getElementById('error-id').textContent = 'El código del producto ya está registrado.';
      return;
    }
    sendForm();
  } catch (error) {

  }
}

async function sendForm() {
  const formData = new FormData(document.getElementById('productForm'));
  console.log('Enviando datos del formulario:', Object.fromEntries(formData.entries()));
  const params = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    params.append(key, value);
  }
  console.log('Parámetros del formulario:', params.toString());
  try {
    const response = await requestGenerator('php/save_product.php', 'POST', params.toString());

    if (response.success) {
      alert('Producto guardado exitosamente');

      document.getElementById('productForm').reset();
      document.getElementById('brancheProduct').disabled = true;
      document.querySelectorAll('.valid, .error').forEach(el => {
        el.classList.remove('valid', 'error');
      });
      document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
      });
    } else {
      alert('Error al guardar el producto: ' + (response.error || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Error al enviar el formulario: ' + error);
  }
}