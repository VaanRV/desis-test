import { requestGenerator } from './request-generator.js';

document.addEventListener('DOMContentLoaded', async () => {
  Promise.all([
    await loadWarehouses(),
    await loadCurrencies(),
    await loadMaterials()
  ]);
  document.getElementById('warehouseProduct').addEventListener('change', loadBranches);
});

async function loadWarehouses() {
  const selectWarehouses = document.getElementById('warehouseProduct');
  selectWarehouses.disabled = true;
  selectWarehouses.innerHTML = '<option value=""></option>';

  try {
    const response = await requestGenerator('php/warehouses.php', 'GET', null);
    if (response.error) {
      console.error('Error cargando bodegas:', response.error);
      return;
    }

    response.sort((a, b) => a.name.localeCompare(b.name));
    response.forEach((warehouse) =>{
      const option = document.createElement('option');
      option.value = warehouse.id;
      option.textContent = warehouse.name;
      selectWarehouses.appendChild(option);
    });

    selectWarehouses.disabled = false;
  } catch (error) {
    console.error('Error:', error);
    selectWarehouses.disabled = false;
  }
}

async function loadBranches() {
  const warehouseId = document.getElementById('warehouseProduct').value;
  const selectBranches = document.getElementById('brancheProduct');
  selectBranches.disabled = true;

  if (!warehouseId) return;

  try {
    const response = await requestGenerator('php/branches.php?bodega_id=' + warehouseId, 'GET', null);
    if (response.error) {
      console.error('Error cargando bodegas:', response.error);
      return;
    }

    response.sort((a, b) => a.name.localeCompare(b.name));
    response.forEach((branches) => {
      const option = document.createElement('option');
      option.value = branches.id;
      option.textContent = branches.name;
      selectBranches.appendChild(option);
    });

    selectBranches.disabled = false;
  } catch (error) {
    console.error('Error:', error);
    selectWarehouses.disabled = false;
  }

}

async function loadCurrencies() {
  const selectCurrencies = document.getElementById('currencyProduct');
  selectCurrencies.disabled = true;
  selectCurrencies.innerHTML = '<option value=""></option>';

  try {
    const response = await requestGenerator('php/currencies.php', 'GET', null);
    if (response.error) {
      console.error('Error cargando monedas:', response.error);
      return;
    }

    response.sort((a, b) => a.code.localeCompare(b.code));
    response.forEach((currencie) => {
      const option = document.createElement('option');
      option.value = currencie.id;
      option.textContent = currencie.code + ' - ' + currencie.name;
      selectCurrencies.appendChild(option);
    });
    selectCurrencies.disabled = false;
  } catch (error) {
    console.error('Error cargando monedas:', error);
    selectCurrencies.disabled = false;
  }
}

async function loadMaterials() {
  const materialsContainer = document.getElementById('materials-container');
  materialsContainer.innerHTML = '';

  try {
    const response = await requestGenerator('php/materials.php', 'GET', null);
    if (response.error) {
      console.error('Error cargando materiales:', response.error);
      return;
    }

    response.sort((a, b) => a.id - b.id);
    response.forEach((material) => {
      const div = document.createElement('div');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
    
      div.className = 'material-item';

      checkbox.type = 'checkbox';
      checkbox.id = 'material_' + material.id;
      checkbox.name = 'materialsCheckbox[]';
      checkbox.value = material.id;

      label.htmlFor = 'material_' + material.id;
      label.textContent = material.name;

      div.appendChild(checkbox);
      div.appendChild(label);
      materialsContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Error cargando materiales:', error);
    materialsContainer.innerHTML = '<p>Error al cargar los materiales.</p>';
  }
}