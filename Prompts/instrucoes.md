Crie uma aplicação ReactJS mobile first para um SaaS de delivery de lanches chamado “Habib's Lanches”.

A interface deve ser inspirada no layout da imagem de referência, com visual moderno, cards arredondados, bottom menu flutuante e experiência 100% mobile.

Tema:

- Dark mode por padrão.
- Botão no topo para alternar entre dark e light.
- Paleta principal: verde escuro.
- Cor secundária: areia/bege, remetendo a estética árabe.
- Sem emojis.
- Usar Bootstrap Icons.
- Imagens 1:1 localizadas em assets/images.

Topo:

- Exibir logotipo da lanchonete.
- Abaixo do logotipo, exibir o lema:
  “Servindo bem para servir sempre”

Página inicial / Cardápio:
Exibir 4 cards de produtos:

1. Esfiha de Camarão Especial
2. Esfiha de Carneiro
3. Esfiha de Chocolate com Morango
4. Esfiha de Frango com Bacon

Cada card deve conter:

- Imagem do produto
- Nome
- Descrição curta
- Valor
- Botão de favoritar com coração
- Botão pequeno para adicionar ao carrinho

Ao clicar no card:

- Abrir um modal com:
  - Imagem grande 1:1
  - Nome do produto
  - Descrição completa
  - Valor
  - Botão de favoritar
  - Controle de quantidade
  - Botão adicionar ao carrinho

Descrições completas:

Esfiha de Camarão Especial:
Massa leve e macia artesanal, recheada com camarões salteados no azeite, alho e cebola, combinados com um toque de molho de tomate caseiro, catupiry original e salpicados com cheiro-verde.

Esfiha de Carneiro:
Lascas tenras de carneiro marinadas no vinho tinto e ervas finas, combinadas com uma leve camada de coalhada seca artesanal e finalizadas com raspas de limão siciliano. Uma verdadeira explosão de sabores.

Esfiha de Chocolate com Morango:
Deliciosa combinação de chocolate meio amargo e chocolate branco cremoso sobre nossa massa supermacia, decorada com fatias frescas de morango e um toque de fios de chocolate.

Esfiha de Frango com Bacon:
Massa leve e macia recheada com frango desfiado suculento, fatias de bacon defumado artesanal bem crocantes e um toque sofisticado de alho-poró refogado na manteiga, finalizada com muçarela derretida.

Carrinho:

- Ícone de carrinho acessível no topo ou no menu.
- Ao clicar, abrir uma lateral/sidebar deslizando da direita para a esquerda sobre o cardápio.
- A lateral deve mostrar:
  - Itens adicionados
  - Quantidade de cada item
  - Subtotal
  - Opção Delivery ou Retirada no local
  - Se escolher Delivery, adicionar taxa fixa de R$ 2,00
  - Total final
  - Nome do cliente
  - Telefone
  - Endereço completo
  - Forma de pagamento
  - Botão “Finalizar Compra”

Modal de confirmação:
Ao finalizar, abrir um modal confirmando:

- Número do pedido no padrão ESFXXXXX, com X sendo números aleatórios
- Lanches escolhidos
- Quantidades
- Tipo de entrega
- Endereço, caso Delivery
- Total
- Forma de pagamento

Formas de pagamento:

- Cartão de crédito
- Cartão de débito
- Dinheiro
  - Perguntar se precisa de troco
  - Caso sim, informar valor recebido e calcular troco automaticamente
- Pix
  - Gerar um QR Code na hora para pagamento

Após confirmar:
Abrir uma nova tela de status do pedido com timeline visual.

Status possíveis:

- Seu pedido chegou na cozinha
- Seu pedido já está em preparação
- Seu pedido ficou pronto
- Seu pedido saiu para entrega, caso seja Delivery
- Seu pedido está lhe aguardando, caso seja Retirada no local

WhatsApp:

- Exibir botão para enviar o pedido para o WhatsApp da empresa.
- Número: (65) 99950-3724
- Gerar mensagem automática contendo:
  - Número do pedido
  - Nome do cliente
  - Telefone
  - Itens do pedido
  - Quantidades
  - Total
  - Tipo de entrega
  - Endereço, se Delivery
  - Forma de pagamento

Bottom menu flutuante:
Criar um menu inferior flutuante semelhante ao da imagem, com cantos arredondados e botão central em destaque.

Itens:

- Cardápio
- Status do Pedido
- Atualizar Dados
- Meus Favoritos

Requisitos técnicos:

- Criar em ReactJS.
- Usar componentes separados:
  - App.jsx
  - components/Header.jsx
  - components/ProductCard.jsx
  - components/ProductModal.jsx
  - components/CartSidebar.jsx
  - components/CheckoutModal.jsx
  - components/OrderStatus.jsx
  - components/BottomNav.jsx
  - components/Favorites.jsx
  - data/products.js
- Usar useState para carrinho, favoritos, tema, modal, dados do cliente e status do pedido.
- Criar CSS responsivo com foco em mobile first.
- Usar localStorage para salvar favoritos, dados do usuário e último pedido.
- Usar Bootstrap Icons.
- Não usar emojis.
- O layout deve ser elegante, premium, escuro, com contraste verde escuro e areia.
