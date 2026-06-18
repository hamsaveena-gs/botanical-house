import { shippingSchema, contactSchema } from '@/lib/schemas'

describe('shippingSchema', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@test.com',
    phone: '9876543210',
    address: '123 Main St',
    city: 'Bangalore',
    pincode: '560001',
  }

  it('passes with valid data', () => {
    expect(shippingSchema.safeParse(valid).success).toBe(true)
  })

  describe('name', () => {
    it('rejects numbers', () => {
      const r = shippingSchema.safeParse({ ...valid, name: 'Jane123' })
      expect(r.success).toBe(false)
    })
  })

  describe('phone', () => {
    it('rejects letters', () => {
      const r = shippingSchema.safeParse({ ...valid, phone: 'abc1234567' })
      expect(r.success).toBe(false)
    })

    it('rejects less than 10 digits', () => {
      const r = shippingSchema.safeParse({ ...valid, phone: '123456789' })
      expect(r.success).toBe(false)
    })

    it('rejects more than 10 digits', () => {
      const r = shippingSchema.safeParse({ ...valid, phone: '12345678901' })
      expect(r.success).toBe(false)
    })
  })

  describe('city', () => {
    it('rejects numbers', () => {
      const r = shippingSchema.safeParse({ ...valid, city: 'City123' })
      expect(r.success).toBe(false)
    })
  })

  describe('pincode', () => {
    it('rejects less than 6 digits', () => {
      const r = shippingSchema.safeParse({ ...valid, pincode: '12345' })
      expect(r.success).toBe(false)
    })

    it('rejects more than 6 digits', () => {
      const r = shippingSchema.safeParse({ ...valid, pincode: '1234567' })
      expect(r.success).toBe(false)
    })

    it('rejects letters', () => {
      const r = shippingSchema.safeParse({ ...valid, pincode: 'abc123' })
      expect(r.success).toBe(false)
    })
  })
})

describe('contactSchema', () => {
  const valid = {
    name: 'Jane Doe',
    email: 'jane@test.com',
    message: 'Hello',
  }

  it('passes with valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  describe('name', () => {
    it('rejects numbers', () => {
      const r = contactSchema.safeParse({ ...valid, name: 'Jane123' })
      expect(r.success).toBe(false)
    })
  })

  describe('phone', () => {
    it('passes when omitted', () => {
      const r = contactSchema.safeParse(valid)
      expect(r.success).toBe(true)
    })

    it('rejects letters', () => {
      const r = contactSchema.safeParse({ ...valid, phone: 'abc1234567' })
      expect(r.success).toBe(false)
    })

    it('rejects wrong length', () => {
      const r = contactSchema.safeParse({ ...valid, phone: '12345' })
      expect(r.success).toBe(false)
    })

    it('passes with valid 10 digits', () => {
      const r = contactSchema.safeParse({ ...valid, phone: '9876543210' })
      expect(r.success).toBe(true)
    })
  })
})
