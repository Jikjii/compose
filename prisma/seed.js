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
      synopsis: "theres a reason why demon slayer is one of the best animes and its because of the music",
      link: "https://www.youtube.com/watch?v=1x6n44EcJI8",
      name: "Kamado Tanjiro No Uta",
      composer: "Demon Slayer",
      description: "Favorite piece ive tried learning so far...",
      rating: 5,
    },
    {
      category: "Anime",
      synopsis: "had to be one of my favorites when I first found this anime",
      link: "https://www.youtube.com/watch?v=aYe-2Glruu4",
      name: "A Cruel Angel's Thesis",
      composer: "Neon Genesis Evangelion",
      description: "Short and sweet, unlike like the anime",
      rating: 5,
    },
    {
      category: "Anime",
      synopsis: "giorno's theme is one of the best of all time",
      link: "https://www.youtube.com/watch?v=NscXXbmAggI",
      name: "Giorno's Theme",
      composer: "JoJo Bizzare",
      description: "Why do I hear boss music ?",
      rating: 5,
    },
  ];

  for (const piece of pieces) {
    await prisma.piece.upsert({
      where: { synopsis: piece.synopsis },
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
