
import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    const newMsg = { name, email, message, date: new Date().toISOString() };
    const docRef = await addDoc(collection(db, "contactMessages"), newMsg);
    return NextResponse.json({
      received: true,
      id: docRef.id,
      ...newMsg
    });
  } catch (error) {
    return NextResponse.json({ received: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "contactMessages"));
    const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ messages: [], error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await deleteDoc(doc(db, "contactMessages", id));
    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.json({ deleted: false, error: error.message }, { status: 400 });
  }
}
