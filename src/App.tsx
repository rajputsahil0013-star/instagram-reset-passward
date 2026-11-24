/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { RecoveryCard } from './components/RecoveryCard';
import { LoginCard, SignupCard } from './components/AuthViews';

type ActiveView = 'recovery' | 'login' | 'signup';

const VIEW_TITLES: Record<ActiveView, string> = {
  recovery: 'Account Recovery',
  login: 'Sign In · Account Recovery Demo',
  signup: 'Create Account · Account Recovery Demo',
};

export default function App() {
  const [view, setView] = useState<ActiveView>('recovery');

  useEffect(() => {
    document.title = VIEW_TITLES[view];
  }, [view]);

  return (
    <div className="min-h-screen flex justify-center items-center p-5 max-[450px]:p-0">
      <main className="w-full max-w-[350px]" data-view={view}>
        {view === 'recovery' && (
          <RecoveryCard
            onNavigateLogin={() => setView('login')}
            onNavigateSignup={() => setView('signup')}
          />
        )}

        {view === 'login' && (
          <LoginCard
            onNavigateRecovery={() => setView('recovery')}
            onNavigateSignup={() => setView('signup')}
          />
        )}

        {view === 'signup' && (
          <SignupCard
            onNavigateLogin={() => setView('login')}
            onNavigateRecovery={() => setView('recovery')}
          />
        )}

        <footer className="text-center text-[#737373] text-[12px] mt-[25px] max-[450px]:pb-6">
          Account Recovery Demo
        </footer>
      </main>
    </div>
  );
}
