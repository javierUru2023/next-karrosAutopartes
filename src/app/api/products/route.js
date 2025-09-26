import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request) {
  return NextResponse.json({ message: "API de productos funcionando correctamente" });
}

export async function POST(request) {
  try {
  //-- Detectar si es FormData (image upload) o JSON (solo datos) --
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const name = formData.get("name");
      const description = formData.get("description");
      const price = formData.get("price");
      const stock = formData.get("stock");
      const category = formData.get("category");
      const slug = formData.get("slug");
      const imageFile = formData.get("image");

      if (!imageFile || typeof imageFile.arrayBuffer !== "function") {
        return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
      }

  //-- Procesar imagen y guardar en /public --
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${slug}-${Date.now()}.jpg`;
      const publicDir = path.join(process.cwd(), "public");
      const imagePath = path.join(publicDir, fileName);

  //-- Redimensionar a 580x580px y guardar --
      await sharp(buffer)
        .resize(580, 580)
        .toFormat("jpeg")
        .toFile(imagePath);

  //-- Guardar producto en Firestore con la ruta de la imagen --
      const productData = {
        name,
        description,
        price,
        stock,
        category,
        slug,
        image: `/${fileName}`,
      };
      const docRef = await addDoc(collection(db, "products"), productData);
      return NextResponse.json({ received: true, id: docRef.id, product: productData }, { status: 201 });
    } else {
  //-- JSON fallback (sin imagen) --
      const body = await request.json();
      const docRef = await addDoc(collection(db, "products"), body);
      return NextResponse.json({ received: true, id: docRef.id, product: body }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ received: false, error: error.message }, { status: 400 });
  }
}
