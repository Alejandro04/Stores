import { SignInForm } from '@/components/sign-in';
import Store from '@/components/store/store';
import { useIsRedirectingAtom } from '@/hooks/useIsRedirecting';
import Head from 'next/head';

export default function Home() {
  const [isRedirecting, setIsRedirecting] = useIsRedirectingAtom();
  return (
    <>
     <Store/>
    </>
  );
}
