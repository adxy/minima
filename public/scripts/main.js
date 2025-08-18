const isReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isAppearanceTransition = document.startViewTransition && !isReducedMotion;

const themeSwitchAudio = new Howl({
  src: ["/audio/fast-swish-transition.mp3"],
  preload: isAppearanceTransition,
  volume: 1,
});

const themeSwitchAudioInstant = new Howl({
  src: ["/audio/click.wav"],
  preload: !isAppearanceTransition,
  volume: 1,
});

// Debounce to avoid double-trigger on some inputs
let lastThemeToggleAtMs = 0;

const setOrToggleTheme = (event) => {
  let selectedTheme = localStorage.getItem("theme");

  if (!event) {
    document.documentElement.setAttribute(
      "data-color-mode",
      selectedTheme === "light" ? "light" : "dark"
    );
    localStorage.setItem("theme", selectedTheme === "light" ? "light" : "dark");
    return;
  }

  const isDark = selectedTheme === "dark" ? true : false;

  if (!isAppearanceTransition) {
    document.documentElement.setAttribute(
      "data-color-mode",
      selectedTheme === "dark" ? "light" : "dark"
    );
    localStorage.setItem("theme", selectedTheme === "dark" ? "light" : "dark");

    // Play instant audio
    themeSwitchAudioInstant.stop();
    themeSwitchAudioInstant.seek(0);
    themeSwitchAudioInstant.play();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  const transition = document.startViewTransition(async () => {
    document.documentElement.setAttribute(
      "data-color-mode",
      selectedTheme === "dark" ? "light" : "dark"
    );
    localStorage.setItem("theme", selectedTheme === "dark" ? "light" : "dark");
  });
  transition.ready.then(() => {
    // Play audio when the transition is about to animate
    themeSwitchAudio.stop();
    themeSwitchAudio.seek(0.3);
    themeSwitchAudio.play();

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: !isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-out",
        pseudoElement: !isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};

document.getElementById("theme-button").addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  const now = performance.now();
  if (now - lastThemeToggleAtMs < 300) return;
  lastThemeToggleAtMs = now;
  setOrToggleTheme(e);
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

resizeObserver.observe(document.getElementById("crowd-canvas"));
setOrToggleTheme();

const clickAudio = new Howl({
  src: ["/audio/subtle-click.mp3"],
  preload: true,
  volume: 1,
});
const emailDiv = document.querySelector("#copy-email");
const email = "theadxy@gmail.com";
const resetText = "Copy Email";
let shouldPlay = true;

emailDiv.addEventListener("pointerdown", () => {
  if (shouldPlay) {
    shouldPlay = false;
    clickAudio.stop();
    clickAudio.seek(0);
    clickAudio.play();
  }

  navigator.clipboard.writeText(email);
  emailDiv.innerText = "Copied. ✓";
  emailDiv.classList.add("copied");
  setTimeout(() => {
    emailDiv.innerText = resetText;
    emailDiv.classList.remove("copied");
    shouldPlay = true;
  }, 3500);
});
