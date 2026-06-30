// ── TOUCH DETECTION ──────────────────────────────────────────
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const isTouchDevice =
  !hasFinePointer && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
if (isTouchDevice) document.body.classList.add("touch");
let mouse = { x: -9999, y: -9999 };

// Theme toggle
(function setupTheme() {
  const storageKey = "portfolio-theme";
  const getSavedTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (_) {
      return null;
    }
  };
  const saveTheme = (theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_) {}
  };
  const savedTheme = getSavedTheme();
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("theme-light", isLight);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme",
      );
    }
  }

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("theme-light")
        ? "dark"
        : "light";
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }
})();

const portfolioStorageKey = "portfolio-data";
const adminCredentials = { username: "niel", password: "niel" };
let portfolioData = loadPortfolioData();
let isAdminLoggedIn = false;

function getDefaultPortfolioData() {
  return {
    hero: {
      nameLine1: "Daniel L.",
      nameLine2: "Tobing",
      subtitle: "Building scalable web & mobile solutions",
    },
    stats: [
      { value: 2, label: "Years Dev" },
      { value: 8, label: "Projects" },
      { value: 10, label: "Certifications" },
      { value: 3, label: "Internships" },
    ],
    about: {
      paras: [
        "I'm an Informatics student at Del Institute of Technology with hands-on internship experience in full-stack web development, backend engineering, and mobile application development.",
        "Skilled in React.js, Node.js, Laravel, Golang, Kotlin, PostgreSQL, MySQL, and RESTful API development — I bring strong problem-solving and collaboration skills to every project.",
        "Currently seeking roles as a Full Stack Developer, Backend Developer, or Frontend Developer to build scalable and impactful software solutions.",
      ],
      badges: [
        "React.js",
        "Node.js",
        "Laravel",
        "Golang",
        "Kotlin",
        "PostgreSQL",
        "MySQL",
        "RESTful API",
      ],
      card: {
        gpa: "3.40",
        label: "GPA / 4.00 · Del Institute of Technology",
        details: [
          { key: "Degree", value: "Bachelor of Informatics" },
          { key: "Started", value: "August 2023" },
          { key: "Location", value: "Jakarta Selatan, Indonesia" },
          { key: "Phone", value: "(+62) 851-2485-6155" },
          { key: "GitHub", value: "github.com/17-Niel" },
          { key: "Status", value: "● Available for Work" },
        ],
      },
    },
    experience: [
      {
        dateStart: "2026-06-01",
        dateEnd: "2026-08-31",
        present: false,
        role: "Fullstack Developer",
        company: "PT Pratesis · Jakarta, Indonesia",
        bullets: [
          "Support development and enhancement of the Pronto Xi ERP system to align with client business processes.",
          "Investigate and resolve client-reported issues by analyzing support tickets and troubleshooting application errors.",
          "Develop advanced filtering functionalities and contribute to application stability through performance optimization.",
        ],
      },
      {
        dateStart: "2026-04-01",
        dateEnd: "2026-05-31",
        present: false,
        role: "Web Developer",
        company: "Codveda Technologies · Remote",
        bullets: [
          "Developed and maintained web application features based on project specifications and business requirements.",
          "Implemented frontend and backend functionalities ensuring code quality, system reliability, and best practices.",
          "Delivered assigned tasks within project deadlines contributing to successful project completion.",
        ],
      },
      {
        dateStart: "2026-01-01",
        dateEnd: "",
        present: true,
        role: "Head of Department – Science & Technology",
        company: "Del Institute of Technology · Student Organization",
        bullets: [
          "Lead planning and execution of science and technology initiatives supporting organizational development.",
          "Coordinate multidisciplinary teams and develop strategic plans for effective departmental activities.",
          "Drive organizational growth by introducing data-driven initiatives and fostering a culture of innovation.",
        ],
      },
      {
        dateStart: "2025-01-01",
        dateEnd: "",
        present: true,
        role: "Chairman of Gemastik",
        company: "Department of Science and Technology · Del IT",
        bullets: [
          "Lead cross-functional team in preparing proposals and technical documentation for GEMASTIK national competition.",
          "Oversee project planning, task delegation, and team coordination to ensure high-quality submissions.",
        ],
      },
    ],
    projects: [
      {
        number: "01",
        type: "Android · Full Stack",
        name: "Technician Management App",
        desc: "Android app featuring technician registration, authentication, service monitoring, and profile management with secure data communication via RESTful APIs.",
        stack: ["Kotlin", "Jetpack Compose", "MVVM", "Retrofit", "DataStore"],
        link: "https://github.com/17-Niel/pam-2026-ifs23025-proyek1-fe.git",
      },
      {
        number: "02",
        type: "Web · Full Stack",
        name: "GPdI Church Web Client",
        desc: "Web-based church management platform supporting congregation administration, service scheduling, digital requests, and content management with role-based access control.",
        stack: ["React.js", "Vite", "Tailwind CSS", "Axios", "RBAC"],
        link: "https://github.com/Joeyy-05/gpdi-web-client.git",
      },
      {
        number: "03",
        type: "Web + Mobile · Full Stack",
        name: "PPKHA IT Del Platform",
        desc: "Web and mobile platform supporting alumni engagement and job opportunity management for the Del Institute of Technology community with microservices architecture.",
        stack: ["Laravel", "React.js", "Kotlin", "MySQL", "Microservices"],
        link: "https://github.com/17-Niel/itdel-ppkha-app-main.git",
      },
      {
        number: "04",
        type: "iOS · Mobile",
        name: "Grade Calculator — GATORKU",
        desc: "iOS application enabling students to calculate, manage, and predict academic performance across different study programs with an intuitive and user-friendly interface.",
        stack: ["Swift", "SwiftUI", "iOS Frameworks"],
        link: "https://github.com/17-Niel/Grade-Calculator-GATORKU.git",
      },
      {
        number: "05",
        type: "Desktop · Java GUI",
        name: "QUICLIB Library System",
        desc: "Desktop-based library management application for organizing, tracking, and managing personal book collections with full database integration and OOP principles.",
        stack: ["Java", "NetBeans", "MySQL", "OOP"],
        link: "https://github.com/17-Niel/Rental-Mobil-Beta.git",
      },
    ],
    certifications: [
      {
        badge: "☁️",
        issuer: "Dicoding · AWS",
        name: "Cloud Computing & Generative AI on AWS",
        date: "09 January 2026 · Valid until 09 Jan 2029",
        id: "ID: ERZR2OYG2PYV",
      },
      {
        badge: "🌐",
        issuer: "Dicoding",
        name: "JavaScript Programming Fundamentals",
        date: "14 January 2026 · Valid until 14 Jan 2029",
        id: "ID: 1OP8JKYKVPQK",
      },
      {
        badge: "📊",
        issuer: "Dicoding · Microsoft",
        name: "Data Science with Microsoft Fabric",
        date: "28 March 2026 · Valid until 28 Mar 2029",
        id: "ID: 1RXYW0VNQZVM",
      },
      {
        badge: "🧠",
        issuer: "Huawei ICT Academy",
        name: "Artificial Intelligence Fundamentals — HCIA-AI V4.0",
        date: "22 November 2025",
        id: "Code: ICT20251122005470",
      },
      {
        badge: "💡",
        issuer: "IBM SkillsBuild · Hacktiv8",
        name: "Data Classification and Summarization",
        date: "November 2025 · Student Developer Initiative",
        id: "Period: 7 & 9 October 2025",
      },
      {
        badge: "🍏",
        issuer: "Apple Developer Academy",
        name: "Apple Foundation Program @ Infinite Learning",
        date: "10 June – 11 July 2025",
        id: "Signed by Zinnia Nizar & Nara Dewa",
      },
      {
        badge: "📱",
        issuer: "Samsung · Hacktiv8",
        name: "AI in Everyday Life — Samsung Innovation Campus",
        date: "January 2025 · Batch 6 – 2024/2025",
        id: "Stage 1 · Hosted by Hacktiv8 Indonesia",
      },
      {
        badge: "💼",
        issuer: "Codveda Technologies",
        name: "Web Development Internship",
        date: "17 March 2026",
        id: "ID: CV/A1/64977 · ISO 9001:2015 Certified",
      },
    ],
    contact: {
      email: "danieltbg145@gmail.com",
      phone: "+62 851-2485-6155",
      location: "Jakarta Selatan, Indonesia",
      linkedIn: "https://linkedin.com/in/daniel-l-tobing-2150732ab",
      github: "https://github.com/17-Niel",
    },
  };
}

