import { useState } from 'react';
import { Upload, Palette } from 'lucide-react';
import { toast } from 'sonner';

const UICustomization = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState('#3B82F6');
  const [headerText, setHeaderText] = useState('SHNOOR INTERNATIONAL LLC');
  const [footerText, setFooterText] = useState('© 2026 SHNOOR INTERNATIONAL LLC');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
      toast.success('Logo uploaded (preview only)');
    }
  };

  const handleSave = () => toast.success('UI settings saved (preview only)');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">UI Customization</h1>
        <p className="text-sm text-muted-foreground">Customize the platform appearance</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Logo</h3>
          <div className="flex items-center gap-4">
            {logo ? (
              <img src={logo} alt="Logo" className="h-16 w-16 rounded-lg border object-contain" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <label className="cursor-pointer rounded-lg border bg-accent px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/80 transition-colors">
              Upload Logo
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Palette className="h-5 w-5" /> Theme Color</h3>
          <div className="flex items-center gap-4">
            <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)}
              className="h-12 w-12 cursor-pointer rounded-lg border" />
            <input value={themeColor} onChange={e => setThemeColor(e.target.value)}
              className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring w-32" />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Header Text</h3>
          <input value={headerText} onChange={e => setHeaderText(e.target.value)}
            className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Footer Text</h3>
          <input value={footerText} onChange={e => setFooterText(e.target.value)}
            className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <button onClick={handleSave} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
        Save Changes
      </button>
    </div>
  );
};

export default UICustomization;
