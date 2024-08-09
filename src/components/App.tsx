import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ParamTypes } from '@/types/types';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams) {
      setCurrentPage(Number(searchParams));
    } else {
      router.push(`/search/${currentPage}`);
    }
    const items = JSON.parse(localStorage.getItem('tarasovcadLocalStorage') || '{}');
    if (items) {
      setTerm(items);
    }
  }, []);
  return (
    <main className={` ${inter.className}`}>
      <div className="container">
        <h1 className="characters mb-[4px] mt-[50px]" data-testid="main-heading">
          {term ? `Search results for: ${term}` : 'Characters'}
        </h1>
      </div>
    </main>
  );
}
