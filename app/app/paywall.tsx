import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSubscription } from '@/context/SubscriptionContext';
import { PrimaryButton } from '@/components/PrimaryButton';

const BENEFITS = [
  'Unlimited access to all meditations',
  'Personalized journeys for your mood',
  'Offline listening for deep focus',
  'Gentle reminders to pause and breathe',
];

const PLANS = [
  {
    id: 'monthly' as const,
    label: 'Monthly',
    price: '$9.99',
    caption: 'Billed monthly, cancel anytime.',
    highlight: false,
  },
  {
    id: 'yearly' as const,
    label: 'Yearly',
    price: '$59.99',
    caption: 'Best for committed calm. Save more than 50%.',
    highlight: true,
    badge: 'Best Value',
  },
] as const;

type PlanId = (typeof PLANS)[number]['id'];

export default function PaywallScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('monthly');
  const router = useRouter();
  const { subscribe } = useSubscription();

  const handleStartTrial = () => {
    subscribe(selectedPlan);
    router.replace('/meditations');
  };

  const cardWidth = width * 0.85;
  const cardGap = 16;
  const snapInterval = cardWidth + cardGap;

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const rawIndex = Math.round(offsetX / snapInterval);
    const index = Math.min(Math.max(rawIndex, 0), PLANS.length - 1);
    setSelectedPlan(PLANS[index].id);
  };

  return (
    <LinearGradient
      colors={['#1C1238', '#151B3A', '#050816']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, isCompact && styles.contentCompact]}>
          <View style={styles.header}>
            <Text style={styles.badge}>Premium</Text>
            <Text style={styles.title}>Unlock Your Inner Calm</Text>
            <Text style={styles.subtitle}>
              Drift into a quieter mind with curated meditations designed for rest, focus, and daily balance.
            </Text>
          </View>

          <View style={styles.benefitsCard}>
            <Text style={styles.sectionLabel}>What you’ll get</Text>
            {BENEFITS.map((item) => (
              <View key={item} style={styles.benefitRow}>
                <View style={styles.check}>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
                <Text style={styles.benefitText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.plansWrapper}>
            <FlatList
              data={PLANS}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={snapInterval}
              decelerationRate="fast"
              snapToAlignment="start"
              onMomentumScrollEnd={handleMomentumEnd}
              contentContainerStyle={{ paddingHorizontal: (width - cardWidth) / 2 }}
              renderItem={({ item, index }) => {
                const isSelected = selectedPlan === item.id;
                return (
                  <Pressable
                    onPress={() => setSelectedPlan(item.id)}
                    style={[
                      styles.planCard,
                      item.highlight ? styles.planCardPrimary : styles.planCardSecondary,
                      isSelected && styles.planCardSelected,
                      {
                        width: cardWidth,
                        marginRight: index === PLANS.length - 1 ? 0 : cardGap,
                      },
                    ]}>
                    {item.highlight && item.badge && (
                      <View style={styles.ribbon}>
                        <Text style={styles.ribbonText}>{item.badge}</Text>
                      </View>
                    )}
                    <Text style={styles.planLabel}>{item.label}</Text>
                    <Text style={styles.planPrice}>{item.price}</Text>
                    <Text style={styles.planCaption}>{item.caption}</Text>
                  </Pressable>
                );
              }}
            />
          </View>

          <PrimaryButton label="Start Free Trial" onPress={handleStartTrial} />

          <Text style={styles.legal}>
            After the trial, your subscription renews automatically. Cancel anytime in your account settings.
          </Text>

          <Pressable onPress={() => router.push('/meditations')} style={styles.skipLink}>
            <Text style={styles.skipLinkText}>Continue without subscription</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 18,
    justifyContent: 'space-between',
  },
  contentCompact: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
    gap: 14,
  },
  header: {
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(167, 139, 250, 0.25)',
    color: '#E5D9FF',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#F9F5FF',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#C3C8F5',
  },
  benefitsCard: {
    borderRadius: 26,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(18, 26, 60, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(138, 180, 255, 0.45)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 18 },
    gap: 12,
  },
  sectionLabel: {
    fontSize: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#9DA8FF',
    marginBottom: 4,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  check: {
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: '#7C6CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  benefitText: {
    flex: 1,
    color: '#E7EBFF',
    fontSize: 14,
    lineHeight: 20,
  },
  plansWrapper: {
    marginTop: 8,
    marginBottom: 18,
    gap: 12,
  },
  planCard: {
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(9, 14, 34, 0.97)',
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.6)',
    overflow: 'hidden',
  },
  planCardSecondary: {
    opacity: 0.95,
  },
  planCardPrimary: {
    backgroundColor: 'rgba(57, 51, 134, 0.98)',
    borderColor: '#C4B5FD',
    shadowColor: '#4C46B9',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
  },
  planCardSelected: {
    borderColor: '#FACC6B',
    borderWidth: 2,
    shadowColor: '#FACC6B',
  },
  planLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#C3C8FF',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planCaption: {
    marginTop: 4,
    fontSize: 12,
    color: '#CBD0FF',
  },
  planCardSecondary: {
    opacity: 0.9,
  },
  planCardPrimary: {
    backgroundColor: 'rgba(57, 51, 134, 0.98)',
    borderColor: '#C4B5FD',
    shadowColor: '#4C46B9',
    shadowOpacity: 0.55,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 },
  },
  ribbon: {
    position: 'absolute',
    top: 12,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#F8C365',
  },
  ribbonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2B1E05',
  },
  legal: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 16,
    color: '#7E86B2',
    textAlign: 'center',
  },
  skipLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  skipLinkText: {
    fontSize: 13,
    color: '#C4B5FD',
    textDecorationLine: 'underline',
  },
});

