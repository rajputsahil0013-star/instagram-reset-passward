import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { EMAIL_REGEX, validateRecoveryInput } from '../utils/recovery';

interface RecoveryCardProps {
  onNavigateLogin: () => void;
  onNavigateSignup: () => void;
}

export function RecoveryCard({
  onNavigateLogin,
  onNavigateSignup,
}: RecoveryCardProps) {
  const [account, setAccount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || completed) {
      return;
    }

    const trimmedEmail = account.trim();

    if (!trimmedEmail) {
      setIsError(true);
      setStatusMessage('Please enter your email address.');
      return;
    }

    if (trimmedEmail.includes('..') || !EMAIL_REGEX.test(trimmedEmail)) {
      setIsError(true);
      setStatusMessage(
        'Please enter a valid email address (e.g., name@example.com).'
      );
      return;
    }

    const result = validateRecoveryInput(trimmedEmail);
    if (!result.valid) {
      setIsError(true);
      setStatusMessage(
        result.error ??
          'Please enter a valid email address (e.g., name@example.com).'
      );
      return;
    }

    setIsError(false);
    setStatusMessage('');
    setIsLoading(true);

    timerRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setStatusMessage(
        result.message ??
          'Demo complete. Connect your own secure recovery service to send a real recovery link.'
      );
      setCompleted(true);
      timerRef.current = null;
    }, 800);
  };

  const handleReset = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setAccount('');
    setStatusMessage('');
    setIsError(false);
    setIsLoading(false);
    setCompleted(false);
  };

  const handleNavClick =
    (handler: () => void) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handler();
    };

  return (
    <>
      <section
        className="bg-white border border-[#dbdbdb] max-[450px]:border-0 px-[30px] pt-[35px] pb-[25px] text-center"
        aria-labelledby="recovery-heading"
      >
        <div
          className="w-[85px] h-[85px] border-2 border-[#262626] rounded-full mx-auto mb-[22px] flex items-center justify-center"
          aria-hidden="true"
        >
          <Lock className="w-9 h-9 text-[#262626]" strokeWidth={1.75} />
        </div>

        <h1
          id="recovery-heading"
          className="text-[17px] font-semibold mb-[15px] text-[#262626]"
        >
          Having trouble logging in?
        </h1>

        <p className="text-[13px] leading-[1.5] text-[#737373] mb-[22px]">
          Enter your email address and we&apos;ll help you recover your account.
        </p>

        <form id="recoveryForm" onSubmit={handleSubmit} noValidate>
          <label htmlFor="account" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="account"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
              if (isError) {
                setStatusMessage('');
                setIsError(false);
              }
            }}
            placeholder="Email address"
            autoComplete="email"
            disabled={isLoading || completed}
            aria-invalid={isError}
            className="w-full px-3 py-3 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8] focus-visible:ring-2 focus-visible:ring-[#0095f6]/25 disabled:opacity-70 mb-[14px]"
          />

          <button
            type="submit"
            id="submitBtn"
            disabled={isLoading || completed}
            aria-busy={isLoading}
            className="w-full py-[10px] min-h-[40px] border-0 rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:cursor-default text-white text-[14px] font-semibold cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0095f6] mb-[20px] inline-flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="w-4 h-4 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span>Sending...</span>
              </>
            ) : completed ? (
              'Demo completed'
            ) : (
              'Send recovery link'
            )}
          </button>
        </form>

        {statusMessage && (
          <div
            id="message"
            role={isError ? 'alert' : 'status'}
            aria-live="polite"
            className={`text-[13px] leading-[1.5] ${
              completed ? 'mb-[10px]' : 'mb-[15px]'
            } flex items-start justify-center gap-1.5 text-left ${
              isError ? 'text-[#b91c1c]' : 'text-[#387a42]'
            }`}
          >
            {isError ? (
              <AlertCircle
                className="w-4 h-4 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            ) : (
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-0.5"
                aria-hidden="true"
              />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {completed && (
          <div className="mb-[18px]">
            <button
              type="button"
              onClick={handleReset}
              className="text-[12px] font-semibold text-[#0095f6] hover:text-[#1877f2] cursor-pointer underline-offset-2 hover:underline bg-transparent border-0 p-1"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="flex items-center gap-[15px] text-[#737373] text-[12px] font-semibold mt-[5px] mb-[22px]">
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
          <span>OR</span>
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
        </div>

        <a
          href="#signup"
          onClick={handleNavClick(onNavigateSignup)}
          className="text-[#262626] hover:text-[#737373] no-underline text-[12px] font-semibold transition-colors"
        >
          Create a new account
        </a>
      </section>

      <section className="mt-[10px] p-[22px] bg-white border border-[#dbdbdb] max-[450px]:border-x-0 text-center text-[14px]">
        <a
          href="#login"
          onClick={handleNavClick(onNavigateLogin)}
          className="text-[#0095f6] hover:text-[#1877f2] no-underline font-semibold text-[14px] transition-colors"
        >
          Back to login
        </a>
      </section>
    </>
  );
}
