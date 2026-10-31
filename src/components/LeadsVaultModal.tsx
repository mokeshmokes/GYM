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
import { LeadRecord, GymInfo } from '@/types';

interface LeadsVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: GymInfo;
}

export default function LeadsVaultModal({ isOpen, onClose, settings = GYM_INFO }: LeadsVaultModalProps) {
  const currentSettings = settings || GYM_INFO;
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadLeads();
      const savedWebhook = localStorage.getItem('vst_sheet_webhook');
      setWebhookUrl(savedWebhook || currentSettings.defaultWebhookUrl || GYM_INFO.defaultWebhookUrl || '');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentSettings]);

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

  const handleClearLeads = () => {
    if (confirm('Are you sure you want to clear all leads stored in the local vault?')) {
      localStorage.removeItem('vst_leads');
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Timestamp', 'Name', 'Phone', 'Email', 'Plan', 'Message', 'Status'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.plan.replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vst_fitness_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const spreadsheetId = currentSettings.googleSpreadsheetId || GYM_INFO.googleSpreadsheetId;
  const spreadsheetUrl = currentSettings.googleSpreadsheetUrl || GYM_INFO.googleSpreadsheetUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d0d] border border-gold-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                Staff Leads Vault & Admin Tools
              </h3>
              <p className="text-xs text-neutral-400">
                Live zero-loss lead database and Google Sheets webhook sync
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 hover:border-gold-500/50 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
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
                  {currentSettings.brandName || 'VST FITNESS WORLD'} (ID: <code className="bg-black/50 px-1 py-0.5 rounded text-neutral-300">{spreadsheetId}</code>)
                </div>
              </div>
            </div>

            {spreadsheetUrl && (
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Sheet</span>
              </a>
            )}
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
