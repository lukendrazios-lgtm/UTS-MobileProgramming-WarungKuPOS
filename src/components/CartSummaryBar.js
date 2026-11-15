import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function CartSummaryBar({ totalItems, totalPrice, onCheckout }) {
  if (totalItems === 0) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        <View>
          <Text style={styles.itemCount}>Keranjang • {totalItems} barang</Text>
          <Text style={styles.totalPrice}>{formatRupiah(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
          <Text style={styles.checkoutText}>Buat Tagihan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 6,
    backgroundColor: '#F5F3EE',
  },
  bar: {
    backgroundColor: '#1C1917',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    color: '#A8A29E',
    fontSize: 12,
    fontWeight: '600',
  },
  totalPrice: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  checkoutBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 11,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});