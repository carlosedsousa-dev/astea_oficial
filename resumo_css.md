# Resumo de CSS

## 1. Para que serve o CSS?

O **CSS (Cascading Style Sheets)** é a linguagem utilizada para definir a **aparência visual de uma página web**.  
Enquanto o **HTML** estrutura o conteúdo (títulos, textos, imagens, formulários), o **CSS controla o estilo**, como:

- Cores
- Espaçamentos
- Fontes
- Layout da página
- Posicionamento dos elementos

Sem CSS, as páginas web seriam apenas conteúdo estruturado, mas sem identidade visual ou organização estética.

### Por que usar um arquivo externo (`style.css`)?

A melhor prática é utilizar **CSS externo**, ou seja, escrever os estilos em um arquivo separado e vinculá-lo ao HTML com a tag:

```html
<link rel="stylesheet" href="style.css">
````

Isso é recomendado porque:

* **Organiza melhor o projeto** (HTML separado de estilo)
* **Permite reutilização** do mesmo CSS em várias páginas
* **Facilita manutenção** e edição
* **Melhora desempenho**, pois o navegador pode armazenar o CSS em cache

---

# 2. Glossário de Propriedades CSS

Abaixo estão algumas das propriedades mais utilizadas no CSS.

## color

Define a **cor do texto** de um elemento.

```css
p {
  color: #333333;
}
```

---

## background-color

Define a **cor de fundo** de um elemento.

```css
body {
  background-color: #F4F0EA;
}
```

---

## margin

Define o **espaçamento externo** de um elemento, ou seja, a distância entre ele e outros elementos.

```css
div {
  margin: 20px;
}
```

---

## padding

Define o **espaçamento interno** de um elemento, ou seja, a distância entre o conteúdo e a borda.

```css
div {
  padding: 10px;
}
```

---

## display: flex

Ativa o **Flexbox**, um sistema de layout usado para alinhar e organizar elementos.

```css
.container {
  display: flex;
}
```

Com Flexbox é possível controlar:

* Alinhamento
* Distribuição de espaço
* Direção dos elementos

---

## flex-direction

Define a **direção dos elementos dentro do Flexbox**.

```css
.container {
  display: flex;
  flex-direction: column;
}
```

Principais valores:

* `row` → elementos lado a lado
* `column` → elementos empilhados verticalmente

---

## gap

Define o **espaçamento entre elementos filhos** dentro de um container flex.

```css
.container {
  display: flex;
  gap: 20px;
}
```

---

## box-sizing

Controla como o tamanho total de um elemento é calculado.

```css
* {
  box-sizing: border-box;
}
```

Com `border-box`, **padding e borda são incluídos na largura total**, evitando erros de layout.

---

## border-collapse

Usado em tabelas para **unificar bordas das células**.

```css
table {
  border-collapse: collapse;
}
```

---

## cursor

Define o tipo de cursor do mouse quando passa sobre um elemento.

```css
button {
  cursor: pointer;
}
```

---

# 3. O Conceito de Classes no CSS

As **classes** são usadas para aplicar estilos a **elementos específicos ou a vários elementos ao mesmo tempo**.

Uma classe é definida no CSS com `.` e usada no HTML com `class`.

### Exemplo

CSS:

```css
.botao {
  background-color: blue;
  color: white;
  padding: 10px;
}
```

HTML:

```html
<button class="botao">Enviar</button>
```

### Vantagens das classes

* Permitem **reutilizar estilos**
* Evitam repetição de código
* Facilitam manutenção do projeto
* Permitem estilizar apenas elementos específicos

Vários elementos podem usar a mesma classe:

```html
<button class="botao">Salvar</button>
<button class="botao">Enviar</button>
<button class="botao">Cadastrar</button>
```

Todos receberão o mesmo estilo.

---

# Conclusão

O CSS é essencial para transformar páginas HTML simples em **interfaces organizadas, visualmente agradáveis e utilizáveis**.
Com conceitos como **Box Model, Flexbox, classes e propriedades de estilo**, é possível controlar praticamente todos os aspectos visuais de um site.

A prática recomendada é sempre utilizar **CSS externo**, pois isso melhora a organização, reutilização e manutenção do código em projetos web.
