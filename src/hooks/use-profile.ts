
import { supabase } from '@/lib/supabase';
import { UserData, UserRole } from '@/types/auth';

export async function fetchUserProfile(userId: string): Promise<UserData | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    } 
    
    if (data) {
      return {
        id: data.id,
        email: data.email,
        role: data.role as UserRole,
        name: data.name
      };
    } 
    
    // If profile doesn't exist yet but user exists in auth
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      // Use metadata from auth user
      const metadata = userData.user.user_metadata;
      const email = userData.user.email || '';
      
      try {
        // Insert the profile
        await supabase.from('profiles').insert({
          id: userId,
          email: email,
          role: (metadata?.role as UserRole) || 'buyer',
          name: metadata?.name || 'User'
        });
        
        // Return created user data
        return {
          id: userId,
          email: email,
          role: (metadata?.role as UserRole) || 'buyer',
          name: metadata?.name || 'User'
        };
      } catch (insertError) {
        console.error('Error creating profile:', insertError);
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
}
