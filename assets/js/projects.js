/* assets/js/projects.js
 * Activity 5 — Dynamic "Recent Projects"
 * - Newest project appears first on page load
 * - "Load More" reveals older projects
 * - Uses Materialize "card" + "chip" styles
 */

// ---- Source data (from resume + a few plausible additions) ----
const projects = [
  // Recent/present (derived from AMD experience)
  {
    title: "RLC Firmware Tools (CLI + Analyzer)",
    date: "2025-07-15",
    desc:
      "A suite of C/C++ command-line tools and scripts that automate firmware testing and perf analysis for GPU microcode workflows.",
    tags: ["C/C++", "Firmware", "Automation"],
    link: "https://github.com/MustafaNisar2002"
  },
  {
    title: "GPU Firmware Test Farm (100+ nodes)",
    date: "2024-12-01",
    desc:
      "Designed and maintained a remote-managed system farm to run automated FW tests at scale with monitoring and result aggregation.",
    tags: ["Systems", "Infra", "Testing"],
    link: "https://github.com/MustafaNisar2002"
  },

  // From neuromorphic & teaching work
  {
    title: "Spiking Neural Cache Simulator",
    date: "2024-04-15",
    desc:
      "Prototype SNN for cache-like access patterns, built without preexisting SNN libs; profiled with Intel Advisor and GEN5.",
    tags: ["SNN", "C/C++", "Python"],
    link: "https://github.com/MustafaNisar2002"
  },
  {
    title: "ML Colab Modules for Bio Courses",
    date: "2024-02-01",
    desc:
      "Authored beginner-friendly Google Colab notebooks introducing ML concepts for genetics students over an 8-week module.",
    tags: ["Education", "Python", "Colab"],
    link: "https://github.com/MustafaNisar2002"
  },

  // From resume "Projects"
  {
    title: "Seat Belt Detection — APS360",
    date: "2023-09-01",
    desc:
      "Dataset of ~3.5k images with augmentation; YOLOv5 pipeline achieving ~97% accuracy on unseen data.",
    tags: ["PyTorch", "YOLOv5", "CV"],
    link: "https://github.com/MustafaNisar2002"
  },
  {
    title: "Flexible Radio Transceiver — ECE295",
    date: "2023-05-01",
    desc:
      "Designed RX filter, limiter, and quadrature mixer; practiced PCB and RF basics with Altium + NI Multisim.",
    tags: ["Altium", "RF", "Hardware"],
    link: "https://github.com/MustafaNisar2002"
  },
  {
    title: "Enhanced HDL Processor — ECE243",
    date: "2023-04-15",
    desc:
      "16-bit, 8-register Verilog CPU, 8 instructions; integrated with memory and IO; tested in ModelSim/Quartus.",
    tags: ["Verilog", "CPU", "Digital"],
    link: "https://github.com/MustafaNisar2002"
  }
];

// ---- Utility helpers ----
function fmtDateISOToMonthYear(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function projectCardHTML(p) {
  const chips = (p.tags || [])
    .map(t => `<div class="chip" style="margin-right:6px">${t}</div>`)
    .join("");
  const dateStr = fmtDateISOToMonthYear(p.date);
  const safeDesc = (p.desc || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `
    <div class="col s12 m6">
      <article class="card hoverable" aria-label="${p.title}">
        <div class="card-content">
          <span class="card-title">
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${p.title}</a>` : p.title}
          </span>
          <p class="grey-text" style="margin:2px 0 10px">${dateStr}</p>
          <p>${safeDesc}</p>
          <div style="margin-top:10px; display:flex; flex-wrap:wrap;">${chips}</div>
        </div>
      </article>
    </div>
  `;
}

// ---- Render / pagination ----
(function initProjects() {
  const list = document.getElementById("projects-list");
  const loadMoreBtn = document.getElementById("load-more");
  if (!list || !loadMoreBtn) return; // graceful no-op if HTML changes

  // newest first
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  const PAGE_SIZE = 2;      // number revealed per click
  let shown = 0;

  function renderNext(n) {
    const slice = projects.slice(shown, shown + n);
    slice.forEach(p => {
      list.insertAdjacentHTML("beforeend", projectCardHTML(p));
    });
    shown += slice.length;

    if (shown >= projects.length) {
      loadMoreBtn.style.display = "none";
      loadMoreBtn.setAttribute("aria-hidden", "true");
    }
  }

  // Show only the latest on load
  document.addEventListener("DOMContentLoaded", () => {
    renderNext(1);
    loadMoreBtn.addEventListener("click", () => renderNext(PAGE_SIZE));
  });
})();
