import {z} from "zod"

export const paymentDetailsSchema = z.object({
    token: z.string(),
    amount: z.string(),
    userId:z.string()
})