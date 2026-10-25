'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {browserSupabase} from '@/lib/supabase-browser';
import {money} from '@/lib/money';
type Order={id:string;email:string;status:string;currency:string;total_cents:number;created_at:string};
export default function OrdersAdmin(){
 const [items,setItems]=useState<Order[]>([]);
 const [state,setState]=useState('loading');
 useEffect(()=>{const db=browserSupabase();async function load(){
 const {data:{user}}=await db.auth.getUser();
 if(!user){setState('denied');return}
 const {data:admin}=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
 if(!admin){setState('denied');return}
 const {data,error}=await db.from('orders').select('id,email,status,currency,total_cents,created_at').order('created_at',{ascending:false}).limit(100);
 if(error){setState('error');return}
 setItems(data||[]);setState('ready');
 }void load()},[]);
 return <main className="mx-auto max-w-6xl px-5 py-12"><Link href="/admin">Admin home</Link><h1 className="my-6 text-4xl font-black">Order overview</h1>{state==='loading'?<p>Loading orders…</p>:state==='denied'?<p>Administrator access required.</p>:state==='error'?<p>Unable to load orders.</p>:<div className="space-y-3">{items.length===0?<p>No orders yet.</p>:items.map(o=><article className="grid gap-2 rounded-xl bg-white p-5 md:grid-cols-4" key={o.id}><strong>{o.id.slice(0,8)}</strong><span>{o.email}</span><span>{o.status}</span><span>{money(o.total_cents,o.currency)}</span></article>)}</div>}</main>
}