import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-bird-dark to-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-bird-card border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Decorative blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-bird-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Let's Create Something Amazing</h2>
              <p className="text-slate-400 mb-8">
                I'm currently available for freelance projects and full-time roles. Have a project in mind? Let's chat.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-bird-pink">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <div className="text-slate-200">hello@3legsbird.dev</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-bird-secondary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-slate-200">Digital Nomad (US Timezones)</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bird-accent focus:ring-1 focus:ring-bird-accent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bird-accent focus:ring-1 focus:ring-bird-accent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-bird-accent focus:ring-1 focus:ring-bird-accent transition-all"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button className="w-full bg-bird-accent hover:bg-bird-accent/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};