<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Registro de Productos</title>
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <div class="container">
      <h1>Formulario de Producto</h1>

      <form id="productForm">
        <div class="grid-columns">
           <div class="form-group">
            <label for="idProduct">Código</label>
            <input type="text" id="idProduct" name="idProduct" maxlength="15">
            <span class="error-message" id="error-id"></span>
          </div>

          <div class="form-group">
            <label for="nameProduct">Nombre</label>
            <input type="text" id="nameProduct" name="nameProduct" maxlength="50">
            <span class="error-message" id="error-name"></span>
          </div>

          <div class="form-group">
            <label for="warehouseProduct">Bodega</label>
            <select id="warehouseProduct" name="warehouseProduct">
              <option value="">Seleccione una bodega</option>
            </select>
            <span class="error-message" id="error_warehouse"></span>
          </div>

          <div class="form-group">
            <label for="brancheProduct">Sucursal</label>
            <select id="brancheProduct" name="brancheProduct" disabled>
              <option value="">Seleccione una sucursal</option>
            </select>
            <span class="error-message" id="error_branche"></span>
          </div>

          <div class="form-group">
            <label for="currencyProduct">Moneda</label>
            <select id="currencyProduct" name="currencyProduct">
              <option value="">Seleccione una moneda</option>
            </select>
            <span class="error-message" id="error_currency"></span>
          </div>

          <div class="form-group">
            <label for="priceProduct">Precio</label>
            <input type="text" id="priceProduct" name="priceProduct">
            <span class="error-message" id="error_price"></span>
          </div>
        </div>

        <div class="form-group separator-top">
          <label>Material del Producto</label>
          <div id="materials-container">
            <!-- Carga de materiales -->
          </div>
          <span class="error-message" id="error-materials"></span>
        </div>

        <div class="form-group separator-top">
          <label for="descriptionProduct">Descripción</label>
          <textarea id="descriptionProduct" name="descriptionProduct" rows="4" maxlength="1000"></textarea>
          <span class="error-message" id="error-description"></span>
        </div>

        <div class="form-group button-container">
          <button type="submit" id="save-btn">Guardar Producto</button>
        </div>
        </form>
      </div>

      <script type="module" src="js/form-data-loader.js"></script>
      <script type="module" src="js/validations.js"></script>
  </body>
</html>