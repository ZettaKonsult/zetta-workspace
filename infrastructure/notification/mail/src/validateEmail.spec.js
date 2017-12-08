import { validateEmailParams } from './validateEmail'

describe('validateEmailParams', () => {
  it('Should return a correct object for sending the mail', () => {
    const json = {
      to: ['fiddep@telia.com', 'zk.zmk.dev@gmail.com'],
      from: ''
    }
    expect(validateEmailParams(json)).toBe(true)
  })
  it('Should throw error if a required param is missing', () => {
    const json = { from: '1' }
    expect(() => validateEmailParams(json)).toThrow()
  })
})
