// Variable global menampung data mahasiswa dari API
let listMahasiswa = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchMahasiswa();

    // Event Listener Form Submit
    document.getElementById('mahasiswaForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('btnCancel').addEventListener('click', resetForm);

    // FITUR 1: Event Listener Pencarian Real-Time (input event)
    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

// Fetch semua data dari Backend Node.js
async function fetchMahasiswa() {
    try {
        const response = await fetch('/api/mahasiswa');
        listMahasiswa = await response.json();
        
        // Render tabel & perbarui total counter
        renderTable(listMahasiswa);
        updateCounter(listMahasiswa.length);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

// Render data ke tabel HTML
function renderTable(data) {
    const tbody = document.getElementById('mahasiswaTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">Tidak ada data mahasiswa</td></tr>`;
        return;
    }

    data.forEach((mhs, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${mhs.nim}</td>
            <td>${mhs.nama}</td>
            <td>${mhs.jurusan}</td>
            <td>${mhs.email}</td>
            <td>
                <button class="btn btn-edit" onclick="editMahasiswa(${mhs.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteMahasiswa(${mhs.id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// FITUR 1: Fungsi Filter Real-Time menggunakan listMahasiswa.filter(...)
function handleSearch(e) {
    const keyword = e.target.value.toLowerCase().trim();
    
    const filteredData = listMahasiswa.filter(mhs => 
        mhs.nama.toLowerCase().includes(keyword) || 
        mhs.nim.toLowerCase().includes(keyword)
    );
    
    renderTable(filteredData);
    updateCounter(filteredData.length);
}

// FITUR 3: Fungsi memperbarui Indikator Counter Total Mahasiswa
function updateCounter(count) {
    document.getElementById('totalMahasiswa').innerText = count;
}

// Handle Form Submit (Tambah / Edit)
async function handleFormSubmit(e) {
    e.preventDefault();

    const editId = document.getElementById('editId').value;
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const jurusan = document.getElementById('jurusan').value;
    const email = document.getElementById('email').value.trim();

    // FITUR 2: Validasi Pencegahan NIM Duplikat di Frontend (.some())
    // Hanya berlaku saat menambah data baru (bukan saat mode Edit)
    if (!editId) {
        const isNimExist = listMahasiswa.some(mhs => mhs.nim === nim);
        if (isNimExist) {
            alert('NIM sudah terdaftar!');
            return; // Batalkan submit
        }
    }

    const payload = { nim, nama, jurusan, email };

    try {
        let response;
        if (editId) {
            // Mode Edit (PUT)
            response = await fetch(`/api/mahasiswa/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // Mode Tambah Baru (POST)
            response = await fetch('/api/mahasiswa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            resetForm();
            fetchMahasiswa(); // Refresh data & counter
        } else {
            const errData = await response.json();
            alert(errData.message || 'Gagal menyimpan data');
        }
    } catch (error) {
        console.error('Error saat submit:', error);
    }
}

// Isi form saat tombol Edit diklik
function editMahasiswa(id) {
    const mhs = listMahasiswa.find(item => item.id === id);
    if (!mhs) return;

    document.getElementById('editId').value = mhs.id;
    document.getElementById('nim').value = mhs.nim;
    document.getElementById('nama').value = mhs.nama;
    document.getElementById('jurusan').value = mhs.jurusan;
    document.getElementById('email').value = mhs.email;

    document.getElementById('formTitle').innerText = 'Edit Data Mahasiswa';
    document.getElementById('btnSubmit').innerText = 'Perbarui Mahasiswa';
    document.getElementById('btnCancel').style.display = 'inline-block';
}

// Hapus Mahasiswa
async function deleteMahasiswa(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
        try {
            const response = await fetch(`/api/mahasiswa/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchMahasiswa(); // Refresh data & counter
            } else {
                alert('Gagal menghapus data');
            }
        } catch (error) {
            console.error('Error saat menghapus:', error);
        }
    }
}

// Reset Form
function resetForm() {
    document.getElementById('editId').value = '';
    document.getElementById('mahasiswaForm').reset();
    document.getElementById('formTitle').innerText = 'Tambah Mahasiswa Baru';
    document.getElementById('btnSubmit').innerText = 'Simpan Mahasiswa';
    document.getElementById('btnCancel').style.display = 'none';
}