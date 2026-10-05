import type { Metadata } from 'next';
import LeedsPayrollServicesClient from './LeedsPayrollServicesClient';

export const metadata: Metadata = {
  title: 'Payroll Services in Leeds | Reckonwell',
  description: 'Professional payroll services for businesses in Leeds. PAYE, RTI submissions, auto-enrolment, and director salary planning.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://reckonwell.com/leeds-payroll-services',
  },
  openGraph: {
    title: 'Payroll Services in Leeds | Reckonwell',
    description: 'Professional payroll services for businesses in Leeds. PAYE, RTI submissions, auto-enrolment, and director salary planning.',
    url: 'https://reckonwell.com/leeds-payroll-services',
    type: 'website',
  },
};

export default function Page() {
  return <LeedsPayrollServicesClient />;
}
