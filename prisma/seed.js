const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const pieces = [
    {
      category: "Anime",
      name: "Kamado Tanjiro No Uta",
      composer: "Demon Slayer",
      description: "Favorite piece ive tried learning so far...",
    },
    {
      category: "Anime",
      name: "A Cruel Angel's Thesis",
      composer: "Neon Genesis Evangelion",
      description: "Short and sweet, unlike like the anime",
    },
    {
      category: "Anime",
      name: "Giorno's Theme",
      composer: "JoJo Bizzare",
      description: "Why do I hear boss music ?",
    },
  ];

  for (const piece of pieces) {
    await prisma.piece.upsert({
      where: { category: piece.category },
      update: piece,
      create: piece,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
