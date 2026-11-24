import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EMAIL_REGEX,
  isValidEmail,
  validateLoginInput,
  validateRecoveryInput,
  validateSignupInput,
} from './recovery';

test('EMAIL_REGEX and isValidEmail accept properly formatted email addresses', () => {
  assert.equal(EMAIL_REGEX.test('user@example.com'), true);
  assert.equal(isValidEmail('  first.last+tag@sub.domain.co.uk  '), true);
  assert.equal(isValidEmail('alex_99@company-mail.io'), true);
});

test('isValidEmail rejects improperly formatted email addresses', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('plainusername'), false);
  assert.equal(isValidEmail('user@localhost'), false);
  assert.equal(isValidEmail('user@domain.c'), false);
  assert.equal(isValidEmail('user@.com'), false);
  assert.equal(isValidEmail('user@domain..com'), false);
  assert.equal(isValidEmail('user name@example.com'), false);
});

test('validateRecoveryInput rejects empty or invalid emails and accepts valid emails', () => {
  const empty = validateRecoveryInput('   ');
  assert.equal(empty.valid, false);
  assert.equal(empty.error, 'Please enter your email address.');

  const invalid = validateRecoveryInput('not-an-email');
  assert.equal(invalid.valid, false);
  assert.equal(
    invalid.error,
    'Please enter a valid email address (e.g., name@example.com).'
  );

  const valid = validateRecoveryInput('user@example.com');
  assert.equal(valid.valid, true);
  assert.equal(valid.normalized, 'user@example.com');
  assert.match(valid.message ?? '', /Demo complete/);
});

test('validateLoginInput enforces valid email and password presence', () => {
  assert.equal(validateLoginInput('', 'secret123').valid, false);
  assert.equal(validateLoginInput('username_only', 'secret123').valid, false);
  assert.equal(validateLoginInput('user@example.com', '').valid, false);
  assert.equal(validateLoginInput('user@example.com', 'secret123').valid, true);
});

test('validateSignupInput enforces valid email, username length, and password length', () => {
  assert.equal(validateSignupInput('bad@email', 'alex', 'password123').valid, false);
  assert.equal(
    validateSignupInput('alex@example.com', 'a', 'password123').valid,
    false
  );
  assert.equal(
    validateSignupInput('alex@example.com', 'alex', 'short').valid,
    false
  );
  assert.equal(
    validateSignupInput('alex@example.com', 'alex', 'password123').valid,
    true
  );
});
