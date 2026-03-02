import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

type Props = {
  title: string;
  duration: string;
  image: string;
  locked?: boolean;
  showUpgradeCta?: boolean;
  onPress: () => void;
};

export function MeditationCard({ title, duration, image, locked, showUpgradeCta, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={[styles.imageWrapper, locked && styles.lockedImageWrapper]}>
        <Image source={{ uri: image }} style={styles.image} />
        {locked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.lockText}>{showUpgradeCta ? 'Get Premium' : 'Premium'}</Text>
          </View>
        )}
      </View>
      <View style={styles.textRow}>
        <Text style={[styles.title, locked && styles.lockedText]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.duration, locked && styles.lockedText]}>{duration}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#111827',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    position: 'relative',
  },
  lockedImageWrapper: {
    opacity: 0.45,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 6, 23, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  lockText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#F9FAFB',
    marginRight: 8,
  },
  duration: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  lockedText: {
    opacity: 0.7,
  },
});

