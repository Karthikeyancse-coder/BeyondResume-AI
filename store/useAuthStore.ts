import { create } from 'zustand';

type Role = 'CANDIDATE' | 'RECRUITER' | 'ADMIN' | null;
type VerificationStatus = 'pending' | 'verified' | 'rejected' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  banner?: string;
  // Verification
  verificationStatus: VerificationStatus;
  otpVerified: boolean;
  // Candidate-specific
  githubUrl?: string;
  // Recruiter-specific
  companyName?: string;
  companyUrl?: string;
  emailDomain?: string;
  verificationMethod?: 'linkedin' | 'document' | null;
  linkedinUrl?: string;
  rejectionReason?: string;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role: 'CANDIDATE' | 'RECRUITER';
  githubUrl?: string;
  companyName?: string;
  companyUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // Registration flow
  registrationStep: number; // 1=form, 2=otp, 3=company-verify, 4=pending
  pendingRegistration: RegistrationData | null;
  otpCode: string; // Mock OTP for verification
  otpExpiresAt: number | null;
  otpAttempts: number;
  // Login security
  loginAttempts: number;
  isLocked: boolean;
  lockUntil: number | null;
  // Actions
  loginAsCandidate: () => void;
  loginAsRecruiter: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  // Registration actions
  startRegistration: (data: RegistrationData) => void;
  sendOtp: () => string;
  verifyOtp: (code: string) => boolean;
  resendOtp: () => string;
  setRegistrationStep: (step: number) => void;
  submitCompanyVerification: (method: 'linkedin' | 'document', value: string, companyName?: string, companyUrl?: string) => void;
  // Login security actions
  recordFailedLogin: () => void;
  resetLoginAttempts: () => void;
  // Verification status (admin actions)
  setVerificationStatus: (status: VerificationStatus, reason?: string) => void;
}

