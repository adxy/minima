import storage from "./storage";
import arrowImg from "bundle-text:./public/images/external_link.svg";
import logoImg from "bundle-text:./public/images/adxy_logo.svg";

// add logo
const logo = document.createElement("div");
logo.innerHTML = logoImg;
logo.classList.add("svg-div");
logo.classList.add("logo");
document.querySelector("#logo-box").appendChild(logo);

var body = document.body,
  html = document.documentElement;

var height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

const themeAnimation = document.getElementById("theme-switch-animation");

// add theme switch ability
const rootElement = document.documentElement;
document.getElementById("theme-button").addEventListener("pointerdown", () => {
  const theme = rootElement.getAttribute("data-color-mode");
  const moonButton = document.getElementById("moon-button");
  const sunButton = document.getElementById("sun-button");
  setTimeout(() => {
    document.documentElement.setAttribute(
      "data-color-mode",
      theme === "dark" ? "light" : "dark"
    );
  }, 200);
  if (theme == "dark") {
    moonButton.style.display = "none";
    sunButton.style.display = "block";
    themeAnimation.style.width = height * 4.5 + "px";
    themeAnimation.style.height = height * 4.5 + "px";
    themeAnimation.style.backgroundColor = "#FAF9F6";
    document.body.style.setProperty("--tag-bg", "#FAF9F6");
  } else {
    themeAnimation.style.width = 0;
    themeAnimation.style.height = 0;
    themeAnimation.style.backgroundColor = "#FAF9F6";
    document.body.style.setProperty("--tag-bg", "#050505");
    setTimeout(() => {
      moonButton.style.display = "block";
      sunButton.style.display = "none";
    }, 600);
  }
});

// fetch articles
async function gql(query) {
  const response = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response || !response.ok) {
    throw new Error("Something went wrong while fetching the articles!");
  }

  return response.json();
}

const query = `{
    user(username: "adxy") {
      publication {
        posts(page: 0) {
         slug
         title
         brief
         dateAdded
        }
      }
    }
  }`;

gql(query)
  .then((resp) => {
    const apiResponse = resp.data.user.publication.posts;
    apiResponse.forEach((post) => {
      const cardParent = document.createElement("div");
      const card = document.createElement("a");
      cardParent.classList.add("writings-card", "card");
      const title = document.createElement("p");

      card.href = `https://adxy.hashnode.dev/${post.slug}`;
      card.target = "_blank";

      title.innerText = post.title;
      title.classList.add("description");
      card.appendChild(title);

      const date = document.createElement("p");
      const dateAdded = new Date(post.dateAdded).toLocaleDateString();
      date.innerText = dateAdded;
      date.classList.add("date");
      card.appendChild(date);

      cardParent.appendChild(card);
      const elm = document.getElementById("writings");
      const loaders = [
        ...document.querySelectorAll(".section-writings .loader"),
      ];
      loaders.forEach((loader) => elm.removeChild(loader));
      elm.appendChild(cardParent);
    });
  })
  .catch((err) => {
    const loaders = [
      ...document.querySelectorAll(".section-writings .loader p"),
    ];
    loaders.forEach(
      (loader) =>
        (loader.innerText = "Something went wrong while fetching articles!")
    );
    throw err;
  });

// Projects mouse scroll starts.
const slider = document.getElementById("projects");
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  slider.style.cursor = "grabbing";
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};

let stopDragging = function (event) {
  slider.style.cursor = null;
  mouseDown = false;
};

slider.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);

storage.openSource.forEach((contribution) => {
  const cardParent = document.createElement("div");
  const openSourceCard = document.createElement("a");
  cardParent.classList.add("os-card", "card");

  openSourceCard.href = contribution.prLink;
  openSourceCard.target = "_blank";

  const title = document.createElement("p");
  title.innerText = contribution.title;
  title.classList.add("description");

  openSourceCard.appendChild(title);
  const langTagDiv = document.createElement("div");
  langTagDiv.classList.add("languages");

  contribution.languages.forEach((lang) => {
    const langTag = document.createElement("div");
    langTag.innerText = lang;
    langTag.classList.add("tags");
    langTagDiv.appendChild(langTag);
  });
  openSourceCard.appendChild(langTagDiv);
  cardParent.appendChild(openSourceCard);
  const osSection = document.getElementById("open-source");
  const loaders = [...document.querySelectorAll(".section-os .loader")];
  loaders.forEach((loader) => osSection.removeChild(loader));
  osSection.appendChild(cardParent);
});

