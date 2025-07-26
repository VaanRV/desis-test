<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  require_once '../config/database.php';

  try {
    $required_fields = ['idProduct', 'nameProduct', 'warehouseProduct', 'brancheProduct', 'currencyProduct', 'priceProduct', 'descriptionProduct'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
          echo json_encode(array('error' => "Campo $field es requerido"));
          exit;
        }
    }
    if (!isset($_POST['materialsCheckbox']) || !is_array($_POST['materialsCheckbox']) || count($_POST['materialsCheckbox']) < 2) {
      echo json_encode(array('error' => 'Debe seleccionar al menos dos materiales'));
      exit;
    }
  
    $database = new Database();
    $db = $database->getConnection();
    $db->beginTransaction();

    $query = "INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) 
              VALUES (:id, :name, :warehouse, :branche, :currency, :price, :description)";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $_POST['idProduct']);
    $stmt->bindParam(':name', $_POST['nameProduct']);
    $stmt->bindParam(':warehouse', $_POST['warehouseProduct'], PDO::PARAM_INT);
    $stmt->bindParam(':branche', $_POST['brancheProduct'], PDO::PARAM_INT);
    $stmt->bindParam(':currency', $_POST['currencyProduct'], PDO::PARAM_INT);
    $stmt->bindParam(':price', $_POST['priceProduct']);
    $stmt->bindParam(':description', $_POST['descriptionProduct']);
    $stmt->execute();

    $product_id = $db->lastInsertId();
    $query_material = "INSERT INTO producto_materiales (producto_id, material_id) VALUES (:product_id, :material_id)";
    $stmt_material = $db->prepare($query_material);

    foreach ($_POST['materialsCheckbox'] as $material_id) {
      $stmt_material->bindParam(':product_id', $product_id, PDO::PARAM_INT);
      $stmt_material->bindParam(':material_id', $material_id, PDO::PARAM_INT);
      $stmt_material->execute();
    }

    $db->commit();

    echo json_encode(array('success' => true, 'message' => 'Producto guardado exitosamente')); 
  } catch(Exception $e) {
    if ($db->inTransaction()) {
      $db->rollback();
    }
    echo json_encode(array('error' => $e->getMessage()));
  }
?>