
const phrases = [
    "Holiiii 👋 Soy JuanFe",
    "Frontend con Bootstrap 💚",
    "JavaScript + DOM + UI 🔥",
    "Portafolios con flow 😤"
];

let pIndex = 0, cIndex = 0, deleting = false;
const typeTarget = document.getElementById("typeTarget");

function typeLoop() {
    const current = phrases[pIndex];

    if (!deleting) {
        cIndex++;
        typeTarget.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 900);
            return;
        }
    } else {
        cIndex--;
        typeTarget.textContent = current.slice(0, cIndex);
        if (cIndex === 0) {
            deleting = false;
            pIndex = (pIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeLoop, deleting ? 40 : 55);
}
typeLoop();


const projects = [
    {
        id: 1,
        title: "Hoja de vida",
        category: "personal",
        desc: "Mi CV web (diseño + estructura).",
        tags: ["HTML", "CSS"],
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=60",
        live: "https://juanfelipe0215.github.io/Hoja_de_vida/",
        repo: "https://juanfelipe0215.github.io/Hoja_de_vida/"
    },
    {
        id: 2,
        title: "M1 Python Actividad 2",
        category: "riwi-platform",
        desc: "Actividad de Python (repositorio).",
        tags: ["Python", "GitHub"],
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=60",
        live: "https://github.com/JuanFelipe0215/M1_python_actividad_2",
        repo: "https://github.com/JuanFelipe0215/M1_python_actividad_2"
    },
    {
        id: 3,
        title: "Moodle - Actividad 1",
        category: "riwi-platform",
        desc: "Proyecto de plataforma (semana 1).",
        tags: ["Python", "Git"],
        img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
        live: "https://github.com/JuanFelipe0215/M1_python_moodle_week_1",
        repo: "https://github.com/JuanFelipe0215/M1_python_moodle_week_1"
    },
    {
        id: 4,
        title: "Moodle - Actividad 2",
        category: "riwi-platform",
        desc: "Proyecto de plataforma (semana 2).",
        tags: ["Python", "Git"],
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=60",
        live: "https://github.com/JuanFelipe0215/M1_python_moodle_week_2",
        repo: "https://github.com/JuanFelipe0215/M1_python_moodle_week_2"
    },
    {
        id: 5,
        title: "Moodle - Mascotas",
        category: "riwi-platform",
        desc: "Proyecto de plataforma HTML y CSS",
        tags: ["Python", "Git"],
        img: "https://cdn.pixabay.com/photo/2017/06/23/10/48/code-2434271_1280.jpg",
        live: "https://juanfelipe0215.github.io/Mascotas_moodle_html_css/",
        repo: "https://github.com/JuanFelipe0215/Mascotas_moodle_html_css"
    }
];

const grid = document.getElementById("projectsGrid");
const filters = document.getElementById("projectFilters");

function renderProjects(list) {
    grid.innerHTML = list.map(p => `
    <div class="col-md-6 col-lg-4">
      <button class="project-card w-100 text-start p-0" data-id="${p.id}" type="button">
        <img class="project-thumb" src="${p.img}" alt="${p.title}">
        <div class="p-3">
          <h5 class="fw-bold mb-1">${p.title}</h5>
          <p class="text-secondary mb-2">${p.desc}</p>
          <div class="d-flex flex-wrap gap-2">
            ${p.tags.map(t => `<span class="badge badge-neon rounded-pill">${t}</span>`).join("")}
          </div>
        </div>
      </button>
    </div>
  `).join("");
}
renderProjects(projects);

filters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("chip")) return;

    document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    const f = e.target.dataset.filter;
    const filtered = (f === "all") ? projects : projects.filter(p => p.category === f);
    renderProjects(filtered);
});

const modal = new bootstrap.Modal(document.getElementById("projectModal"));

grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-card");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const p = projects.find(x => x.id === id);
    if (!p) return;

    document.getElementById("pmTitle").textContent = p.title;
    document.getElementById("pmImg").src = p.img;
    document.getElementById("pmImg").alt = p.title;
    document.getElementById("pmDesc").textContent = p.desc;

    document.getElementById("pmTags").innerHTML =
        p.tags.map(t => `<span class="badge badge-neon rounded-pill">${t}</span>`).join("");

    document.getElementById("pmLive").href = p.live;
    document.getElementById("pmRepo").href = p.repo;

    modal.show();
});


const momentModal = new bootstrap.Modal(document.getElementById("momentModal"));
document.getElementById("momentsGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".moment-card");
    if (!card) return;
    document.getElementById("mmImg").src = card.dataset.img;
    momentModal.show();
});


const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add("show");
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));


const sections = ["inicio", "proyectos", "habilidades", "educacion", "momentos", "contacto"]
    .map(id => document.getElementById(id));

const navLinks = [...document.querySelectorAll(".navbar .nav-link")];

window.addEventListener("scroll", () => {
    let current = "inicio";
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos) current = sec.id;
    });

    navLinks.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contactAlert").classList.remove("d-none");
    setTimeout(() => document.getElementById("contactAlert").classList.add("d-none"), 2500);
    e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
