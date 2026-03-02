import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  label: string;
  price: string;
  caption: string;
  highlight?: boolean;
  badgeText?: string;
  selected?: boolean;
  onPress: () => void;
};

export function PlanCard({ label, price, caption, highlight, badgeText, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.planCard,
        highlight && styles.planCardPrimary,
        !highlight && styles.planCardSecondary,
        selected && styles.planCardSelected,
        pressed && styles.planCardPressed,
      ]}>
      {highlight && badgeText && (
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>{badgeText}</Text>
        </View>
      )}
      <Text style={styles.planLabel}>{label}</Text>
      <Text style={styles.planPrice}>{price}</Text>
      <Text style={styles.planCaption}>{caption}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  planCard: {
    borderRadius: 24,
    paddingVertical: 18,
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
    shadowOpacity: 0.55,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 },
  },
  planCardSelected: {
    borderColor: '#FACC6B',
    borderWidth: 2,
    shadowColor: '#FACC6B',
  },
  planCardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
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
  planLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#C3C8FF',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  planCaption: {
    marginTop: 4,
    fontSize: 12,
    color: '#CBD0FF',
  },
});

