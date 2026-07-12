'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, FileText, Upload, ArrowLeft, Save, X, Loader, AlertCircle, CheckCircle, Camera } from 'lucide-react';

interface ProfileUser {
  id: string;
  email: string;
  fullName: string;
  bio?: string;
  phone?: string;
  location?: string;
  profilePicture?: string;
  skills?: string[];
  experience?: string;
  education?: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<ProfileUser>({
    id: 'user-123',
    email: 'you@example.com',
    fullName: 'Your Name',
    phone: '+62-812-3456-7890',
    location: 'Jakarta, Indonesia',
    bio: 'AI-powered job hunter | Software Engineer | Always learning',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    experience: '5+ years in software development',
    education: 'Bachelor of Computer Science',
    profilePicture: undefined,
  });

  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isParsingCV, setIsParsingCV] = useState(false);
  const [cvParseSuccess, setCvParseSuccess] = useState(false);
  const [cvParseError, setCvParseError] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  // Separate raw string state for skills input to prevent cursor jump
  const [skillsInput, setSkillsInput] = useState('');
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);

  // Load profile from API on mount
  useEffect(() => {
    const token = localStorage.getItem('instajob_token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 401) {
          router.push('/login');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load profile');
        return res.json();
      })
      .then(data => {
        if (!data) return;
        // Backend return nested: { id, email, fullName, profile: {...} }
        const profile = data.profile || {};
        const profileData = {
          id: data.id || 'user-123',
          email: data.email || 'you@example.com',
          fullName: data.fullName || 'Your Name',
          phone: profile.phone || '',
          location: profile.location || '',
          bio: profile.bio || '',
          skills: profile.skills ? JSON.parse(profile.skills) : [],
          experience: profile.experience || '',
          education: profile.education || '',
          profilePicture: profile.profilePicture || undefined,
        };
        setUser(profileData);
        setFormData(profileData);
        setSkillsInput((profileData.skills || []).join(', '));
        if (profile.profilePicture) {
          setProfileImageUrl(profile.profilePicture);
        }
      })
      .catch(err => {
        console.error('Failed to load profile:', err);
        // Fallback to default empty state on error (non-401)
      });
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // CV Upload & Parse dengan AI ATS Extraction
  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('instajob_token');
    if (!token) { router.push('/login'); return; }

    setIsParsingCV(true);
    setCvParseError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resume/parse`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (res.status === 401) { router.push('/login'); return; }

      const json = await res.json();
      if (!res.ok) {
        setCvParseError(json.error || 'Failed to parse CV');
        return;
      }

      const parsed = json.data || {};
      setFormData(prev => ({
        ...prev,
        ...(parsed.fullName && { fullName: parsed.fullName }),
        ...(parsed.phone && { phone: parsed.phone }),
        ...(parsed.location && { location: parsed.location }),
        ...(parsed.bio && { bio: parsed.bio }),
        ...(parsed.experience && { experience: parsed.experience }),
        ...(parsed.education && { education: parsed.education }),
        ...(Array.isArray(parsed.skills) && parsed.skills.length > 0 && { skills: parsed.skills }),
      }));
      if (Array.isArray(parsed.skills) && parsed.skills.length > 0) {
        setSkillsInput(parsed.skills.join(', '));
      }

      setCvParseSuccess(true);
      setTimeout(() => setCvParseSuccess(false), 3000);
    } catch (err) {
      setCvParseError('Network error. Please try again.');
    } finally {
      setIsParsingCV(false);
      if (cvFileInputRef.current) cvFileInputRef.current.value = '';
    }
  };

  // Profile Picture Upload dengan preview sync
  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    // Create local URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setProfileImageUrl(imageUrl);
      
      // Update form data dengan profile picture URL
      setFormData(prev => ({
        ...prev,
        profilePicture: imageUrl,
      }));

      // Sync ke user state juga untuk immediate UI update
      setUser(prev => ({
        ...prev,
        profilePicture: imageUrl,
      }));

      setIsUploadingImage(false);
    };

    reader.readAsDataURL(file);

    // Reset file input
    if (profilePicInputRef.current) {
      profilePicInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('instajob_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // ponytail: fullName + profilePicture tidak ada di backend schema
          // Butuh endpoint terpisah PUT /api/user/update-name + upload profilePicture
          // fullName: formData.fullName,
          // profilePicture: formData.profilePicture,
          phone: formData.phone || null,
          location: formData.location || null,
          bio: formData.bio || null,
          skills: formData.skills || [],
          experience: formData.experience || null,
          education: formData.education || null,
        }),
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await res.json();
      setUser(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save profile error:', err);
      setSaveSuccess(false);
      setCvParseError('Failed to save profile. Please try again.');
      setTimeout(() => setCvParseError(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setSaveSuccess(false);
  };

  return (
    <div style={{
      background: '#FFFFFF',
      minHeight: '100vh',
      color: '#1E293B',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        top: '-200px',
        right: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>
      <div style={{
        position: 'fixed',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        bottom: '-200px',
        left: '-100px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(120px)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px',
      }}>
        {/* Header with Back Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
        }}>
          <Link href="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0051FF',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s',
          }}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: 0,
          }}>
            My Profile
          </h1>
          <div style={{ width: '140px' }}></div>
        </div>

        {/* Success Messages */}
        {saveSuccess && (
          <div style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            color: '#059669',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <CheckCircle size={18} />
            Profile updated successfully
          </div>
        )}

        {cvParseSuccess && (
          <div style={{
            marginBottom: '24px',
            padding: '12px 16px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            color: '#1D4ED8',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <CheckCircle size={18} />
            CV parsed and profile auto-filled successfully
          </div>
        )}

        {/* Profile Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 81, 255, 0.08)',
        }}>
          {/* Profile Picture Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          }}>
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              background: profileImageUrl ? 'transparent' : '#F1F5F9',
              border: profileImageUrl ? 'none' : '2px dashed #CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '12px',
            }}>
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }} />
              ) : (
                <User size={48} color="#94A3B8" />
              )}
              <button
                onClick={() => profilePicInputRef.current?.click()}
                disabled={isUploadingImage}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#0051FF',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isUploadingImage ? 'not-allowed' : 'pointer',
                  opacity: isUploadingImage ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => !isUploadingImage && (e.currentTarget.style.background = '#003DCC')}
                onMouseLeave={(e) => !isUploadingImage && (e.currentTarget.style.background = '#0051FF')}
              >
                {isUploadingImage ? <Loader size={20} /> : <Camera size={20} />}
              </button>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#64748B',
              margin: 0,
            }}>
              {isUploadingImage ? 'Uploading...' : 'Click camera to upload photo'}
            </p>
            <input
              ref={profilePicInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Form Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* Full Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <User size={14} /> Full Name *
              </label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <Mail size={14} /> Email Address
              </label>
              <input type="email" name="email" value={formData.email} disabled style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#F8FAFC', color: '#94A3B8', fontFamily: 'inherit', cursor: 'not-allowed', boxSizing: 'border-box' }} />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📞 Phone
              </label>
              <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>

            {/* Location */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📍 Location
              </label>
              <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' }} onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>

            {/* Bio */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <FileText size={14} /> Professional Bio
              </label>
              <textarea name="bio" value={formData.bio || ''} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Tell us about yourself, your experience, and what you're looking for..." onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>

            {/* Skills */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ⭐ Skills (comma-separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onBlur={(e) => {
                  const skills = e.target.value.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
                  setFormData(prev => ({ ...prev, skills }));
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
                style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' }}
                placeholder="React, Node.js, TypeScript, Python..."
                onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'}
              />
            </div>

            {/* Experience */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                💼 Experience
              </label>
              <textarea name="experience" value={formData.experience || ''} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} placeholder="Describe your work experience, roles, and achievements..." onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>

            {/* Education */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🎓 Education
              </label>
              <input type="text" name="education" value={formData.education || ''} onChange={handleInputChange} style={{ width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', background: '#FFFFFF', fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Degree, University, Year..." onFocus={(e) => e.currentTarget.style.borderColor = '#0051FF'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'} />
            </div>
          </div>

          {/* CV Upload Section */}
          <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(0, 81, 255, 0.05)', border: '2px dashed rgba(0, 81, 255, 0.3)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: 'rgba(0, 81, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={24} color="#0051FF" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>Upload CV / Resume</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                  {isParsingCV ? 'Parsing your CV...' : 'Upload your CV to auto-fill your profile with AI-powered ATS extraction'}
                </p>
              </div>
              <button onClick={() => cvFileInputRef.current?.click()} disabled={isParsingCV} style={{ padding: '10px 20px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF', background: isParsingCV ? 'rgba(0, 81, 255, 0.6)' : '#0051FF', border: 'none', borderRadius: '8px', cursor: isParsingCV ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }} onMouseEnter={(e) => !isParsingCV && (e.currentTarget.style.background = '#003DCC')} onMouseLeave={(e) => !isParsingCV && (e.currentTarget.style.background = '#0051FF')}>
                {isParsingCV ? <Loader size={16} /> : <Upload size={16} />}
                {isParsingCV ? 'Parsing...' : 'Choose File'}
              </button>
            </div>
            <input ref={cvFileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleCVUpload} style={{ display: 'none' }} />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: '#475569', background: 'transparent', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'; }}>
              <X size={16} /> Cancel
            </button>
            <button onClick={handleSave} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', color: '#FFFFFF', background: isSaving ? 'rgba(0, 81, 255, 0.6)' : 'linear-gradient(135deg, #0051FF 0%, #0051FF 100%)', border: 'none', borderRadius: '8px', cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(0, 81, 255, 0.3)' }} onMouseEnter={(e) => !isSaving && (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 81, 255, 0.4)')} onMouseLeave={(e) => !isSaving && (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 81, 255, 0.3)')}>
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          {/* Help Section */}
          <div style={{ padding: '16px', background: 'rgba(0, 81, 255, 0.05)', border: '1px solid rgba(0, 81, 255, 0.1)', borderRadius: '8px', fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1E293B' }}>💡 Profile Optimization Tips</p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Complete profile pictures increase match accuracy by 35%</li>
              <li>Detailed experience descriptions help our AI find better opportunities</li>
              <li>Upload your CV to auto-fill all fields using advanced ATS parsing</li>
              <li>Keep skills updated to get matched with relevant positions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
