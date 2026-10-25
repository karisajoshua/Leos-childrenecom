import type { ReactNode } from 'react';
import './globals.css';
export const metadata = { title: "Leo's | Children's Fashion", description: 'Clothes and shoes for ages 0–14 in Canada and the US.' };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
