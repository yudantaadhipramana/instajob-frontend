import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Pencil,
  Code2,
  LineChart,
  Target
} from 'lucide-react';

export default function ProfilePage() {
  const profileStrength = 85;
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#051126]">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 sticky top-0 bg-navy/80 backdrop-blur-md z-10">
          <h2 className="text-lg font-semibold">Profile & AI Resume</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all">
              <FileText size={16} />
              <span>Export CV</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-[#2D68FF] hover:bg-blue-600 rounded-lg text-sm font-medium transition-all">
              <Sparkles size={16} />
              <span>AI Improve</span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Top Section: Strength & Quick Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D68FF]/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
              
              <div className="relative flex items-center gap-8">
                {/* Circular Progress */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-white/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                    <circle className="text-[#2D68FF]" strokeWidth="8" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - profileStrength/100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                  </svg>
                  <span className="absolute text-2xl font-bold">{profileStrength}%</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Resume Strength</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">
                    CV Anda sangat baik, tapi ada **3 area** yang bisa ditingkatkan untuk mencapai target 95% Match Score.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">ATS Friendly</span>
                    <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">Keywords Optimized</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Target size={18} className="text-[#7030D1]" />
                Job Search Target
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Target Role</p>
                  <p className="text-sm font-medium">Commercial BI Specialist</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Expected Salary</p>
                  <p className="text-sm font-medium">IDR 25M - 35M / month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">Experience</h4>
                <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all">
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <ExperienceCard 
                  role="Commercial BI Specialist" 
                  company="LensaData Academy" 
                  date="Jan 2023 - Present"
                  description="Automating data pipelines and building commercial intelligence dashboards using Power BI and Python."
                />
                <ExperienceCard 
                  role="Electrical Engineer" 
                  company="Finxina" 
                  date="Jun 2020 - Dec 2022"
                  description="Managed large-scale electrical infrastructure projects and optimized industrial energy management systems."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">Top Skills</h4>
                <button className="text-xs text-[#2D68FF] hover:underline">Edit Skills</button>
              </div>

              <div className="glass p-6 rounded-3xl space-y-6">
                <SkillGroup icon={Code2} title="Tech Stack" skills={['Python', 'TypeScript', 'SQL', 'Fastify', 'React']} />
                <SkillGroup icon={LineChart} title="BI Tools" skills={['Power BI', 'Tableau', 'Excel (Expert)']} />
                
                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex gap-3">
                  <AlertCircle className="text-orange-400 shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Missing Skill</p>
                    <p className="text-xs text-white/70">
                      Target job memerlukan **Prisma ORM**. Tambahkan ke CV untuk menaikkan skor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ExperienceCard({ role, company, date, description }: any) {
  return (
    <div className="glass p-6 rounded-2xl glass-hover relative group">
      <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-white/10 rounded-lg text-white/40">
        <Pencil size={14} />
      </button>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center font-bold text-white/20">
          {company.charAt(0)}
        </div>
        <div className="space-y-1">
          <p className="font-bold text-lg">{role}</p>
          <p className="text-sm text-[#2D68FF] font-medium">{company} • {date}</p>
          <p className="text-sm text-white/50 leading-relaxed mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SkillGroup({ icon: Icon, title, skills }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white/40 mb-3">
        <Icon size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s: string) => (
          <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium hover:border-[#2D68FF]/50 transition-all cursor-default">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
