import { expect } from 'chai';
import { Book } from '../src/models/Book';
import { Library } from '../src/services/Library';

describe('Library<T>', () => {
  let lib: Library<Book>;

  beforeEach(() => {
    lib = new Library<Book>();
    lib.add(new Book('1', 'Clean Code', 'Martin', 2008));
  });

  it('додає елемент', () => {
    lib.add(new Book('2', 'Code Complete', 'McConnell', 2004));
    expect(lib.size).to.equal(2);
  });

  it('не дозволяє дублювати id', () => {
    expect(() => lib.add(new Book('1', 'X', 'Y', 2000))).to.throw();
  });

  it('видаляє існуючий елемент', () => {
    expect(lib.remove('1')).to.equal(true);
    expect(lib.size).to.equal(0);
  });

  it('повертає false при видаленні неіснуючого', () => {
    expect(lib.remove('999')).to.equal(false);
  });

  it('знаходить за id', () => {
    expect(lib.findById('1')?.title).to.equal('Clean Code');
    expect(lib.findById('2')).to.equal(undefined);
  });

  it('знаходить за предикатом', () => {
    expect(lib.find((b) => b.author === 'Martin')).to.have.length(1);
    expect(lib.find((b) => b.author === 'Nobody')).to.have.length(0);
  });
});