function mergePortfolioData(base, saved) {
  if (saved === null || saved === undefined) return base;
  if (Array.isArray(base)) return Array.isArray(saved) ? saved : base;
  if (typeof base !== "object" || typeof saved !== "object") {
    return saved === undefined ? base : saved;
  }
  return Object.keys(base).reduce((acc, key) => {
    acc[key] =
      key in saved ? mergePortfolioData(base[key], saved[key]) : base[key];
    return acc;
  }, {});
}

function normalizeExperienceItem(item) {
  const normalized = { ...item };
  if (!("dateStart" in normalized) || !("present" in normalized)) {
    if (typeof normalized.date === "string") {
      const [start, endRaw] = normalized.date.split("–").map((v) => v.trim());
      normalized.dateStart = start || "";
      normalized.present = /present/i.test(endRaw || "");
      normalized.dateEnd = normalized.present ? "" : endRaw || "";
    }
  }
  if (!("dateStart" in normalized)) normalized.dateStart = "";
  if (!("dateEnd" in normalized)) normalized.dateEnd = "";
  if (!("present" in normalized)) normalized.present = false;
  return normalized;
}

function normalizePortfolioData(data) {
  return {
    ...data,
    experience: Array.isArray(data.experience)
      ? data.experience.map(normalizeExperienceItem)
      : [],
  };
}

