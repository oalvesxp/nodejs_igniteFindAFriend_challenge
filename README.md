<image src="https://media.licdn.com/dms/image/v2/D4D2DAQGtC6e8h5ax-A/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1732801764796?e=1733418000&v=beta&t=9GG2Kv2dk_2I5UZEHonD6fW58q-ZeW76fpsS_G6YHwU" />

## Descrição do projeto
Desafio do módulo de SOLID de Node.js do curso da Rocketseat.
O objetivo é construir uma API em em Node.js com TypeScript para um App de adoção de pets "_Find A Pet_".
Foi utilizado conceitos da metodologia SOLID para garantir uma aplicação escalável e mantenível. 

### RFs (Requisitos Funcionais)
---

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma ORG
- [] Deve ser possível realizar login como uma ORG

### RNs (Regras de Negócio)
---

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma ORG precisa ter um endereço e um número de WhatsApp
- [] Um pet deve estar ligado a uma ORG
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Contexto da aplicação

Para vocês que está imaginando como seria o front-end da aplicação, aqui está o modelo do Figma: [Find A Friend](https://www.figma.com/community/file/1220006040435238030)

## Instruções instalação

Eu utilizei `Node v20.18.1 (LTS)` para desenvolver a aplicação, todas as versões de depêndencias estão exatamente descritas no `package.json`. Você pode instalar essa versão do Node.js no seu sistema através dos comandos:

- Windows
```powershell
# installs fnm (Fast Node Manager)
winget install Schniz.fnm

# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
fnm use --install-if-missing 20.18.1
```

- Linux / MacOS
```bash
# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# activate fnm
source ~/.bashrc

# download and install Node.js
fnm use --install-if-missing 20.18.1
```

## Instruções de uso

Instalação das depêndências
```powershell
npm install
```

Inicialização do container do banco de dados PostgreSQL
```powershell
docker compose up -d
```

Migrations da base de dados
```powershell
npx prisma migrate dev
```

Inicialização do ambiente de DEV
```powershell
npm run start:dev
```
