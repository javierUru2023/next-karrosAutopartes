import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export async function fetchProductsFromFirebase() {
  try {
    const productsCol = collection(db, "products");
    const productsSnapshot = await getDocs(productsCol);
    return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("[FIREBASE ERROR]", error);
    throw error;
  }
}
