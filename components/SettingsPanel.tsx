
import React from 'react';
import { NotificationSettings } from '../types';

interface Props {
  settings: NotificationSettings;
  onUpdate: (settings: NotificationSettings) => void;
}

export const SettingsPanel: React.FC<Props> = ({ settings, onUpdate }) => {
  const handleChange = (key: keyof NotificationSettings, value: any) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-slide-in transition-colors duration-300">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
          Preferencias de Alerta
        </h2>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Sound & Vibration */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            Sonido y Vibración
          </h3>
          
          <div className="flex items-center justify-between">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Activar Sonido</label>
            <button 
              onClick={() => handleChange('soundEnabled', !settings.soundEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${settings.soundEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              title={settings.soundEnabled ? "Activado" : "Desactivado"}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-medium">Activar Vibración</label>
            <button 
              onClick={() => handleChange('vibrationEnabled', !settings.vibrationEnabled)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${settings.vibrationEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              title={settings.vibrationEnabled ? "Activado" : "Desactivado"}
            >
              <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {settings.vibrationEnabled && (
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Patrón de Vibración</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'default', label: 'Estándar', pattern: [200, 100, 200] },
                  { id: 'urgent', label: 'Urgente', pattern: [100, 50, 100, 50] },
                  { id: 'long', label: 'Largo', pattern: [500, 500] }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                       handleChange('vibrationPattern', opt.id);
                       if ('vibrate' in navigator) navigator.vibrate(opt.pattern);
                    }}
                    className={`px-2 py-2 text-xs font-bold rounded-lg border transition-all ${
                      settings.vibrationPattern === opt.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Customization */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Personalización
          </h3>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Icono de Notificación (URL)</label>
            <div className="flex gap-3">
              <input 
                type="url" 
                value={settings.customIconUrl}
                onChange={(e) => handleChange('customIconUrl', e.target.value)}
                placeholder="https://ejemplo.com/icono.png"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              />
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0">
                 {settings.customIconUrl ? (
                   <img src={settings.customIconUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                 ) : (
                   <span className="text-[10px] text-slate-400 font-mono">IMG</span>
                 )}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">Deja vacío para usar el icono predeterminado.</p>
          </div>
        </section>
      </div>
    </div>
  );
};