function sortExperienceItems(items) {
  return [...items].sort((a, b) => {
    if (a.present !== b.present) return a.present ? -1 : 1;

    const parseDate = (value) => {
      if (!value) return null;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    };

    const aEnd = a.present ? new Date() : parseDate(a.dateEnd || a.dateStart);
    const bEnd = b.present ? new Date() : parseDate(b.dateEnd || b.dateStart);
    if (aEnd && bEnd && aEnd.getTime() !== bEnd.getTime()) {
      return bEnd.getTime() - aEnd.getTime();
    }

    const aStart = parseDate(a.dateStart);
    const bStart = parseDate(b.dateStart);
    if (aStart && bStart) {
      return bStart.getTime() - aStart.getTime();
    }

    return 0;
  });
}

function loadPortfolioData() {
  try {
    const saved = localStorage.getItem(portfolioStorageKey);
    if (!saved) return normalizePortfolioData(getDefaultPortfolioData());
    const loaded = mergePortfolioData(
      getDefaultPortfolioData(),
      JSON.parse(saved),
    );
    return normalizePortfolioData(loaded);
  } catch (_) {
    return normalizePortfolioData(getDefaultPortfolioData());
  }
}

function savePortfolioData(data) {
  try {
    localStorage.setItem(portfolioStorageKey, JSON.stringify(data));
  } catch (_error) {}
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPortfolio(data) {
  const line1 = document.querySelector(".hero-name .line1");
  const line2 = document.querySelector(".hero-name .line2");
  const subtitle = document.getElementById("heroSubtitle");
  if (line1) line1.textContent = data.hero.nameLine1;
  if (line2) line2.textContent = data.hero.nameLine2;
  if (subtitle) subtitle.textContent = data.hero.subtitle;

  const statCards = document.querySelectorAll(".hero-stats .stat");
  statCards.forEach((card, index) => {
    const stat = data.stats[index];
    if (!stat) return;
    const num = card.querySelector(".stat-num");
    const label = card.querySelector(".stat-label");
    if (num) num.textContent = stat.value + "+";
    if (label) label.textContent = stat.label;
  });

  const aboutParas = document.querySelectorAll("#about .about-text p");
  aboutParas.forEach((p, index) => {
    if (data.about.paras[index]) p.textContent = data.about.paras[index];
  });

  const badges = document.querySelector(".about-badges");
  if (badges) {
    badges.innerHTML = data.about.badges
      .map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`)
      .join("");
  }

  const aboutCard = document.querySelector(".about-card");
  if (aboutCard) {
    const gpaDisplay = aboutCard.querySelector(".gpa-display");
    const gpaLabel = aboutCard.querySelector(".gpa-label");
    if (gpaDisplay) gpaDisplay.textContent = data.about.card.gpa;
    if (gpaLabel) gpaLabel.textContent = data.about.card.label;
    const rows = aboutCard.querySelectorAll(".info-row");
    rows.forEach((row, idx) => {
      const detail = data.about.card.details[idx];
      if (!detail) return;
      const val = row.querySelector(".info-val");
      if (val) val.textContent = detail.value;
    });
  }

  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const sortedItems = sortExperienceItems(data.experience);
    timeline.innerHTML = sortedItems
      .map((item) => {
        const dateText = item.dateStart
          ? `${escapeHtml(item.dateStart)} – ${item.present ? "Present" : escapeHtml(item.dateEnd)}`
          : escapeHtml(item.date || "");
        return `<div class="timeline-item fade-in">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${dateText}</div>
          <div class="timeline-role">${escapeHtml(item.role)}</div>
          <div class="timeline-company">${escapeHtml(item.company)}</div>
          <ul class="timeline-bullets">
            ${item.bullets
              .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
              .join("")}
          </ul>
        </div>`;
      })
      .join("");
  }

  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = data.projects
      .map(
        (project) => `<div class="project-card fade-in tilt-card">
          <div class="project-num">${escapeHtml(project.number)}</div>
          <div class="project-type">${escapeHtml(project.type)}</div>
          <div class="project-name">${escapeHtml(project.name)}</div>
          <div class="project-desc">${escapeHtml(project.desc)}</div>
          <div class="project-stack">
            ${project.stack
              .map((tag) => `<span class="stack-tag">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
          <a href="${escapeHtml(project.link)}" target="_blank" class="project-link">View on GitHub &rarr;</a>
        </div>`,
      )
      .join("");
  }

  const certGrid = document.querySelector(".certs-grid");
  if (certGrid) {
    certGrid.innerHTML = data.certifications
      .map(
        (cert) => `<div class="cert-card fade-in tilt-card">
          ${cert.image ? `<img class="cert-image" src="${escapeHtml(cert.image)}" alt="Certificate image for ${escapeHtml(cert.name)}" />` : ""}
          <div class="cert-badge">${escapeHtml(cert.badge)}</div>
          <div class="cert-issuer">${escapeHtml(cert.issuer)}</div>
          <div class="cert-name">${escapeHtml(cert.name)}</div>
          <div class="cert-date">${escapeHtml(cert.date)}</div>
          <div class="cert-id">${escapeHtml(cert.id)}</div>
        </div>`,
      )
      .join("");
  }

  const emailLink = document.querySelector(
    ".contact-details a[href^='mailto']",
  );
  const phoneLink = document.querySelector(".contact-details a[href^='tel']");
  const locationSpan = document.querySelector(".contact-details span");
  if (emailLink) {
    emailLink.href = `mailto:${data.contact.email}`;
    emailLink.textContent = data.contact.email;
  }
  if (phoneLink) {
    phoneLink.href = `tel:${data.contact.phone.replace(/\s+/g, "")}`;
    phoneLink.textContent = data.contact.phone;
  }
  if (locationSpan) {
    locationSpan.textContent = data.contact.location;
  }

  const linkedInLink = document.querySelector(
    ".contact-links a[aria-label='LinkedIn']",
  );
  const githubLink = document.querySelector(
    ".contact-links a[aria-label='GitHub']",
  );
  if (linkedInLink) {
    linkedInLink.href = data.contact.linkedIn;
  }
  if (githubLink) {
    githubLink.href = data.contact.github;
  }
}

function populateAdminForm(data) {
  const heroLine1 = document.querySelector("input[name='heroLine1']");
  const heroLine2 = document.querySelector("input[name='heroLine2']");
  const heroSubtitle = document.querySelector("textarea[name='heroSubtitle']");
  if (heroLine1) heroLine1.value = data.hero.nameLine1;
  if (heroLine2) heroLine2.value = data.hero.nameLine2;
  if (heroSubtitle) heroSubtitle.value = data.hero.subtitle;

  document.querySelectorAll("input[name='statValue']").forEach((input) => {
    const index = Number(input.dataset.index);
    if (data.stats[index]) input.value = data.stats[index].value;
  });
  document.querySelectorAll("input[name='statLabel']").forEach((input) => {
    const index = Number(input.dataset.index);
    if (data.stats[index]) input.value = data.stats[index].label;
  });

  document.querySelectorAll("textarea[name='aboutPara']").forEach((input) => {
    const index = Number(input.dataset.index);
    if (data.about.paras[index]) input.value = data.about.paras[index];
  });
  const badgesInput = document.querySelector("input[name='aboutBadges']");
  if (badgesInput) badgesInput.value = data.about.badges.join(", ");

  const contactMap = {
    contactEmail: data.contact.email,
    contactPhone: data.contact.phone,
    contactLocation: data.contact.location,
    contactLinkedIn: data.contact.linkedIn,
    contactGithub: data.contact.github,
  };
  Object.entries(contactMap).forEach(([name, value]) => {
    const field = document.querySelector(`input[name='${name}']`);
    if (field) field.value = value;
  });

  renderExperienceEditor();
  renderProjectEditor();
  renderCertEditor();
}

function buildEditorItem(type, item, index) {
  if (type === "experience") {
    const presentChecked = item.present ? "checked" : "";
    const endDisabled = item.present ? "disabled" : "";
    return `<div class="editor-item" data-index="${index}">
      <div class="item-heading">
        <strong>Experience ${index + 1}</strong>
        <button type="button" class="btn-outline remove-editor-item">Remove</button>
      </div>
      <label>Start Date<input type="date" name="expStartDate" value="${escapeHtml(item.dateStart || "")}" /></label>
      <label>End Date<input type="date" name="expEndDate" value="${escapeHtml(item.dateEnd || "")}" ${endDisabled} /></label>
      <label class="checkbox-label">Ongoing<input type="checkbox" name="expPresent" ${presentChecked} /></label>
      <label>Role<input type="text" name="expRole" value="${escapeHtml(item.role)}" /></label>
      <label>Company<input type="text" name="expCompany" value="${escapeHtml(item.company)}" /></label>
      <label>Bullets<textarea name="expBullets" rows="3">${escapeHtml(item.bullets.join("\n"))}</textarea></label>
    </div>`;
  }
  if (type === "project") {
    return `<div class="editor-item" data-index="${index}">
      <div class="item-heading">
        <strong>Project ${index + 1}</strong>
        <button type="button" class="btn-outline remove-editor-item">Remove</button>
      </div>
      <label>Number<input type="text" name="projNumber" value="${escapeHtml(item.number)}" /></label>
      <label>Type<input type="text" name="projType" value="${escapeHtml(item.type)}" /></label>
      <label>Name<input type="text" name="projName" value="${escapeHtml(item.name)}" /></label>
      <label>Description<textarea name="projDesc" rows="3">${escapeHtml(item.desc)}</textarea></label>
      <label>Stack (comma separated)<input type="text" name="projStack" value="${escapeHtml(item.stack.join(", "))}" /></label>
      <label>Link<input type="url" name="projLink" value="${escapeHtml(item.link)}" /></label>
    </div>`;
  }
  if (type === "cert") {
    return `<div class="editor-item" data-index="${index}">
      <div class="item-heading">
        <strong>Certification ${index + 1}</strong>
        <button type="button" class="btn-outline remove-editor-item">Remove</button>
      </div>
      <label>Badge<input type="text" name="certBadge" value="${escapeHtml(item.badge)}" /></label>
      <label>Issuer<input type="text" name="certIssuer" value="${escapeHtml(item.issuer)}" /></label>
      <label>Name<input type="text" name="certName" value="${escapeHtml(item.name)}" /></label>
      <label>Date<input type="text" name="certDate" value="${escapeHtml(item.date)}" /></label>
      <label>ID / Code<input type="text" name="certId" value="${escapeHtml(item.id)}" /></label>
      <label>Image URL<input type="url" name="certImage" value="${escapeHtml(item.image || "")}" placeholder="https://example.com/certificate.png" /></label>
    </div>`;
  }
  return "";
}

function renderExperienceEditor() {
  const container = document.getElementById("experienceEditor");
  if (!container) return;
  container.innerHTML = portfolioData.experience
    .map((item, idx) => buildEditorItem("experience", item, idx))
    .join("");
}

function renderProjectEditor() {
  const container = document.getElementById("projectsEditor");
  if (!container) return;
  container.innerHTML = portfolioData.projects
    .map((item, idx) => buildEditorItem("project", item, idx))
    .join("");
}

function renderCertEditor() {
  const container = document.getElementById("certsEditor");
  if (!container) return;
  container.innerHTML = portfolioData.certifications
    .map((item, idx) => buildEditorItem("cert", item, idx))
    .join("");
}

function collectEditorItems(container, type) {
  return Array.from(container.querySelectorAll(".editor-item")).map((node) => {
    if (type === "experience") {
      return {
        dateStart:
          node.querySelector("input[name='expStartDate']")?.value || "",
        dateEnd: node.querySelector("input[name='expEndDate']")?.value || "",
        present:
          node.querySelector("input[name='expPresent']")?.checked || false,
        role: node.querySelector("input[name='expRole']")?.value || "",
        company: node.querySelector("input[name='expCompany']")?.value || "",
        bullets: (
          node.querySelector("textarea[name='expBullets']")?.value || ""
        )
          .split(/\r?\n/)
          .filter(Boolean),
      };
    }
    if (type === "project") {
      return {
        number: node.querySelector("input[name='projNumber']")?.value || "",
        type: node.querySelector("input[name='projType']")?.value || "",
        name: node.querySelector("input[name='projName']")?.value || "",
        desc: node.querySelector("textarea[name='projDesc']")?.value || "",
        stack: (node.querySelector("input[name='projStack']")?.value || "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        link: node.querySelector("input[name='projLink']")?.value || "",
      };
    }
    if (type === "cert") {
      return {
        badge: node.querySelector("input[name='certBadge']")?.value || "",
        issuer: node.querySelector("input[name='certIssuer']")?.value || "",
        name: node.querySelector("input[name='certName']")?.value || "",
        date: node.querySelector("input[name='certDate']")?.value || "",
        id: node.querySelector("input[name='certId']")?.value || "",
        image: node.querySelector("input[name='certImage']")?.value || "",
      };
    }
    return {};
  });
}

function collectPortfolioData() {
  const heroLine1 = document.querySelector("input[name='heroLine1']");
  const heroLine2 = document.querySelector("input[name='heroLine2']");
  const heroSubtitle = document.querySelector("textarea[name='heroSubtitle']");
  if (heroLine1) portfolioData.hero.nameLine1 = heroLine1.value;
  if (heroLine2) portfolioData.hero.nameLine2 = heroLine2.value;
  if (heroSubtitle) portfolioData.hero.subtitle = heroSubtitle.value;

  const stats = [];
  document.querySelectorAll("input[name='statValue']").forEach((input) => {
    const index = Number(input.dataset.index);
    stats[index] = stats[index] || { value: 0, label: "" };
    stats[index].value = Number(input.value) || 0;
  });
  document.querySelectorAll("input[name='statLabel']").forEach((input) => {
    const index = Number(input.dataset.index);
    stats[index] = stats[index] || { value: 0, label: "" };
    stats[index].label = input.value;
  });
  portfolioData.stats = stats.filter(Boolean);

  const about = [];
  document.querySelectorAll("textarea[name='aboutPara']").forEach((input) => {
    about[Number(input.dataset.index)] = input.value;
  });
  portfolioData.about.paras = about.filter(Boolean);
  const badgeField = document.querySelector("input[name='aboutBadges']");
  portfolioData.about.badges = badgeField
    ? badgeField.value
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : portfolioData.about.badges;

  portfolioData.experience = collectEditorItems(
    document.getElementById("experienceEditor"),
    "experience",
  );
  portfolioData.projects = collectEditorItems(
    document.getElementById("projectsEditor"),
    "project",
  );
  portfolioData.certifications = collectEditorItems(
    document.getElementById("certsEditor"),
    "cert",
  );

  const contactFields = {
    contactEmail: "email",
    contactPhone: "phone",
    contactLocation: "location",
    contactLinkedIn: "linkedIn",
    contactGithub: "github",
  };
  Object.entries(contactFields).forEach(([name, key]) => {
    const input = document.querySelector(`input[name='${name}']`);
    if (input) portfolioData.contact[key] = input.value;
  });

  return portfolioData;
}

function setLoggedIn(isLoggedIn) {
  isAdminLoggedIn = isLoggedIn;
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.textContent = isLoggedIn ? "Editor" : "Login";
  }
}

function openOverlay(element) {
  if (!element) return;
  element.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeOverlay(element) {
  if (!element) return;
  element.classList.add("hidden");
  document.body.style.overflow = "";
}

function initAdminControls() {
  const authOverlay = document.getElementById("authOverlay");
  const adminOverlay = document.getElementById("adminOverlay");
  const loginBtn = document.getElementById("loginBtn");
  const authClose = document.getElementById("authClose");
  const adminClose = document.getElementById("adminClose");
  const loginForm = document.getElementById("loginForm");
  const saveBtn = document.getElementById("savePortfolio");
  const logoutBtn = document.getElementById("logoutBtn");
  const addExperience = document.getElementById("addExperience");
  const addProject = document.getElementById("addProject");
  const addCert = document.getElementById("addCert");
  const experienceEditor = document.getElementById("experienceEditor");
  const projectsEditor = document.getElementById("projectsEditor");
  const certsEditor = document.getElementById("certsEditor");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (isAdminLoggedIn) {
        openOverlay(adminOverlay);
        populateAdminForm(portfolioData);
      } else {
        openOverlay(authOverlay);
      }
    });
  }

  if (authClose) {
    authClose.addEventListener("click", () => closeOverlay(authOverlay));
  }
  if (adminClose) {
    adminClose.addEventListener("click", () => closeOverlay(adminOverlay));
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("loginUsername")?.value.trim();
      const password = document.getElementById("loginPassword")?.value.trim();
      if (
        username === adminCredentials.username &&
        password === adminCredentials.password
      ) {
        setLoggedIn(true);
        closeOverlay(authOverlay);
        openOverlay(adminOverlay);
        populateAdminForm(portfolioData);
      } else {
        alert("Invalid credentials. Use admin / portfolio.");
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      collectPortfolioData();
      savePortfolioData(portfolioData);
      renderPortfolio(portfolioData);
      populateAdminForm(portfolioData);
      const original = saveBtn.textContent;
      saveBtn.textContent = "Saved";
      setTimeout(() => {
        saveBtn.textContent = original;
      }, 1200);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      setLoggedIn(false);
      closeOverlay(adminOverlay);
    });
  }

  if (addExperience) {
    addExperience.addEventListener("click", () => {
      portfolioData.experience.push({
        dateStart: "",
        dateEnd: "",
        present: false,
        role: "",
        company: "",
        bullets: [""],
      });
      renderExperienceEditor();
    });
  }

  if (addProject) {
    addProject.addEventListener("click", () => {
      portfolioData.projects.push({
        number: String(portfolioData.projects.length + 1).padStart(2, "0"),
        type: "",
        name: "",
        desc: "",
        stack: [],
        link: "",
      });
      renderProjectEditor();
    });
  }

  if (addCert) {
    addCert.addEventListener("click", () => {
      portfolioData.certifications.push({
        badge: "",
        issuer: "",
        name: "",
        date: "",
        id: "",
      });
      renderCertEditor();
    });
  }

  if (experienceEditor) {
    experienceEditor.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-editor-item");
      if (!button) return;
      const item = button.closest(".editor-item");
      const index = Number(item?.dataset.index);
      portfolioData.experience.splice(index, 1);
      renderExperienceEditor();
    });
  }
  if (projectsEditor) {
    projectsEditor.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-editor-item");
      if (!button) return;
      const item = button.closest(".editor-item");
      const index = Number(item?.dataset.index);
      portfolioData.projects.splice(index, 1);
      renderProjectEditor();
    });
  }
  if (certsEditor) {
    certsEditor.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-editor-item");
      if (!button) return;
      const item = button.closest(".editor-item");
      const index = Number(item?.dataset.index);
      portfolioData.certifications.splice(index, 1);
      renderCertEditor();
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay(authOverlay);
      closeOverlay(adminOverlay);
    }
  });
}

