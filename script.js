const DISPLAY_GROUP_COUNT = 3;
const BRAND_POSITION = 4;

const brandCard = {
  kicker: "Portfolio / Works",
  title: "Kanta Yamauchi",
  note: "Frontend / Interaction / Design",
};

const projects = [
  {
    id: "01",
    title: "Editorial Site",
    kind: "Web Design",
    tone: "tone-ink",
    description:
      "読み物としての余白と、スマートフォンでの読みやすさを両立したエディトリアルサイト。静かなタイポグラフィとスクロールのリズムを大切に設計しました。",
    role: "Design / Frontend",
    tools: "HTML, CSS, JavaScript",
  },
  {
    id: "02",
    title: "Cafe Brand",
    kind: "Brand / UI",
    tone: "tone-moss",
    description:
      "架空のカフェブランドの世界観を、ロゴ、配色、予約導線までまとめたブランドUI。親しみやすさと上品さのバランスを意識しています。",
    role: "Brand Design / UI",
    tools: "Figma, HTML, CSS",
  },
  {
    id: "03",
    title: "Shop UI",
    kind: "EC Prototype",
    tone: "tone-clay",
    description:
      "商品を選ぶ楽しさが伝わるECプロトタイプ。比較、詳細確認、カート投入までの流れを軽く、迷わず進められるようにしています。",
    role: "UI Design / Prototype",
    tools: "Figma, JavaScript",
  },
  {
    id: "04",
    title: "Motion Grid",
    kind: "Interaction",
    tone: "tone-sky",
    description:
      "グリッドレイアウトとループアニメーションを使ったインタラクション実験。単調に見えない速度感とカードの見え方を調整しました。",
    role: "Frontend",
    tools: "CSS Animation",
  },
  {
    id: "06",
    title: "Dashboard",
    kind: "Product UI",
    tone: "tone-plum",
    description:
      "日々使う管理画面を想定したUI。情報密度を保ちながら、視線の流れと状態の読み取りやすさを整えました。",
    role: "UI Design",
    tools: "Figma, Design System",
  },
  {
    id: "07",
    title: "Archive",
    kind: "Content Design",
    tone: "tone-stone",
    description:
      "作品や記事を探しやすくするアーカイブ画面。フィルタやカードの粒度を調整し、一覧性を高めています。",
    role: "Information Design",
    tools: "HTML, CSS",
  },
  {
    id: "08",
    title: "Landing Page",
    kind: "Campaign",
    tone: "tone-rose",
    description:
      "短い時間で魅力が伝わるキャンペーンページ。ファーストビューからアクションまでのテンポを重視しました。",
    role: "Design / Frontend",
    tools: "HTML, CSS, JavaScript",
  },
  {
    id: "09",
    title: "Studio Tool",
    kind: "Web App",
    tone: "tone-forest",
    description:
      "小さな制作スタジオ向けの進行管理ツール。タスク、メモ、進捗をひとつの画面で把握できるように設計しています。",
    role: "Product Design",
    tools: "JavaScript, UI Design",
  },
];

const projectById = new Map(projects.map((project) => [project.id, project]));

const modal = document.querySelector("[data-modal]");
const track = document.querySelector("[data-track]");
const closeButtons = document.querySelectorAll("[data-close]");
const modalFields = {
  index: document.querySelector("[data-modal-index]"),
  title: document.querySelector("[data-modal-title]"),
  kind: document.querySelector("[data-modal-kind]"),
  description: document.querySelector("[data-modal-description]"),
  role: document.querySelector("[data-modal-role]"),
  tools: document.querySelector("[data-modal-tools]"),
};

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function createBrandCard() {
  const card = createElement("article", "brand-card");

  card.append(
    createElement("p", "brand-kicker", brandCard.kicker),
    createElement("h1", "", brandCard.title),
    createElement("p", "brand-note", brandCard.note),
  );

  return card;
}

function createWorkCard(project, isDuplicate) {
  const card = createElement("button", `work-card ${project.tone}`);

  card.type = "button";
  card.dataset.project = project.id;

  if (isDuplicate) {
    card.tabIndex = -1;
  }

  card.append(
    createElement("span", "work-index", project.id),
    createElement("span", "work-title", project.title),
    createElement("span", "work-kind", project.kind),
  );

  return card;
}

function createGrid(isDuplicate = false) {
  const grid = createElement("div", "grid");
  const cards = projects.map((project) => createWorkCard(project, isDuplicate));

  cards.splice(BRAND_POSITION, 0, createBrandCard());
  grid.append(...cards);

  if (isDuplicate) {
    grid.setAttribute("aria-hidden", "true");
  }

  return grid;
}

function renderMarquee() {
  if (!track) {
    return;
  }

  const grids = Array.from({ length: DISPLAY_GROUP_COUNT }, (_, index) =>
    createGrid(index > 0),
  );

  track.replaceChildren(...grids);
}

function openModal(projectId) {
  const project = projectById.get(projectId);

  if (!project || !modal) {
    return;
  }

  modalFields.index.textContent = `Project ${project.id}`;
  modalFields.title.textContent = project.title;
  modalFields.kind.textContent = project.kind;
  modalFields.description.textContent = project.description;
  modalFields.role.textContent = project.role;
  modalFields.tools.textContent = project.tools;

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  if (!modal || modal.hidden) {
    return;
  }

  modal.hidden = true;
  document.body.style.overflow = "";
  document.activeElement?.blur();
}

renderMarquee();

track?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const card = event.target.closest("[data-project]");

  if (card) {
    openModal(card.dataset.project);
  }
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
