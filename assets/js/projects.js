/* Activity 5 — Dynamic Projects List (loop-based)*/

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
      link: "#", 
      image: "/assets/img/proj-radio.jpg"
    },
    {
      title: "Enhanced HDL Processor (Verilog)",
      date: "2023-04-20",
      desc: "16‑bit processor with 8 registers, memory and I/O; validated in ModelSim & Intel Quartus.",
      link: "#",
      image: "/assets/img/proj-processor.jpg"
    }
  ];

  // Sort newest → oldest by date
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  const listEl = document.getElementById("projects-list");
  const loadMoreBtn = document.getElementById("load-more");

  const PAGE_SIZE = 1; // requirement: initially display ONLY the latest project
  let shown = 0;

  function projectCardHTML(p) {
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

  // LOOP through the array to render N additional projects each call
  function renderProjects(limit) {
    for (let i = 0; i < limit && shown < projects.length; i++) {
      const p = projects[shown];
      const wrapper = document.createElement("div");
      wrapper.innerHTML = projectCardHTML(p);
      listEl.appendChild(wrapper.firstElementChild);
      shown++;
    }
    if (shown >= projects.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Initial render (ONE project only)
  renderProjects(PAGE_SIZE);

  // Load More → render one more each click
  loadMoreBtn.addEventListener("click", function () {
    renderProjects(PAGE_SIZE);
  });
})();
