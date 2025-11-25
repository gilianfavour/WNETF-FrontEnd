import type { Metadata } from 'next';
import WhatWeDo from '~/components/widgets/whatwedo'; // ✅ FIXED

export const metadata: Metadata = {
  title: 'What We Do',
};

export default function Page() {
  return <WhatWeDo />;
}
