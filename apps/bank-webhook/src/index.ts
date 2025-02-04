import { prisma } from "@repo/db";
import express from "express";
import { paymentDetailsSchema } from "@/src/types/index";
const app = express();
const PORT = process.env.PORT || 3003;

app.post("/hdfc-webhook", async (req, res): Promise<any> => {
  const validInputs = paymentDetailsSchema.safeParse(req.body);

  console.log("validInputs:",validInputs)
  
  if (!validInputs.success) {
    return res.json({
      message: "Invalid inputs",
    });
  }

  const {
    token,
    amount: amountToIncrement,
    user_identifier: userId,
  } = req.body;

  try {
    await prisma.$transaction([
      // UPDATE THE BALANCE
      prisma.balance.update({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: { increment: Number(amountToIncrement) },
        },
      }),

      // UPDATE THE TRANSACTION STATUS
      prisma.onRampTransaction.update({
        where: {
          token,
        },
        data: {
          status: { set: "Success" },
        },
      }),
    ]);

    return res.status(200).json({
      message: "captured",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return res.status(411).json({
      message: "Error while capturing the request",
    });
  }
});

app.listen(PORT, () => {
  console.log("web hook listening on", PORT);
});
