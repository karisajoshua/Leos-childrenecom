'use client';
import {useState} from 'react';
export default function ProductImage({path,alt,className=''}:{path?:string|null;alt:string;className?:string}){
 const [failed,setFailed]=useState(false);
 const base=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const valid=Boolean(path)&&!path!.startsWith('/')&&!path!.includes('..');
 const url=base&&valid?base+'/storage/v1/object/public/product-images/'+path!.split('/').map(encodeURIComponent).join('/'):null;
 return <div className={'overflow-hidden bg-gradient-to-br from-orange-100 to-sky-100 '+className}>{url&&!failed?<img src={url} alt={alt} loading="lazy" className="h-full w-full object-cover" onError={()=>setFailed(true)}/>:<div className="flex h-full min-h-40 items-center justify-center text-5xl text-orange-300" role="img" aria-label={alt}>✦</div>}</div>
}