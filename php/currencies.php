<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  require_once '../config/database.php';

  try {
    $database = new Database();
    $db = $database->getConnection();
    $query = "SELECT id, codigo as code, nombre as name FROM monedas WHERE activo = true ORDER BY codigo";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $currencies = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $currencies[] = $row;
    }

    echo json_encode($currencies);  
  } catch(Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
  }
?>