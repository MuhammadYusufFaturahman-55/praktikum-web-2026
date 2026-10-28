// File: script.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil elemen DOM
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const todoList = document.querySelector("#todoList");
    const taskCounter = document.querySelector("#taskCounter");
    const clearCompletedBtn = document.querySelector("#clearCompletedBtn");

    // 2. Fungsi membaca dan menyimpan ke LocalStorage
    const getTasks = () => JSON.parse(localStorage.getItem("todo_tasks")) || [];
    const saveTasks = (tasks) => localStorage.setItem("todo_tasks", JSON.stringify(tasks));

    // Fungsi Memperbarui Penghitung Tugas
    const updateCounter = (tasks) => {
        const total = tasks.length;
        const selesai = tasks.filter(task => task.completed).length;
        const belumSelesai = total - selesai;
        taskCounter.textContent = `Total: ${total} Tugas | Selesai: ${selesai} | Belum Selesai: ${belumSelesai}`;
    };

    // 3. Fungsi menampilkan daftar tugas ke layar
    const renderTasks = () => {
        const tasks = getTasks();
        todoList.innerHTML = "";

        updateCounter(tasks);

        if (tasks.length === 0) {
            todoList.innerHTML = "<p style='text-align:center; color:#64748b; font-size:13px; padding:10px;'>Belum ada tugas tersimpan.</p>";
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="todo-text">${task.text}</span>
                <div class="todo-actions">
                    <button class="action-btn complete-btn" data-index="${index}">
                        ${task.completed ? 'Batal' : 'Selesai'}
                    </button>
                    <button class="action-btn delete-btn" data-index="${index}">Hapus</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    // 4. Tambah tugas saat formulir dikirim
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const tasks = getTasks();

        // VALiDASI 1: Cek batasan maksimal 5 tugas
        if (tasks.length >= 5) {
            taskInput.classList.add("error");
            inputError.textContent = "Hanya maksimal 5 tugas!";
            inputError.style.display = "block";
            return;
        }

        const taskText = taskInput.value.trim();

        // VALIDASI 2: Minimal 3 karakter
        if (taskText.length < 3) {
            taskInput.classList.add("error");
            inputError.textContent = "Tugas tidak boleh kosong atau kurang dari 3 karakter!";
            inputError.style.display = "block";
            return;
        }

        // Jika validasi lolos, bersihkan pesan error
        taskInput.classList.remove("error");
        inputError.style.display = "none";

        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);

        taskInput.value = "";
        renderTasks();
    });

    // 5. Tangani klik tombol Selesai dan Hapus
    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        const tasks = getTasks();

        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains("delete-btn")) {
            const yakin = confirm("Apakah Anda yakin ingin menghapus tugas ini?");
            if (yakin) {
                tasks.splice(index, 1);
                saveTasks(tasks);
                // Hilangkan error merah jika ada tugas yang terhapus (karena kuota kembali tersedia)
                taskInput.classList.remove("error");
                inputError.style.display = "none";
                renderTasks();
            }
        }
    });

    // Menghapus semua tugas yang selesai
    clearCompletedBtn.addEventListener("click", () => {
        const tasks = getTasks();
        const activeTasks = tasks.filter(task => !task.completed);
        saveTasks(activeTasks);
        // Hilangkan error merah jika kuota tugas berkurang
        taskInput.classList.remove("error");
        inputError.style.display = "none";
        renderTasks();
    });

    // Render pertama kali saat halaman selesai dimuat
    renderTasks();
});