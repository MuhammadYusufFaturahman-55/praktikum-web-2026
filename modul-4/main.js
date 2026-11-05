let projects = [
  {
    id: 1,
    title: "Sistem Inventaris Keuangan",
    category: "Web App",
    budget: 2500000,
    completed: true
  },
  {
    id: 2,
    title: "Sistem Kasir Digital POS",
    category: "Desktop App",
    budget: 5000000,
    completed: true
  },
  {
    id: 3,
    title: "Landing Page Profil Perusahaan",
    category: "Web App",
    budget: 1500000,
    completed: false
  },
  {
    id: 4,
    title: "Aplikasi Presensi GPS Mobile",
    category: "Mobile App",
    budget: 4500000,
    completed: false
  }
];

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(angka);
};

const updateStats = () => {
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
  const completedCount = projects.filter(item => item.completed).length;

  document.getElementById("stat-total-projects").textContent = totalProjects;
  document.getElementById("stat-total-budget").textContent = formatRupiah(totalBudget);
  document.getElementById("stat-completed-projects").textContent = completedCount;
};

const renderProjects = () => {
  const container = document.getElementById("project-list");
  if (!container) return;

  const activeCategory = document.querySelector(".btn-filter.active")?.getAttribute("data-category") || "Semua";
  const searchKeyword = document.getElementById("search-input")?.value.toLowerCase().trim() || "";

  const filteredList = projects.filter(proj => {
    const matchCategory = activeCategory === "Semua" || proj.category === activeCategory;
    const matchSearch = proj.title.toLowerCase().includes(searchKeyword);
    return matchCategory && matchSearch;
  });

  if (filteredList.length === 0) {
    container.innerHTML = "<p style='text-align: center; color: #64748b; padding: 20px;'>Data proyek tidak ditemukan.</p>";
    return;
  }

  const htmlString = filteredList.map(proj => {
    const badgeClass = proj.completed ? "badge-success" : "badge-pending";
    const statusText = proj.completed ? "Selesai" : "Dalam Pengerjaan";

    return `
      <div class="project-card">
        <div class="project-info">
          <span class="project-category">${proj.category}</span>
          <h4>${proj.title}</h4>
          <p class="project-budget">${formatRupiah(proj.budget)}</p>
        </div>
        <div class="project-actions">
          <span class="badge ${badgeClass}">${statusText}</span>
          <button class="btn-action btn-toggle" onclick="toggleStatus(${proj.id})">Ubah Status</button>
          <button class="btn-action btn-delete" onclick="deleteProject(${proj.id})">Hapus</button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = htmlString;
};

window.toggleStatus = (id) => {
  projects = projects.map(proj => {
    if (proj.id === id) {
      return { ...proj, completed: !proj.completed };
    }
    return proj;
  });
  renderProjects();
  updateStats();
};

window.deleteProject = (id) => {
  projects = projects.filter(proj => proj.id !== id);
  renderProjects();
  updateStats();
};

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  updateStats();

  const projectForm = document.getElementById("project-form");
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("project-title").value.trim();
    const categoryInput = document.getElementById("project-category").value;
    const budgetInput = parseFloat(document.getElementById("project-budget").value);
    const statusInput = document.getElementById("project-status").checked;

    if (!titleInput || isNaN(budgetInput) || budgetInput <= 0) {
      alert("Mohon isi judul proyek dan anggaran yang valid (> 0)!");
      return;
    }

    const newProject = {
      id: Date.now(),
      title: titleInput,
      category: categoryInput,
      budget: budgetInput,
      completed: statusInput
    };

    projects.push(newProject);

    projectForm.reset();

    renderProjects();
    updateStats();
  });

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => {
    renderProjects();
  });


  const filterButtons = document.querySelectorAll(".btn-filter");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderProjects();
    });
  });
});