import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { formatRupiah } from '../utils/formatRupiah';

export default function ProductCard({ item, qtyInCart, onAdd, onRemove }) {
  const isOutOfStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;

  return (
    <View style={[styles.card, qtyInCart > 0 && styles.cardSelected]}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <View style={styles.metaTop}>
          <Text style={styles.category}>{item.category}</Text>
          <Text
            style={[
              styles.stockBadge,
              isOutOfStock
                ? styles.stockEmpty
                : isLowStock
                ? styles.stockLow
                : styles.stockNormal,
            ]}
          >
            {isOutOfStock ? 'Habis' : `Stok ${item.stock}`}
          </Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>{formatRupiah(item.price)}</Text>
      </View>

      <View style={styles.actions}>
        {qtyInCart > 0 ? (
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.btnStep} onPress={() => onRemove(item)}>
              <Text style={styles.btnStepText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qtyInCart}</Text>
            <TouchableOpacity
              style={[
                styles.btnStepAdd,
                (isOutOfStock || qtyInCart >= item.stock) && styles.btnDisabled,
              ]}
              disabled={isOutOfStock || qtyInCart >= item.stock}
              onPress={() => onAdd(item)}
            >
              <Text style={styles.btnStepAddText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.btnAddSingle, isOutOfStock && styles.btnDisabled]}
            disabled={isOutOfStock}
            onPress={() => onAdd(item)}
          >
            <Text style={styles.btnAddSingleText}>
              {isOutOfStock ? 'Habis' : '+ Tambah'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  cardSelected: {
    borderColor: '#15803D',
    backgroundColor: '#F0FDF4',
  },
  productImage: {
    width: 66,
    height: 66,
    borderRadius: 12,
    backgroundColor: '#E7E5E4',
    marginRight: 12,
  },
  info: {
    flex: 1,
    paddingRight: 8,
  },
  metaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  category: {
    fontSize: 11,
    color: '#57534E',
    fontWeight: '600',
  },
  stockBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
  stockNormal: {
    backgroundColor: '#F5F5F4',
    color: '#57534E',
  },
  stockLow: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
  },
  stockEmpty: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#14532D',
    marginTop: 4,
  },
  actions: {
    justifyContent: 'center',
  },
  btnAddSingle: {
    backgroundColor: '#14532D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
  },
  btnAddSingleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 2,
  },
  btnStep: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#F5F5F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1917',
  },
  btnStepAdd: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#15803D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStepAddText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  btnDisabled: {
    backgroundColor: '#D6D3D1',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
  },
});