import RecoveryPasswordForm from '@/components/recovery-password';
import React from 'react';
import styles from './recovery-password.module.scss';

const pageStyles = 'flex items-center justify-center h-full';

export default function RecoveryPasswordPage() {
  return (
    <div className="h-screen mx-auto">
      <div className={`${pageStyles} ${styles.recoveryPageContainer}`}>
        <RecoveryPasswordForm/>
      </div>
    </div>
  );
}
