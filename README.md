# Git Dashboard

## Ideia Geral
O gerente de projetos é o responsável por organizar o desenvolvimento do sistema, definindo atividades como a criação de novas funcionalidades e correções de bugs. Para acompanhar tais atividades, o mesmo pode analisar pull requests (PR), pois estes apresentam qual tarefa está sendo realizada, o responsável e estado atual das mudanças realizadas. Contudo, o gerente precisa por vezes acompanhar PRs em diferentes repositórios para gerenciar o desenvolvimento de uma funcionalidade, o que se caracteriza um trabalho manual complexo. Logo, o **Git Dashboard** propicia o acompanhamento de PRs de forma automatizada em uma plataforma web, onde o gerente poderá criar projetos que representam atividades do sistema, vinculando repositórios e PRs aos mesmos para acompanhar as informações desses, e assim discernir o andamento no desenvolvimento do sistema.

## Sistema

### Execução
O Git Dashboard pode ser levantado pelo `npm` ou pelo `yarn`. Logo deve-se instalar o NodeJs ou o Yarn em seu sistema, e a partir disso, rodar os seguintes comandos.

#### Execução com o NPM
Execute o seguinte comando para instalar as dependências do sistema.
```sh
npm install
```
Posteriormente, execute o comando a seguir para levantar o sistema.
```sh
npm start
```

#### Execução com o Yarn
Execute o seguinte comando para instalar as dependências do sistema.
```sh
yarn
```
Posteriormente, execute o comando a seguir para levantar o sistema.
```sh
yarn start
```

### Testes
Assim como para a execução do sistema, para executar os testes, pode-se utilizar o `npm` ou o `yarn`.

#### Executar testes com o NPM
```sh
npm test
```

#### Executar testes com o Yarn
```sh
yarn test
```

### Demonstração
Uma versão demonstrativa do sistema pode ser acessada neste [link](https://git-dashboard.netlify.com/).
