import { SignInForm } from '@/components/sign-in';
import StoreList from '@/components/store/stores';
import { useIsRedirectingAtom } from '@/hooks/useIsRedirecting';
import Head from 'next/head';

export default function Home() {
  const [isRedirecting, setIsRedirecting] = useIsRedirectingAtom();
  return (
    <>
     <StoreList/>
    </>
  );
}
