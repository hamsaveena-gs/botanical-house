import { shippingSchema, contactSchema, notifyMeSchema, orderConfirmationSchema, orderItemSchema } from '@/lib/schemas'

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

describe('orderItemSchema', () => {
  it('passes with valid data', () => {
    const r = orderItemSchema.safeParse({ title: 'Plant', quantity: 1, price: 499 })
    expect(r.success).toBe(true)
  })

  it('rejects zero quantity', () => {
    const r = orderItemSchema.safeParse({ title: 'Plant', quantity: 0, price: 499 })
    expect(r.success).toBe(false)
  })

  it('rejects negative price', () => {
    const r = orderItemSchema.safeParse({ title: 'Plant', quantity: 1, price: -1 })
    expect(r.success).toBe(false)
  })
})

describe('orderConfirmationSchema', () => {
  const valid = {
    email: 'test@test.com',
    name: 'Jane',
    orderId: '123',
    items: [{ title: 'Plant', quantity: 1, price: 499 }],
    total: 499,
  }

  it('passes with valid data', () => {
    expect(orderConfirmationSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects empty items', () => {
    const r = orderConfirmationSchema.safeParse({ ...valid, items: [] })
    expect(r.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const r = orderConfirmationSchema.safeParse({ ...valid, email: 'bad' })
    expect(r.success).toBe(false)
  })
})

describe('notifyMeSchema', () => {
  it('passes with valid data', () => {
    const r = notifyMeSchema.safeParse({ email: 'test@test.com', plantTitle: 'Peace Lily', plantSlug: 'peace-lily' })
    expect(r.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const r = notifyMeSchema.safeParse({ email: 'bad', plantTitle: 'Peace Lily', plantSlug: 'peace-lily' })
    expect(r.success).toBe(false)
  })

  it('rejects empty plant title', () => {
    const r = notifyMeSchema.safeParse({ email: 'test@test.com', plantTitle: '', plantSlug: 'peace-lily' })
    expect(r.success).toBe(false)
  })
})
