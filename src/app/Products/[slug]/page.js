import { fetchProductsFromFirebase } from "../firebaseUtils";
import ProductDetail from "../Components/ProductDetail";

export async function generateStaticParams() {
  const products = await fetchProductsFromFirebase();
  return products.map((product) => ({ slug: product.slug }));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function ProductSlugPage({ params, searchParams }) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const slug = awaitedParams?.slug;
  const category = awaitedSearchParams?.category || "all";
  await sleep(1200);
  const products = await fetchProductsFromFirebase();
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <p>El producto solicitado no existe.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <ProductDetail product={product} selectedCategory={category} />
    </div>
  );
}
