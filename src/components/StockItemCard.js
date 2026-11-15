import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function StockItemCard({ item, onRestock, onDelete }) {
  const isLow = item.stock <= 5;

  const handleConfirmDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Hapus "${item.name}" dari daftar produk?`);
      if (confirmed) onDelete(item.id);
    } else {
      Alert.alert(
        'Hapus Produk',
        `Yakin ingin menghapus "${item.name}" dari katalog?`,
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Hapus',
            style: 'destructive',
            onPress: () => onDelete(item.id),
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.card, isLow && styles.cardWarning]}>
      <Image source={{ uri: item.image }} style={styles.thumb} />

      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{formatRupiah(item.price)} • {item.category}</Text>
        <Text style={[styles.stockText, isLow && styles.stockTextWarning]}>
          Sisa: {item.stock} pcs {isLow ? '• Menipis' : ''}
        </Text>
      </View>

      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btnSmall} onPress={() => onRestock(item.id, 1)}>
          <Text style={styles.btnTextDark}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => onRestock(item.id, 5)}>
          <Text style={styles.btnText}>+5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={handleConfirmDelete}>
          <Text style={styles.btnDeleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  cardWarning: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#E7E5E4',
    marginRight: 12,
  },
  left: { flex: 1, paddingRight: 6 },
  name: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
  price: { fontSize: 12, color: '#57534E', marginTop: 2 },
  stockText: { fontSize: 12, fontWeight: '700', color: '#15803D', marginTop: 4 },
  stockTextWarning: { color: '#B45309' },
  btnGroup: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  btnSmall: {
    backgroundColor: '#F5F5F4',
    borderWidth: 1,
    borderColor: '#D6D3D1',
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnPrimary: {
    backgroundColor: '#14532D',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnDelete: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnTextDark: { color: '#1C1917', fontWeight: '700', fontSize: 12 },
  btnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  btnDeleteText: { color: '#B91C1C', fontWeight: '700', fontSize: 12 },
});