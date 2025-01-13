import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(), //Convertit une valeur en nombre avant validation.
  universityCard: z.string().nonempty("University Card is required"), //Vérifie qu'une chaîne n'est pas vide (longueur > 0).
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100), //Élimine les espaces inutiles.
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5), //Convertit les chaînes numériques (comme "4") en nombres.
  totalCopies: z.coerce.number().int().positive().lte(10000), //Nombre entier (integer).
  coverUrl: z.string().nonempty(), //Ne peut pas être vide.
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i), //Élimine les espaces superflus et Doit être un code hexadécimal valide (ex. : #FF5733) et Insensible au i c'est à dire qu'il n'y a pas de difference entre i miniscule et Majuscule
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
