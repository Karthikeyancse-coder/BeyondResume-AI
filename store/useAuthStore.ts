import { create } from 'zustand';

type Role = 'CANDIDATE' | 'RECRUITER' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  banner?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAsCandidate: () => void;
  loginAsRecruiter: () => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  loginAsCandidate: () => set({
    user: { id: 'cand_001', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'CANDIDATE' },
    isAuthenticated: true,
  }),
  
  loginAsRecruiter: () => set({
    user: { id: 'rec_001', name: 'Sarah Connor', email: 'sarah@techcorp.com', role: 'RECRUITER' },
    isAuthenticated: true,
  }),
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  updateUser: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
}));
