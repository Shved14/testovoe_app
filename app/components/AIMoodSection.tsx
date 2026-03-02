import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ActivityIndicator } from 'react-native';
import { generateAffirmation, Mood } from '@/services/ai';

export function AIMoodSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [affirmation, setAffirmation] = useState('');

  const handlePress = (mood: Mood) => {
    setCurrentMood(mood);
    setIsGenerating(true);
    setIsVisible(true);

    setTimeout(() => {
      setAffirmation(generateAffirmation(mood));
      setIsGenerating(false);
    }, 700);
  };

  return (
    <>
      <View style={styles.moodSection}>
        <Text style={styles.moodTitle}>AI Mood of the Day</Text>
        <Text style={styles.moodSubtitle}>How are you arriving to your practice today?</Text>
        <View style={styles.moodButtonsRow}>
          <Pressable
            style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
            onPress={() => handlePress('positive')}>
            <Text style={styles.moodEmoji}>🙂</Text>
            <Text style={styles.moodLabel}>Light</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
            onPress={() => handlePress('neutral')}>
            <Text style={styles.moodEmoji}>😐</Text>
            <Text style={styles.moodLabel}>Neutral</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
            onPress={() => handlePress('low')}>
            <Text style={styles.moodEmoji}>😔</Text>
            <Text style={styles.moodLabel}>Heavy</Text>
          </Pressable>
        </View>
      </View>

      <Modal transparent animationType="fade" visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Your affirmation</Text>
            {isGenerating ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="small" color="#A78BFA" />
                <Text style={styles.modalLoadingText}>Gently tuning into your mood…</Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalMoodLabel}>
                  {currentMood === 'positive' && 'Feeling light'}
                  {currentMood === 'neutral' && 'Feeling neutral'}
                  {currentMood === 'low' && 'Feeling heavy'}
                </Text>
                <Text style={styles.modalAffirmation}>{affirmation}</Text>
              </>
            )}
            <Pressable
              style={({ pressed }) => [styles.modalButton, pressed && styles.modalButtonPressed]}
              onPress={() => setIsVisible(false)}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  moodSection: {
    marginBottom: 16,
    paddingVertical: 10,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 2,
  },
  moodSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  moodButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  moodButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  moodButtonPressed: {
    backgroundColor: '#1F2937',
    transform: [{ scale: 0.97 }],
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 10,
  },
  modalMoodLabel: {
    fontSize: 13,
    color: '#A5B4FC',
    marginBottom: 8,
  },
  modalAffirmation: {
    fontSize: 14,
    lineHeight: 20,
    color: '#E5E7EB',
    marginBottom: 14,
  },
  modalLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  modalLoadingText: {
    fontSize: 13,
    color: '#E5E7EB',
  },
  modalButton: {
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C1D95',
  },
  modalButtonPressed: {
    backgroundColor: '#3B0764',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F9FAFB',
  },
});

