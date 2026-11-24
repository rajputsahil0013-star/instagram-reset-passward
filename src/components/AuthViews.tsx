import { useState, type FormEvent, type MouseEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import {
  EMAIL_REGEX,
  validateLoginInput,
  validateSignupInput,
} from '../utils/recovery';

interface LoginCardProps {
  onNavigateRecovery: () => void;
  onNavigateSignup: () => void;
}

export function LoginCard({
  onNavigateRecovery,
  onNavigateSignup,
}: LoginCardProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = identifier.trim();
    if (!trimmedEmail || trimmedEmail.includes('..') || !EMAIL_REGEX.test(trimmedEmail)) {
      setIsError(true);
      setStatusMessage(
        trimmedEmail
          ? 'Please enter a valid email address (e.g., name@example.com).'
          : 'Please enter your email address.'
      );
      return;
    }

    const result = validateLoginInput(trimmedEmail, password);
    if (!result.valid) {
      setIsError(true);
      setStatusMessage(result.error ?? 'Please check your credentials.');
      return;
    }
    setIsError(false);
    setStatusMessage(result.message ?? 'Demo complete.');
    setCompleted(true);
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
        aria-labelledby="login-heading"
      >
        <div
          className="w-[85px] h-[85px] border-2 border-[#262626] rounded-full mx-auto mb-[22px] flex items-center justify-center"
          aria-hidden="true"
        >
          <UserCheck className="w-9 h-9 text-[#262626]" strokeWidth={1.75} />
        </div>

        <h1
          id="login-heading"
          className="text-[17px] font-semibold mb-[15px] text-[#262626]"
        >
          Sign in to your account
        </h1>

        <p className="text-[13px] leading-[1.5] text-[#737373] mb-[22px]">
          Enter your credentials below to preview the login flow.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-identifier" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="login-identifier"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (isError) {
                setStatusMessage('');
                setIsError(false);
              }
            }}
            placeholder="Email address"
            autoComplete="email"
            disabled={completed}
            aria-invalid={isError}
            className="w-full px-3 py-3 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8] mb-[10px]"
          />

          <div className="relative mb-[14px]">
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isError) {
                  setStatusMessage('');
                  setIsError(false);
                }
              }}
              placeholder="Password"
              autoComplete="off"
              disabled={completed}
              className="w-full px-3 py-3 pr-10 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#737373] hover:text-[#262626] cursor-pointer bg-transparent border-0"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={completed}
            className="w-full py-[10px] min-h-[40px] border-0 rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:cursor-default text-white text-[14px] font-semibold cursor-pointer transition-colors duration-150 mb-[20px]"
          >
            {completed ? 'Demo completed' : 'Log in'}
          </button>
        </form>

        {statusMessage && (
          <div
            role={isError ? 'alert' : 'status'}
            aria-live="polite"
            className={`text-[13px] leading-[1.5] mb-[15px] flex items-start justify-center gap-1.5 text-left ${
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

        <div className="flex items-center gap-[15px] text-[#737373] text-[12px] font-semibold mt-[5px] mb-[22px]">
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
          <span>OR</span>
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
        </div>

        <a
          href="#recovery"
          onClick={handleNavClick(onNavigateRecovery)}
          className="text-[#262626] hover:text-[#737373] no-underline text-[12px] font-semibold transition-colors"
        >
          Forgot password?
        </a>
      </section>

      <section className="mt-[10px] p-[22px] bg-white border border-[#dbdbdb] max-[450px]:border-x-0 text-center text-[14px] text-[#262626]">
        Don&apos;t have an account?
        <a
          href="#signup"
          onClick={handleNavClick(onNavigateSignup)}
          className="ml-1 text-[#0095f6] hover:text-[#1877f2] no-underline font-semibold text-[14px] transition-colors"
        >
          Sign up
        </a>
      </section>
    </>
  );
}

interface SignupCardProps {
  onNavigateLogin: () => void;
  onNavigateRecovery: () => void;
}

export function SignupCard({
  onNavigateLogin,
  onNavigateRecovery,
}: SignupCardProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || trimmedEmail.includes('..') || !EMAIL_REGEX.test(trimmedEmail)) {
      setIsError(true);
      setStatusMessage(
        'Please enter a valid email address (e.g., name@example.com).'
      );
      return;
    }

    const result = validateSignupInput(trimmedEmail, username, password);
    if (!result.valid) {
      setIsError(true);
      setStatusMessage(result.error ?? 'Please fill in all fields.');
      return;
    }
    setIsError(false);
    setStatusMessage(result.message ?? 'Demo complete.');
    setCompleted(true);
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
        aria-labelledby="signup-heading"
      >
        <div
          className="w-[85px] h-[85px] border-2 border-[#262626] rounded-full mx-auto mb-[22px] flex items-center justify-center"
          aria-hidden="true"
        >
          <UserPlus className="w-9 h-9 text-[#262626]" strokeWidth={1.75} />
        </div>

        <h1
          id="signup-heading"
          className="text-[17px] font-semibold mb-[15px] text-[#262626]"
        >
          Create a new account
        </h1>

        <p className="text-[13px] leading-[1.5] text-[#737373] mb-[22px]">
          Fill in the details below to preview the registration flow.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="signup-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isError) {
                setStatusMessage('');
                setIsError(false);
              }
            }}
            placeholder="Email address"
            autoComplete="off"
            disabled={completed}
            className="w-full px-3 py-3 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8] mb-[10px]"
          />

          <label htmlFor="signup-username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="signup-username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (isError) {
                setStatusMessage('');
                setIsError(false);
              }
            }}
            placeholder="Username"
            autoComplete="off"
            disabled={completed}
            className="w-full px-3 py-3 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8] mb-[10px]"
          />

          <label htmlFor="signup-password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (isError) {
                setStatusMessage('');
                setIsError(false);
              }
            }}
            placeholder="Password (min. 8 characters)"
            autoComplete="off"
            disabled={completed}
            className="w-full px-3 py-3 border border-[#dbdbdb] rounded-[4px] bg-[#fafafa] text-[13px] text-[#262626] placeholder:text-[#737373] outline-none focus:border-[#a8a8a8] mb-[14px]"
          />

          <button
            type="submit"
            disabled={completed}
            className="w-full py-[10px] min-h-[40px] border-0 rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:cursor-default text-white text-[14px] font-semibold cursor-pointer transition-colors duration-150 mb-[20px]"
          >
            {completed ? 'Demo completed' : 'Sign up'}
          </button>
        </form>

        {statusMessage && (
          <div
            role={isError ? 'alert' : 'status'}
            aria-live="polite"
            className={`text-[13px] leading-[1.5] mb-[15px] flex items-start justify-center gap-1.5 text-left ${
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

        <div className="flex items-center gap-[15px] text-[#737373] text-[12px] font-semibold mt-[5px] mb-[22px]">
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
          <span>OR</span>
          <span className="flex-1 h-px bg-[#dbdbdb]" aria-hidden="true" />
        </div>

        <a
          href="#recovery"
          onClick={handleNavClick(onNavigateRecovery)}
          className="text-[#262626] hover:text-[#737373] no-underline text-[12px] font-semibold transition-colors"
        >
          Back to account recovery
        </a>
      </section>

      <section className="mt-[10px] p-[22px] bg-white border border-[#dbdbdb] max-[450px]:border-x-0 text-center text-[14px] text-[#262626]">
        Have an account?
        <a
          href="#login"
          onClick={handleNavClick(onNavigateLogin)}
          className="ml-1 text-[#0095f6] hover:text-[#1877f2] no-underline font-semibold text-[14px] transition-colors"
        >
          Back to login
        </a>
      </section>
    </>
  );
}
