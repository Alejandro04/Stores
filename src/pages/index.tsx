import { SignInForm } from '@/components/sign-in';
import Store from '@/components/store/store';
import { useIsRedirectingAtom } from '@/hooks/useIsRedirecting';
import Link from 'next/link';

export default function Home() {
  const [isRedirecting, setIsRedirecting] = useIsRedirectingAtom();
  return (
     <Link href='/store'>Go to store module</Link>
  );
}
