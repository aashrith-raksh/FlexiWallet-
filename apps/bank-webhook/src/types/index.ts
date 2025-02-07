import {z} from "zod"

export const paymentDetailsSchema = z.object({
    token: z.string(),
    amount: z.string(),
    user_identifier:z.string()
})