<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  require_once '../config/database.php';

  try {
    if (!isset($_GET['bodega_id']) || empty($_GET['bodega_id'])) {
      echo json_encode(array('error' => 'ID de bodega requerido'));
      exit;
    }

    $database = new Database();
    $db = $database->getConnection();
    $query = "SELECT id, nombre as name FROM sucursales WHERE bodega_id = :bodega_id AND activo = true ORDER BY nombre";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':bodega_id', $_GET['bodega_id'], PDO::PARAM_INT);
    $stmt->execute();
    $branches = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $branches[] = $row;
    }
    echo json_encode($branches);
  } catch(Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
  }
?>