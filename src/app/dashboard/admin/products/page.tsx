import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductDataTable } from "@/components/admin/product-data-table";
import { getProducts } from "@/lib/actions/products";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: products, error } = await getProducts(supabase);

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button asChild>
          <Link href="/dashboard/admin/products/new">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>
      <ProductDataTable products={products || []} />
    </div>
  );
}
