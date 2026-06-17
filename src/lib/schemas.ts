import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
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
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().min(1, 'Pincode is required'),
})

export const notifyMeSchema = z.object({
  email: z.string().email('Invalid email address'),
  plantTitle: z.string().min(1, 'Plant title is required'),
  plantSlug: z.string().min(1, 'Plant slug is required'),
})

export type ContactData = z.infer<typeof contactSchema>
export type ShippingData = z.infer<typeof shippingSchema>
export type NotifyMeData = z.infer<typeof notifyMeSchema>
