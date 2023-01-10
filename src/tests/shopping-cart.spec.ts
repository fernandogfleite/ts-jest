import { Discount } from '../classes/Discount';
import { CartItem } from '../classes/interfaces/CartItem';
import ShoppingCart from '../classes/ShoppingCart';

const createDiscountMock = () => {
  class DiscountMock extends Discount {}

  return new DiscountMock();
};

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);

  return { sut, discountMock };
};

const createCardItem = (name: string, price: number) => {
  class CardItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CardItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cardItem1 = createCardItem('Bermuda', 20);
  const cardItem2 = createCardItem('Lápis', 2);
  sut.addItem(cardItem1);
  sut.addItem(cardItem2);

  return { sut, discountMock, cardItem1, cardItem2 };
};

describe('ShoppingCart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have two card items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should test total and totoalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(22);
    expect(sut.totalWithDiscount()).toBe(22);
  });

  it('should test add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
