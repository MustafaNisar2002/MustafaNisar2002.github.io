

const projects = [
  { title: "RLC Firmware Tools (CLI + Analyzer)", date: "2025-07-15",
    desc: "C/C++ tools to automate firmware testing and perf analysis for GPU microcode workflows.",
    tags: ["C/C++", "Firmware", "Automation"], link: "https://github.com/MustafaNisar2002" },
  { title: "GPU Firmware Test Farm (100+ nodes)", date: "2024-12-01",
    desc: "Remote-managed farm for automated FW tests with monitoring and aggregation.",
    tags: ["Systems", "Infra", "Testing"], link: "https://github.com/MustafaNisar2002" },
  { title: "Spiking Neural Cache Simulator", date: "2024-04-15",
    desc: "SNN prototype for cache-like access patterns; profiled with Intel Advisor & GEN5.",
    tags: ["SNN", "C/C++", "Python"], link: "https://github.com/MustafaNisar2002" },
  { title: "ML Colab Modules for Bio Courses", date: "2024-02-01",
    desc: "Beginner-friendly Colab notebooks introducing ML concepts for genetics students.",
    tags: ["Education", "Python", "Colab"], link: "https://github.com/MustafaNisar2002" },
  { title: "Seat Belt Detection — APS360", date: "2023-09-01",
    desc: "YOLOv5 pipeline on ~3.5k images; ~97% accuracy on unseen data.",
    tags: ["PyTorch", "YOLOv5", "CV"], link: "https://github.com/MustafaNisar2002" },
  { title: "Flexible Radio Transceiver — ECE295", date: "2023-05-01",
    desc: "RX filter, limiter, quadrature mixer; PCB & RF basics with Altium + Multisim.",
    tags: ["Altium", "RF", "Hardware"], link: "https://github.com/MustafaNisar2002" },
  { title: "Enhanced HDL Processor — ECE243", date: "2023-04-15",
    desc: "16-bit Verilog CPU (8 regs, 8 instr); integrated with memory & I/O; ModelSim/Quartus.",
    tags: ["Verilog", "CPU", "Digital"], link: "https://github.com/MustafaNisar2002" }
];

// ---- Helpers ----
const listEl = document.getElementById("projects-list");
const loadMoreBtn = document.getElementById("load-more");

function fmt(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", year: "numeric" });
}
function cardHTML(p) {
  const chips = (p.tags || []).map(t => `<div class="chip" style="margin-right:6px">${t}</div>`).join("");
  const safe = (p.desc || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `
    <div class="col s12 m6">
      <article class="card hoverable">
        <div class="card-content">
          <span class="card-title">
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${p.title}</a>` : p.title}
          </span>
          <p class="grey-text" style="margin:2px 0 10px">${fmt(p.date)}</p>
          <p>${safe}</p>
          <div style="margin-top:10px; display:flex; flex-wrap:wrap;">${chips}</div>
        </div>
      </article>
    </div>`;
}

// ---- Explicit LOOP over an array (requirement #4) ----
function renderProjects(projectArray) {
  for (const project of projectArray) {
    listEl.insertAdjacentHTML("beforeend", cardHTML(project));
  }
}

// ---- Pagination logic ----
projects.sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first
const PAGE_SIZE = 2;
let shown = 0;

function renderNext(n) {
  const slice = projects.slice(shown, shown + n); // choose what to show
  renderProjects(slice);                           // <-- this loops through the array
  shown += slice.length;
  if (shown >= projects.length) {
    loadMoreBtn.style.display = "none";
    loadMoreBtn.setAttribute("aria-hidden", "true");
  }
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  renderNext(1); // step 2: only the latest project at first
  loadMoreBtn.addEventListener("click", () => renderNext(PAGE_SIZE)); // step 5: load more on click
});
