import React from 'react';
import NavbarBefore from '../../components/NavbarBefore';
import HeroSection from '../../components/HeroSection';
import CategorySection from '../../components/CategorySection';
import RecommendationSection from '../../components/RecommendationSection';
import FooterSection from '../../components/FooterSection';

export default function HomeBefore() {
  return (
    <div className='min-h-screen w-full bg-white'>
      <NavbarBefore />
      <HeroSection />
      <CategorySection />
      <RecommendationSection />
      <FooterSection />
    </div>
  );
}
