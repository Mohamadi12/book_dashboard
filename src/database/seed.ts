import ImageKit from "imagekit";
import dummyBooks from "../../dummybooks.json";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { books } from "./schema";

config({path:".env.local"});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

//Les key dans le .env
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

//Ce qui s'affiche dans une image ainsi que le nom du fichier qu'elle sera amener à être stocker
const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.log("Error uploading image to ImageKit:", error);
  }
};

//L'envoie des datas
const seed = async () => {
  console.log("Sending data");
  try {
    for (const book of dummyBooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.log("Error seeding data:", error);
  }
};

seed();

// Ce code sert à initialiser une base de données avec des données fictives
// (dummy data) en important des livres d'un fichier JSON,
// téléchargeant leurs images et vidéos sur ImageKit, et stockant leurs
// informations dans une base de données PostgreSQL via Drizzle ORM.
