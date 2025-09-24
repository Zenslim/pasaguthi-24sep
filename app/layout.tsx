import './globals.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export const metadata={ title:'PasaGuthi', description:'Guthi, but with a soul.' };

export default function RootLayout({children}:{children:React.ReactNode}){
  return(<html lang="en"><body>
    <div className="topbar">
      <div className="container flex items-center justify-between h-14">
        <button className="text-xl">☰</button>
        <div className="font-semibold">PasaGuthi</div>
        <Link href="/signin" className="opacity-80 hover:opacity-100">🔒 LOGIN</Link>
      </div>
    </div>
    <Sidebar/>
    <div className="mainwrap container pl-72">
      {children}
    </div>
  </body></html>);
}
