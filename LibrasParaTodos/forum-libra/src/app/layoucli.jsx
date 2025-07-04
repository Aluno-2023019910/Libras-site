'use client';

import NavBar from '@/components/navbar';

export default function LayCli({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}