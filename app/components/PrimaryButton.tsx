import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export function PrimaryButton({ label, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4C77A',
    shadowColor: '#F4C77A',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  buttonPressed: {
    backgroundColor: '#E3B869',
    shadowOpacity: 0.25,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#2A1C05',
  },
});

