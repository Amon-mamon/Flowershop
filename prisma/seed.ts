import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.flower.createMany({
    data: [
      {
        title: "Violet",
        price: 150,
        image: "https://res.cloudinary.com/dacha3pvi/image/upload/v1743066658/assorted_yfknwo.webp",
      },
      {
        title: "Red",
        price: 200,
        image: "https://res.cloudinary.com/dacha3pvi/image/upload/v1743066658/violet_a1v8gj.webp",
      },
      {
        title: "Pink",
        price: 300,
        image: "https://res.cloudinary.com/dacha3pvi/image/upload/v1743066657/yellow_qwoern.webp",
      },
    ],
  });

  console.log("🌸 Seeded flowers!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
