import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TransactionCard from '../components/TransactionCard';
import { formatRupiah } from '../utils/formatRupiah';

export default function RiwayatScreen({ navigation, transactions, onMarkAsPaid }) {
  const [paidRevenue, setPaidRevenue] = useState(0);
  const [unpaidTotal, setUnpaidTotal] = useState(0);

  // HOOKS useEffect: memisahkan total omzet lunas & yang belum dibayar
  useEffect(() => {
    let paid = 0;
    let unpaid = 0;
    transactions.forEach((trx) => {
      if (trx.isPaid) {
        paid += trx.totalPrice;
      } else {
        unpaid += trx.totalPrice;
      }
    });
    setPaidRevenue(paid);
    setUnpaidTotal(unpaid);
  }, [transactions]);

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Uang Masuk (Lunas)</Text>
          <Text style={styles.summaryValue}>{formatRupiah(paidRevenue)}</Text>
        </View>
        <View style={styles.unpaidBox}>
          <Text style={styles.unpaidLabel}>Belum Dibayar</Text>
          <Text style={styles.unpaidValue}>{formatRupiah(unpaidTotal)}</Text>
        </View>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Belum ada catatan transaksi.</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TransactionCard
              transaction={item}
              onPress={(trx) =>
                navigation.navigate('Struk', { transactionId: trx.id })
              }
              onMarkAsPaid={onMarkAsPaid}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3EE' },
  summaryCard: {
    backgroundColor: '#14532D',
    margin: 16,
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { color: '#BBF7D0', fontSize: 12, fontWeight: '600' },
  summaryValue: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', marginTop: 4 },
  unpaidBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  unpaidLabel: { color: '#FDE68A', fontSize: 11, fontWeight: '600' },
  unpaidValue: { color: '#FEF3C7', fontSize: 14, fontWeight: '800', marginTop: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#78716C', fontSize: 14 },
});