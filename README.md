---

# Let's Snack - Área restrita

A área restrita é um site desenvolvido para que a administração do Let's Snack possa analisar gráficos interativos e monitorar o desempenho e os dados do projeto.

## Funcionalidades

- Realizar login de forma segura
- Exibir gráficos interativos para análise
- Navegar entre diferentes tipos de relatórios e gráficos

## Rotas

Segue a documentação das rotas do site:

### EndPoint: http://ec2-54-175-111-241.compute-1.amazonaws.com:8080/getResponse/](http://ec2-52-20-248-152.compute-1.amazonaws.com:3000

- /login

  - Função: Realizar autenticação do usuário para acesso aos gráficos.

- /

  - Função: Exibir o primeiro gráfico relacionado a pesquisas de mercado.

- /bi2

  - Função: Exibir o segundo gráfico relacionado a avaliações da ExpoTech.

- /ia
  - Função: Exibir um formulário para verificar por IA se seria um possível usuário do APP

## Dependências

Para executar este projeto, você precisará instalar as seguintes bibliotecas e ferramentas:

### Node

- Node 20.16 ou superior
- antd
- @ant-design/icons
- styled-components
- react-router-dom
- react-dom

Instale todas as dependências com o seguinte comando:

```bash
npm install
```

### Outras Ferramentas

- GitHub
- EC2 AWS

## Executando o Projeto

Para iniciar o projeto localmente, use:

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000](http://ec2-52-20-248-152.compute-1.amazonaws.com:3000/`.

## Autores
- [@Gustavo Teotônio](https://github.com/Gustavo-Teotonio)
- [@Pedro Schettini](https://github.com/pedroschettini)
- [@Artur Nascimento](https://github.com/arturnascimentosousa)

---

Essas adições ajudam a detalhar o uso e a estrutura do projeto, facilitando a leitura e compreensão para colaboradores.
