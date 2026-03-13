# 🚀 RequestMe.dev 👨‍💻
> Portfólio interativo no estilo Postman. Faça requests para descobrir mais sobre mim!

<table>
  <tr>
    <td width="700px">
      <div align="justify">
        O <b>RequestMe.dev</b> é um portfólio desenvolvido em <i>Angular</i> que simula a interface do <b>Postman</b>. O visitante interage com uma interface idêntica ao Postman — fazendo requisições para endpoints como <code>/about</code>, <code>/skills</code>, <code>/projects</code> e <code>/contact</code> — e recebe as informações em formato JSON, exatamente como um desenvolvedor faria no dia a dia.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png" alt="Logo RequestMe" width="100px"/>
      </div>
    </td>
  </tr>
</table>

---

## 🚧 Status do Projeto

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
[![Licença](https://img.shields.io/github/license/MatheusXavier7/requestme?style=for-the-badge&color=007ec6&logo=opensourceinitiative)](./LICENSE)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Como fazer requisições](#-como-fazer-requisições)
- [Tecnologias](#-tecnologias)
- [Instalação e Execução](#-instalação-e-execução)
- [Endpoints Simulados](#-endpoints-simulados)
- [Autores](#-autores)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto

No **RequestMe.dev** o visitante usa uma interface idêntica ao Postman para fazer requisições a uma API simulada no frontend, descobrindo as informações do desenvolvedor como resposta JSON.

Toda a lógica é feita no cliente — não há backend real. O projeto é uma demonstração.

---

## 📡 Como fazer requisições

1. **Pela sidebar** — expanda a coleção **Xavier — Portfolio** no painel esquerdo e clique em qualquer endpoint. A URL e o método serão preenchidos automaticamente no painel de request.

2. **Manualmente** — Clique em **Send**:

---

## 🔧 Instalação e Execução

### Pré-requisitos
* **Node.js** v18+
* **Angular CLI:** `npm install -g @angular/cli`

### Rodando o projeto

```bash
git clone https://github.com/MatheusXavier7/requestme.git
cd requestme
npm install
ng serve
```
> App disponível em **http://localhost:4200**

---

## 🔗 Endpoints Simulados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/matheus/about` | Informações pessoais e bio |
| `GET` | `/matheus/skills` | Stack e habilidades técnicas |
| `GET` | `/matheus/projects` | Projetos desenvolvidos |
| `GET` | `/matheus/contact` | Formas de contato |


## 👥 Autores

| 👤 Nome | :octocat: GitHub | 💼 LinkedIn |
|---------|-----------------|-------------|
| Matheus Xavier | [github.com/MatheusXavier7](https://github.com/MatheusXavier7) | [linkedin.com/in/matheus-xavier-a428b3281](https://www.linkedin.com/in/matheus-xavier-a428b3281/) |

---

## 📄 Licença

Este projeto é distribuído sob a **[Licença MIT](./LICENSE)**.
