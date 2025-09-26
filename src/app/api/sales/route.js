import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "sales"));
    const sales = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ sales });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const sale = await request.json();
    const docRef = await addDoc(collection(db, "sales"), sale);
    return NextResponse.json({ received: true, id: docRef.id, sale }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ received: false, error: error.message }, { status: 400 });
  }
}
