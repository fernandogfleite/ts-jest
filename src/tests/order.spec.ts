import { CartItem } from '../classes/interfaces/CartItem';
import { CustomerOrder } from '../classes/interfaces/CostumerProtocol';
import { MessagingProtocol } from '../classes/interfaces/MessagingProtocol';
import { PersistencyProtocol } from '../classes/interfaces/PersistencyProtocol';
import { ShoppingCartProtocol } from '../classes/interfaces/ShoppingCartProtocol';
import { Order } from '../classes/Order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem(item: CartItem): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem(index: number): void {
    return;
  }
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 1;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {
    return;
  }
}

class MessagingMock implements MessagingProtocol {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendMessage(message: string): void {
    return;
  }
}

class PersistencyMock implements PersistencyProtocol {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveOrder(): void {
    return;
  }
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();

  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  );

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call cart.totalWithDiscount', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(
      shoppingCartMock,
      'totalWithDiscount',
    );
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call customer.getName', () => {
    const { sut, customerMock } = createSut();
    const customerMockSpy = jest.spyOn(customerMock, 'getName');
    sut.checkout();
    expect(customerMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call customer.getIDN', () => {
    const { sut, customerMock } = createSut();
    const customerMockSpy = jest.spyOn(customerMock, 'getIDN');
    sut.checkout();
    expect(customerMockSpy).toHaveBeenCalledTimes(1);
  });
});
