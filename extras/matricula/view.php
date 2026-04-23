<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Matrícula - PHP Puro</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
        h2 { text-align: center; color: #333; }
        label { display: block; margin-top: 10px; color: #666; }
        input, select { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background-color: #28a745; border: none; color: white; margin-top: 20px; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #218838; }
        .message { margin-top: 15px; padding: 10px; border-radius: 4px; text-align: center; }
        .success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>

<div class="container">
    <h2>Matrícula</h2>
    
    <?php if (isset($resposta)): ?>
        <div class="message <?php echo strpos($resposta, 'Erro') === 0 ? 'error' : 'success'; ?>">
            <?php echo $resposta; ?>
        </div>
    <?php endif; ?>

    <form action="index.php" method="POST">
        <label for="nome">Nome do Aluno:</label>
        <input type="text" id="nome" name="nome" placeholder="Ex: João Silva">

        <label for="idade">Idade:</label>
        <input type="number" id="idade" name="idade" placeholder="Ex: 18">

        <label for="curso">Curso:</label>
        <select id="curso" name="curso">
            <option value="">Selecione...</option>
            <option value="Informática">Informática</option>
            <option value="Mecânica">Mecânica</option>
            <option value="Administração">Administração</option>
        </select>

        <button type="submit">Finalizar Matrícula</button>
    </form>
</div>

</body>
</html>
