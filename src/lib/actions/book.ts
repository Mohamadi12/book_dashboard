"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies }) // Sélectionne uniquement la colonne 'availableCopies'
      .from(books) // Table cible : 'books'
      .where(eq(books.id, bookId)) // Condition : 'id' du livre correspond à 'bookId'
      .limit(1); // Limite le résultat à une seule ligne

    if (!book.length || book[0].availableCopies <= 0) {
      //Si le livre exist-il via un ID ou s'il existe une copie
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // La date de l'emprente du livre(jours et heure)
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    //Les reference du livre,l'emprenteur et les status par defaut:empreint
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    //Remetre à jours le reste en faisant -1 au livre empreinté
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
