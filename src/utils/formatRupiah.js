export const formatRupiah = (angka) => {
  if (!angka && angka !== 0) return 'Rp 0';
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};