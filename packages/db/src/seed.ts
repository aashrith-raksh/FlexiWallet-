import { prisma } from "./prisma";
import bcrypt from "bcryptjs"

async function main() {
  const jay = await prisma.user.upsert({
    where: { phone: "9999999996" },
    update: {},
    create: {
      email: "jay@gmail.com",
      phone: "9999999996",
      password: await bcrypt.hash("jay", 10),
      name: "jay",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
      Balance: {
        create: {
          amount: 0,
          locked: 0,
        },
      },
    },
  });
  const Emily = await prisma.user.upsert({
    where: { phone: "9999999997" },
    update: {},
    create: {
      id: 1,
      email: "Emily@gmail.com",
      phone: "9999999997",
      password: await bcrypt.hash("Emily", 10),
      name: "Emily",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
      Balance: {
        create: {
          amount: 0,
          locked: 0,
        },
      },
    },
  });
  console.log({ jay, Emily });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