renderPortfolio(portfolioData);
initAdminControls();

// Visible background actors that run away from the cursor.
(function setupCursorRunners() {
  const stage = document.querySelector(".animated-bg");
  if (!stage) return;

  const labels = ["JS", "API", "UI", "SQL", "GO", "AI", "UX", "DB"];
  const runners = Array.from({ length: 28 }, (_, index) => {
    const el = document.createElement("span");
    const isChip = index % 4 === 0;
    el.className = isChip ? "cursor-runner runner-chip" : "cursor-runner";
    el.textContent = isChip ? labels[(index / 4) % labels.length] : "";

    const runner = {
      el,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      x: 0,
      y: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.00045 + Math.random() * 0.0007,
      drift: 18 + Math.random() * 42,
      strength: isChip ? 86 : 64,
      radius: isChip ? 210 : 170,
    };

    stage.appendChild(el);
    return runner;
  });

  if (prefersReducedMotion) return;

  function moveRunners(time = 0) {
    runners.forEach((runner) => {
      const baseX = (window.innerWidth * runner.baseX) / 100;
      const baseY = (window.innerHeight * runner.baseY) / 100;
      const idleX = Math.cos(time * runner.speed + runner.phase) * runner.drift;
      const idleY =
        Math.sin(time * runner.speed * 1.35 + runner.phase) * runner.drift;
      const currentX = baseX + idleX + runner.x;
      const currentY = baseY + idleY + runner.y;
      const dx = currentX - mouse.x;
      const dy = currentY - mouse.y;
      const dist = Math.hypot(dx, dy);
      let avoidX = 0;
      let avoidY = 0;

      if (hasFinePointer && dist < runner.radius) {
        const force = (1 - dist / runner.radius) ** 1.35;
        const angle = Math.atan2(dy, dx);
        avoidX = Math.cos(angle) * runner.strength * force;
        avoidY = Math.sin(angle) * runner.strength * force;
      }

      runner.x += (avoidX - runner.x) * 0.18;
      runner.y += (avoidY - runner.y) * 0.18;
      runner.el.style.transform = `translate3d(${(baseX + idleX + runner.x).toFixed(1)}px, ${(baseY + idleY + runner.y).toFixed(1)}px, 0)`;
    });

    requestAnimationFrame(moveRunners);
  }

  moveRunners();
})();

