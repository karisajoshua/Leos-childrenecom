import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import {supabase} from '@/lib/supabase';
import {money} from '@/lib/money';
export const dynamic='force-dynamic';
const categories=[
 {name:'Baby',detail:'0 – 2 Years',href:'/shop?age=baby',image:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=320&q=85'},
 {name:'Girls',detail:'2 – 14 Years',href:'/shop?category=girls',image:'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=320&q=85'},
 {name:'Boys',detail:'2 – 14 Years',href:'/shop?category=boys',image:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=320&q=85'},
 {name:'Footwear',detail:'All Ages',href:'/shop?category=shoes',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=320&q=85'},
 {name:'New Arrivals',detail:'Latest Styles',href:'/shop',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=320&q=85'},
 {name:'Sale',detail:'Great Deals',href:'/shop',image:''}
];
export default async function Home(){
 const [{data:products},{data:banners}]=await Promise.all([
 supabase.from('products').select('id,name,slug,product_variants(price_cents,currency,active),product_images(storage_path,sort_order)').eq('status','active').order('created_at',{ascending:false}).limit(5),
 supabase.from('banners').select('title,subtitle,cta_label,link_type,link_target').eq('placement','home_hero').eq('is_active',true).order('sort_order').limit(1)
 ]);
 const banner=banners?.[0];const link=banner?.link_type==='product'?'/product/'+encodeURIComponent(banner.link_target||''):banner?.link_type==='category'?'/shop?category='+encodeURIComponent(banner.link_target||''):banner?.link_target?.startsWith('/')?banner.link_target:'/shop';
 return <main className="leo-home">
 <section className="leo-hero"><div className="leo-hero-overlay"/><div className="leo-hero-content"><p className="leo-eyebrow">NEW SEASON COLLECTION</p><h1>{banner?.title?<>{banner.title}</>:<>Little Styles.<br/><em>Big Adventures.</em></>}</h1><p className="leo-hero-description">{banner?.subtitle||'Premium clothing and footwear for children ages 0–14. Designed for everyday moments and life’s biggest adventures.'}</p><Link className="leo-primary-button" href={link}>{banner?.cta_label||'Shop New Arrivals'} <span>→</span></Link><div className="leo-hero-perks"><div><span>♧</span><p><strong>Fast Shipping</strong><small>Canada & USA</small></p></div><div><span>♢</span><p><strong>Secure Payments</strong><small>Powered by Stripe*</small></p></div><div><span>⬡</span><p><strong>Easy Returns</strong><small>Hassle-free*</small></p></div></div></div></section>
 <section className="leo-categories" aria-label="Shop by category">{categories.map(c=><Link className="leo-category" href={c.href} key={c.name}><span className={'leo-category-image '+(!c.image?'leo-sale':'')}>{c.image?<img src={c.image} alt="" loading="lazy"/>:'%'}</span><strong>{c.name}</strong><small>{c.detail}</small></Link>)}</section>
 <section className="leo-collections"><Link href="/shop?category=girls" className="leo-collection leo-girls"><div><h2>Girls<br/>Collection</h2><p>Pretty styles for<br/>bold personalities.</p><span>Shop Girls →</span></div></Link><Link href="/shop?category=boys" className="leo-collection leo-boys"><div><h2>Boys<br/>Collection</h2><p>Everyday comfort<br/>for every adventure.</p><span>Shop Boys →</span></div></Link></section>
 <section className="leo-featured"><div className="leo-section-heading"><h2>Featured Products</h2><Link href="/shop">View All →</Link></div>{products?.length?<div className="leo-products">{products.map(p=>{const v=(p.product_variants as {price_cents:number;currency:string;active:boolean}[]).filter(x=>x.active).sort((a,b)=>a.price_cents-b.price_cents)[0];return <Link href={'/product/'+p.slug} className="leo-product" key={p.id}><div className="leo-product-photo"><ProductImage path={(p.product_images as {storage_path:string;sort_order:number}[]|null)?.sort((a,b)=>a.sort_order-b.sort_order)[0]?.storage_path} alt={p.name} className="h-full w-full"/><span className="leo-heart" aria-hidden="true">♡</span></div><h3>{p.name}</h3><strong>{v?money(v.price_cents,v.currency):'Coming soon'}</strong><span className="leo-product-colors">● ● ●</span></Link>})}</div>:<div className="leo-empty-products"><h3>Our first collection is coming soon</h3><p>Beautiful everyday styles for little adventures.</p><Link href="/shop">Explore the collection →</Link></div>}</section>
 <section className="leo-adventure"><div><h2>Made for<br/>Every Adventure</h2><p>Quality, comfort and style for every season.</p></div><Link href="/shop">Explore the Collection →</Link></section>
 <section className="leo-benefits"><div><span>♧</span><p><strong>Premium Quality</strong><small>Carefully selected materials</small></p></div><div><span>♧</span><p><strong>Across Canada & USA</strong><small>Reliable delivery options</small></p></div><div><span>♢</span><p><strong>Secure Checkout</strong><small>Coming soon</small></p></div><div><span>♡</span><p><strong>A Happier Childhood</strong><small>Through great style</small></p></div></section>
 </main>
}
