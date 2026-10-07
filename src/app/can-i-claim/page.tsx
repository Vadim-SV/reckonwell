import { redirect } from 'next/navigation';

export default function CanIClaimRedirect() {
  redirect('/toolkit/allowable-expenses-finder');
}
