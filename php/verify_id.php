<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  require_once '../config/database.php';

  try {
    if (!isset($_POST['idProduct']) || empty($_POST['idProduct'])) {
      echo json_encode(array('error' => 'Código requerido'));
      exit;
    }

    $database = new Database();
    $db = $database->getConnection();
    $query = "SELECT COUNT(*) as count FROM productos WHERE codigo = :idProduct";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':idProduct', $_POST['idProduct']);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $exist = $result['count'] > 0;

    echo json_encode(array('exist' => $exist));
  } catch(Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
  }
?>