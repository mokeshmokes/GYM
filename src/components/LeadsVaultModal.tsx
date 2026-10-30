'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  Download,
  Trash2,
  Table,
  CheckCircle2,
  ExternalLink,
  Save,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { GYM_INFO } from '@/data/gymData';
import { LeadRecord } from '@/types';

interface LeadsVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadsVaultModal({ isOpen, onClose }: LeadsVaultModalProps) {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadLeads();
      const savedWebhook = localStorage.getItem('vst_sheet_webhook');
      setWebhookUrl(savedWebhook || GYM_INFO.defaultWebhookUrl);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const loadLeads = () => {
    try {
      const data = localStorage.getItem('vst_leads');
      if (data) {
        setLeads(JSON.parse(data));
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    }
  };

  const handleSaveWebhook = () => {
    if (webhookUrl.trim()) {
      localStorage.setItem('vst_sheet_webhook', webhookUrl.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['Timestamp', 'Full Name', 'Phone', 'Email', 'Interested Plan', 'Message', 'Status'];
    const rows = leads.map((l) => [
      `"${l.timestamp || ''}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.plan || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status || 'Saved'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VST_Fitness_World_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (confirm('Are you sure you want to clear locally stored demo leads?')) {
      localStorage.removeItem('vst_leads');
      setLeads([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass-card w-full max-w-4xl max-h-[90vh] rounded-3xl border border-gold-500/40 shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                Member Inquiries & Registrations
              </h3>
              <p className="text-xs text-neutral-400">
                Inquiries captured from the website, synced with your Google Spreadsheet.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold-400 flex items-center justify-center transition-all"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Google Sheet Config & Webhook Section */}
        <div className="p-6 bg-neutral-900/60 border-b border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Table className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Connected Google Spreadsheet:</div>
                <div className="text-[11px] text-gold-400">
                  VST FITNESS WORLD (ID: <code className="bg-black/50 px-1 py-0.5 rounded text-neutral-300">{GYM_INFO.googleSpreadsheetId}</code>)
                </div>
              </div>
            </div>

            <a
              href={GYM_INFO.googleSpreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Google Sheet</span>
            </a>
          </div>

          {/* Custom Webhook URL Input */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="Google Apps Script Web App URL (https://script.google.com/macros/s/.../exec)"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-gold-500/30 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
            />
            <button
              onClick={handleSaveWebhook}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Webhook</span>
            </button>
          </div>

          {saveSuccess && (
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Webhook URL saved! Live submissions will automatically sync to this endpoint.</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-3 bg-neutral-900/40 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-neutral-400">
            Total Leads in Vault: <span className="font-bold text-white">{leads.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="btn-gold px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClearLeads}
              disabled={leads.length === 0}
              className="btn-outline-gold px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Vault</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-auto p-6">
          {leads.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <ShieldCheck className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
              <p className="text-sm font-semibold">No leads captured yet.</p>
              <p className="text-xs text-neutral-600 mt-1">
                Submit the contact form on the website to see inquiries populate here in real time!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Full Name</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Plan</th>
                    <th className="p-3.5">Message</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/60">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="p-3.5 text-neutral-400 whitespace-nowrap flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gold-500" />
                        {lead.timestamp}
                      </td>
                      <td className="p-3.5 font-bold text-white whitespace-nowrap">{lead.name}</td>
                      <td className="p-3.5 text-gold-300 font-mono whitespace-nowrap">{lead.phone}</td>
                      <td className="p-3.5 text-neutral-300 whitespace-nowrap">{lead.email}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 font-semibold border border-gold-500/20 text-[11px]">
                          {lead.plan}
                        </span>
                      </td>
                      <td className="p-3.5 text-neutral-400 max-w-xs truncate" title={lead.message}>
                        {lead.message || '—'}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            lead.status === 'Synced'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {lead.status || 'Saved'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

