const setOrToggleTheme = (event) => {
  let selectedTheme = localStorage.getItem("theme");

  if (!event) {
    document.documentElement.setAttribute("data-color-mode", selectedTheme === "light" ? "light" : "dark");
    localStorage.setItem("theme", selectedTheme === "light" ? "light" : "dark");
    return
  }


  const isDark = selectedTheme === "dark" ? true : false;
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    document.documentElement.setAttribute("data-color-mode", selectedTheme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", selectedTheme === "dark" ? "light" : "dark")
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    document.documentElement.setAttribute("data-color-mode", selectedTheme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", selectedTheme === "dark" ? "light" : "dark");
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: !isDark
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: !isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

document.getElementById("theme-button").addEventListener("pointerdown", (e) => setOrToggleTheme(e));

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

resizeObserver.observe(document.getElementById("crowd-canvas"));
setOrToggleTheme()

// email copy functionality
const emailDiv = document.querySelector("#copy-email");
const email = "theadxy@gmail.com"
const resetText = "Copy Email"
emailDiv.addEventListener("pointerdown", () => {
  navigator.clipboard.writeText(email);
  emailDiv.innerText = "Copied. ✓";
  emailDiv.classList.add("copied");
  setTimeout(() => {
    emailDiv.innerText = resetText;
    emailDiv.classList.remove("copied");
  }, 3500);
});
