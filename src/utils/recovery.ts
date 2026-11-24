export interface RecoveryValidationResult {
  valid: boolean;
  normalized?: string;
  error?: string;
  message?: string;
}

export interface AuthValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
}

export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export function isValidEmail(rawInput: string): boolean {
  const normalized = rawInput.trim();
  if (!normalized || normalized.includes('..')) {
    return false;
  }
  return EMAIL_REGEX.test(normalized);
}

export function validateRecoveryInput(
  rawInput: string
): RecoveryValidationResult {
  const normalized = rawInput.trim();

  if (!normalized) {
    return {
      valid: false,
      error: 'Please enter your email address.',
    };
  }

  if (!isValidEmail(normalized)) {
    return {
      valid: false,
      error: 'Please enter a valid email address (e.g., name@example.com).',
    };
  }

  return {
    valid: true,
    normalized,
    message:
      'Demo complete. Connect your own secure recovery service to send a real recovery link.',
  };
}

export function validateLoginInput(
  email: string,
  password: string
): AuthValidationResult {
  const normalizedEmail = email.trim();
  if (!normalizedEmail) {
    return {
      valid: false,
      error: 'Please enter your email address.',
    };
  }
  if (!isValidEmail(normalizedEmail)) {
    return {
      valid: false,
      error: 'Please enter a valid email address (e.g., name@example.com).',
    };
  }
  if (!password) {
    return {
      valid: false,
      error: 'Please enter your password.',
    };
  }
  return {
    valid: true,
    message:
      'Demo complete. Connect your own authentication backend to sign in.',
  };
}

export function validateSignupInput(
  email: string,
  username: string,
  password: string
): AuthValidationResult {
  const trimmedEmail = email.trim();
  const trimmedUsername = username.trim();

  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    return {
      valid: false,
      error: 'Please enter a valid email address (e.g., name@example.com).',
    };
  }
  if (trimmedUsername.length < 2) {
    return {
      valid: false,
      error: 'Username must be at least 2 characters.',
    };
  }
  if (password.length < 8) {
    return {
      valid: false,
      error: 'Password must be at least 8 characters.',
    };
  }
  return {
    valid: true,
    message:
      'Demo complete. Connect your own user service to create a real account.',
  };
}
