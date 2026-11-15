import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import KasirScreen from './src/screens/KasirScreen';
import StokScreen from './src/screens/StokScreen';
import RiwayatScreen from './src/screens/RiwayatScreen';
import StrukScreen from './src/screens/StrukScreen';

const Stack = createNativeStackNavigator();

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Beras Pandan Wangi 5kg',
    category: 'Sembako',
    price: 72000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Minyak Goreng 2L',
    category: 'Sembako',
    price: 36000,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Telur Ayam Negeri 1kg',
    category: 'Sembako',
    price: 28000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '4',
    name: 'Mie Goreng Instan (Dus)',
    category: 'Makanan',
    price: 115000,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '5',
    name: 'Kopi Hitam Bubuk Renteng',
    category: 'Minuman',
    price: 15000,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '6',
    name: 'Gula Pasir Putih 1kg',
    category: 'Sembako',
    price: 17500,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=300&q=80',
  },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);

  // HOOKS useEffect: memantau jumlah produk dengan stok menipis (<= 5)
  useEffect(() => {
    const lowItems = products.filter((item) => item.stock <= 5);
    setLowStockCount(lowItems.length);
  }, [products]);

  // Membuat tagihan baru (status awal: Belum Dibayar) & mengurangi stok
  const handleCompleteSale = (cartItems, totalItems, totalPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const bought = cartItems.find((c) => c.item.id === prod.id);
        if (bought) {
          return { ...prod, stock: Math.max(0, prod.stock - bought.qty) };
        }
        return prod;
      })
    );

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newTransaction = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: formattedDate,
      items: cartItems,
      totalItems,
      totalPrice,
      isPaid: false,
      paidAt: null,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  };

  // Fungsi tombol "Sudah Dibayar" untuk mengubah status nota menjadi Lunas
  const handleMarkAsPaid = (transactionId) => {
    const paidTime = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setTransactions((prev) =>
      prev.map((trx) =>
        trx.id === transactionId
          ? { ...trx, isPaid: true, paidAt: paidTime }
          : trx
      )
    );
  };

  // Menambah stok barang yang sudah ada
  const handleRestock = (productId, amount) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, stock: prod.stock + amount } : prod
      )
    );
  };

  // Menambah produk baru ke daftar
  const handleAddProduct = (newProd) => {
    const created = {
      id: Date.now().toString(),
      ...newProd,
    };
    setProducts((prev) => [created, ...prev]);
  };

  // Menghapus produk dari daftar
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Kasir"
        screenOptions={{
          headerStyle: { backgroundColor: '#14532D' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Kasir" options={{ headerShown: false }}>
          {(props) => (
            <KasirScreen
              {...props}
              products={products}
              lowStockCount={lowStockCount}
              onCompleteSale={handleCompleteSale}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Stok" options={{ title: 'Kelola Stok & Foto' }}>
          {(props) => (
            <StokScreen
              {...props}
              products={products}
              onRestock={handleRestock}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Riwayat" options={{ title: 'Riwayat Transaksi' }}>
          {(props) => (
            <RiwayatScreen
              {...props}
              transactions={transactions}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Struk" options={{ title: 'Detail Struk & Pembayaran' }}>
          {(props) => (
            <StrukScreen
              {...props}
              transactions={transactions}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}