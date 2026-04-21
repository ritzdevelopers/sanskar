import React from 'react'
import BlogBanner from '../components/blog/blogbanner'
import BlogListing from '../components/blog/bloglisting'
import { FooterSection } from '../components/home/FooterSection'
import FAQs from '../components/blog/faqs'
import DreamHome from '../components/blog/dreamhome'
import Testimonal from '../components/blog/testimonal'
import PRRelease from '../components/blog/prrelease'
export const metadata = {
  title: "Sanskar Realty Blog | Real Estate Insights & Investment Tips",
  description:
    "Stay updated with the latest insights from Sanskar Realty. Explore articles on luxury real estate, premium apartments, gated villas, and Vastu-compliant homes in Noida, Greater Noida, Ghaziabad, and Delhi NCR.",
  keywords: [
    "Sanskar Realty blog",
    "luxury real estate in NCR",
    "real estate blogs",
    "premium apartments Greater Noida",
    "gated villas Ghaziabad",
    "Vastu-compliant homes Delhi NCR",
    "real estate investment in NCR",
    "property investment Noida Extension",
    "luxury living Ghaziabad",
    "smart property investments NCR",
    "Sanskar Realty properties",
    "Noida Extension real estate",
    "Greater Noida real estate trends",
  ],
};

export default function BlogPage() {
  return (
    <>
      <BlogBanner />
      <BlogListing />
      <FAQs />
      <DreamHome />
      <Testimonal />
      <PRRelease />
      <FooterSection alignWithHeader />
    </>
  );
}