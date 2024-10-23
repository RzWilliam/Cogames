// app/api/users/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db("sample_mflix"); // Nom de ta base de données

    // Récupération des paramètres de requête pour la pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1"); // Page par défaut à 1
    const limit = parseInt(searchParams.get("limit") || "10"); // Limite par défaut à 10

    // Calcul de l'offset (combien de documents sauter)
    const skip = (page - 1) * limit;

    // Récupération des utilisateurs avec pagination
    const users = await db
      .collection("users")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Récupération du nombre total de documents pour calculer le nombre total de pages
    const totalUsers = await db.collection("users").countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    // Retourne les utilisateurs avec les infos de pagination
    return NextResponse.json(
      {
        users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Une erreur est survenue lors de la connexion à MongoDB.",
      },
      { status: 405 }
    );
  }
}
