import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IprodutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.less']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: IProduto | undefined
  quantidade = 1

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacao: NotificacaoService,
    private carrinho: CarrinhoService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"))
    this.produto = this.produtosService.getOne(produtoId)

  }

  adicionarAoCarrinho(quantidade: number) {
    this.notificacao.notificar("O produto foi adicionado ao carrinho")
    const produtoId: IprodutoCarrinho = {
      ...this.produto!,
      quantidade: quantidade
    }
    this.carrinho.adicionarAoCarrinho(produtoId)
  }

}
