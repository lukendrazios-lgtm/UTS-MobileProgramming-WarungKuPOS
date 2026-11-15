import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderBar({ title, subtitle, lowStockCount }) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>WK</Text>
          </View>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={styles.datePill}>
          <Text style={styles.dateText}>{today}</Text>
        </View>
      </View>

      {lowStockCount > 0 && (
        <View style={styles.alertStrip}>
          <View style={styles.dotWarning} />
          <Text style={styles.alertText}>
            Perhatian: {lowStockCount} produk stoknya hampir habis
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14532D',
    paddingTop: 44,
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#14532D',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#BBF7D0',
    marginTop: 1,
  },
  datePill: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dateText: {
    color: '#F0FDF4',
    fontSize: 12,
    fontWeight: '600',
  },
  alertStrip: {
    marginTop: 14,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotWarning: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D97706',
  },
  alertText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '700',
  },
});