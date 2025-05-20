import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';
    const user = session?.user;

    const login = async (provider?: string) => {
        if (provider) {
            await signIn(provider, { callbackUrl: '/' });
        } else {
            await signIn();
        }
    };

    const logout = async () => {
        await signOut({ callbackUrl: '/auth/signin' });
    };

    const requireAuth = (callback?: () => void) => {
        if (status === 'loading') return;

        if (!isAuthenticated) {
            router.push('/auth/signin');
        } else if (callback) {
            callback();
        }
    };

    return {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        requireAuth,
        session
    };
}; 