const emailDiv = document.querySelector(".email");

emailDiv.addEventListener("pointerdown", () => {
  navigator.clipboard.writeText(storage.email);
  emailDiv.innerText = "copied to clipboard. ✓";
  emailDiv.classList.add("copied");
  setTimeout(() => {
    emailDiv.innerText = storage.email;
    emailDiv.classList.remove("copied");
  }, 2000);
});

storage.socials.forEach((social) => {
  const elm = document.querySelector(`.${social.platform}`);
  elm.href = social.link;
  elm.target = "_blank";
});

storage.projects.forEach((project) => {
  const card = document.createElement("div");
  card.classList.add("project-card", "card");

  const topDiv = document.createElement("div");

  const title = document.createElement("p");
  title.innerText = project.title;
  title.classList.add("title");
  topDiv.appendChild(title);

  const brief = document.createElement("p");
  brief.innerText = project.brief;
  brief.classList.add("brief");
  topDiv.appendChild(brief);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("project-buttons-box");

  const codeButton = document.createElement("a");
  codeButton.classList.add("project-button");

  const liveButton = codeButton.cloneNode(true);
  const codeText = document.createElement("p");
  const liveText = document.createElement("p");

  const arrowButton = document.createElement("div");
  arrowButton.classList.add("svg-div");
  arrowButton.innerHTML = arrowImg;

  const arrowButtonClone = arrowButton.cloneNode(true);

  codeText.innerText = "code";
  liveText.innerText = "live";

  codeButton.appendChild(codeText);
  codeButton.appendChild(arrowButton);
  liveButton.appendChild(liveText);
  liveButton.appendChild(arrowButtonClone);
  buttonDiv.appendChild(codeButton);
  buttonDiv.appendChild(liveButton);

  card.appendChild(topDiv);
  card.appendChild(buttonDiv);

  const projectSection = document.querySelector(".section-projects");
  const loaders = [...document.querySelectorAll(".section-projects .loader")];
  loaders.forEach((loader) => projectSection.removeChild(loader));
  projectSection.appendChild(card);

  codeButton.href = project.code;
  codeButton.target = "_blank";

  liveButton.href = project.link;
  liveButton.target = "_blank";
});

// crowd
const config = {
  src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png",
  rows: 15,
  cols: 7,
};

// UTILS

const randomRange = (min, max) => min + Math.random() * (max - min);

const randomIndex = (array) => randomRange(0, array.length) | 0;

const removeFromArray = (array, i) => array.splice(i, 1)[0];

const removeItemFromArray = (array, item) =>
  removeFromArray(array, array.indexOf(item));

const removeRandomFromArray = (array) =>
  removeFromArray(array, randomIndex(array));

const getRandomFromArray = (array) => array[randomIndex(array) | 0];

// TWEEN FACTORIES

const resetPeep = ({ stage, peep }) => {
  let offsetVarA = 100;
  let offsetVarB = 250;
  let scaleX = 1;

  if (window.innerWidth < 960) {
    offsetVarA = 200;
    offsetVarB = 150;
    scaleX = 0.5;
  }

  if (window.innerWidth < 480) {
    offsetVarA = 240;
    offsetVarB = 100;
    scaleX = 0.35;
  }
  const direction = Math.random() > 0.5 ? 1 : -1;
  // using an ease function to skew random to lower values to help hide that peeps have no legs
  const offsetY =
    offsetVarA - offsetVarB * gsap.parseEase("power2.in")(Math.random());
  const startY = stage.height - peep.height + offsetY;
  let startX;
  let endX;

  if (direction === 1) {
    startX = -peep.width;
    endX = stage.width;
    peep.scaleX = scaleX;
  } else {
    startX = stage.width + peep.width;
    endX = 0;
    peep.scaleX = -1 * scaleX;
  }

  peep.x = startX;
  peep.y = startY;
  peep.anchorY = startY;

  return {
    startX,
    startY,
    endX,
  };
};

