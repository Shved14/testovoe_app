import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  subscribe: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

type SubscriptionProviderProps = {
  children: ReactNode;
};

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => {
    setIsSubscribed(true);
  };

  const value = useMemo(
    () => ({
      isSubscribed,
      subscribe,
    }),
    [isSubscribed],
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return ctx;
}

