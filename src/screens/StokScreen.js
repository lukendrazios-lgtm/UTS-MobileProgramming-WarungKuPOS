import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import StockItemCard from '../components/StockItemCard';

const PHOTO_PRESETS = [
  {
    label: 'Sembako',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'Makanan',
    url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80',
  },
  {
    label: 'Minuman',
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80',
  },
];

export default function StokScreen({
  products,
  onRestock,
  onAddProduct,
  onDeleteProduct,
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Sembako');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState(PHOTO_PRESETS[0].url);

  const handleCreateProduct = () => {
    if (!name.trim() || !price || !stock) {
      Alert.alert('Data Belum Lengkap', 'Isi nama barang, harga, dan stok awal.');
      return;
    }

    onAddProduct({
      name: name.trim(),
      category: category.trim() || 'Sembako',
      price: parseInt(price, 10) || 0,
      stock: parseInt(stock, 10) || 0,
      image: imageUrl.trim() || PHOTO_PRESETS[0].url,
    });

    setName('');
    setPrice('');
    setStock('');
    Alert.alert('Berhasil', 'Produk baru lengkap dengan foto berhasil ditambahkan!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Tambah Produk Baru</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Nama Barang (cth: Teh Botol)"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Kategori"
            value={category}
            onChangeText={setCategory}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Harga (Rp)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Stok Awal"
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
          />
        </View>

        <TextInput
          style={[styles.input, { marginBottom: 8 }]}
          placeholder="URL Foto Produk (atau pilih preset di bawah)"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <View style={styles.presetRow}>
          <Text style={styles.presetLabel}>Pilih Foto Cepat:</Text>
          {PHOTO_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.label}
              style={[
                styles.presetBtn,
                imageUrl === preset.url && styles.presetBtnActive,
              ]}
              onPress={() => {
                setImageUrl(preset.url);
                setCategory(preset.label);
              }}
            >
              <Text
                style={[
                  styles.presetBtnText,
                  imageUrl === preset.url && styles.presetBtnTextActive,
                ]}
              >
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleCreateProduct}>
          <Text style={styles.submitText}>Simpan ke Katalog</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Daftar Inventaris ({products.length} Item)</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <StockItemCard
            item={item}
            onRestock={onRestock}
            onDelete={onDeleteProduct}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3EE' },
  formBox: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  formTitle: { fontSize: 15, fontWeight: '800', color: '#14532D', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  input: {
    backgroundColor: '#FAFAF9',
    borderWidth: 1,
    borderColor: '#D6D3D1',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#1C1917',
  },
  presetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  presetLabel: { fontSize: 11, color: '#57534E', fontWeight: '600' },
  presetBtn: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F5F5F4',
    borderWidth: 1,
    borderColor: '#D6D3D1',
  },
  presetBtnActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#15803D',
  },
  presetBtnText: { fontSize: 11, color: '#57534E', fontWeight: '600' },
  presetBtnTextActive: { color: '#14532D', fontWeight: '700' },
  submitBtn: {
    backgroundColor: '#14532D',
    paddingVertical: 11,
    borderRadius: 9,
    alignItems: 'center',
  },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1917',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
});