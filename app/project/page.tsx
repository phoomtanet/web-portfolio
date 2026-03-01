"use client";

import Link from 'next/link';
import { useState } from 'react';
import TopNav from '../components/TopNav';
import ResumeSection from '../components/ResumeSection';
import BorderBox from '../components/BorderBox';

export default function ProJect() {

  return (
    <>
      <TopNav />

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 text-slate-900 sm:py-12">
        <BorderBox>
            <div></div>
        </BorderBox>
      </main>

   
    </>
  );
}
