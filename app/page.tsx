import { supabase } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export default async function Home() {
 const { data: products, error } = await supabase.from('products').select('id,name,slug,description').eq('status','active').limit(8);
 return <main className="mx-auto max-w-6xl p-6"><header className="flex items-center justify-between py-5"><h1 className="text-3xl font-bold">Leo's</h1><nav>Baby · Girls · Boys · Shoes</nav></header><section className="rounded-3xl bg-[#b5d4e8] p-12 my-8"><p className="uppercase tracking-widest">Welcome to Leo's</p><h2 className="text-5xl font-bold my-4">Little styles. Big adventures.</h2><p>Clothing and shoes for ages 0–14.</p></section><h3 className="text-2xl font-bold mb-4">New arrivals</h3>{error ? <p>Products are temporarily unavailable.</p> : products?.length ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{products.map(p=><article className="rounded-xl bg-white p-5" key={p.id}><h4 className="font-semibold">{p.name}</h4><p>{p.description}</p></article>)}</div> : <p>Our first collection is coming soon.</p>}</main>;
}
