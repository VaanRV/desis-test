<?php
  class Database {
    private $host = 'localhost';
    private $db_name = 'sistema_productos';
    private $username = 'postgres';
    private $password = '';
    private $port = '5432';
    public $conn;

    public function getConnection() {
      $this->conn = null;
      try {
        $this->conn = new PDO(
          "pgsql:host=" . $this->host . 
          ";port=" . $this->port . 
          ";dbname=" . $this->db_name,
          $this->username,
          $this->password,
          array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
        );
      } catch(PDOException $exception) {
        echo "Error de conexión: " . $exception->getMessage();
      }
      return $this->conn;
    }
  }
?>