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
