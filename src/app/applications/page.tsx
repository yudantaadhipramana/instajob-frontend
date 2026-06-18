"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Briefcase, Send, Trophy, Clock, MessageSquare, GripVertical } from 'lucide-react';

const columns = [
  { id: 'applied', label: 'Applied', icon: Send, color: '#0051FF' },
  { id: 'scouted', label: 'Scouted', icon: Briefcase, color: '#0051FF' },
  { id: 'interviewing', label: 'Interviewing', icon: MessageSquare, color: '#F59E0B' },
  { id: 'offer', label: 'Offer', icon: Trophy, color: '#10B981' },
];

const initialApplications = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'Stripe', status: 'applied', match: 98, date: '2d ago', salary: '$180k - $220k' },
  { id: '2', title: 'Product Designer', company: 'Linear', status: 'applied', match: 95, date: '3d ago', salary: '$140k - $170k' },
  { id: '3', title: 'Fullstack Developer', company: 'Vercel', status: 'scouted', match: 92, date: '1d ago', salary: '$160k - $200k' },
  { id: '4', title: 'React Native Engineer', company: 'Shopify', status: 'interviewing', match: 89, date: '5d ago', salary: '$150k - $190k' },
  { id: '5', title: 'Staff Engineer', company: 'OpenAI', status: 'offer', match: 96, date: '1w ago', salary: '$250k - $320k' },
  { id: '6', title: 'UI/UX Lead', company: 'Figma', status: 'interviewing', match: 88, date: '4d ago', salary: '$170k - $210k' },
];

export default function Applications() {
  const [apps, setApps] = useState(initialApplications);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Add a ghost image or styling
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingId(null);
    setDragOverCol(null);
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colId);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!draggingId) return;

    setApps(prev => prev.map(app => 
      app.id === draggingId ? { ...app, status: colId } : app
    ));
    setDraggingId(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      {/* Background Glow */}
      <div style={{ position: 'fixed', width: '800px', height: '800px', borderRadius: '50%', top: '-200px', right: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'fixed', width: '800px', height: '800px', borderRadius: '50%', bottom: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Pipeline Tracking</p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1E293B' }}>Application Board</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Clock size={14} color="rgba(255,255,255,0.4)" />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Drag cards to update status</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {columns.map((col) => {
            const colApps = apps.filter(app => app.status === col.id);
            const Icon = col.icon;
            const isOver = dragOverCol === col.id;
            
            return (
              <div 
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                style={{ 
                  minHeight: '500px',
                  borderRadius: '16px',
                  transition: 'all 0.3s',
                  border: isOver ? `2px dashed ${col.color}80` : '2px dashed transparent',
                  background: isOver ? `${col.color}08` : 'transparent',
                  padding: '4px'
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '0 8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${col.color}20`, border: `1px solid ${col.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={14} color={col.color} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>{col.label}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: col.color, background: `${col.color}15`, padding: '2px 8px', borderRadius: '99px' }}>
                    {colApps.length}
                  </span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colApps.map((app) => (
                    <div 
                      key={app.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      onDragEnd={handleDragEnd}
                      style={{ 
                        background: draggingId === app.id ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)', 
                        border: '1px solid rgba(255, 255, 255, 0.05)', 
                        borderRadius: '12px', 
                        padding: '20px',
                        transition: 'all 0.3s',
                        cursor: 'grab',
                        opacity: draggingId === app.id ? 0.5 : 1,
                        boxShadow: draggingId === app.id ? `0 0 20px ${col.color}30` : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: 'rgba(255,255,255,0.2)' }}>
                          {app.company.charAt(0)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px', fontWeight: 800, color: col.color, fontStyle: 'italic' }}>{app.match}%</span>
                          <GripVertical size={14} color="rgba(255,255,255,0.1)" />
                        </div>
                      </div>
                      
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginBottom: '4px', lineHeight: 1.3 }}>{app.title}</p>
                      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>{app.company}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>{app.salary}</span>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>{app.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
