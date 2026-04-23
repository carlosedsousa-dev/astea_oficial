<?php
/**
 * router.php - Gerenciador de Rotas.
 */

require_once __DIR__ . '/middleware.php';
require_once __DIR__ . '/controller.php';

class Router {
    public function gerenciar() {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            // Exibe a interface
            include __DIR__ . '/view.php';
        } 
        
        elseif ($metodo === 'POST') {
            // Aciona a segurança (Middleware)
            $middleware = new Middleware();
            $middleware->validarCampos($_POST);

            // Aciona o Controller
            $controller = new MatriculaController();
            $resposta = $controller->processarMatricula($_POST);

            // Devolve para a view com a mensagem de resposta
            include __DIR__ . '/view.php';
        }
    }
}
?>
