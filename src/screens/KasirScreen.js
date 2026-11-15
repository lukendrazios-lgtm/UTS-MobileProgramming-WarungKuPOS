import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import ProductCard from '../components/ProductCard';
import CartSummaryBar from '../components/CartSummaryBar';

const CATEGORIES = ['Semua', 'Sembako', 'Makanan', 'Minuman'];

export default function KasirScreen({
  navigation,
  products,
  lowStockCount,
  onCompleteSale,
}) {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // HOOKS useEffect: otomatis hitung total item & harga setiap kali cart berubah
  useEffect(() => {
    let itemsCount = 0;
    let priceSum = 0;
    Object.values(cart).forEach((entry) => {
      itemsCount += entry.qty;
      priceSum += entry.qty * entry.item.price;
    });
    setTotalItems(itemsCount);
    setTotalPrice(priceSum);
  }, [cart]);

  const handleAdd = (product) => {
    setCart((prev) => {
      const currentQty = prev[product.id] ? prev[product.id].qty : 0;
      if (currentQty >= product.stock) return prev;
      return {
        ...prev,
        [product.id]: { item: product, qty: currentQty + 1 },
      };
    });
  };

  const handleRemove = (product) => {
    setCart((prev) => {
      const currentQty = prev[product.id] ? prev[product.id].qty : 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }
      return {
        ...prev,
        [product.id]: { item: product, qty: currentQty - 1 },
      };
    });
  };

  const handleCheckout = () => {
    const cartArray = Object.values(cart);
    if (cartArray.length === 0) return;

    const newTransaction = onCompleteSale(cartArray, totalItems, totalPrice);
    setCart({});
    navigation.navigate('Struk', { transactionId: newTransaction.id });
  };

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchName && matchCat;
  });

  return (
    <View style={styles.container}>
      <HeaderBar
        title="WarungKu POS"
        subtitle="Sistem Kasir & Inventaris UMKM"
        lowStockCount={lowStockCount}
      />

      {/* Menu Navigasi Cepat */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('Stok')}
        >
          <Text style={styles.navBtnText}>Kelola Stok</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate('Riwayat')}
        >
          <Text style={styles.navBtnText}>Riwayat Nota</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk di warung..."
        placeholderTextColor="#A8A29E"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Kategori Horizontal */}
      <View style={styles.catWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScroll}
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catChip, active && styles.catChipActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.catText, active && styles.catTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Daftar Produk */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            qtyInCart={cart[item.id] ? cart[item.id].qty : 0}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        )}
      />

      {/* Bar Ringkasan Belanja */}
      <CartSummaryBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3EE' },
  navRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  navBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6D3D1',
  },
  navBtnText: { fontWeight: '700', color: '#14532D', fontSize: 13 },
  searchInput: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    color: '#1C1917',
    fontSize: 14,
  },
  catWrapper: {
    marginTop: 10,
    marginBottom: 6,
  },
  catScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5E4',
  },
  catChipActive: {
    backgroundColor: '#14532D',
    borderColor: '#14532D',
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#57534E',
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  list: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 },
});