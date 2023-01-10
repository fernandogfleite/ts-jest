import { EnterpriseCustomer, IndividualCustomer } from '../classes/Customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {
  it('should have firstName, lastName and cpf', () => {
    // System under test
    const sut = createIndividualCustomer('Foo', 'Bar', '999.999.999-99');
    expect(sut).toHaveProperty('firstName', 'Foo');
    expect(sut).toHaveProperty('lastName', 'Bar');
    expect(sut).toHaveProperty('cpf', '999.999.999-99');
  });

  it('should have methods to get name and idn', () => {
    // System under test
    const sut = createIndividualCustomer('Foo', 'Bar', '999.999.999-99');
    expect(sut.getName()).toBe('Foo Bar');
    expect(sut.getIDN()).toBe('999.999.999-99');
  });
});

describe('EnterpriseCustomer', () => {
  it('should have name and cnpj', () => {
    // System under test
    const sut = createEnterpriseCustomer('Foo', '999.999/99');
    expect(sut).toHaveProperty('name', 'Foo');
    expect(sut).toHaveProperty('cnpj', '999.999/99');
  });

  it('should have methods to get name and idn', () => {
    // System under test
    const sut = createEnterpriseCustomer('Foo', '999.999/99');
    expect(sut.getName()).toBe('Foo');
    expect(sut.getIDN()).toBe('999.999/99');
  });
});
