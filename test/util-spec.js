import { setSymbolsFilePath, getSymbolsFilePath, clearSymbolPaths } from '../src/scripts/util';
import assert from 'power-assert';

describe('util', () => {
  beforeEach(() => {
    clearSymbolPaths();
  });

  describe('clearSymbolPaths', () => {
    it('should empty the symbol file paths that were previously set', () => {
      const expected = {
        foo: 'bar/symbols.svg',
        other: 'thing/is/in/some/path/banan',
      };

      const result = setSymbolsFilePath(expected);

      clearSymbolPaths();

      assert(Object.keys(result).length === 0);
    });
  });

  describe('setSymbolsFilePath', () => {
    it('should update the symbol file paths based on the object passed in', () => {
      const expected = {
        foo: 'bar/symbols.svg',
        other: 'thing/is/in/some/path/banan',
      };

      const result = setSymbolsFilePath(expected);

      assert(result.foo === 'bar/symbols.svg');
      assert(result.other === 'thing/is/in/some/path/banan');
      assert(Object.keys(result).length === 2);
    });

    it('should append changes to the list of symbols and update existing', () => {
      const expected = {
        foo: 'bar/symbols.svg',
        other: 'thing/is/in/some/path/banan',
      };

      setSymbolsFilePath(expected);

      expected.foo = 'foo.svg';
      expected.newThing = 'some/new.thing.svg';

      const result = setSymbolsFilePath(expected);


      assert(result.foo === 'foo.svg');
      assert(result.other === 'thing/is/in/some/path/banan');
      assert(result.newThing === 'some/new.thing.svg');
      assert(Object.keys(result).length === 3);
    });
  });

  describe('getSymbolsFilePath', () => {
    it('should get a set symbols file path', () => {
      const expected = {
        foo: 'bar/symbols.svg',
        other: 'thing/is/in/some/path/banan',
      };

      setSymbolsFilePath(expected);

      assert(getSymbolsFilePath('foo') === 'bar/symbols.svg');
      assert(getSymbolsFilePath('other') === 'thing/is/in/some/path/banan');
      assert(getSymbolsFilePath('dne') === undefined);
    });
  });
});
