# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="https://www.inteli.edu.br/wp-content/uploads/2021/08/20172028/marca_1-2.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>


## Apex 


## Integrantes:
<div align="center">
  <table>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/bruna-brasil-alexandre-734055214/"><img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/85657433/234118626-41937f3e-65c6-4ac6-beb4-7c7b4058a17f.jpg" width="100px;" alt=""/><br><sub><b>Bruna Brasil</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/fuchsfelipel/"><img width="100px;" style="border-radius: 50%;" src="https://user-images.githubusercontent.com/85657433/234118916-9c1dd397-0756-48f2-9727-378ad6c46325.jpg" width="100px;" alt=""/><br><sub><b>Felipe Fuchs</b></sub></a></td>
       <td align="center"><a href="https://github.com/2023M2T6-Inteli/Projeto3/"><img style="border-radius: 40%;" src="https://user-images.githubusercontent.com/85657433/234119829-76c806c1-f0b3-4dc8-8589-b12f1a08cce7.jpg" width="100px;" alt=""/><br><sub><b>João Cauê</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/lucas-nogueira-nunes/"><img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/85657433/234119179-19b04e2b-0ed1-4cc0-b2b0-dc1c68778626.jpg" width="100px;" alt=""/><br><sub><b>Lucas Nunes</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/rafael-coutinho2004/"><img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/85657433/234119268-5373274c-7542-4f1e-90bd-784464c019ab.jpg" width="100px;" alt=""/><br><sub><b>Rafael Coutinho</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/rafaelarojas/"><img style="border-radius: 50%;" src="https://user-images.githubusercontent.com/85657433/234119340-5bd7715d-bc31-4386-a9fc-7cd37422e65a.jpg" width="100px;" alt=""/><br><sub><b>Rafaela Rojas</b></sub></a></td>
    </tr>
  </table>
</div>

## 📝 Descrição

O GABA pretende ajudar no mapeamento pelos professores das defasagens dos estudantes brasileiros de escolas públicas, permitindo que o professor crie atividades na plataforma, exporte-as, aplique-as com seus estudantes e então corrija no site atribuindo notas aos alunos. Como as perguntas ou os itens das atividades criadas são ligados a uma habilidade da BNCC pelo professor, nossa aplicação é capaz de informar após a correção qual a habilidade que precisa ser trabalhada, assim como médias da turma e notas individuais. De acordo com esse feedback, também são recomendados planos de aula da Nova Escola relacionados às defasagens apresentadas pela turma.

<a><img src="https://github.com/2023M2T6-Inteli/Projeto3/assets/85657433/312b7a53-47ed-4f50-a48e-7688915de028" alt="GABA" border="0"></a>


GABA é a sigla para ácido gama-aminobutírico, um neurotransmissor inibitório responsável por regular a atividade cerebral, promovendo relaxamento e redução da ansiedade.

Com o GABA, transforme defasagens em oportunidades de aprendizado.

