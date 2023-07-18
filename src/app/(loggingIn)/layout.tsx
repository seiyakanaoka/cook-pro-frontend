'use client';

import { Header } from '@/components/ui/Header';
import FoodImage from 'public/food-1.png';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header userImage={FoodImage.src} value="" onChange={() => {}} />
      {children}
    </div>
  );
}
