# Requisitos Funcionais do Sistema

## 1. Gestão de Feiras e Configuração (Alta Prioridade)

- **RF01 – Criação em Etapas:**  
  O sistema deve permitir a criação de feiras através de um fluxo sequencial  
  *(Identidade, Datas, Estrutura, Regras de Avaliação e Revisão)*.

- **RF02 – Validação Temporal:**  
  O sistema deve impedir a configuração de datas inconsistentes  
  *(ex: avaliação antes do fim das inscrições)*.

- **RF03 – Gestão de Estados:**  
  O sistema deve suportar os estados **Rascunho** (privado) e **Publicado** (visível/operacional),  
  bloqueando edições estruturais após a publicação.

- **RF04 – Construtor de Formulários:**  
  O sistema deve permitir a criação de critérios de avaliação específicos por categoria,  
  com definição obrigatória de pesos, descrições e tipos de escala.

---

## 2. Submissão e Gestão de Projetos (Alta Prioridade)

- **RF05 – Pacote de Evidências:**  
  O sistema deve permitir que o organizador configure campos obrigatórios para:
  - arquivos *(PDF/IMG)*  
  - links *(Vídeo/Drive)*  
  - textos estruturados *(Resumo)*

- **RF06 – Versionamento de Submissão:**  
  Cada reenvio de projeto deve gerar uma nova versão, preservando o histórico de arquivos  
  e dados anteriores para auditoria.

- **RF07 – Controle de Integrantes:**  
  O sistema deve rastrear a entrada, saída ou substituição de integrantes, exigindo  
  justificativa e autorização do organizador após a submissão inicial.

---

## 3. Processo de Avaliação (Alta Prioridade)

- **RF08 – Painel do Avaliador Unificado:**  
  O sistema deve exibir, em tela única, os dados do projeto, o visualizador de documentos  
  e o formulário de notas, sem necessidade de downloads.

- **RF09 – Gestão de Conflito de Interesses:**  
  O sistema deve impedir a atribuição de projetos a avaliadores da mesma instituição  
  e exigir uma declaração de ausência de conflito antes de iniciar o julgamento.

- **RF10 – Avaliação Cega:**  
  O sistema deve permitir a anonimização automática de nomes e instituições em feiras  
  configuradas como **Cegas**.

---

## 4. Resultados e Governança (Média Prioridade)

- **RF11 – Motor de Desempate Automático:**  
  O sistema deve aplicar hierarquia de critérios de desempate pré-definidos  
  *(ex: maior nota no critério X)* para gerar o ranking final.

- **RF12 – Consolidação Blindada:**  
  O sistema deve impedir a alteração de notas após o envio final pelo avaliador,  
  permitindo apenas correções administrativas com log de auditoria.

---

## 5. Comunicação e Certificação (Média Prioridade)

- **RF13 – Notificações Baseadas em Estado:**  
  O sistema deve disparar alertas automáticos *(internos e e-mail)* apenas quando houver  
  mudança de estado *(ex: "Projeto Submetido", "Resultado Publicado")*.

- **RF14 – Central de Certificados:**  
  O sistema deve gerar certificados digitais autenticáveis via hash apenas após o  
  encerramento oficial da feira, permitindo o download pelo usuário.

---

## 6. Segurança e Privacidade (Alta Prioridade)

- **RF15 – Isolamento por Silos:**  
  O sistema deve garantir que usuários de uma instituição não visualizem dados,  
  projetos ou avaliações de outras instituições.

- **RF16 – Trilha de Auditoria Imutável:**  
  O sistema deve registrar todos os acessos e alterações em dados sensíveis,  
  especialmente em registros de menores de idade.
