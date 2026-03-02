import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, ListRenderItem, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSubscription } from '@/context/SubscriptionContext';

type Meditation = {
  id: string;
  title: string;
  duration: string;
  image: string;
};

const MEDITATIONS: Meditation[] = [
  {
    id: '1',
    title: 'Morning Calm',
    duration: '10 min',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
  },
  {
    id: '2',
    title: 'Deep Sleep Journey',
    duration: '20 min',
    image: 'https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg',
  },
  {
    id: '3',
    title: 'Anxiety Release',
    duration: '12 min',
    image: 'https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg',
  },
  {
    id: '4',
    title: 'Focus & Flow',
    duration: '15 min',
    image: 'https://images.pexels.com/photos/3822929/pexels-photo-3822929.jpeg',
  },
  {
    id: '5',
    title: 'Evening Gratitude',
    duration: '8 min',
    image: 'https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg',
  },
];

export default function MeditationsScreen() {
  const router = useRouter();
  const { isSubscribed } = useSubscription();
  const [isMoodModalVisible, setIsMoodModalVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMood, setCurrentMood] = useState<'calm' | 'focused' | 'uplifted' | null>(null);
  const [affirmation, setAffirmation] = useState('');

  const generateAffirmation = (mood: 'calm' | 'focused' | 'uplifted') => {
    setCurrentMood(mood);
    setIsGenerating(true);
    setIsMoodModalVisible(true);

    setTimeout(() => {
      let text = '';
      if (mood === 'calm') {
        text = 'Сегодня ты можешь двигаться мягко и медленно. Каждый вдох приносит тебе больше покоя.';
      } else if (mood === 'focused') {
        text = 'Твой ум ясен и собран. Ты можешь спокойно сосредоточиться только на одном шаге за раз.';
      } else {
        text = 'Ты заслуживаешь тепла и поддержки. Позволь себе немного мягкости и благодарности сегодня.';
      }
      setAffirmation(text);
      setIsGenerating(false);
    }, 900);
  };

  const renderItem: ListRenderItem<Meditation> = useCallback(
    ({ item, index }) => {
      const isLocked = !isSubscribed && index < 3;

      const handlePress = () => {
        if (isLocked) {
          router.replace('/paywall');
          return;
        }

        // TODO: open meditation player
      };

      return (
        <Pressable onPress={handlePress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
          <View style={[styles.imageWrapper, isLocked && styles.lockedImageWrapper]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            {isLocked && (
              <View style={styles.lockOverlay}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.lockText}>Premium</Text>
              </View>
            )}
          </View>
          <View style={styles.textRow}>
            <Text style={[styles.title, isLocked && styles.lockedText]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.duration, isLocked && styles.lockedText]}>{item.duration}</Text>
          </View>
        </Pressable>
      );
    },
    [isSubscribed, router],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Meditations</Text>
        <Text style={styles.subtitle}>Choose a session to match your current mood.</Text>

        <View style={styles.moodSection}>
          <Text style={styles.moodTitle}>AI настрой дня</Text>
          <Text style={styles.moodSubtitle}>Выбери, как ты чувствуешь себя сейчас.</Text>
          <View style={styles.moodButtonsRow}>
            <Pressable
              style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
              onPress={() => generateAffirmation('calm')}>
              <Text style={styles.moodEmoji}>😌</Text>
              <Text style={styles.moodLabel}>Спокойный</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
              onPress={() => generateAffirmation('focused')}>
              <Text style={styles.moodEmoji}>🎯</Text>
              <Text style={styles.moodLabel}>Сфокус.</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.moodButton, pressed && styles.moodButtonPressed]}
              onPress={() => generateAffirmation('uplifted')}>
              <Text style={styles.moodEmoji}>🌤️</Text>
              <Text style={styles.moodLabel}>Нужен lift</Text>
            </Pressable>
          </View>
        </View>

        <FlatList
          data={MEDITATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={isMoodModalVisible}
        onRequestClose={() => setIsMoodModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Твой настрой дня</Text>
            {isGenerating ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="small" color="#A78BFA" />
                <Text style={styles.modalLoadingText}>Мягко подбираем аффирмацию…</Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalMoodLabel}>
                  {currentMood === 'calm' && 'Спокойный'}
                  {currentMood === 'focused' && 'Сфокусированный'}
                  {currentMood === 'uplifted' && 'Нужен подъем'}
                </Text>
                <Text style={styles.modalAffirmation}>{affirmation}</Text>
              </>
            )}
            <Pressable
              style={({ pressed }) => [styles.modalButton, pressed && styles.modalButtonPressed]}
              onPress={() => setIsMoodModalVisible(false)}>
              <Text style={styles.modalButtonText}>Продолжить</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050816',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A5A8D0',
    marginBottom: 12,
  },
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
  listContent: {
    paddingBottom: 16,
  },
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
    height: 160,
    position: 'relative',
  },
  lockedImageWrapper: {
    opacity: 0.45,
  },
  image: {
    width: '100%',
    height: '100%',
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
