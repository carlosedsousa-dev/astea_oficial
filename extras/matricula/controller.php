<?php
/**
 * controller.php - O Maestro (Controller).
 * Orquestra a comunicação entre View, Service e Model.
 */

require_once __DIR__ . '/model.php';
require_once __DIR__ . '/service.php';

class MatriculaController {
    private $service;

    public function __construct() {
        $this->service = new MatriculaService();
    }

    /**
     * Processa a requisição de matrícula vinda do formulário.
     */
    public function processarMatricula($dados) {
        try {
            // 1. Aplica regras de negócio via Service
            $dadosValidados = $this->service->validarMatricula($dados);

            // 2. Se aprovado, persiste no banco via Model
            $aluno = new AlunoModel(
                $dadosValidados['nome'],
                $dadosValidados['idade'],
                $dadosValidados['curso']
            );

            if ($aluno->save()) {
                // Redireciona ou exibe sucesso
                return "Matrícula de {$dadosValidados['nome']} realizada com sucesso!";
            }

        } catch (Exception $e) {
            // Retorna a mensagem de erro da regra de negócio
            return "Erro: " . $e->getMessage();
        }
    }
}
?>
