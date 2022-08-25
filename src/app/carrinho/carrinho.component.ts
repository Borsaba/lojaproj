import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IprodutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.less']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IprodutoCarrinho[] = []


  constructor(
    public carrinho: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinho.obtemCarrinho()
    this.calculaTotal()
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinho.removerProdutoCarrinho(produtoId)
    this.calculaTotal()
  }

  total = 0
  calculaTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0)
  }

}
