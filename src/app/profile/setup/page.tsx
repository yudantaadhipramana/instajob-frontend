'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

// steps list:
// 1. CV Upload & Parse
// 2. Personal Info / Bio
// 3. Job Preferences (Role, Industry, Type, Location, Salary)
// 4. Skills Tagging
// 5. Review & Complete (tracker)

export default function ProfileSetupPage() {
  const router = useRouter();
  const { token, user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // CV Upload state
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    experience: '',
    targetRoles: [] as string[],
    skills: [] as string[],
    industry: '',
    jobType: 'remote', // remote, hybrid, onsite
    salaryMin: 5000000,
    salaryMax: 15000000,
  });

  // Skills input helper
  const [skillInput, setSkillInput] = useState('');
  const [roleInput, setRoleInput] = useState('');

  // Check auth
  useEffect(() => {
    const t = localStorage.getItem('instajob_token');
    if (!t) {
      router.push('/login');
    }
  }, [router]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitProfile();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Mock CV parsing
  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvFile(file);
    setIsParsing(true);
    setError('');

    // Simulate basic parse
    setTimeout(() => {
      setIsParsing(false);
      setSuccess('CV parsed successfully!');
      
      // Auto fill mock data from parsing
      setFormData(prev => ({
        ...prev,
        bio: 'Software Engineer specializing in modern frontend frameworks and clean API design.',
        location: 'Jakarta, Indonesia',
        experience: '2 years of building React and Next.js applications',
        skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Git'],
        targetRoles: ['Frontend Engineer', 'Fullstack Engineer'],
      }));
      
      setTimeout(() => setSuccess(''), 3000);
      setCurrentStep(2); // Auto move to next step after successful parse
    }, 1500);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const handleAddRole = () => {
    if (roleInput.trim() && !formData.targetRoles.includes(roleInput.trim())) {
      setFormData(prev => ({
        ...prev,
        targetRoles: [...prev.targetRoles, roleInput.trim()],
      }));
      setRoleInput('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      targetRoles: prev.targetRoles.filter(r => r !== role),
    }));
  };

  const handleSubmitProfile = async () => {
    setLoading(true);
    setError('');
    const t = localStorage.getItem('instajob_token');
    
    try {
      const response = await fetch('http://localhost:3000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${t}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: formData.bio,
          skills: formData.skills,
          experience: formData.experience,
          location: formData.location,
          // resumeUrl can be set if uploaded to a real storage
          resumeUrl: cvFile ? `https://storage.instajob.com/resumes/${cvFile.name}` : undefined
        }),
      });

      if (response.ok) {
        // save targetRoles and preferences to localStorage or let backend handle if schema allows
        localStorage.setItem('instajob_preferences', JSON.stringify({
          targetRoles: formData.targetRoles,
          industry: formData.industry,
          jobType: formData.jobType,
          salaryMin: formData.salaryMin,
          salaryMax: formData.salaryMax
        }));
        
        router.push('/dashboard');
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to save profile');
      }
    } catch (err) {
      console.error(err);
      setError('Network error updating profile');
    } finally {
      setLoading(false);
    }
  };

  // Completion calculation
  const getCompletionPercentage = () => {
    let score = 0;
    if (cvFile) score += 20;
    if (formData.bio) score += 20;
    if (formData.location && formData.experience) score += 20;
    if (formData.skills.length > 0) score += 20;
    if (formData.targetRoles.length > 0) score += 20;
    return score;
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0B1120',
      color: '#F8FAFC',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Left panel / Progress */}
      <aside style={{
        width: '320px',
        backgroundColor: '#0F172A',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <Logo size={36} showText={true} />
          
          {/* Tracker bar */}
          <div style={{ marginTop: '40px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>
              <span>Completion Tracker</span>
              <span style={{ fontWeight: 'bold', color: '#38BDF8' }}>{getCompletionPercentage()}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${getCompletionPercentage()}%`, height: '100%', backgroundColor: '#2563EB', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { id: 1, title: 'Upload Resume/CV' },
              { id: 2, title: 'Bio & Experience' },
              { id: 3, title: 'Job Preferences' },
              { id: 4, title: 'Skills Tagging' },
              { id: 5, title: 'Review & Complete' },
            ].map(step => (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: currentStep === step.id ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: currentStep === step.id ? '#2563EB' : currentStep > step.id ? '#10B981' : '#334155',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span style={{ fontSize: '14px', fontWeight: currentStep === step.id ? '600' : '400' }}>
                  {step.title}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div style={{ fontSize: '12px', color: '#64748B' }}>
          InstaJob v1.0.0 &copy; 2026
        </div>
      </aside>

      {/* Main Content Pane */}
      <main style={{
        flex: 1,
        padding: '64px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <div>
          {error && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', borderRadius: '8px', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34D399', borderRadius: '8px', marginBottom: '24px' }}>
              {success}
            </div>
          )}

          {/* STEP 1: CV Upload */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Upload your Resume / CV
              </h2>
              <p style={{ color: '#94A3B8', marginBottom: '40px' }}>
                Our AI engine will parse your CV to automatically fill your profile details.
              </p>

              <div style={{
                border: '2px dashed rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                cursor: 'pointer',
                position: 'relative',
              }}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCVUpload}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>📄</div>
                {isParsing ? (
                  <div>
                    <p style={{ fontWeight: '600', color: '#38BDF8' }}>Parsing your CV with AI...</p>
                    <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>Extracting skills, experience, and contact info</p>
                  </div>
                ) : cvFile ? (
                  <div>
                    <p style={{ fontWeight: '600', color: '#10B981' }}>{cvFile.name}</p>
                    <p style={{ fontSize: '14px', color: '#94A3B8', marginTop: '4px' }}>Click or drag to replace file</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '16px' }}>Drag & drop your CV here, or browse files</p>
                    <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>Supports PDF, DOC, DOCX up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Bio & Experience */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tell us about yourself
              </h2>
              <p style={{ color: '#94A3B8', marginBottom: '32px' }}>
                Verify and refine the bio and experience details extracted from your CV.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Bio / Summary</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    placeholder="Brief intro about yourself..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    placeholder="e.g. Jakarta, Indonesia"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Professional Experience Summary</label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    placeholder="e.g. 3 years as Frontend Engineer at Startup X..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Job Preferences */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Job Preferences
              </h2>
              <p style={{ color: '#94A3B8', marginBottom: '32px' }}>
                Define your ideal job characteristics so our search engine works perfectly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Target Roles</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="text"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                      style={{ flex: 1, padding: '10px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                      placeholder="e.g. Software Engineer, UI Designer"
                    />
                    <button
                      onClick={handleAddRole}
                      style={{ padding: '10px 20px', backgroundColor: '#2563EB', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Add
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {formData.targetRoles.map(role => (
                      <span key={role} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#38BDF8', borderRadius: '20px', fontSize: '13px' }}>
                        {role}
                        <button onClick={() => handleRemoveRole(role)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Industry</label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                      placeholder="e.g. Technology, Fintech, Healthcare"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Workplace Type</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                      style={{ width: '100%', padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    >
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="onsite">Onsite</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#94A3B8', marginBottom: '8px' }}>Target Monthly Salary Range (IDR)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: parseInt(e.target.value) || 0 }))}
                      style={{ flex: 1, padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                      placeholder="Min"
                    />
                    <span style={{ color: '#64748B' }}>to</span>
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: parseInt(e.target.value) || 0 }))}
                      style={{ flex: 1, padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Skills Tagging */}
          {currentStep === 4 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Skills Tagging
              </h2>
              <p style={{ color: '#94A3B8', marginBottom: '32px' }}>
                Add technical and soft skills to improve match scoring with job requirements.
              </p>

              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    style={{ flex: 1, padding: '12px 16px', backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    placeholder="e.g. JavaScript, Python, Product Strategy"
                  />
                  <button
                    onClick={handleAddSkill}
                    style={{ padding: '12px 24px', backgroundColor: '#2563EB', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Add Skill
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {formData.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        color: '#F8FAFC',
                        fontSize: '14px',
                      }}
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Complete */}
          {currentStep === 5 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Review and complete setup
              </h2>
              <p style={{ color: '#94A3B8', marginBottom: '32px' }}>
                Make sure all settings are correct before launching your AI Scout engine.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#0F172A', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CV Attached</span>
                  <span style={{ fontSize: '15px', color: '#10B981', fontWeight: '600' }}>{cvFile ? cvFile.name : 'None (Mock resume setup)'}</span>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bio</span>
                  <p style={{ fontSize: '15px', margin: '4px 0 0 0' }}>{formData.bio || '-'}</p>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Roles</span>
                  <p style={{ fontSize: '15px', margin: '4px 0 0 0', fontWeight: '600' }}>{formData.targetRoles.join(', ') || '-'}</p>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Skills</span>
                  <p style={{ fontSize: '15px', margin: '4px 0 0 0', color: '#38BDF8' }}>{formData.skills.join(', ') || '-'}</p>
                </div>
                <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                <div>
                  <span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Job Preferences</span>
                  <p style={{ fontSize: '15px', margin: '4px 0 0 0' }}>
                    {formData.jobType} | {formData.industry || 'All Industries'} | IDR {(formData.salaryMin/1000000).toFixed(0)}M - {(formData.salaryMax/1000000).toFixed(0)}M
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons Nav */}
        <div style={{
          display: 'flex',
          justifyContent: currentStep > 1 ? 'space-between' : 'flex-end',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          marginTop: '40px',
        }}>
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              disabled={loading}
              style={{
                padding: '12px 28px',
                backgroundColor: 'transparent',
                color: '#94A3B8',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
              }}
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            style={{
              padding: '12px 28px',
              backgroundColor: '#2563EB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            }}
          >
            {loading ? 'Saving...' : currentStep === 5 ? 'Launch Scout Engine' : 'Next Step'}
          </button>
        </div>
      </main>
    </div>
  );
}
