import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function TransactionCard({ transaction, onPress, onMarkAsPaid }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(transaction)}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.trxId}>Nota #{transaction.id}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            transaction.isPaid ? styles.badgePaid : styles.badgeUnpaid,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              transaction.isPaid ? styles.textPaid : styles.textUnpaid,
            ]}
          >
            {transaction.isPaid ? '✓ LUNAS' : 'BELUM DIBAYAR'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.items}>{transaction.totalItems} item belanja</Text>
          <Text style={styles.total}>{formatRupiah(transaction.totalPrice)}</Text>
        </View>

        {!transaction.isPaid ? (
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => onMarkAsPaid(transaction.id)}
          >
            <Text style={styles.payBtnText}>✓ Sudah Dibayar</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.detailLink}>Lihat Struk →</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  trxId: { fontSize: 15, fontWeight: '800', color: '#1C1917' },
  date: { fontSize: 12, color: '#78716C', marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePaid: { backgroundColor: '#DCFCE7' },
  badgeUnpaid: { backgroundColor: '#FEF3C7' },
  statusText: { fontSize: 11, fontWeight: '800' },
  textPaid: { color: '#15803D' },
  textUnpaid: { color: '#B45309' },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  items: { fontSize: 12, color: '#57534E' },
  total: { fontSize: 17, fontWeight: '800', color: '#1C1917', marginTop: 2 },
  payBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  detailLink: { fontSize: 13, color: '#14532D', fontWeight: '700' },
});