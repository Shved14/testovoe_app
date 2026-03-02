import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
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

export default function PaywallScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const router = useRouter();
  const { subscribe } = useSubscription();

  const handleStartTrial = () => {
    subscribe(selectedPlan);
    router.replace('/meditations');
  };

  return (
    <LinearGradient
      colors={['#1C1238', '#151B3A', '#050816']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, isCompact && styles.scrollContentCompact]}
          showsVerticalScrollIndicator={false}>
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
            <Pressable
              onPress={() => setSelectedPlan('monthly')}
              style={[
                styles.planCard,
                styles.planCardSecondary,
                selectedPlan === 'monthly' && styles.planCardSelected,
              ]}>
              <Text style={styles.planLabel}>Monthly</Text>
              <Text style={styles.planPrice}>$9.99</Text>
              <Text style={styles.planCaption}>Billed monthly, cancel anytime.</Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedPlan('yearly')}
              style={[
                styles.planCard,
                styles.planCardPrimary,
                selectedPlan === 'yearly' && styles.planCardSelected,
              ]}>
              <View style={styles.ribbon}>
                <Text style={styles.ribbonText}>Best Value</Text>
              </View>
              <Text style={styles.planLabel}>Yearly</Text>
              <Text style={styles.planPrice}>$59.99</Text>
              <Text style={styles.planCaption}>Best for committed calm. Save more than 50%.</Text>
            </Pressable>
          </View>

          <PrimaryButton label="Start Free Trial" onPress={handleStartTrial} />

          <Text style={styles.legal}>
            After the trial, your subscription renews automatically. Cancel anytime in your account settings.
          </Text>

          <Pressable onPress={() => router.push('/meditations')} style={styles.skipLink}>
            <Text style={styles.skipLinkText}>Continue without subscription</Text>
          </Pressable>
        </ScrollView>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 32,
    gap: 22,
  },
  scrollContentCompact: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
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

