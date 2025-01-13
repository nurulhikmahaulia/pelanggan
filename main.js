import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdr0fxnYpfeG2b6GlTQ_-4TqpmGk2uvOk",
  authDomain: "insan-cemerlang-80713.firebaseapp.com",
  projectId: "insan-cemerlang-80713",
  storageBucket: "insan-cemerlang-80713.appspot.com",
  messagingSenderId: "1016858047753",
  appId: "1:1016858047753:web:0534dda2085c2adab68fd8",
  measurementId: "G-E7G0K9XTCD"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// fungsi ambil daftar pelanggan
export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  let hasilKueri = [];
  
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      nohape: dokumen.data().nohape
      
    })
  })
  
  return hasilKueri;
}
// fungsi menambah data pelanggan
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
    nama: nama, 
    alamat: alamat,
    nohape: nohape
    })
    
    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan')
  }
}
