import { redirect } from 'next/navigation';

// This test-only route has been disabled. Redirect to homepage.
export default function TestEmailPage() {
  redirect('/');
}
