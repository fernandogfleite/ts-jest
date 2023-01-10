import {
  Discount,
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from '../classes/Discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    // System under test
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBe(10.99);
  });

  it('should apply fifty percent discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(150)).toBe(75);
  });

  it('should apply ten percent discount on price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(150)).toBe(135);
  });
});
