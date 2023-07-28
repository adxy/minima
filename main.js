import storage from "./storage";
import arrowImg from "bundle-text:./public/images/arrow-right.svg";
import logoImg from "bundle-text:./public/images/adxy-logo.svg";

// add logo
const logo = document.createElement("div");
logo.innerHTML = logoImg;
logo.classList.add("svg-div");
logo.classList.add("logo");
document.querySelector("#user-box").appendChild(logo);

// add theme switch ability
const rootElement = document.documentElement;
document.getElementById("theme-button").addEventListener("pointerdown", () => {
  const theme = rootElement.getAttribute("data-color-mode");
  document.documentElement.setAttribute(
    "data-color-mode",
    theme === "dark" ? "light" : "dark"
  );
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
      cardParent.classList.add("writings-card");
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
  cardParent.classList.add("os-card");

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
  card.classList.add("project-card");

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
