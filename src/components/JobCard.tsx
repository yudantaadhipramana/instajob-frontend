import React from 'react';
import { Sparkles, TrendingUp, Clock, User } from 'lucide-react';

interface JobCardProps {
  job: {
    title: string;
    company: string;
    match: number;
    status: string;
    time: string;
    logo: string;
    location: string;
    salary: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const statusClasses = {
    'Applied': 'status-applied',
    'Interviewing': 'status-interviewing',
    'Scouted': 'status-scouted',
  };

  return (
    <div className="job-card group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-xl font-black text-white/20 group-hover:text-blue-brand/50 transition-colors duration-500">
            {job.logo}
          </div>
          <div>
            <p className="text-lg font-bold text-white group-hover:text-blue-brand transition-colors">{job.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-white/40 font-medium">{job.company}</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-xs text-white/30">{job.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[#2D68FF] font-black text-xl italic">
              <span>{job.match}</span>
              <span className="text-xs opacity-50 not-italic">%</span>
            </div>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Match Score</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusClasses[job.status as keyof typeof statusClasses] || 'status-scouted'}`}>
            {job.status}
          </div>
        </div>
      </div>
      
      {/* Match Breakdown Section - Collapsible */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-white/40 text-sm font-medium cursor-pointer">
          <span>AI Match Breakdown</span>
          <Sparkles size={16} className="text-blue-brand" />
        </div>
        <div className="mt-2 text-white/50 text-xs space-y-1">
          <p>✅ Skills Match: 95%</p>
          <p>✅ Experience Alignment: 80%</p>
          <p>✅ Salary Range: Matches your expectation</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
