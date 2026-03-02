import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSubscription } from '@/context/SubscriptionContext';
import { MEDITATION_SESSIONS, MeditationSession } from '@/data/meditations';
import { MeditationCard } from '@/components/MeditationCard';
import { AIMoodSection } from '@/components/AIMoodSection';

export default function MeditationsScreen() {
  const router = useRouter();
  const { isSubscribed, plan } = useSubscription();

  const renderItem: ListRenderItem<MeditationSession> = useCallback(
    ({ item, index }) => {
      const hasNoSubscription = !isSubscribed;
      const hasBasic = plan === 'basic';
      const hasPremium = plan === 'premium';

      let isLocked = false;
      let showUpgradeCta = false;

      if (hasNoSubscription) {
        // Без подписки блокируем все, но визуально можно оставить только первую тройку как замануху
        isLocked = true;
        showUpgradeCta = false;
      } else if (hasBasic) {
        // Базовая подписка: первые 3 сессии доступны, остальные требуют премиум
        isLocked = index >= 3;
        showUpgradeCta = index >= 3;
      } else if (hasPremium) {
        isLocked = false;
        showUpgradeCta = false;
      }

      const handlePress = () => {
        if (isLocked) {
          router.replace('/paywall');
          return;
        }

        // TODO: open meditation player
      };

      return (
        <MeditationCard
          title={item.title}
          duration={item.duration}
          image={item.image}
          locked={isLocked}
          showUpgradeCta={showUpgradeCta}
          onPress={handlePress}
        />
      );
    },
    [isSubscribed, plan, router],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Today&apos;s Sessions</Text>
        <Text style={styles.subtitle}>Drop into a session that matches your energy.</Text>

        <AIMoodSection />

        <FlatList
          data={MEDITATION_SESSIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  listContent: {
    paddingBottom: 16,
  },
});
