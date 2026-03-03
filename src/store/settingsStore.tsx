import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { BusinessSettings } from '@/types';

interface SettingsContextType extends BusinessSettings {
  isWithinBusinessHours: () => boolean;
  isDeliveryLocationValid: (location: string) => boolean;
  updateSettings: (settings: Partial<BusinessSettings>) => void;
}

const defaultSettings: BusinessSettings = {
  openingTime: '08:00',
  closingTime: '21:00',
  deliveryFee: 500,
  minimumOrderAmount: 2000,
  deliveryLocations: ['Ikere Ekiti', 'Bouesti', 'Afao Road', 'Igbemo'],
  preparationTime: 30,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);

  const isWithinBusinessHours = useCallback(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [openHour, openMin] = settings.openingTime.split(':').map(Number);
    const [closeHour, closeMin] = settings.closingTime.split(':').map(Number);
    
    const openingMinutes = openHour * 60 + openMin;
    const closingMinutes = closeHour * 60 + closeMin;
    
    return currentTime >= openingMinutes && currentTime <= closingMinutes;
  }, [settings.openingTime, settings.closingTime]);

  const isDeliveryLocationValid = useCallback((location: string) => {
    const normalizedLocation = location.toLowerCase().trim();
    return settings.deliveryLocations.some(
      (loc) => normalizedLocation.includes(loc.toLowerCase()) || 
               loc.toLowerCase().includes(normalizedLocation)
    );
  }, [settings.deliveryLocations]);

  const updateSettings = useCallback((newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        isWithinBusinessHours,
        isDeliveryLocationValid,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
