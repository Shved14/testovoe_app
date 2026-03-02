import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type SubscriptionPlan = 'none' | 'basic' | 'premium';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  plan: SubscriptionPlan;
  subscribe: (plan: Exclude<SubscriptionPlan, 'none'>) => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

type SubscriptionProviderProps = {
  children: ReactNode;
};

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [plan, setPlan] = useState<SubscriptionPlan>('none');

  const subscribe = (nextPlan: Exclude<SubscriptionPlan, 'none'>) => {
    setPlan(nextPlan);
  };

  const value = useMemo(
    () => ({
      isSubscribed: plan !== 'none',
      plan,
      subscribe,
    }),
    [plan],
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