// ── PRELOADER ────────────────────────────────────────────────
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});

// ── REDUCED MOTION CHECK ─────────────────────────────────────
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// ── SVG GRADIENT DEFS FOR PROGRESS RINGS ─────────────────────
(function injectSvgGradient() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  const defs = document.createElementNS(svgNS, "defs");
  const grad = document.createElementNS(svgNS, "linearGradient");
  grad.id = "goldGrad";
  grad.setAttribute("x1", "0%");
  grad.setAttribute("y1", "0%");
  grad.setAttribute("x2", "100%");
  grad.setAttribute("y2", "100%");
  const stops = [
    { offset: "0%", color: "#d4af37" },
    { offset: "50%", color: "#f4e4c1" },
    { offset: "100%", color: "#d4af37" },
  ];
  stops.forEach((s) => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", s.offset);
    stop.setAttribute("stop-color", s.color);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  svg.appendChild(defs);
  document.body.prepend(svg);
})();

// ── PARTICLE SYSTEM ──────────────────────────────────────────
const canvas = document.getElementById("particle-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];
  const GOLD = [246, 196, 83],
    BLUE = [53, 167, 255],
    PURPLE = [29, 211, 176];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", () => {
    resize();
    init();
  });

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : Math.random() > 0.5 ? -5 : H + 5;
      this.size = Math.random() * 1.8 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      const roll = Math.random();
      this.color = roll < 0.55 ? GOLD : roll < 0.8 ? BLUE : PURPLE;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.baseAlpha = this.alpha;
    }
    update() {
      const dx = mouse.x - this.x,
        dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 2.2;
        this.vy -= Math.sin(angle) * force * 2.2;
        this.alpha = Math.min(1, this.baseAlpha + force * 0.7);
      } else if (dist < 300) {
        const force = ((dist - 140) / 160) * 0.06;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;
        this.alpha = this.baseAlpha + (1 - dist / 300) * 0.25;
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.04;
      }
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.vx += (Math.random() - 0.5) * 0.04;
      this.vy += (Math.random() - 0.5) * 0.04;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x,
          dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color[0]},${particles[i].color[1]},${particles[i].color[2]},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseGlow() {
    if (mouse.x < 0 || mouse.x > W) return;
    const grd = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      180,
    );
    grd.addColorStop(0, "rgba(201,168,76,0.06)");
    grd.addColorStop(0.5, "rgba(201,168,76,0.02)");
    grd.addColorStop(1, "rgba(201,168,76,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }

  function init() {
    particles = [];
    const density = isTouchDevice ? 14000 : 9000;
    const count = Math.min(
      Math.floor((W * H) / density),
      isTouchDevice ? 80 : 160,
    );
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawMouseGlow();
    drawConnections();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  if (!prefersReducedMotion) {
    init();
    animate();
  }
}

// ── CURSOR TRACKING ──────────────────────────────────────────
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
const spotlight = document.getElementById("spotlight");
let rx = 0,
  ry = 0;

if (!isTouchDevice && cursor && ring) {
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    if (spotlight) {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
      spotlight.classList.add("visible");
    }
  });

  function lerpCursor() {
    rx += (mouse.x - rx) * 0.13;
    ry += (mouse.y - ry) * 0.13;
    if (ring) {
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
    }
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  document.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
    if (spotlight) spotlight.classList.remove("visible");
  });

  // ── MAGNETIC BUTTONS ─────────────────────────────────-------
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2;
      const dy = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // Cursor-avoid animation for hero accents.
  if (!prefersReducedMotion) {
    const avoidTargets = [
      ...document.querySelectorAll(
        ".shape, .showcase-orbit span, .live-dot, .cursor-evader",
      ),
    ].map((el, index) => ({
      el,
      x: 0,
      y: 0,
      scale: 1,
      phase: index * 0.75,
      radius: el.classList.contains("shape")
        ? 230
        : el.classList.contains("live-dot")
          ? 120
          : 150,
      strength: el.classList.contains("shape")
        ? 92
        : el.classList.contains("live-dot")
          ? 18
          : 44,
    }));

    function animateAvoidance(time = 0) {
      let isEvading = false;
      avoidTargets.forEach((target) => {
        const r = target.el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.hypot(dx, dy);
        let targetX = 0;
        let targetY = 0;
        let targetScale = 1;

        if (dist < target.radius) {
          const force = (1 - dist / target.radius) ** 1.55;
          const angle = Math.atan2(dy, dx);
          const wobble = Math.sin(time * 0.006 + target.phase) * force * 9;
          targetX =
            Math.cos(angle) * target.strength * force +
            Math.cos(angle + Math.PI / 2) * wobble;
          targetY =
            Math.sin(angle) * target.strength * force +
            Math.sin(angle + Math.PI / 2) * wobble;
          targetScale = 1 + force * 0.14;
          isEvading = true;
        }

        target.x += (targetX - target.x) * 0.16;
        target.y += (targetY - target.y) * 0.16;
        target.scale += (targetScale - target.scale) * 0.14;
        target.el.style.setProperty("--avoid-x", `${target.x.toFixed(2)}px`);
        target.el.style.setProperty("--avoid-y", `${target.y.toFixed(2)}px`);
        target.el.style.setProperty("--avoid-scale", target.scale.toFixed(3));
      });

      document.body.classList.toggle("cursor-evading", isEvading);
      requestAnimationFrame(animateAvoidance);
    }
    animateAvoidance();
  }
}

