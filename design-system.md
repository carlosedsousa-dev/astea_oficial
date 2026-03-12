# 🧪 Design System: Astea Scientific
**Versão:** 1.0.0  
**Status:** Engenharia Reversa (Stitch HTML/Tailwind)  
**Estética:** Bio-Tech Minimalista

---

## 1. Paleta de Cores (Color Tokens)

O sistema utiliza uma paleta centrada na marca e estados semânticos baseados em opacidade.

### 1.1 Cores de Marca
| Função | Classe Tailwind | Hexadecimal | Uso |
| :--- | :--- | :--- | :--- |
| **Primary** | `bg-primary` | `#00855d` | Ações principais, ícones de marca e estados ativos. |
| **Primary Light** | `bg-primary/10` | `#E5F2EE` | Fundos de ícones e botões secundários. |
| **Primary Ghost** | `bg-primary/5` | `#F2F9F7` | Hover em listas e menus. |

### 1.2 Superfície e Background
| Função | Classe Tailwind | Hexadecimal | Uso |
| :--- | :--- | :--- | :--- |
| **Base Background** | `bg-[#FBFDF9]` | `#FBFDF9` | Fundo principal da aplicação. |
| **Sidebar BG** | `bg-background-light`| `#F5F8F7` | Painel lateral de navegação. |
| **Card/Panel** | `bg-white` | `#FFFFFF` | Containers de informação e KPIs. |
| **Border Soft** | `border-primary/5` | `rgba(0,133,93,0.05)` | Divisores sutis e bordas de tabelas. |

### 1.3 Cores Semânticas
| Função | Classe Tailwind | Hex (Aprox.) | Uso |
| :--- | :--- | :--- | :--- |
| **Success** | `text-emerald-600` | `#059669` | Tendências positivas e status 'Concluído'. |
| **Error/Danger** | `text-red-500` | `#EF4444` | Alertas críticos e tendências negativas. |
| **Warning** | `text-amber-500` | `#F59E0B` | Alertas de atenção e revisões. |
| **Text Primary** | `text-slate-900` | `#0F172A` | Títulos e corpo de texto principal. |

---

## 2. Tipografia (Typography Scale)

**Família:** Inter (Sans-serif)

| Nível | Tailwind Class | Tamanho | Peso | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Logo/Title)** | `text-base` | 16px | Bold | Identidade da marca na Sidebar. |
| **KPI Display** | `text-3xl` | 30px | Bold | Números principais de métricas. |
| **Section Header**| `text-lg` | 18px | Bold | Títulos de seções (Funil, Alertas). |
| **Body/Table** | `text-sm` | 14px | Medium | Conteúdo de tabelas e navegação. |
| **Caption/Label** | `text-xs` | 12px | Bold | Headers de tabela (Uppercase) e Metadados. |
| **Micro** | `text-[10px]` | 10px | Regular | Descrições secundárias em fluxos. |

---

## 3. Espaçamento e Grids (Spacing & Layout)

* **Páginas (Main Padding):** `p-8` (32px) – Garante foco no conteúdo.
* **Gap Entre Cards:** `gap-6` (24px) – Padrão para grids de KPIs e Layout Principal.
* **Sidebar Width:** `w-64` (256px) – Fixa na lateral esquerda.
* **Grid System:** * Métricas: `grid-cols-4` (Desktop).
    * Layout Híbrido: `grid-cols-10` (7 colunas para conteúdo, 3 para alertas).

---

## 4. Anatomia de Componentes (Component Specs)

### 4.1 Cards e Containers
- **Border Radius:** `rounded-xl` (16px).
- **Shadow:** `elevation-1` (Custom: `0px 1px 3px 1px rgba(0,0,0,0.15)`).
- **Padding Interno:** `p-6` (24px).

### 4.2 Botões (Buttons)
- **Primary:** Fundo `#00855d`, Texto branco, `rounded-xl`.
- **Ghost/Icon:** Fundo transparente ou `primary/5`, `hover:bg-primary/10`.
- **Floating Action Button (FAB):** `rounded-full`, sombra ativa, `transition-transform` no hover.

### 4.3 Elementos de Formulário
- **Inputs:** `bg-primary/5`, sem borda aparente, `rounded-xl`, padding horizontal de 10 unidades (`pl-10`).

---

## 5. Guia de Estilo e Regras de Ouro

1.  **Suavidade Curva:** Jamais utilize bordas quadradas. O padrão do sistema é `rounded-xl` (16px) para grandes áreas e `rounded-lg` (8px) para ícones/badges.
2.  **Transparência Contextual:** Prefira `primary/10` sobre o fundo de marca em vez de cinzas neutros para elementos secundários (botões