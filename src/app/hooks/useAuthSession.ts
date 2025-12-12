import { useSession, accountInfo } from "../lib/auth/auth-client";
import { useEffect, useState } from "react";

/**
 * Custom hook to get authentication session and account info.
 *
 * @returns { isLoggedIn, session, account }
 */
export function useAuthSession() {
  // Get session from better-auth
  const { data: session, isPending } = useSession();
  const [account, setAccount] = useState<unknown | null>(null);

  // Fetch account info if session exists
  useEffect(() => {
    let ignore = false;
    async function fetchAccount() {
      if (session?.user) {
        const info = await accountInfo();
        if (!ignore) setAccount(info);
      } else {
        setAccount(null);
      }
    }
    fetchAccount();
    return () => {
      ignore = true;
    };
  }, [session]);

  return {
    isLoggedIn: !!session?.user,
    session,
    account,
    isLoading: isPending,
  };
}
