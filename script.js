// script.js

// Menunggu sampai semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {

    // ===============================================
    // --- 1. LOGIKA UNTUK PINDAH HALAMAN (FADE TRANSITION) ---
    // ===============================================
    
    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page-section');

    /**
     * Menampilkan halaman berdasarkan ID-nya dan menyembunyikan halaman lain.
     * @param {string} pageId - ID halaman yang akan ditampilkan (misalnya 'beranda').
     */
    function showPage(pageId) {
        // Hapus class 'active' dari semua halaman
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Tambahkan class 'active' ke halaman target
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Scroll ke atas setiap kali halaman berpindah
        window.scrollTo(0, 0); 
    }

    // Tambahkan event listener ke setiap link navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Panggil fungsi tampil halaman
            showPage(targetId);
            
            // Perbarui URL hash (agar bisa di-bookmark/reload)
            window.location.hash = targetId;
        });
    });

    // Cek URL Hash saat halaman dimuat (untuk navigasi langsung atau reload)
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        if (document.getElementById(hashId)) {
            showPage(hashId);
        } else {
            // Jika hash tidak valid, default ke beranda
            showPage('beranda');
        }
    } else {
        // Jika tidak ada hash, default ke beranda
        showPage('beranda'); 
    }

    
    // ===============================================
    // --- 2. LOGIKA UNTUK MODAL (POP-UP) PROFIL ---
    // ===============================================
    
    const modalOverlay = document.getElementById('profilModal');
    const modalContent = document.querySelector('.modal-content');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const profilTriggers = document.querySelectorAll('.profil-trigger');

    // Ambil elemen di dalam modal
    const modalFoto = document.getElementById('modalFoto');
    const modalNama = document.getElementById('modalNama');
    const modalPeran = document.getElementById('modalPeran');
    const modalSekolah = document.getElementById('modalSekolah');
    
    // Ambil elemen TELEPON
    const modalTelpFasilitator = document.getElementById('modalTelpFasilitator');
    const modalTelpAyah = document.getElementById('modalTelpAyah');
    const modalTelpIbu = document.getElementById('modalTelpIbu');

    // Loop setiap kartu profil dan tambahkan event listener
    profilTriggers.forEach(card => {
        card.addEventListener('click', function() {
            // 1. Ambil data dari 'data-' attributes
            const nama = this.dataset.nama;
            const foto = this.dataset.foto;
            const peran = this.dataset.peran;
            const sekolah = this.dataset.sekolah;
            const telpFasilitator = this.dataset.telpFasilitator;
            const telpAyah = this.dataset.telpAyah;
            const telpIbu = this.dataset.telpIbu;

            // 2. Masukkan data ke dalam modal
            modalFoto.src = foto + '.png'; // Diasumsikan file foto menggunakan ekstensi .png
            modalFoto.alt = 'Foto ' + nama;
            modalNama.textContent = nama;
            modalPeran.textContent = peran;
            modalSekolah.textContent = "Asal Sekolah: " + sekolah;

            // Masukkan data Telepon
            modalTelpFasilitator.textContent = "No. Fasilitator: " + telpFasilitator;
            modalTelpAyah.textContent = "No. Telp Ayah: " + telpAyah;
            modalTelpIbu.textContent = "No. Telp Ibu: " + telpIbu;

            // 3. Tampilkan modal dengan transisi
            modalOverlay.style.display = 'flex'; 
            setTimeout(() => { 
                modalOverlay.style.opacity = '1';
                modalContent.style.transform = 'scale(1)'; 
            }, 10);
        });
    });

    /**
     * Menutup modal dengan transisi fade-out.
     */
    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        
        // Setelah transisi selesai (300ms), sembunyikan modal sepenuhnya
        setTimeout(() => { 
            modalOverlay.style.display = 'none';
        }, 300); 
    }

    // Tambahkan event listener untuk tombol close
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Tutup modal jika klik di luar (di overlay)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ==========================================================
    // --- 3. LOGIKA UNTUK SCROLL-TRIGGERED ANIMATION (OPTIONAL) ---
    // ==========================================================
    
    // Catatan: Karena Anda sudah menggunakan fade transition untuk pindah halaman, 
    // Intersection Observer ini mungkin tidak selalu diperlukan, tetapi dipertahankan 
    // jika Anda ingin efek muncul saat scroll di dalam satu halaman konten yang aktif.
    const sectionsToObserve = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        // Hanya tambahkan class 'visible' jika section terlihat di viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // Stop observing setelah muncul (cukup sekali)
        }
      });
    }, {
      root: null, // Menggunakan viewport sebagai root
      rootMargin: '0px 0px -100px 0px', // Mulai muncul 100px sebelum bagian bawah viewport
      threshold: 0.1 // Ketika 10% dari elemen terlihat
    });

    // Mulai amati setiap section
    sectionsToObserve.forEach(s => observer.observe(s));
});