'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useI18n } from '@/context/I18nContext';
import { Mail, User, Phone, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const affiliateSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  bio: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

type SignupFormData = z.infer<typeof affiliateSignupSchema>;

export default function AffiliateSignupPage() {
  const router = useRouter();
  const { lang } = useI18n();

  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    id: {
      title: 'Daftar Sebagai Affiliate',
      subtitle: 'Mulai hasilkan komisi dengan mereferensikan InstaJob kepada teman-teman Anda',
      name: 'Nama Lengkap',
      namePlaceholder: 'Masukkan nama Anda',
      email: 'Email',
      emailPlaceholder: 'contoh@email.com',
      phone: 'Nomor Telepon',
      phonePlaceholder: '+62...',
      bio: 'Bio / Deskripsi Singkat',
      bioPlaceholder: 'Ceritakan tentang Anda (opsional)',
      terms: 'Saya setuju dengan Syarat & Ketentuan Affiliate Program',
      submit: 'Daftar Sekarang',
      submitting: 'Mendaftar...',
      success: 'Pendaftaran Berhasil!',
      successMessage: 'Akun affiliate Anda telah dibuat. Silakan login untuk memulai.',
      backToLogin: 'Kembali ke Login',
      backToLanding: 'Kembali ke Landing Page',
      error: 'Terjadi kesalahan. Silakan coba lagi.',
      validationError: 'Mohon periksa kembali data Anda',
      loginLink: 'Sudah punya akun? Login di sini',
    },
    en: {
      title: 'Sign Up as Affiliate',
      subtitle: 'Start earning commissions by referring InstaJob to your friends',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'example@email.com',
      phone: 'Phone Number',
      phonePlaceholder: '+62...',
      bio: 'Bio / Short Description',
      bioPlaceholder: 'Tell us about yourself (optional)',
      terms: 'I agree to the Affiliate Program Terms & Conditions',
      submit: 'Sign Up Now',
      submitting: 'Signing up...',
      success: 'Sign Up Successful!',
      successMessage: 'Your affiliate account has been created. Please login to get started.',
      backToLogin: 'Back to Login',
      backToLanding: 'Back to Landing Page',
      error: 'An error occurred. Please try again.',
      validationError: 'Please check your information',
      loginLink: 'Already have an account? Login here',
    },
  };

  const strings = t[lang as keyof typeof t] || t.en;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    // Clear error for this field
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate form
      const validated = affiliateSignupSchema.parse(formData);

      // Call backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliate/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || strings.error);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/affiliate/login');
      }, 2000);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
        err.issues.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path[0] as keyof SignupFormData] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ name: err.message || strings.error });
      }
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        {/* Background glow effects */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at top right, rgba(30, 64, 255, 0.1), transparent 50%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at bottom left, rgba(30, 64, 255, 0.1), transparent 50%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Success card */}
        <motion.div
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle size={48} className="text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{strings.success}</h2>
            <p className="text-gray-600 mb-6">{strings.successMessage}</p>
            <Link
              href="/affiliate/login"
              className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {strings.backToLogin}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Background glow effects */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at top right, rgba(30, 64, 255, 0.1), transparent 50%)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(30, 64, 255, 0.1), transparent 50%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-1200 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/affiliate" className="text-xl font-bold text-gray-900">
            InstaJob
          </Link>
          <Link
            href="/affiliate"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {strings.backToLanding}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Form header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{strings.title}</h1>
            <p className="text-gray-600">{strings.subtitle}</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User size={16} />
                  {strings.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={strings.namePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
                {errors.name && (
                  <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  {strings.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={strings.emailPlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  {strings.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={strings.phonePlaceholder}
                  className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Bio field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={16} />
                  {strings.bio}
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder={strings.bioPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={loading}
                />
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  disabled={loading}
                />
                <label className="text-sm text-gray-600 cursor-pointer">
                  {strings.terms}
                </label>
              </div>
              {errors.termsAccepted && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.termsAccepted}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? strings.submitting : strings.submit}
              </button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {strings.loginLink}
              <Link href="/affiliate/login" className="ml-1 text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
