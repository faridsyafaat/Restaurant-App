'use client';

import NavbarAfter from '@/components/NavbarAfter';
import FooterSection from '@/components/FooterSection';
import HeroSectionAfter from '@/components/HeroSectionAfter';
import CategoryAfter from '@/components/CategoryAfter';
import RecommendationAfter from '@/components/RecommendationAfter';

export default function HomeAfter() {
  return (
    <div className='min-h-screen w-full bg-white'>
      <NavbarAfter />
      <HeroSectionAfter />
      <CategoryAfter />
      <RecommendationAfter />
      <FooterSection />
    </div>
  );
}
