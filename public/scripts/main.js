// add theme switch ability
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
    }, 500);
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

// email copy functionality
const emailDiv = document.querySelector(".email");
const email = "theadxy@gmail.com"
emailDiv.addEventListener("pointerdown", () => {
  navigator.clipboard.writeText(email);
  emailDiv.innerText = "copied to clipboard. ✓";
  emailDiv.classList.add("copied");
  setTimeout(() => {
    emailDiv.innerText = email;
    emailDiv.classList.remove("copied");
  }, 2000);
});

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
