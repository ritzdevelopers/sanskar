import React from 'react'
import BlogBanner from '../components/blog/blogbanner'
import BlogListing from '../components/blog/bloglisting'
import { FooterSection } from '../components/home/FooterSection'
import FAQs from '../components/blog/faqs'
import DreamHome from '../components/blog/dreamhome'
import Testimonal from '../components/blog/testimonal'
import PRRelease from '../components/blog/prrelease'

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