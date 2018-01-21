const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}

global.localStorage = localStorageMock
global.Date.now = jest.fn(() => 1514764800000)
