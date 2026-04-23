<?php
/**
 * migration.php - Responsável pelas configurações iniciais do banco de dados.
 */

class Migration {
    private $pdo;

    public function __construct() {
        // Cria a conexão com o SQLite (o arquivo será criado se não existir)
        $this->pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function run() {
        echo "Iniciando migração...\n";

        $sql = "CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            idade INTEGER NOT NULL,
            curso TEXT NOT NULL
        )";

        try {
            $this->pdo->exec($sql);
            echo "Tabela 'alunos' criada ou já existente com sucesso.\n";
        } catch (PDOException $e) {
            echo "Erro ao criar tabela: " . $e->getMessage() . "\n";
        }
    }
}

// Execução do script
$migration = new Migration();
$migration->run();
?>
