# starswithin-site

> Portfólio pessoal de Mavie 'stellar' Silva.

Um site estático responsivo com tema claro/escuro, com estética inspirada em Gen X Soft Club. Construído com HTML, CSS e JavaScript. Wireframe desenvolvido previamente, estrutura planejada e montada via Inteligência Artificial com edições próprias posteriormente.

## Páginas

| Página | Rota | Descrição |
|--------|------|-----------|
| **Início** | `index.html` | Página inicial, com links posicionados de forma fixa |
| **Sobre** | `pages/sobre/index.html` | Bio, formação, experiência de trabalho e interesses |
| **Portfólio** | `pages/portfolio/index.html` | Projetos em cards, apresentados com modais e detalhes em galeria |
| **Ateliê** | `pages/atelier/index.html` | Arte, ilustração e quadrinhos produzidos |
| **Contato** | `pages/contato/index.html` | Links sociais e e-mail para contato |

## Funcionalidades

- **Tema claro/escuro** — alternância com persistência via `localStorage`
- **Navegação mobile** — menu overlay com toggle hamburger
- **Responsividade** — breakpoints em 1100px, 576px e 480px

## Estrutura do Projeto

```
starswithin/
├── index.html                    # Página inicial
├── assets/
│   ├── css/
│   │   └── main.css              # Estilos globais + tema + responsividade
│   ├── js/
│   │   └── main.js               # Tema, navegação mobile, modais, back-to-top
│   ├── fonts/                    # Fontes locais (TTF/OTF)
│   └── images/                   # Logos, fundos, ícones, SVGs
├── pages/
│   ├── sobre/                    # Páginas extras possuem elementos próprios separados do principal
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── portfolio/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── atelier/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   └── contato/
│       ├── index.html
│       ├── script.js
│       └── style.css
└──
```

## Tecnologias

| Categoria | Ferramenta |
|-----------|-----------|
| Marcação | HTML5 semântico |
| Estilização | CSS3 variáveis (`--primary`, `--dark`, `--text-color`, etc.) |
| Interatividade | JavaScript (ES6+, sem dependências) |
| Tipografia | [Michroma](https://fonts.google.com/specimen/Michroma) (títulos) + [Geist](https://geist-font.vercel.app/) (corpo) via Google Fonts |
| Ícones | SVG inline e arquivos SVG otimizados |
| Tema | CSS Custom Properties + `data-theme` attribute |

### Paleta de Cores

```css
    --primary: #E54724; /* fiery terracotta */
    --secondary: #E0703D; /* burnt peach */
    --accent: #F4E3B2; /* vanilla custard */
    --dark: #2A2529; /* shadow gray */
    --light: #F3F0E7; /* soft linen */
```

## Acessibilidade

- `lang="pt-BR"` definido no `<html>`
- `aria-label` e `aria-expanded` em botões de navegação
- `aria-hidden="true"` em elementos decorativos
- Contraste entre `--primary` e fundos claro/escuro

## Ferramentas Utilizadas
- **Wireframe:** Adobe Illustrator
- **Projetos e assets:** Adobe Illustrator, Adobe Photoshop, Affinty Studio, Blender
- **Harnesses e assistentes:** [Pool](https://www.poolside.ai/get-started), Poolside Assistant (VSCode), [Pi](https://pi.dev/), [OpenCode](https://opencode.ai), [Hermes Desktop](https://hermes-agent.nousresearch.com/)
- **Modelos:** Laguna XS 2.1, Laguna S 2.1, MiMo V2.5, GLM 5.2, Deepseek V4 Flash

## Licença

Este é um projeto pessoal — todos os direitos reservados a Mavie 'stellar' Silva (@sowondays - GitHub).