const normalWalk = ({ peep, props }) => {
  const { startX, startY, endX } = props;

  const xDuration = 10;
  const yDuration = 0.25;

  const tl = gsap.timeline();
  tl.timeScale(randomRange(0.5, 1.5));
  tl.to(
    peep,
    {
      duration: xDuration,
      x: endX,
      ease: "none",
    },
    0
  );
  tl.to(
    peep,
    {
      duration: yDuration,
      repeat: xDuration / yDuration,
      yoyo: true,
      y: startY - 10,
    },
    0
  );

  return tl;
};

const walks = [normalWalk];

// CLASSES

class Peep {
  constructor({ image, rect }) {
    this.image = image;
    this.setRect(rect);

    this.x = 0;
    this.y = 0;
    this.anchorY = 0;
    this.scaleX = 1;
    this.walk = null;
  }

  setRect(rect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];

    this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
  }

  render(ctx) {
    let scaleY = 1;
    if (ctx.canvas.clientWidth < 960) {
      scaleY = 0.5;
    }

    if (ctx.canvas.clientWidth < 480) {
      scaleY = 0.35;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, scaleY);
    ctx.drawImage(...this.drawArgs);
    ctx.restore();
  }
}

// MAIN
const img = document.createElement("img");
img.onload = init;
img.src = config.src;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const stage = {
  width: 0,
  height: 0,
};

const allPeeps = [];
const availablePeeps = [];
const crowd = [];

function init() {
  createPeeps();

  // resize also (re)populates the stage
  resize();

  gsap.ticker.add(render);
  window.addEventListener("resize", resize);
}

function createPeeps() {
  const { rows, cols } = config;
  const { naturalWidth: width, naturalHeight: height } = img;
  const total = rows * cols;
  const rectWidth = width / rows;
  const rectHeight = height / cols;

  for (let i = 0; i < total; i++) {
    allPeeps.push(
      new Peep({
        image: img,
        rect: [
          (i % rows) * rectWidth,
          ((i / rows) | 0) * rectHeight,
          rectWidth,
          rectHeight,
        ],
      })
    );
  }
}

function resize() {
  stage.width = canvas.clientWidth;
  stage.height = canvas.clientHeight;
  canvas.width = stage.width * devicePixelRatio;
  canvas.height = stage.height * devicePixelRatio;

  crowd.forEach((peep) => {
    peep.walk.kill();
  });

  crowd.length = 0;
  availablePeeps.length = 0;
  availablePeeps.push(...allPeeps);

  initCrowd();
}

function initCrowd() {
  while (availablePeeps.length) {
    // setting random tween progress spreads the peeps out
    addPeepToCrowd().walk.progress(Math.random());
  }
}

function addPeepToCrowd() {
  const peep = removeRandomFromArray(availablePeeps);
  const walk = getRandomFromArray(walks)({
    peep,
    props: resetPeep({
      peep,
      stage,
    }),
  }).eventCallback("onComplete", () => {
    removePeepFromCrowd(peep);
    addPeepToCrowd();
  });

  peep.walk = walk;

  crowd.push(peep);
  crowd.sort((a, b) => a.anchorY - b.anchorY);

  return peep;
}

function removePeepFromCrowd(peep) {
  removeItemFromArray(crowd, peep);
  availablePeeps.push(peep);
}

function render() {
  canvas.width = canvas.width;
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);

  crowd.forEach((peep) => {
    peep.render(ctx);
  });

  ctx.restore();
}

// manage footer -ve margin-top
const resizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  let mgn =
    -1 * entry.borderBoxSize[0].inlineSize +
    1.1 * entry.borderBoxSize[0].blockSize +
    300;

  if (mgn > -50) {
    mgn = -50;
  }

  document.documentElement.style.setProperty(
    "--footer-negative-margin",
    mgn + "px"
  );
});

resizeObserver.observe(document.getElementById("canvas"));
