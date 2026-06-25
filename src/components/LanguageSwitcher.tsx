'use client';

import { useI18n } from '@/context/I18nContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px',
      background: '#F1F5F9',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
    }}>
      <button
        onClick={() => setLang('id')}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '700',
          background: lang === 'id' ? '#0051FF' : 'transparent',
          color: lang === 'id' ? '#fff' : '#64748B',
          transition: 'all 0.2s ease',
        }}
      >
        ID
      </button>
      <button
        onClick={() => setLang('en')}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: '700',
          background: lang === 'en' ? '#0051FF' : 'transparent',
          color: lang === 'en' ? '#fff' : '#64748B',
          transition: 'all 0.2s ease',
        }}
      >
        EN
      </button>
    </div>
  );
}
