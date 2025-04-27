```mermaid
graph TD
    A[Index.html<br>Página Inicial] -->|Clicar em Login| B[Login.html<br>Login]
    A -->|Clicar em Carrinho| C[Carrinho.html<br>Carrinho]
    A -->|Buscar ou Clicar em Produto| F[Produtoind.html<br>Produto Individual]
    A -->|Apenas Admins| D[Adm.html<br>Painel Admin]
    B -->|Clicar em Cadastre-se| E[Cadastro.html<br>Cadastro]
    B -->|Autenticação Bem-sucedida| A
    B -->|Autenticação Bem-sucedida, do Carrinho| C
    C -->|Finalizar Compra, Sem Login| B
    C -->|Voltar| A
    D -->|Clicar em Sair| B
    E -->|Após Cadastro| B
    F -->|Adicionar ao Carrinho| C
    F -->|Voltar| A

    %% Navegação do Menu (presente em todas as páginas)
    A -->|Menu: Home| A
    A -->|Menu: Carrinho| C
    B -->|Menu: Home| A
    B -->|Menu: Carrinho| C
    C -->|Menu: Home| A
    C -->|Menu: Carrinho| C
    D -->|Menu: Home| A
    D -->|Menu: Carrinho| C
    E -->|Menu: Home| A
    E -->|Menu: Carrinho| C
    F -->|Menu: Home| A
    F -->|Menu: Carrinho| C
    F -->|Menu: Login| B
```
