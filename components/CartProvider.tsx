'use client';
import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
export type CartLine={variantId:string;productId:string;slug:string;name:string;size:string|null;color:string|null;priceCents:number;currency:string;quantity:number};
type CartApi={items:CartLine[];add:(line:CartLine)=>void;remove:(id:string)=>void;setQuantity:(id:string,quantity:number)=>void;clear:()=>void;count:number;subtotal:number};
const Context=createContext<CartApi|null>(null);
export function CartProvider({children}:{children:ReactNode}){const [items,setItems]=useState<CartLine[]>([]);const [loaded,setLoaded]=useState(false);
useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('leos_cart_v1')||'[]');if(Array.isArray(saved))setItems(saved.filter(x=>x&&typeof x.variantId==='string'&&Number.isInteger(x.quantity)&&x.quantity>0));}catch{}setLoaded(true)},[]);
useEffect(()=>{if(loaded)localStorage.setItem('leos_cart_v1',JSON.stringify(items))},[items,loaded]);
const api=useMemo<CartApi>(()=>({items,add:line=>setItems(old=>{const found=old.find(x=>x.variantId===line.variantId);return found?old.map(x=>x.variantId===line.variantId?{...x,quantity:Math.min(99,x.quantity+line.quantity)}:x):[...old,{...line,quantity:Math.max(1,Math.min(99,line.quantity))}]}),remove:id=>setItems(old=>old.filter(x=>x.variantId!==id)),setQuantity:(id,quantity)=>setItems(old=>old.map(x=>x.variantId===id?{...x,quantity:Math.max(1,Math.min(99,quantity))}:x)),clear:()=>setItems([]),count:items.reduce((n,x)=>n+x.quantity,0),subtotal:items.reduce((n,x)=>n+x.priceCents*x.quantity,0)}),[items]);return <Context.Provider value={api}>{children}</Context.Provider>}
export function useCart(){const value=useContext(Context);if(!value)throw new Error('CartProvider missing');return value;}
