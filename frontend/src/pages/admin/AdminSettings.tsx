import { toast } from 'sonner';
import { Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('SHNOOR INTERNATIONAL LLC');
  const [timezone, setTimezone] = useState('UTC');
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Platform configuration</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <SettingsIcon className="h-5 w-5" /> General Settings
          </h3>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Site Name</label>
            <input value={siteName} onChange={e => setSiteName(e.target.value)}
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Timezone</label>
            <select value={timezone} onChange={e => setTimezone(e.target.value)}
              className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern (EST)</option>
              <option value="PST">Pacific (PST)</option>
              <option value="IST">India (IST)</option>
            </select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive email alerts for important events</p>
            </div>
            <button onClick={() => { setEmailNotifs(!emailNotifs); toast.success(`Notifications ${!emailNotifs ? 'enabled' : 'disabled'}`); }}
              className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifs ? 'bg-primary' : 'bg-border'}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${emailNotifs ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <button onClick={() => toast.success('Settings saved')}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
