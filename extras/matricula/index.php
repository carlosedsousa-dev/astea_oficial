<?php
/**
 * index.php - Front Controller.
 * Ponto de entrada único da aplicação.
 */

require_once __DIR__ . '/router.php';

// Inicia o roteamento
$router = new Router();
$router->gerenciar();
?>
