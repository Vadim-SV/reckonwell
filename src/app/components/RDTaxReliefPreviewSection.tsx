'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';


const stats = [
  { value: '£40,000/year', label: 'Average saving' },
  { value: '20%', label: 'Direct credit (SME)' },
  { value: '10% tax', label: 'Patent Box rate' },
  { value: '4–8 weeks', label: 'HMRC approval' },
];

export default function RDTaxReliefPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return null;
}
