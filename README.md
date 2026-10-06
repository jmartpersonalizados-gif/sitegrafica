# JM PERSONALIZADOS — Site Institucional

Site institucional da gráfica **JM PERSONALIZADOS** com catálogo de produtos, orçamento rápido e
**pedido guiado pelo WhatsApp** (o cliente monta o pedido em 8 passos e a mensagem já chega
formatada na conversa — nada de digitar à mão).

## Como funciona

Site **estático** (HTML + CSS + JavaScript puro). Não há build, não há dependências,
não há servidor: basta publicar a pasta.

```
index.html            → página única (todas as seções)
assets/css/styles.css → todo o estilo + variáveis de tema
assets/js/data.js     → 👈 ARQUIVO DE EDIÇÃO (produtos, preços, textos, contatos)
assets/js/app.js      → renderização, cálculo de preços, pedido guiado, animações
assets/img/           → fotos dos produtos (JPG), mockups do portfólio (SVG), favicon
robots.txt            → regras para robôs de busca
```

## Editando produtos, preços e textos

Tudo que muda com frequência está em **`assets/js/data.js`**, comentado em português:

| Campo        | O que controla                                              |
|--------------|-------------------------------------------------------------|
| `config`     | nome, WhatsApp, Instagram, endereço, e-mail, horários        |
| `produtos`   | nome, descrição, preço base, unidade, formatação, acabamentos |
| `servicos`   | blocos da seção "Serviços"                                  |
| `passos`     | "Como funciona"                                             |
| `diferenciais` | "Por que a JM PERSONALIZADOS" (cor de fundo e cor do texto)          |
| `portfolio`  | itens do portfólio                                          |

### Imagens do catálogo

Todo o catálogo usa **fotografia real de produto**, salva em `assets/img/`:

| Contexto                        | Arquivos                      | Proporção                          |
|---------------------------------|-------------------------------|------------------------------------|
| Seção **Produtos** (6)          | `prod-<nome>.jpg`             | 16:11 — 1400×962                   |
| **Hero**, **Serviços** e **Sobre** (6) | `photo-<nome>.jpg`      | 16:11 — 900×620                    |
| **Portfólio** (8)               | `pf1-identidade.jpg` … `pf8-cartoes.jpg` | igual ao `ratio` do card |

Produtos:

| Produto     | Arquivo                    |
|-------------|----------------------------|
| Cartões     | `assets/img/prod-cartoes.jpg`     |
| Adesivos    | `assets/img/prod-adesivos.jpg`    |
| Flyers      | `assets/img/prod-flyers.jpg`      |
| Banners     | `assets/img/prod-banners.jpg`     |
| Papelaria   | `assets/img/prod-papelaria.jpg`   |
| Embalagens  | `assets/img/prod-embalagens.jpg`  |

Para trocar uma foto: substitua o arquivo mantendo o mesmo nome (ou ajuste o campo `img`
no produto ou no item do portfólio, em `assets/js/data.js`). Mantenha a proporção indicada
acima — as imagens usam `object-fit: cover`, então recortes diferentes são aceitos sem
distorção.

> 📸 **Origem:** imagens do [Pexels](https://www.pexels.com) sob licença Pexels
> (uso comercial gratuito, sem obrigação de crédito). Se tiver fotos dos **seus**
> trabalhos, substitua — fotos próprias convertem muito mais.

### Como o preço é calculado

```js
preço = precoBase * (quantidade / qtdBase) ^ elasticidade
```

Curva **sublinear**: quanto maior a quantidade, menor o valor unitário. Depois somam-se
os acabamentos escolhidos.

- `preco` → preço na `qtdBase`
- `qtdBase` → quantidade de referência (geralmente 100)
- `elasticidade` → `0.85` = desconto forte em escala; `1` = preço linear

## Pedido guiado (8 passos)

Produto → Formato → Quantidade → Material → Acabamento → Arquivo → Dados → Resumo →
WhatsApp. Ao final, a página monta a mensagem pronta e abre o `wa.me` com o texto.

## Acessibilidade e desempenho

- `prefers-reduced-motion` respeitado (animações desligadas)
- Contraste de texto verificado com **axe-core** → 0 violações (WCAG 2.1 AA + best practices)
- Reveal de conteúdo só é aplicado com JavaScript ativo (sem JS, tudo aparece)
- Lighthouse: **Acessibilidade 100 · Best Practices 100**

## Publicando

Suba a pasta no GitHub Pages (ou qualquer hospedagem estática). O repositório
`sitegrafica` já está configurado — o site fica em
`https://jmartpersonalizados-gif.github.io/sitegrafica/`.

> ⚠️ **Pendente:** endereço e e-mail são *placeholders* em `assets/js/data.js`
> (linhas `endereco` e `email`). Troque pelos dados reais.

## Contatos

- WhatsApp: +55 81 8389-9022
- Instagram: [@jmpersonalizadospe](https://instagram.com/jmpersonalizadospe)
