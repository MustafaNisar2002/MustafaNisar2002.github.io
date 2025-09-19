/* Activity 5 — Dynamic Projects List
 * ----------------------------------
 * Edit the `projects` array below with YOUR projects. Each item supports:
 * - title (string)
 * - date (YYYY-MM-DD) — used for sorting newest→oldest
 * - desc (short description)
 * - link (optional URL)
 * - image (optional path to an image in your repo, e.g., /assets/img/proj-*.jpg)
 */

(function () {
  const projects = [
    {
      title: "Seat Belt Detection (YOLOv5)",
      date: "2024-12-15",
      desc: "Built a custom 3.5k‑image dataset and trained a YOLOv5 model; achieved ~97% accuracy on unseen data.",
      link: "https://github.com/MustafaNisar2002", 
      image: "/assets/img/proj-seatbelt.jpg" 
    },
    {
      title: "Flexible Radio Transceiver",
      date: "2023-10-01",
      desc: "Designed RX filter, limiter, and quadrature mixer; used Altium, NI Multisim, and PyVISA for validation.",
      image: "/assets/img/proj-radio.jpg"
    },
    {
      title: "Enhanced HDL Processor (Verilog)",
      date: "2023-04-20",
      desc: "16‑bit processor with 8 registers, memory and I/O; validated in ModelSim & Intel Quartus.",

      image: "/assets/img/proj-processor.jpg"
    }
  ];

  // sort newest → oldest by date
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  const listEl = document.getElementById("projects-list");
  const loadMoreBtn = document.getElementById("load-more");

  // show only 1 project initially (as required by the assignment)
  const PAGE_SIZE = 1;
  let shown = 0;

  function projectCard(p) {
    const dateStr = new Date(p.date).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "2-digit"
    });

    const imgBlock = p.image
      ? `<div class="card-image waves-effect waves-block waves-light">
           <img class="activator" src="${p.image}" alt="${p.title}">
         </div>`
      : "";

    const linkBlock = p.link
      ? `<p style="margin-top:.5rem;"><a href="${p.link}" target="_blank" rel="noopener">View project →</a></p>`
      : "";

    return `
      <div class="col s12 m6 l4">
        <div class="card medium">
          ${imgBlock}
          <div class="card-content">
            <span class="card-title activator teal-text hoverline">${p.title}<i class="mdi-navigation-more-vert right"></i></span>
            <p class="grey-text text-darken-1" style="margin:0 0 .5rem 0;"><small>${dateStr}</small></p>
            <p>${p.desc}</p>
            ${linkBlock}
          </div>
        </div>
      </div>`;
  }

  function renderMore() {
    const slice = projects.slice(shown, shown + PAGE_SIZE);
    slice.forEach((p) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = projectCard(p);
      // append the first (outer) child from the template wrapper
      listEl.appendChild(wrapper.firstElementChild);
    });
    shown += slice.length;
    if (shown >= projects.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  loadMoreBtn.addEventListener("click", renderMore);
  // initial render shows only the latest project
  renderMore();
})();
