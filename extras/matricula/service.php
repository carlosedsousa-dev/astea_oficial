<?php
/**
 * service.php - Camada de Regras de Negócio (Service).
 * Resolve validações complexas e lógica especializada.
 */

class MatriculaService {
    /**
     * Valida as regras de negócio para uma nova matrícula.
     * @throws Exception caso alguma regra falhe.
     */
    public function validarMatricula($dados) {
        $nome = $dados['nome'] ?? '';
        $idade = (int) ($dados['idade'] ?? 0);
        $curso = $dados['curso'] ?? '';

        // Exemplo de regra: Idade mínima de 16 anos
        if ($idade < 16) {
            throw new Exception("Desculpe, a idade mínima para matrícula é 16 anos.");
        }

        // Exemplo de regra: Nome não pode ser muito curto
        if (strlen($nome) < 3) {
            throw new Exception("O nome do aluno deve ter pelo menos 3 caracteres.");
        }

        // Simulação de lógica de bolsa de estudos
        $temDireitoBolsa = ($idade > 18 && $curso === 'Informática');

        return [
            'nome' => $nome,
            'idade' => $idade,
            'curso' => $curso,
            'bolsa' => $temDireitoBolsa
        ];
    }
}
?>
