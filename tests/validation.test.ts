import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  it('isRequired: порожній рядок і пробіли — невалідні', () => {
    expect(Validation.isRequired('')).to.equal(false);
    expect(Validation.isRequired('   ')).to.equal(false);
    expect(Validation.isRequired('a')).to.equal(true);
  });

  it('validateUserId: тільки цифри', () => {
    expect(Validation.validateUserId('12345')).to.equal(null);
    expect(Validation.validateUserId('12a')).to.be.a('string');
    expect(Validation.validateUserId('')).to.equal(Validation.REQUIRED_MSG);
  });

  it('isValidYear: регулярка року', () => {
    expect(Validation.isValidYear('1999', 2026)).to.equal(true);
    expect(Validation.isValidYear('2004', 2026)).to.equal(true);
    ['999', '20a4', 'abcd', '19999', '3000'].forEach((y) => {
      expect(Validation.isValidYear(y, 2026), y).to.equal(false);
    });
  });

  it('validateBook: усі порожні поля дають помилки', () => {
    const errors = Validation.validateBook({ title: '', author: '', year: '' });
    expect(errors).to.have.all.keys('title', 'author', 'year');
  });

  it('validateBook: коректні дані без помилок', () => {
    expect(Validation.validateBook({ title: 'A', author: 'B', year: '2004' })).to.deep.equal({});
  });

  it('validateUser: некоректний email', () => {
    expect(Validation.validateUser({ name: 'A', email: 'bad' }).email).to.be.a('string');
  });
});
