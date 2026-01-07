import prisma from "./config/database.js";

async function seed() {
  for (let i = 1; i <= 100; i++) {
    const partition = (i % 3) + 1;

    await prisma[`user${partition}`].createMany({
      data: [
        {
          name: `User ${i}`,
          email: `garg-${i}@gmail.com`,
        },
      ],
      skipDuplicates: true,
    });
  }
}

seed()
  .then(() => {
    console.log("Data inserted");
  })
  .catch((err) => {
    console.error(" Error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
