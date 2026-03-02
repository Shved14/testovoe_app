import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BENEFITS = [
  'Unlimited access to all meditations',
  'Personalized journeys for your mood',
  'Offline listening for deep focus',
  'Gentle reminders to pause and breathe',
];

export default function PaywallScreen() {
  return (
    <LinearGradient
      colors={['#1B2140', '#111627', '#050713']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.badge}>Premium</Text>
            <Text style={styles.title}>Unlock Deep Calm</Text>
            <Text style={styles.subtitle}>
              Drift into a quieter mind with curated meditations designed for rest, focus, and daily balance.
            </Text>
          </View>

          <View style={styles.benefitsCard}>
            <Text style={styles.sectionLabel}>Why upgrade</Text>
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
            <View style={[styles.planCard, styles.planCardSecondary]}>
              <Text style={styles.planLabel}>Monthly</Text>
              <Text style={styles.planPrice}>
                $7<Text style={styles.planPriceSmall}>.99</Text>
              </Text>
              <Text style={styles.planCaption}>Billed monthly, cancel anytime.</Text>
            </View>

            <View style={[styles.planCard, styles.planCardPrimary]}>
              <View style={styles.ribbon}>
                <Text style={styles.ribbonText}>Best value</Text>
              </View>
              <Text style={styles.planLabel}>Yearly</Text>
              <Text style={styles.planPrice}>
                $39<Text style={styles.planPriceSmall}>.99</Text>
              </Text>
              <Text style={styles.planCaption}>Save over 55% vs monthly.</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.ctaButton}>
            <Text style={styles.ctaText}>Start Free Trial</Text>
          </TouchableOpacity>

          <Text style={styles.legal}>
            After the trial, your subscription renews automatically. Cancel anytime in your account settings.
          </Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  header: {
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(155, 135, 245, 0.2)',
    color: '#D3C7FF',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: '#F5F4FF',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#A9B0D9',
  },
  benefitsCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: 'rgba(16, 24, 48, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(120, 140, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 14 },
    marginBottom: 24,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7E8ACD',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  check: {
    height: 22,
    width: 22,
    borderRadius: 12,
    backgroundColor: '#7B6DFF',
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
    color: '#E4E7FF',
    fontSize: 14,
  },
  plansWrapper: {
    flexDirection: 'column',
    gap: 14,
    marginBottom: 20,
  },
  planCard: {
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(10, 16, 36, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(122, 135, 255, 0.4)',
  },
  planCardSecondary: {
    opacity: 0.9,
  },
  planCardPrimary: {
    backgroundColor: '#252B5A',
    borderColor: '#B39CFF',
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    right: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#F8C365',
  },
  ribbonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2B1E05',
  },
  planLabel: {
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#AEB6F5',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planPriceSmall: {
    fontSize: 18,
  },
  planCaption: {
    marginTop: 4,
    fontSize: 13,
    color: '#C0C6F8',
  },
  ctaButton: {
    marginTop: 4,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4C77A',
    shadowColor: '#F4C77A',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#2A1C05',
  },
  legal: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 16,
    color: '#7E86B2',
    textAlign: 'center',
  },
});

