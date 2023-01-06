import { OrderStatus } from './interfaces/OrderStatus';
import { CustomerOrder } from './interfaces/CostumerProtocol';
import { ShoppingCartProtocol } from './interfaces/ShoppingCartProtocol';
import { MessagingProtocol } from './interfaces/MessagingProtocol';
import { PersistencyProtocol } from './interfaces/PersistencyProtocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly shoppingCart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.shoppingCart.isEmpty()) {
      console.log('Seu carrinho vazio.');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido com total de ${this.shoppingCart.totalWithDiscount()} foi recebido.`,
    );
    this.persistency.saveOrder();
    this.shoppingCart.clear();
    console.log(
      `O cliente é: ${this.customer.getName()} ${this.customer.getIDN()}`,
    );
  }

  saveOrder() {
    console.log('Pedido salvo com sucesso.');
  }
}
