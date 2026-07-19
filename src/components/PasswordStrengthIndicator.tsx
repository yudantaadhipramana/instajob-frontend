import React from 'react';

interface PasswordStrength {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface Props {
  password: string;
  onChange?: (strength: PasswordStrength) => void;
}

export function PasswordStrengthIndicator({ password, onChange }: Props) {
  const strength: PasswordStrength = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  React.useEffect(() => {
    onChange?.(strength);
  }, [password, onChange]);

  const requirements = [
    { key: 'minLength', label: 'Minimal 8 karakter', valid: strength.minLength },
    { key: 'hasUppercase', label: 'Huruf besar (A-Z)', valid: strength.hasUppercase },
    { key: 'hasLowercase', label: 'Huruf kecil (a-z)', valid: strength.hasLowercase },
    { key: 'hasNumber', label: 'Angka (0-9)', valid: strength.hasNumber },
    { key: 'hasSpecialChar', label: 'Karakter khusus (!@#$%...)', valid: strength.hasSpecialChar },
  ];

  return (
    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {requirements.map((req) => (
        <div
          key={req.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: req.valid ? '#10B981' : '#EF4444',
            transition: 'color 0.2s',
          }}
        >
          <span style={{ fontWeight: '600', fontSize: '14px' }}>
            {req.valid ? '✓' : '✗'}
          </span>
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
}