Para saber mais e assistir o vídeo sobre o GABA [clique aqui](https://youtu.be/isJcyFenwG8)]

Para acessar a plataforma, [clique aqui](https://gp3wzj-3000.csb.app/)

## Documentação da API
A documentação da API foi feita no Postman e pode ser encontrada [aqui](https://documenter.getpostman.com/view/27352407/2s93ebTqxr).

## 📁 Estrutura de pastas

|--> documentos<br>
  &emsp;| WAD.docx<br>
  &emsp;| WAD.pdf<br>
|--> imagens<br>
|--> src<br>
  &emsp;|--> bin<br>
  &emsp;|--> node_modules<br>
  &emsp;|--> public<br>
  &emsp;|--> routes<br>
  &emsp;|--> views<br>
  &emsp;| app.js<br>
  &emsp;| database.sqlite<br>
  &emsp;| database.sql<br>
  &emsp;| package.json<br>
  &emsp;| package-lock.json<br>
  &emsp;| styles.css<br>
  &emsp;| tailwind.config.js<br>
| readme.md<br>
| license.txt

Dentre os arquivos presentes na raiz do projeto, definem-se:

- <b>readme.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

- <b>documentos</b>: aqui estarão todos os documentos do projeto. Há também uma pasta denominada <b>outros</b> onde estão presentes aqueles documentos complementares ao <b>web application document</b>.

- <b>imagens</b>: imagens relacionadas ao projeto como um todo (por exemplo imagens do sistema, do grupo, logotipos e afins).

- <b>src</b>: nesta pasta encontra-se todo o código fonte do sistema, principalmente no arquivo "app.js", referente ao código principal do sistema. Sobre os arquivos: "database.sqlite" e "database.sql" fazem referência ao banco de dados da plataforma; "package.json" e "package-lock.json" são algumas configurações padrão da aplicação; "styles.css" e "tailwind.config.js" são usados para importação da ferramenta "tailwind css". Sobre as subpastas: "bin" e "node_modules" são referentes a arquivos para o funcionamento da aplicação e da sua conexão com servidor; "public" é onde se encontram todos os arquivos relacionados diretamente ao frontend que não são as páginas em si (inclui principalmente códigos em javascript); "routes" guarda as rotas de endpoints da aplicação; "views" é onde estão as páginas do frontend.(existem duas subpastas <b>backend</b> e <b>frontend</b> que contêm, respectivamente, o código do servidor e o código da página web).

## 💻 Configuração para desenvolvimento

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

> Nota: Quando você cria uma base de dados à partir do `database.sql`, são inseridos dados de seed.

1.  Baixar e instalar o node.js:  [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3.  No modo administrador, abra o "prompt de comando" ou o "terminal" e, após,  abra a pasta "src" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:3000/
6. O servidor está online.

## 🗃 Histórico de lançamentos
* 0.5.5 - 24/06/2023
    * refatoração do banco de dados
    * inserção das habilidades da BNCC no banco
    * finalização do vídeo de tutorial
* 0.5.4 - 22/06/2023
    * integração com o algolia
    * add carrousel no menu
* 0.5.3 - 15/06/2023
    * modal após a atividade ser criada
    * mostrar nome das atividades
    * modo imprimir atividade
* 0.5.2 - 14/06/2023
    * integração tela de atividades
    * api endpoints para atividades 
* 0.5.1 - 13/06/2023
    * sistema de classificação  
* 0.5.0 - 12/06/2023
    * update seed do banco de dados para refletir os dados
    * importando rich text editor 
* 0.4.7 - 06/06/2023
    * integração completa 
* 0.4.6 - 05/06/2023
    * add cores nos gráficos
    * add tela de perfil
    * add logout
    * integração tela de perfil
    * criar sala e adicionar aluno 
* 0.4.5 - 04/06/2023
    * criptografia da senha
    *  gerando modais dinamicamente
* 0.4.4 - 02/06/2023
    * integração tela de turmas
    * adicionar e deletar questão
* 0.4.3 - 01/06/2023
    * finalização tela de menu
    * validação do login
    * pegando dados do banco de dados
    * arrumando tela de criar atividade
* 0.4.2 - 31/05/2023
    * add dropdown em classrooms
    * algoritmos database 
* 0.4.1 - 30/05/2023
    * algoritmo dos gráficos do menu
    * mudando base de dados
* 0.4.0 - 29/05/2023
    * arrumando design dos botões
    * integração tela de menu
* 0.3.5 - 26/05/2023
    * linking screens
    * arrumando login e registro
    * atualização da documentação  
* 0.3.4 - 25/05/2023
    * tela de turmas
    * classrooms pug
    * tela criar atividades
    * tela de testes
* 0.3.3 - 24/05/2023
    * add signin/up
    * back tela de menu 
* 0.3.2 - 23/05/2023
    * add darkmode (modo escuro)
    * setup pug
* 0.3.1 - 17/05/2023
    * templeta padrão para telas do site
    * add navbar e sidebar
    * tela de tutorial
    * base da tela de menu
    * add dashboard no menu
* 0.3.0 - 16/05/2023
    * configurações básicas Flowbite
    * atualização documentação
* 0.2.2 - 11/05/2023
    * manter a conexão DB aberta
    * enviar erros como JSON
    * CRUD da tela "atividades"
* 0.2.1 - 10/05/2023
    * add seed data no script .SQL
    * criação do endpoint da tela "classrooms"
    * CRUD da tela "classrooms"
* 0.2.0 - 09/05/2023
    * aplicativo scaffold usando gerador express
    * add DB script
* 0.1.0 - 18/04/2023
    * add template
      

## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M2T6-Inteli/Projeto3">GABA</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/2023M2T6-Inteli/Projeto3">INTELI, BRUNA BRASIL, FELIPE FUCHS, JOÃO HIRATA, LUCAS NUNES, RAFAEL COUTINHO, RAFAELA ROJAS</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p>

## 🎓 Referências

Aqui estão as referências usadas no projeto:

1. <https://creativecommons.org/share-your-work/>
2. <https://novaescola.org.br/planos-de-aula/>
3. <http://www.repositorio.jesuita.org.br/handle/UNISINOS/3773/>
4. <https://novaescola.org.br/conteudo/11838/defasagem-como-vencer-esse-obstaculo/>
5. <https://novaescola.org.br/conteudo/11823/os-professores-e-o-mito-de-sisifo/>
6. <https://integrada.minhabiblioteca.com.br/#/books/9786558040118//>