// ── 3D TILT CARDS ────────────────────────────────────────────
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (isTouchDevice) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const centerX = r.width / 2;
    const centerY = r.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener("mouseleave", () => {
    if (isTouchDevice) return;
    card.style.transform = "";
  });
});

// ── HAMBURGER MENU ───────────────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinksEl = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

if (navToggle && navLinksEl) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinksEl.classList.toggle("open");
    document.body.style.overflow = navLinksEl.classList.contains("open")
      ? "hidden"
      : "";
  });
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinksEl.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

// ── CARD MOUSE-TRACKING GLOW ─────────────────────────────────
document
  .querySelectorAll(".skill-card, .project-card, .cert-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        "--mx",
        (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%",
      );
      card.style.setProperty(
        "--my",
        (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%",
      );
    });
  });

// ── ANIMATED BORDER ANGLE ────────────────────────────────────
(function animateBorders() {
  const cards = document.querySelectorAll(".skill-card");
  if (cards.length === 0 || prefersReducedMotion) return;
  let angle = 0;
  function step() {
    angle += 0.3;
    cards.forEach((c) => {
      c.style.setProperty("--angle", angle + "deg");
    });
    requestAnimationFrame(step);
  }
  step();
})();

// ── NAVBAR SCROLL ────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ── BACK TO TOP ──────────────────────────────────────────────
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── SCROLL FADE IN ───────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 90);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ── COUNT-UP ANIMATION ───────────────────────────────────────
const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + "+";
          if (current >= target) clearInterval(timer);
        }, 40);
        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => countObserver.observe(c));

