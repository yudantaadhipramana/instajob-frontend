'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Lang = 'id' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Masuk',
    'nav.signup': 'Daftar',
    'nav.logout': 'Keluar',
    'nav.profile': 'Profil & CV',
    'nav.preferences': 'Preferensi',
    'nav.opportunity': 'Peluang',
    'nav.history': 'Riwayat',
    'nav.settings': 'Pengaturan',
    
    // Landing Hero
    'hero.badge': '🚀 Dipercaya oleh 50,000+ Pencari Kerja',
    'hero.title1': 'Sekali Setup',
    'hero.title2': '2.000+ Lamaran. 0% Ribet',
    'hero.subtitle': 'AI kami menganalisis profil Anda dan mengirimkan lamaran ke ribuan perusahaan secara otomatis. Hemat 3+ jam per hari dan fokus pada interview yang penting.',
    'hero.cta': 'MULAI GRATIS',
    'hero.features.jobScouting': 'AI Job Scouting',
    'hero.features.ai': 'AI Matching',
    'hero.features.emailApply': 'AI Email Auto Apply',
    'hero.features.linkedinApply': 'AI Linkedin Auto Apply',
    'hero.features.tracking': 'Job Tracking System',
    'hero.features.telegram': 'Telegram Bot Automation',
    'hero.social_proof': 'Bergabung dengan 50K+ pencari kerja sukses',
    'hero.demo': 'Lihat Demo',
    'hero.source': 'Berdasarkan data publik LinkedIn dan AI Job Scout kami',
    'social.title': '20,000+ Perusahaan dari AI Job Scout Kami',
    'social.subtitle': 'Kandidat kami ditempatkan di startup hingga perusahaan Fortune 500 di seluruh dunia',
    
    // Stats
    'stats.title': 'Angka yang Bicara',
    'stats.subtitle': 'Pencari kerja di seluruh Indonesia mempercayai InstaJob untuk mengotomasi pencarian kerja mereka',
    'stats.applications': 'Lamaran Terkirim',
    'stats.interviews': 'Interview Didapat',
    'stats.successRate': 'Success Rate',
    'stats.cities': 'Kota Terjangkau',
    'stats.cta': 'Bergabung dengan 50,000+ Pencari Kerja',
    
    // How It Works
    'howItWorks.badge': 'CARA KERJA',
    'howItWorks.title': 'Proses Sederhana, Hasil Luar Biasa',
    'howItWorks.subtitle': 'Dari setup hingga mendapat interview hanya dalam beberapa langkah mudah',
    'howItWorks.step1.title': 'Setup Profil',
    'howItWorks.step1.desc': 'Isi profil Anda dengan skill, pengalaman, dan target pekerjaan dalam 5 menit. Data Anda aman dan terenkripsi.',
    'howItWorks.step2.title': 'AI Matching',
    'howItWorks.step2.desc': 'AI kami menganalisis profil & match dengan ribuan lowongan untuk menemukan peluang terbaik untuk Anda.',
    'howItWorks.step3.title': 'Auto Apply',
    'howItWorks.step3.desc': 'Sistem otomatis kirim lamaran ke perusahaan yang sesuai. Hemat waktu 3+ jam setiap hari.',
    'howItWorks.step4.title': 'Track & Optimize',
    'howItWorks.step4.desc': 'Monitor setiap lamaran dan dapatkan insight untuk meningkatkan success rate wawancara Anda.',
    'howItWorks.cta.title': 'Siap memulai transformasi karir Anda?',
    'howItWorks.cta.button': 'Mulai Sekarang Gratis',
    
    // Testimonials
    'testimonials.badge': 'TESTIMONIALS',
    'testimonials.title': 'Cerita Sukses Alumni',
    'testimonials.subtitle': 'Dengar langsung dari para alumni yang sudah berhasil mengubah karir mereka bersama InstaJob',
    'testimonials.tabs.marketing': 'Digital Marketing',
    'testimonials.tabs.analytics': 'Data Analytics',
    'testimonials.tabs.engineering': 'Software Engineer',
    
    // CTA
    'cta.title': 'Siap Mengotomasi Pencarian Kerjamu?',
    'cta.subtitle': 'Bergabung dengan 50,000+ pencari kerja yang sudah sukses menemukan pekerjaan impian mereka',
    'cta.primaryBtn': 'MULAI SEKARANG — GRATIS!',
    'cta.secondaryBtn': 'Lihat Demo Fitur',
    'cta.trust1': 'Tanpa credit card',
    'cta.trust2': 'Setup dalam 5 menit',
    'cta.trust3': 'Cancel kapan saja',
    
    // Before/After
    'before.title': 'Waktu Habis Sia-sia',
    'before.subtitle': 'Ubah pencarian kerja dari frustasi menjadi efisien',
    'before.badge': 'SEBELUM INSTAJOB',
    'before.item1': 'Habiskan 3+ jam per hari di job board',
    'before.item2': 'Isi 20+ form manual per hari',
    'before.item3': 'Tulis cover letter yang sama berulang kali',
    'before.item4': 'Hanya 1-2 interview per minggu',
    'before.item5': 'Penolakan menghancurkan motivasi',
    'after.badge': 'SESUDAH INSTAJOB',
    'after.item1': '30 menit setup, 100+ lamaran otomatis',
    'after.item2': 'AI otomatis mengisi form lamaran',
    'after.item3': 'AI buat cover letter personalisasi',
    'after.item4': 'Dapatkan 5-8 interview per minggu',
    'after.item5': 'Fokus interview, bukan penolakan',
    
    // Features
    'features.badge': 'FITUR UNGGULAN',
    'features.title': 'Alat AI Canggih untuk Meningkatkan Karir',
    'features.subtitle': 'Semua yang kamu butuhkan untuk mengotomasi pencarian kerja dan mendapat pekerjaan impian lebih cepat',
    'features.ai_job.title': 'AI Job Matching',
    'features.ai_job.desc': 'Algoritma pintar mencocokkan skillmu dengan peluang kerja sempurna',
    'features.cover.title': 'Auto Cover Letter',
    'features.cover.desc': 'AI buat cover letter personalisasi dalam hitungan detik',
    'features.apply.title': 'One-Click Apply',
    'features.apply.desc': 'Auto-fill dan kirim lamaran ke LinkedIn & email',
    'features.tracking.title': 'Job Tracking',
    'features.tracking.desc': 'Monitor semua laramu di satu dashboard',
    'features.telegram.title': 'Telegram Bot',
    'features.telegram.desc': 'Dapat notifikasi real-time di HP-mu',
    'features.analytics.title': 'Analytics',
    'features.analytics.desc': 'Track tingkat keberhasilan dan metrik perbaikan',
    
    // Testimonials
    'testimonial.title': 'Dengar dari Komunitas Kami',
    'testimonial.subtitle': 'Dipercaya dan dicintai oleh 50K+ pencari kerja di seluruh dunia',
    
    // Footer
    'footer.description': 'Platform otomasi pencarian kerja berbasis AI. Lamar lebih banyak, dapat interview lebih cepat.',
    'footer.product': 'Produk',
    'footer.features': 'Fitur',
    'footer.pricing': 'Harga',
    'footer.integrations': 'Integrasi',
    'footer.demo': 'Demo',
    'footer.company': 'Perusahaan',
    'footer.about': 'Tentang Kami',
    'footer.blog': 'Blog',
    'footer.careers': 'Karir',
    'footer.contact': 'Kontak',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privasi',
    'footer.terms': 'Syarat',
    'footer.cookies': 'Kebijakan Cookie',
    'footer.copyright': '© 2026 InstaJob. Hak cipta dilindungi.',
    
    // Dashboard
    'dash.loading': 'Memuat dashboard...',
    'dash.welcome': 'Selamat Datang Kembali! 👋',
    'dash.subtitle': 'Ringkasan pencarian kerjamu',
    'dash.view_all': 'Lihat Semua →',
    'dash.applied': 'Dilamar',
    'dash.interviews': 'Interview',
    'dash.pending': 'Tertunda',
    'dash.match_rate': 'Tingkat Match',
    'dash.recent': 'Aktivitas Terkini',
    'dash.actions': 'Aksi Cepat',
    'dash.find_jobs': 'Cari Peluang',
    'dash.update_profile': 'Update Profil',
    'dash.preferences': 'Preferensi',
    'dash.ai_insight': 'AI Insight',
    'dash.ai_tip': 'Profil kamu match 73% untuk role product designer. Tambah "Figma prototyping" dan "user research" untuk meningkatkan match rate ke 85%.',
    
    // Jobs
    'jobs.loading': 'Memuat peluang...',
    'jobs.title': 'Peluang Kerja',
    'jobs.subtitle': 'posisi yang cocok dengan profilmu',
    'jobs.search': 'Cari judul, perusahaan...',
    'jobs.filter': 'Filter',
    'jobs.apply': 'Lamar',
    'jobs.match': 'match',
    
    // Profile
    'profile.loading': 'Memuat profil...',
    'profile.login_required': 'Silakan login untuk melihat profil.',
    'profile.title': 'Profil & CV',
    'profile.edit': 'Edit',
    'profile.save': 'Simpan',
    'profile.saving': 'Menyimpan...',
    'profile.skills': 'Keahlian',
    'profile.skills_placeholder': 'React, TypeScript, Tailwind CSS',
    'profile.no_skills': 'Belum ada keahlian',
    'profile.target_roles': 'Target Pekerjaan',
    'profile.target_roles_placeholder': 'Contoh: Frontend Engineer, Product Designer',
    'profile.no_roles': 'Belum ada target pekerjaan',
    'profile.target_countries': 'Target Negara',
    'profile.target_countries_placeholder': 'Contoh: Singapura, Australia, Remote',
    'profile.no_countries': 'Belum ada negara dipilih',
    'profile.remote': 'Terbuka untuk remote',
    
    // Applications
    'apps.loading': 'Memuat aplikasi...',
    'apps.title': 'Status Aplikasi',
    'apps.subtitle': 'Lacak semua lamaran kerja',
    'apps.all': 'Semua',
    'apps.applied': 'Dikirim',
    'apps.interview': 'Interview',
    'apps.offer': 'Penawaran',
    'apps.rejected': 'Ditolak',
    
    // Settings
    'settings.loading': 'Memuat pengaturan...',
    'settings.section': 'Personal',
    'settings.title': 'Preferensi',
    'settings.notifications': 'Notifikasi',
    'settings.email_notif': 'Notifikasi Email',
    'settings.email_desc': 'Terima update tentang pencocokan pekerjaan',
    'settings.push_notif': 'Notifikasi Push',
    'settings.push_desc': 'Notifikasi browser & mobile',
    'settings.auto_apply': 'Auto-Apply',
    'settings.enable_auto': 'Aktifkan Auto-Apply',
    'settings.auto_desc': 'Otomatis melamar pekerjaan yang cocok',
    'settings.match_threshold': 'Batas Minimum Match',
    'settings.any_match': 'Match rendah',
    'settings.perfect_match': 'Perfect match',
    'settings.saving': 'Menyimpan...',
    'settings.save': 'Simpan Preferensi',
    
    // Testimonial quotes
    'quote1.text': '"Awalnya saya ragu bisa bersaing di dunia kerja. Tapi InstaJob benar-benar mengubah hidup saya! Dalam 2 minggu, saya dapat 8 interview dan akhirnya diterima di Google."',
    'quote1.name': 'Rini Santoso',
    'quote1.role': 'Frontend Engineer @ Google',
    'quote2.text': '"Transisi karir dari sales ke digital marketing butuh persiapan matang. InstaJob membantu saya menemukan perusahaan yang tepat dengan cepat."',
    'quote2.name': 'Budi Harjanto',
    'quote2.role': 'Product Manager @ Microsoft',
    'quote3.text': '"AI Matching-nya sangat akurat! Rekomendasi pekerjaan yang diberikan selalu sesuai dengan skill dan target karir saya."',
    'quote3.name': 'Maya Wijaya',
    'quote3.role': 'Data Scientist @ Amazon',
    'quote4.text': '"Dulu apply manual capek banget. Sekarang dengan InstaJob, cukup 30 menit setup dan semua berjalan otomatis. Best investment ever!"',
    'quote4.name': 'Dian Permata',
    'quote4.role': 'Product Designer @ Tokopedia',
    'quote5.text': '"Dengan InstaJob, saya bisa fokus belajar skill baru sambil sistem otomatis mencari pekerjaan yang cocok. Sangat membantu!"',
    'quote5.name': 'Agus Pratama',
    'quote5.role': 'Data Analyst @ BCA',
    'quote6.text': '"Fresh graduate seperti saya butuh banyak peluang. InstaJob membantu saya apply ke 50+ perusahaan dalam seminggu!"',
    'quote6.name': 'Sari Dewi',
    'quote6.role': 'Junior Data Analyst @ Telkom',
    'quote7.text': '"Dari 150+ lamaran manual yang saya kirim, hanya 3 yang respon. Dengan InstaJob, saya dapat 12 interview dalam 2 minggu!"',
    'quote7.name': 'Dimas Ardianto',
    'quote7.role': 'Software Engineer @ Microsoft',
    'quote8.text': '"Auto-fill form lamaran adalah fitur favorit saya. Tidak perlu lagi isi data berulang kali untuk setiap aplikasi."',
    'quote8.name': 'Ratna Kusuma',
    'quote8.role': 'Full Stack Developer @ Gojek',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile & CV',
    'nav.preferences': 'Preferences',
    'nav.opportunity': 'Opportunity',
    'nav.history': 'History',
    'nav.settings': 'Settings',
    
    // Landing Hero
    'hero.badge': '🚀 Trusted by 50,000+ Job Seekers',
    'hero.title1': 'One Setup',
    'hero.title2': '2,000+ Applications. Zero Hassle',
    'hero.subtitle': 'Our AI analyzes your profile and sends applications to thousands of companies automatically. Save 3+ hours per day and focus on what matters.',
    'hero.cta': 'GET STARTED FOR FREE',
    'hero.features.jobScouting': 'AI Job Scouting',
    'hero.features.ai': 'AI Matching',
    'hero.features.emailApply': 'AI Email Auto Apply',
    'hero.features.linkedinApply': 'AI Linkedin Auto Apply',
    'hero.features.tracking': 'Job Tracking System',
    'hero.features.telegram': 'Telegram Bot Automation',
    'hero.social_proof': 'Join 50K+ successful job seekers',
    'hero.demo': 'View Demo',
    'hero.source': 'Based on public LinkedIn data and our AI Job Scout',
    'social.title': '20,000+ Companies from Our AI Job Scout',
    'social.subtitle': 'Our candidates are placed at startups to Fortune 500 companies worldwide',
    
    // Stats
    'stats.title': 'The Numbers Speak',
    'stats.subtitle': 'Job seekers across Indonesia trust InstaJob to automate their job search',
    'stats.applications': 'Applications Sent',
    'stats.interviews': 'Interviews Received',
    'stats.successRate': 'Success Rate',
    'stats.cities': 'Cities Covered',
    'stats.cta': 'Join 50,000+ Job Seekers',
    
    // How It Works
    'howItWorks.badge': 'HOW IT WORKS',
    'howItWorks.title': 'Simple Process, Amazing Results',
    'howItWorks.subtitle': 'From setup to interview in just a few easy steps',
    'howItWorks.step1.title': 'Setup Profile',
    'howItWorks.step1.desc': 'Fill your profile with skills, experience, and job targets in 5 minutes. Your data is safe and encrypted.',
    'howItWorks.step2.title': 'AI Matching',
    'howItWorks.step2.desc': 'Our AI analyzes your profile & matches with thousands of jobs to find the best opportunities for you.',
    'howItWorks.step3.title': 'Auto Apply',
    'howItWorks.step3.desc': 'Automatic application system sends applications to matching companies. Save 3+ hours every day.',
    'howItWorks.step4.title': 'Track & Optimize',
    'howItWorks.step4.desc': 'Monitor every application and get insights to improve your interview success rate.',
    'howItWorks.cta.title': 'Ready to start your career transformation?',
    'howItWorks.cta.button': 'Start Now for Free',
    
    // Testimonials
    'testimonials.badge': 'TESTIMONIALS',
    'testimonials.title': 'Success Stories from Our Community',
    'testimonials.subtitle': 'Hear directly from alumni who have successfully transformed their careers with InstaJob',
    'testimonials.tabs.marketing': 'Digital Marketing',
    'testimonials.tabs.analytics': 'Data Analytics',
    'testimonials.tabs.engineering': 'Software Engineer',
    
    // CTA
    'cta.title': 'Ready to Automate Your Job Search?',
    'cta.subtitle': 'Join 50,000+ job seekers who have already found their dream job',
    'cta.primaryBtn': 'START NOW — FREE!',
    'cta.secondaryBtn': 'View Demo',
    'cta.trust1': 'No credit card needed',
    'cta.trust2': 'Setup in 5 minutes',
    'cta.trust3': 'Cancel anytime',
    
    // Before/After
    'before.title': 'Stop Wasting Time',
    'before.subtitle': 'Transform your job search from frustrating to efficient',
    'before.badge': 'BEFORE INSTAJOB',
    'before.item1': 'Spend 3+ hours daily on job boards',
    'before.item2': 'Manually fill out 20+ forms per day',
    'before.item3': 'Write same cover letter repeatedly',
    'before.item4': 'Get 1-2 interviews per week',
    'before.item5': 'Rejections crush your motivation',
    'after.badge': 'AFTER INSTAJOB',
    'after.item1': '30 minutes setup, 100+ auto-applied jobs',
    'after.item2': 'AI auto-fills applications instantly',
    'after.item3': 'AI generates personalized cover letters',
    'after.item4': 'Get 5-8 interviews per week',
    'after.item5': 'Focus on interviews, not rejections',
    
    // Features
    'features.badge': 'FEATURED CAPABILITIES',
    'features.title': 'Advanced AI Tools to Boost Your Career',
    'features.subtitle': 'Everything you need to automate your job search and land your dream job faster',
    'features.ai_job.title': 'AI Job Matching',
    'features.ai_job.desc': 'Smart algorithm matches your skills with perfect job opportunities',
    'features.cover.title': 'Auto Cover Letter',
    'features.cover.desc': 'AI generates personalized cover letters in seconds',
    'features.apply.title': 'One-Click Apply',
    'features.apply.desc': 'Auto-fill and submit applications to LinkedIn & email',
    'features.tracking.title': 'Job Tracking',
    'features.tracking.desc': 'Monitor all your applications in one dashboard',
    'features.telegram.title': 'Telegram Bot',
    'features.telegram.desc': 'Get real-time notifications on your phone',
    'features.analytics.title': 'Analytics',
    'features.analytics.desc': 'Track your success rate and improvement metrics',
    
    // Testimonials
    'testimonial.title': 'Hear From Our Community',
    'testimonial.subtitle': 'Trusted and loved by 50K+ job seekers worldwide',
    
    // Footer
    'footer.description': 'AI-powered job search automation platform. Apply more, get interviews faster, achieve your dream career.',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.integrations': 'Integrations',
    'footer.demo': 'Demo',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2026 InstaJob. All rights reserved.',
    
    // Dashboard
    'dash.loading': 'Loading dashboard...',
    'dash.welcome': 'Welcome Back! 👋',
    'dash.subtitle': 'Here\'s your job search overview',
    'dash.view_all': 'View All →',
    'dash.applied': 'Applied',
    'dash.interviews': 'Interviews',
    'dash.pending': 'Pending',
    'dash.match_rate': 'Match Rate',
    'dash.recent': 'Recent Activity',
    'dash.actions': 'Quick Actions',
    'dash.find_jobs': 'Find Opportunities',
    'dash.update_profile': 'Update Profile',
    'dash.preferences': 'Preferences',
    'dash.ai_insight': 'AI Insight',
    'dash.ai_tip': 'Your profile matches 73% of product designer roles. Add "Figma prototyping" and "user research" to increase your match rate to 85%.',
    
    // Jobs
    'jobs.loading': 'Loading opportunities...',
    'jobs.title': 'Job Opportunities',
    'jobs.subtitle': 'positions matched to your profile',
    'jobs.search': 'Search by title, company...',
    'jobs.filter': 'Filter',
    'jobs.apply': 'Apply',
    'jobs.match': 'match',
    
    // Profile
    'profile.loading': 'Loading profile...',
    'profile.login_required': 'Please login to view your profile.',
    'profile.title': 'Profile & CV',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.saving': 'Saving...',
    'profile.skills': 'Skills',
    'profile.skills_placeholder': 'React, TypeScript, Tailwind CSS',
    'profile.no_skills': 'No skills added yet',
    'profile.target_roles': 'Target Roles',
    'profile.target_roles_placeholder': 'e.g. Frontend Engineer, Product Designer',
    'profile.no_roles': 'No target roles added yet',
    'profile.target_countries': 'Target Countries',
    'profile.target_countries_placeholder': 'e.g. Singapore, Australia, Remote',
    'profile.no_countries': 'No countries selected yet',
    'profile.remote': 'Open to remote positions',
    
    // Applications
    'apps.loading': 'Loading applications...',
    'apps.title': 'Application Status',
    'apps.subtitle': 'Track all your job applications',
    'apps.all': 'All',
    'apps.applied': 'Applied',
    'apps.interview': 'Interview',
    'apps.offer': 'Offer',
    'apps.rejected': 'Rejected',
    'apps.updated': 'Updated',
    
    // Settings
    'settings.loading': 'Loading settings...',
    'settings.section': 'Personal',
    'settings.title': 'Preferences',
    'settings.notifications': 'Notifications',
    'settings.email_notif': 'Email Notifications',
    'settings.email_desc': 'Receive updates about job matches',
    'settings.push_notif': 'Push Notifications',
    'settings.push_desc': 'Browser & mobile notifications',
    'settings.auto_apply': 'Auto-Apply',
    'settings.enable_auto': 'Enable Auto-Apply',
    'settings.auto_desc': 'Automatically apply to matching jobs',
    'settings.match_threshold': 'Minimum Match Threshold',
    'settings.any_match': 'Any match',
    'settings.perfect_match': 'Perfect match',
    'settings.saving': 'Saving...',
    'settings.save': 'Save Preferences',
    
    // Testimonial quotes
    'quote1.text': '"I was skeptical about competing in the job market. But InstaJob completely changed my life! Within 2 weeks, I got 8 interviews and was hired by Google."',
    'quote1.name': 'Rini Santoso',
    'quote1.role': 'Frontend Engineer @ Google',
    'quote2.text': '"Transitioning from sales to digital marketing required careful preparation. InstaJob helped me find the right company quickly."',
    'quote2.name': 'Budi Harjanto',
    'quote2.role': 'Product Manager @ Microsoft',
    'quote3.text': '"The AI Matching is incredibly accurate! The job recommendations always align with my skills and career goals."',
    'quote3.name': 'Maya Wijaya',
    'quote3.role': 'Data Scientist @ Amazon',
    'quote4.text': '"Manual applications were exhausting. With InstaJob, just 30 minutes of setup and everything runs automatically. Best investment ever!"',
    'quote4.name': 'Dian Permata',
    'quote4.role': 'Product Designer @ Tokopedia',
    'quote5.text': '"With InstaJob, I can focus on learning new skills while the system automatically searches for suitable jobs. Very helpful!"',
    'quote5.name': 'Agus Pratama',
    'quote5.role': 'Data Analyst @ BCA',
    'quote6.text': '"Fresh graduates like me need many opportunities. InstaJob helped me apply to 50+ companies in one week!"',
    'quote6.name': 'Sari Dewi',
    'quote6.role': 'Junior Data Analyst @ Telkom',
    'quote7.text': '"From 150+ manual applications I sent, only 3 responded. With InstaJob, I got 12 interviews in 2 weeks!"',
    'quote7.name': 'Dimas Ardianto',
    'quote7.role': 'Software Engineer @ Microsoft',
    'quote8.text': '"Auto-fill application forms is my favorite feature. No more repetitive data entry for each application."',
    'quote8.name': 'Ratna Kusuma',
    'quote8.role': 'Full Stack Developer @ Gojek',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('id');

  useEffect(() => {
    console.log('[I18nContext] Initializing... checking localStorage');
    const saved = localStorage.getItem('instajob_lang') as Lang | null;
    console.log('[I18nContext] Saved lang in localStorage:', saved);
    if (saved && (saved === 'id' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    console.log('[I18nContext] setLang called with:', newLang);
    setLangState(newLang);
    localStorage.setItem('instajob_lang', newLang);
    console.log('[I18nContext] localStorage updated to:', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    const translation = translations[lang][key] || key;
    // console.log(`[I18nContext] t('${key}') [${lang}] -> ${translation}`);
    return translation;
  }, [lang]);

  const value = { lang, setLang, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
