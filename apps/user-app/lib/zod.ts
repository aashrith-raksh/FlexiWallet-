import { object, string } from "zod";

export const signInSchema = object({
  phone: string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required")
    .max(10, "Phone number must be lesser than 10 digits"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignInType = Zod.infer<typeof signInSchema>;

export type TransactionType = {
  time: Date;
  key: number;
  amount: number;
  status: string;
  provider: string;
};
