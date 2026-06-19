import Banner from '@/components/Banner';
import React from 'react';
import TopLegalExpert from '@/components/TopLegalExperts'
import LegalCategories from '@/components/LegalCategories';
import Hero from '@/components/Hero';

const page = () => {
  return (
    <div>
       <Hero></Hero>
      <Banner></Banner>
      <TopLegalExpert></TopLegalExpert>
      <LegalCategories></LegalCategories>
     
    </div>
  );
};

export default page;