// ── TYPEWRITER HERO SUBTITLE ─────────────────────────────────
(function typewriter() {
  const el = document.getElementById("heroSubtitle");
  if (!el) return;
  const phrases = [
    portfolioData.hero.subtitle || "Building scalable web & mobile solutions",
  ];
  let phraseIdx = 0,
    charIdx = 0,
    isDeleting = false;
  const speed = 50,
    deleteSpeed = 30,
    pause = 2000;

  function tick() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, pause);
        return;
      }
      setTimeout(tick, speed);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  setTimeout(tick, 1500);
})();

// ── FALLING STARS ─────────────────────────────────────────────
(function initShootingStars() {
  const starContainer = document.querySelector(".falling-stars");
  if (!starContainer || prefersReducedMotion || isTouchDevice) return;

  function createStar() {
    const star = document.createElement("span");
    star.className = "shooting-star";
    const size = 18 + Math.random() * 24;
    const startY = Math.random() * window.innerHeight * 0.45;
    const startX = Math.random() * window.innerWidth * 0.3;
    const angle = -18 - Math.random() * 12;
    const duration = 1200 + Math.random() * 900;

    star.style.width = `${size}px`;
    star.style.top = `${startY}px`;
    star.style.left = `${startX}px`;
    star.style.transform = `rotate(${angle}deg) scale(${0.8 + Math.random() * 0.4})`;
    starContainer.appendChild(star);

    requestAnimationFrame(() => {
      star.style.opacity = "1";
      star.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      star.style.transform = `translateX(${window.innerWidth * 0.8}px) translateY(${window.innerHeight * 0.18}px) rotate(${angle}deg) scale(${0.8 + Math.random() * 0.4})`;
      star.style.opacity = "0";
    });

    setTimeout(() => {
      star.remove();
    }, duration + 100);
  }

  function spawnStars() {
    createStar();
    setTimeout(spawnStars, 900 + Math.random() * 1600);
  }

  spawnStars();
})();

// ── CONTACT FORM ─────────────────────────────────────────────
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".form-btn");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });

    fetch("https://formsubmit.co/ajax/danieltbg145@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          btn.textContent = "Sent! Thank you";
          btn.style.background = "linear-gradient(135deg, #2d8a4e, #3cb371)";
          contactForm.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = "";
          }, 3000);
        } else {
          throw new Error("Failed");
        }
      })
      .catch(() => {
        btn.textContent = "Failed - try again";
        btn.style.background = "linear-gradient(135deg, #8a2d2d, #b33c3c)";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = "";
        }, 3000);
      });
  });
}
