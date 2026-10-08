import { create } from 'zustand';
import type { User, Incident, Junction } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  selectedCity: string;
  selectedJunction: Junction | null;
  isDemoMode: boolean;
  incidents: Incident[];
  setUser: (user: User | null) => void;
  setSelectedCity: (city: string) => void;
  setSelectedJunction: (junction: Junction | null) => void;
  setDemoMode: (demo: boolean) => void;
  addIncident: (incident: Incident) => void;
  updateIncidentStatus: (id: string, status: 'active' | 'monitoring' | 'resolved') => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  selectedCity: 'Bengaluru',
  selectedJunction: null,
  isDemoMode: false,
  incidents: [],
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setSelectedJunction: (junction) => set({ selectedJunction: junction }),
  setDemoMode: (isDemoMode) => set({ isDemoMode }),
  addIncident: (incident) => set((state) => ({ incidents: [incident, ...state.incidents] })),
  updateIncidentStatus: (id, status) =>
    set((state) => ({
      incidents: state.incidents.map((inc) => (inc.id === id ? { ...inc, status } : inc)),
    })),
  
  login: async (email: string, password: string) => {
    // Demo accounts
    const demoAccounts = [
      { email: 'demo@urbanflow.ai', password: 'demo123', name: 'Demo User', role: 'analyst' as const },
      { email: 'admin@urbanflow.ai', password: 'admin123', name: 'Admin User', role: 'admin' as const },
      { email: 'recruiter@urbanflow.ai', password: 'recruit123', name: 'Recruiter', role: 'researcher' as const },
    ];
    const account = demoAccounts.find((a) => a.email === email && a.password === password);
    if (account) {
      set({
        user: { id: '1', name: account.name, email: account.email, role: account.role },
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
  
  logout: () => set({ user: null, isAuthenticated: false, isDemoMode: false }),
}));
