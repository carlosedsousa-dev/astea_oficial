Aula
Introdução ao Back-End com PHP Puro: Sistema de Matrícula com SQLite
Conteúdo
O Padrão MVC (Model-View-Controller) Moderno: Compreensão prática de como sistemas robustos organizam o código. Entenderemos a separação entre a interface (View), a manipulação de dados (Model), a orquestração (Controller) e as camadas de apoio (Rotas, Middlewares e Services).

Banco de Dados Embutido (SQLite): Introdução ao SQLite e uso do PDO (PHP Data Objects) para conexão e execução de queries com segurança.

Ciclo de Vida da Requisição: O caminho completo da informação: index.php -> router.php -> middleware.php -> controller.php -> service.php -> model.php -> view.php.

Orientação a Objetos (POO) na Prática: Instanciação de classes, métodos, encapsulamento e conexão com o banco de dados via objetos.

Princípio da Responsabilidade Única (SRP): Garantir que cada arquivo tenha apenas uma função bem definida dentro do sistema.

Objetivos de Aprendizagem
Compreender a arquitetura completa usada pelos grandes frameworks do mercado, dominando a responsabilidade de cada camada.

Exercitar a Orientação a Objetos escrevendo classes em PHP puro para cada componente da aplicação.

Aplicar o uso do PDO em PHP para criar tabelas e inserir dados em um banco de dados relacional SQLite local.

Implementar o fluxo completo rodando no servidor embutido (built-in) do PHP.    

Atividades
Passo 1: Preparando o Terreno (Migration) Nos seus projetos, criem o arquivo migration.php. A responsabilidade deste arquivo é rodar as configurações iniciais do banco de dados.

A classe Migration deve usar o PDO para criar um arquivo database.sqlite (caso não exista) e executar o comando SQL de criação da tabela: CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER, curso TEXT). Os alunos deverão executar esse arquivo uma única vez antes de testarem a aplicação completa.

Passo 2: A Base de Dados (Model) Criem o arquivo model.php contendo a classe AlunoModel. Este é o único local do sistema que vai se comunicar com a tabela de alunos.

Regra de Ouro (POO): A classe deve ter propriedades privadas (nome, idade, curso) e métodos públicos (Getters e Setters). O método save() agora deve instanciar uma conexão PDO com o arquivo database.sqlite e usar um INSERT INTO (com Prepared Statements para evitar SQL Injection) para salvar os dados do objeto na tabela.

Passo 3: Regras Complexas e Especializadas (Service) Criem o arquivo service.php com a classe MatriculaService. O Serviço não lida com requisições HTTP nem com comandos SQL, ele apenas resolve regras de negócio.

Este serviço deve receber os dados do aluno e simular uma regra avançada, como verificar se o aluno atende à idade mínima do curso ou aplicar uma lógica de bolsa de estudos. Ele retorna os dados processados ou lança uma exceção (Exception) caso a regra falhe.

Passo 4: O Maestro e a Interface (Controller e View) Criem o arquivo controller.php contendo a classe MatriculaController. Este é o gerente do processo.

O método processarMatricula() deve receber os dados vindos da requisição, chamar o MatriculaService para aplicar as regras e, se tudo for aprovado, instanciar o AlunoModel para salvar no SQLite. Por fim, ele decide a resposta para o usuário (exibir sucesso ou erro).

Construam a interface no arquivo view.php: um formulário HTML contendo Nome, Idade e Curso, configurado para enviar os dados via método POST para a raiz do servidor.

Passo 5: A Porta de Entrada, Rotas e Segurança (Index, Router e Middleware) Vamos conectar as requisições:

index.php: O Front Controller. Ponto de entrada único que recebe a visita do navegador e aciona o router.php.

router.php: A classe Router avalia a URL e o método. Requisições GET chamam a exibição do view.php. Requisições POST acionam o Controller.

middleware.php: Antes do Router entregar os dados ao Controller, a classe Middleware atua como segurança. Ela verifica se todos os campos do formulário foram preenchidos e se a idade é realmente um número. Se a validação falhar, o processo é encerrado imediatamente com uma mensagem de aviso.

Passo 6: Mão na Massa e Servidor Built-in Abram o terminal na pasta do projeto e rodem primeiro o script da migration (php migration.php) para criar o arquivo SQLite e a tabela.

Em seguida, iniciem o servidor com php -S localhost:8000 e acessem a aplicação pelo navegador.

Façam testes enviando o formulário vazio para checar o bloqueio do middleware.php.

Testem quebrar a regra de negócio do curso para ver a recusa do service.php.

Enviem dados perfeitos, observem o controller.php orquestrando tudo e usem uma extensão (como o SQLite Viewer no VSCode) para abrir o arquivo database.sqlite e confirmar que o model.php salvou a linha corretamente.

Monitorem o terminal do PHP como console de depuração. Tudo funcionando perfeitamente? Construam uma pasta separada e façam o commit estruturado e subam para o GitHub.