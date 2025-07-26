<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  require_once '../config/database.php';

  try {
    $database = new Database();
    $db = $database->getConnection();
    $query = "SELECT id, nombre as name FROM materiales WHERE activo = true ORDER BY nombre";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $materials = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $materials[] = $row;
    }

    echo json_encode($materials);
  } catch(Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
  }
?>