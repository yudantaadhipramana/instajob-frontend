'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  location?: string;
  bio?: string;
  experiences?: Experience[];
  educations?: Education[];
  skills?: string[];
  certifications?: string[];
  languages?: string[];
  portfolio?: string;
}

interface ParsedCV {
  fullName: string;
  phone: string;
  location: string;
  bio: string;
  experiences: Experience[];
  educations: Education[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'education' | 'skills'>('about');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    portfolio: '',
    experiences: [] as Experience[],
    educations: [] as Education[],
    skills: [] as string[],
    certifications: [] as string[],
    languages: [] as string[],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item: any) => item.str).join(' ') + '\n';
    }

    return text;
  };

  // Parse CV and call backend
  const parseCV = async (cvText: string) => {
    try {
      setParsing(true);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/cv/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText }),
      });

      if (!response.ok) throw new Error('CV parsing failed');
      const parsed: ParsedCV = await response.json();

      setFormData(prev => ({
        ...prev,
        fullName: parsed.fullName || prev.fullName,
        phone: parsed.phone || prev.phone,
        location: parsed.location || prev.location,
        bio: parsed.bio || prev.bio,
        experiences: parsed.experiences || prev.experiences,
        educations: parsed.educations || prev.educations,
      }));

      setSuccess('CV parsed successfully! Review and edit fields before saving.');
    } catch (err) {
      setError('Error parsing CV. Please fill fields manually.');
    } finally {
      setParsing(false);
    }
  };

  // Handle CV file upload and parse
  const handleCVUpload = async (file: File) => {
    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    try {
      setCvFile(file);
      const text = await extractTextFromPDF(file);
      await parseCV(text);
    } catch (err) {
      setError('Error reading PDF file');
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleCVUpload(files[0]);
    }
  };

  // Fetch initial profile
  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      const token = sessionStorage.getItem('instajob_token');
      const userData = sessionStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(userData);
      setProfile(user);
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        portfolio: user.portfolio || '',
        experiences: user.experiences || [],
        educations: user.educations || [],
        skills: user.skills || [],
        certifications: user.certifications || [],
        languages: user.languages || [],
      });
      setLoading(false);
    };

    checkAuthAndFetchProfile();
  }, [router]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field?: string) => {
    if (field) {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    } else {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add experience
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  // Update experience
  const updateExperience = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Delete experience
  const deleteExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  // Add education
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
    };
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, newEdu],
    }));
  };

  // Update education
  const updateEducation = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Delete education
  const deleteEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400 mb-4">InstaJob</div>
          <div className="text-lg text-gray-300">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header with Glasmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="text-gray-300 text-sm mt-1">Manage your career information</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem('instajob_token');
                sessionStorage.removeItem('instajob_user');
                router.push('/login');
              }}
              className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/40 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-200 rounded-lg">
            {success}
          </div>
        )}

        {/* CV Upload Section - Glasmorphic */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="mb-8 p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-white mb-4">📄 Upload Your CV (PDF)</h2>
          <p className="text-gray-300 mb-4">Drag and drop your CV or click to select. We'll auto-fill your profile.</p>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => e.target.files && handleCVUpload(e.target.files[0])}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {parsing && <p className="text-blue-400 mt-4">Parsing CV...</p>}
          {cvFile && <p className="text-green-400 mt-4">✓ CV loaded: {cvFile.name}</p>}
        </div>

        {/* Profile Card - Glasmorphic */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 border-b border-white/10">
            {(['about', 'experience', 'education', 'skills'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* About Section */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Portfolio URL</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {formData.experiences.map((exp, index) => (
                <div key={exp.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="px-3 py-1 bg-red-600/20 text-red-300 rounded hover:bg-red-600/40 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">End Date</label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="What did you accomplish?"
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addExperience}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 font-semibold transition"
              >
                + Add Experience
              </button>
            </div>
          )}

          {/* Education Section */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              {formData.educations.map((edu, index) => (
                <div key={edu.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="px-3 py-1 bg-red-600/20 text-red-300 rounded hover:bg-red-600/40 text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="e.g., Bachelor, Master"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Graduation Date</label>
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addEducation}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 font-semibold transition"
              >
                + Add Education
              </button>
            </div>
          )}

          {/* Skills Section */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">💼 Skills</h3>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="e.g., JavaScript, React, Node.js"
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => deleteSkill(index)}
                      className="px-3 py-2 bg-red-600/20 text-red-300 rounded hover:bg-red-600/40"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSkill}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition"
                >
                  + Add Skill
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">🏆 Certifications</h3>
                <textarea
                  name="certifications"
                  value={formData.certifications?.join('\n') || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    certifications: e.target.value.split('\n').filter(c => c.trim())
                  }))}
                  placeholder="Add certifications (one per line)"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">🌍 Languages</h3>
                <textarea
                  name="languages"
                  value={formData.languages?.join('\n') || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    languages: e.target.value.split('\n').filter(l => l.trim())
                  }))}
                  placeholder="Add languages (one per line)"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Save Profile Button */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
            <button
              onClick={async () => {
                try {
                  const token = sessionStorage.getItem('instajob_token');
                  if (!token || !profile) {
                    setError('Not authenticated');
                    return;
                  }

                  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
                  const response = await fetch(`${apiBase}/api/user/profile`, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  });

                  if (response.ok) {
                    const updated = await response.json();
                    setProfile(updated);
                    sessionStorage.setItem('instajob_user', JSON.stringify(updated));
                    setSuccess('Profile saved successfully!');
                    setTimeout(() => setSuccess(''), 3000);
                  } else {
                    setError('Failed to save profile');
                  }
                } catch (err) {
                  setError('Error saving profile');
                }
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 font-semibold transition"
            >
              💾 Save Profile
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 font-semibold transition"
            >
              Continue Editing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
