import storage from '../src'

test('should be defined', () => {
  expect(storage).toBeDefined()
})

test('should set, get and remove item', () => {
  const key = 'foo'
  storage.setItem(key, 'bar')
  expect(storage.getItem(key)).toBe('bar')
  storage.removeItem(key)
  expect(storage.getItem(key)).toBe(null)
})
