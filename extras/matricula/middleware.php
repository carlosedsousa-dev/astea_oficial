<?php
/**
 * middleware.php - Camada de Segurança e Pré-processamento.
 */

class Middleware {
    /**
     * Verifica se os dados básicos estão presentes e são válidos.
     */
    public function validarCampos($dados) {
        if (empty($dados['nome']) || empty($dados['idade']) || empty($dados['curso'])) {
            die("Erro de Validação: Todos os campos (Nome, Idade e Curso) são obrigatórios.");
        }

        if (!is_numeric($dados['idade'])) {
            die("Erro de Validação: A idade deve ser um número válido.");
        }

        return true;
    }
}
?>
