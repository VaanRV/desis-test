<?php
  echo "<h2>Testing database.php</h2>";
  try {
      require_once 'config/database.php';
      $database = new Database();
      $db = $database->getConnection();

      if ($db) {
          echo "Funciona la conexión (y)<br>";
      } else {
          echo "Error: No funciona<br>";
      }
  } catch (Exception $e) {
      echo "Error: No funciona " . $e->getMessage() . "<br>";
  }

?>

<style>
  h2 {
    color: #34495e;
    border-bottom: 1px solid #ccc;
  }
</style>