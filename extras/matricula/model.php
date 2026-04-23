<?php
/**
 * model.php - Representa a camada de dados (Model).
 * Responsável pela comunicação direta com a tabela 'alunos'.
 */

class AlunoModel {
    private $id;
    private $nome;
    private $idade;
    private $curso;
    private $pdo;

    public function __construct($nome = null, $idade = null, $curso = null) {
        $this->nome = $nome;
        $this->idade = $idade;
        $this->curso = $curso;
        
        // Conexão com o banco
        $this->pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // Getters e Setters
    public function getNome() { return $this->nome; }
    public function setNome($nome) { $this->nome = $nome; }

    public function getIdade() { return $this->idade; }
    public function setIdade($idade) { $this->idade = $idade; }

    public function getCurso() { return $this->curso; }
    public function setCurso($curso) { $this->curso = $curso; }

    /**
     * Salva o objeto atual no banco de dados.
     */
    public function save() {
        $sql = "INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)";
        $stmt = $this->pdo->prepare($sql);
        
        return $stmt->execute([
            ':nome' => $this->nome,
            ':idade' => $this->idade,
            ':curso' => $this->curso
        ]);
    }

    /**
     * Busca todos os alunos cadastrados.
     */
    public static function all() {
        $pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
        $stmt = $pdo->query("SELECT * FROM alunos");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
