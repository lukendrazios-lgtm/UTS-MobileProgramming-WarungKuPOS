import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function StrukScreen({
  route,
  navigation,
  transactions,
  onMarkAsPaid,
}) {
  const { transactionId } = route.params;
  const transaction = transactions.find((t) => t.id === transactionId);

  const [cashPaid, setCashPaid] = useState('');
  const [change, setChange] = useState(0);

  // HOOKS useEffect: hitung uang kembalian otomatis saat input uang berubah
  useEffect(() => {
    if (!transaction) return;
    const paid = parseInt(cashPaid, 10) || 0;
    setChange(paid - transaction.totalPrice);
  }, [cashPaid, transaction]);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Data transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const handleConfirmPaid = () => {
    onMarkAsPaid(transaction.id);
    Alert.alert('Pembayaran Lunas', `Nota #${transaction.id} telah ditandai Sudah Dibayar.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.receiptBox}>
        <View style={styles.receiptHeader}>
          <Text style={styles.storeName}>WARUNGKU UMKM</Text>
          <Text style={styles.meta}>Nota #{transaction.id} • {transaction.date}</Text>

          <View
            style={[
              styles.stampBadge,
              transaction.isPaid ? styles.stampPaid : styles.stampUnpaid,
            ]}
          >
            <Text
              style={[
                styles.stampText,
                transaction.isPaid ? styles.stampTextPaid : styles.stampTextUnpaid,
              ]}
            >
              {transaction.isPaid
                ? `✓ LUNAS (${transaction.paidAt})`
                : 'STATUS: BELUM DIBAYAR'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {transaction.items.map((entry, idx) => (
          <View key={idx} style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{entry.item.name}</Text>
              <Text style={styles.itemSub}>
                {entry.qty} x {formatRupiah(entry.item.price)}
              </Text>
            </View>
            <Text style={styles.itemTotal}>
              {formatRupiah(entry.qty * entry.item.price)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL TAGIHAN</Text>
          <Text style={styles.totalValue}>{formatRupiah(transaction.totalPrice)}</Text>
        </View>

        {/* Kalkulator Kembalian & Nominal Cepat */}
        <View style={styles.calcBox}>
          <Text style={styles.calcLabel}>Uang Tunai Diterima:</Text>
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickChip}
              onPress={() => setCashPaid(transaction.totalPrice.toString())}
            >
              <Text style={styles.quickChipText}>Uang Pas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickChip}
              onPress={() => setCashPaid('50000')}
            >
              <Text style={styles.quickChipText}>Rp 50.000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickChip}
              onPress={() => setCashPaid('100000')}
            >
              <Text style={styles.quickChipText}>Rp 100.000</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Ketik nominal uang..."
            keyboardType="numeric"
            value={cashPaid}
            onChangeText={setCashPaid}
          />
          {cashPaid !== '' && (
            <Text
              style={[
                styles.changeText,
                change < 0 ? styles.changeMinus : styles.changePlus,
              ]}
            >
              {change < 0
                ? `Uang Kurang: ${formatRupiah(Math.abs(change))}`
                : `Kembalian: ${formatRupiah(change)}`}
            </Text>
          )}
        </View>

        {/* TOMBOL SUDAH DIBAYAR */}
        {!transaction.isPaid ? (
          <TouchableOpacity style={styles.paidBtn} onPress={handleConfirmPaid}>
            <Text style={styles.paidBtnText}>✓ Tandai Sudah Dibayar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.paidConfirmedBox}>
            <Text style={styles.paidConfirmedText}>
              ✓ Pembayaran Sudah Diterima
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate('Kasir')}
      >
        <Text style={styles.backBtnText}>← Transaksi Baru di Kasir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3EE', padding: 16 },
  receiptBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  receiptHeader: { alignItems: 'center' },
  storeName: { fontSize: 18, fontWeight: '900', color: '#14532D', letterSpacing: 0.5 },
  meta: { fontSize: 12, color: '#78716C', marginTop: 3 },
  stampBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stampPaid: { backgroundColor: '#DCFCE7' },
  stampUnpaid: { backgroundColor: '#FEF3C7' },
  stampText: { fontSize: 12, fontWeight: '800' },
  stampTextPaid: { color: '#15803D' },
  stampTextUnpaid: { color: '#B45309' },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#D6D3D1',
    borderStyle: 'dashed',
    marginVertical: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
  itemSub: { fontSize: 12, color: '#78716C' },
  itemTotal: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '800', color: '#1C1917' },
  totalValue: { fontSize: 20, fontWeight: '900', color: '#14532D' },
  calcBox: {
    backgroundColor: '#FAFAF9',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  calcLabel: { fontSize: 12, fontWeight: '700', color: '#44403C', marginBottom: 8 },
  quickRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  quickChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D3D1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
  },
  quickChipText: { fontSize: 11, fontWeight: '700', color: '#1C1917' },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D3D1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  changeText: { marginTop: 8, fontSize: 15, fontWeight: '800' },
  changePlus: { color: '#15803D' },
  changeMinus: { color: '#DC2626' },
  paidBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  paidBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  paidConfirmedBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  paidConfirmedText: { color: '#15803D', fontWeight: '800', fontSize: 14 },
  backBtn: {
    backgroundColor: '#1C1917',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 30,
  },
  backBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});