
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'buyer' | 'seller';

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