const MOCK_OTP = '123456'; // Mock OTP that always works
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  registrationStep: 1,
  pendingRegistration: null,
  otpCode: MOCK_OTP,
  otpExpiresAt: null,
  otpAttempts: 0,
  loginAttempts: 0,
  isLocked: false,
  lockUntil: null,
  
  loginAsCandidate: () => set({
    user: {
      id: 'cand_001', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'CANDIDATE',
      verificationStatus: 'verified', otpVerified: true,
      githubUrl: 'https://github.com/arjunmehta',
    },
    isAuthenticated: true,
    loginAttempts: 0,
  }),
  
  loginAsRecruiter: () => set({
    user: {
      id: 'rec_001', name: 'Sarah Connor', email: 'sarah@techcorp.com', role: 'RECRUITER',
      verificationStatus: 'verified', otpVerified: true,
      companyName: 'TechCorp Solutions', companyUrl: 'https://techcorp.com',
      emailDomain: 'techcorp.com', verificationMethod: 'linkedin',
      linkedinUrl: 'linkedin.com/company/techcorp',
    },
    isAuthenticated: true,
    loginAttempts: 0,
  }),

  loginAsAdmin: () => set({
    user: {
      id: 'admin_001', name: 'Admin User', email: 'admin@beyondresume.ai', role: 'ADMIN',
      verificationStatus: 'verified', otpVerified: true,
    },
    isAuthenticated: true,
    loginAttempts: 0,
  }),
  
  logout: () => set({
    user: null, isAuthenticated: false,
    registrationStep: 1, pendingRegistration: null,
    otpAttempts: 0, loginAttempts: 0, isLocked: false, lockUntil: null,
  }),
  
  updateUser: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),

  // ── Registration Flow ──

  startRegistration: (data) => {
    const otpCode = MOCK_OTP;
    set({
      pendingRegistration: data,
      registrationStep: 2,
      otpCode,
      otpExpiresAt: Date.now() + OTP_EXPIRY_MS,
      otpAttempts: 0,
    });
    // 🔴 TODO: REPLACE → POST /api/auth/send-otp
    // Send actual OTP to data.email via email service
    console.log(`[MOCK] OTP sent to ${data.email}: ${otpCode}`);
  },

  sendOtp: () => {
    const otpCode = MOCK_OTP;
    set({
      otpCode,
      otpExpiresAt: Date.now() + OTP_EXPIRY_MS,
      otpAttempts: 0,
    });
    return otpCode;
  },

  verifyOtp: (code) => {
    const state = get();
    
    // Check lockout
    if (state.otpAttempts >= 3) {
      return false; // Locked out after 3 wrong attempts
    }
    
    // Check expiry
    if (state.otpExpiresAt && Date.now() > state.otpExpiresAt) {
      return false; // Expired
    }
    
    if (code === state.otpCode) {
      const pending = state.pendingRegistration;
      if (pending) {
        if (pending.role === 'RECRUITER') {
          // Recruiter: move to company verification step
          set({
            registrationStep: 3,
            user: {
              id: `rec_${Date.now()}`,
              name: pending.name,
              email: pending.email,
              role: 'RECRUITER',
              verificationStatus: 'pending',
              otpVerified: true,
              companyName: pending.companyName,
              companyUrl: pending.companyUrl,
              emailDomain: pending.email.split('@')[1],
            },
            isAuthenticated: true,
          });
        } else {
          // Candidate: fully registered
          set({
            registrationStep: 1,
            user: {
              id: `cand_${Date.now()}`,
              name: pending.name,
              email: pending.email,
              role: 'CANDIDATE',
              verificationStatus: 'verified',
              otpVerified: true,
              githubUrl: pending.githubUrl,
            },
            isAuthenticated: true,
            pendingRegistration: null,
          });
        }
      }
      return true;
    } else {
      set({ otpAttempts: state.otpAttempts + 1 });
      return false;
    }
  },

  resendOtp: () => {
    const otpCode = MOCK_OTP;
    set({
      otpCode,
      otpExpiresAt: Date.now() + OTP_EXPIRY_MS,
      otpAttempts: 0,
    });
    // 🔴 TODO: REPLACE → POST /api/auth/resend-otp
    const pending = get().pendingRegistration;
    console.log(`[MOCK] OTP resent to ${pending?.email}: ${otpCode}`);
    return otpCode;
  },

  setRegistrationStep: (step) => set({ registrationStep: step }),

  submitCompanyVerification: (method, value, companyName, companyUrl) => {
    set((state) => {
      if (!state.user || state.user.role !== 'RECRUITER') return state;
      return {
        user: {
          ...state.user,
          verificationMethod: method,
          ...(method === 'linkedin' ? { linkedinUrl: value } : {}),
          ...(companyName ? { companyName } : {}),
          ...(companyUrl ? { companyUrl, emailDomain: state.user.email.split('@')[1] || companyUrl } : {}),
          verificationStatus: 'pending' as VerificationStatus,
        },
        registrationStep: 4,
        pendingRegistration: null,
      };
    });
    // 🔴 TODO: REPLACE → POST /api/recruiter/submit-verification
    console.log(`[MOCK] Company verification submitted via ${method}: ${value}`);
  },

  // ── Login Security ──

  recordFailedLogin: () => {
    const state = get();
    const newAttempts = state.loginAttempts + 1;
    if (newAttempts >= 5) {
      set({
        loginAttempts: newAttempts,
        isLocked: true,
        lockUntil: Date.now() + LOCK_DURATION_MS,
      });
    } else {
      set({ loginAttempts: newAttempts });
    }
  },

  resetLoginAttempts: () => set({ loginAttempts: 0, isLocked: false, lockUntil: null }),

  // ── Admin Actions ──

  setVerificationStatus: (status, reason) => set((state) => ({
    user: state.user ? {
      ...state.user,
      verificationStatus: status,
      rejectionReason: reason,
    } : null,
  })),
}));
