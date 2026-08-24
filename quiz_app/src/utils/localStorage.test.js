import Storage, { KEYS } from './localStorage';

describe('Storage', () => {
  const mockStorage = {};
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn((key) => mockStorage[key] || null),
      setItem: jest.fn((key, value) => { mockStorage[key] = value; }),
      removeItem: jest.fn((key) => { delete mockStorage[key]; }),
      clear: jest.fn(() => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get returns defaultValue if key not found', () => {
    expect(Storage.get('nonexistent', 'default')).toBe('default');
  });

  it('get parses JSON', () => {
    mockStorage['key'] = JSON.stringify({ a: 1 });
    expect(Storage.get('key')).toEqual({ a: 1 });
  });

  it('set stores stringified value', () => {
    Storage.set('key', { b: 2 });
    expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ b: 2 }));
  });

  it('remove deletes key', () => {
    Storage.remove('key');
    expect(localStorage.removeItem).toHaveBeenCalledWith('key');
  });

  it('clear clears all', () => {
    Storage.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});