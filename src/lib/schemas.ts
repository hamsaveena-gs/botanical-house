import { z } from 'zod'

const nameRegex = /^[A-Za-z\s]+$/
const digitRegex = /^\d+$/

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(nameRegex, 'Name must contain only letters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().refine(
    (v) => !v || (digitRegex.test(v) && v.length === 10),
    'Phone must be exactly 10 digits'
  ),
  message: z.string().min(1, 'Message is required'),
})

export const orderItemSchema = z.object({
  title: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
})

export const orderConfirmationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  orderId: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  total: z.number().positive(),
})

export const shippingSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(nameRegex, 'Name must contain only letters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').regex(digitRegex, 'Phone must contain only digits').length(10, 'Phone must be exactly 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required').regex(nameRegex, 'City must contain only letters'),
  pincode: z.string().min(1, 'Pincode is required').length(6, 'Pincode must be exactly 6 digits'),
})

export const notifyMeSchema = z.object({
  email: z.string().email('Invalid email address'),
  plantTitle: z.string().min(1, 'Plant title is required'),
  plantSlug: z.string().min(1, 'Plant slug is required'),
})

export type ContactData = z.infer<typeof contactSchema>
export type ShippingData = z.infer<typeof shippingSchema>
export type NotifyMeData = z.infer<typeof notifyMeSchema>
