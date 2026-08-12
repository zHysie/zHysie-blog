import type { ClientDirective } from "astro";

const heroReady: ClientDirective = (load, _options, element) => {
  let hydrationStarted = false;

  const hydrate = async () => {
    if (hydrationStarted) return;
    hydrationStarted = true;
    const startHydration = await load();
    await startHydration();
  };

  const hero = document.querySelector<HTMLElement>(
    '[data-ascii-entrance="ripple"]',
  );
  if (!hero || hero.dataset.asciiEntranceState === "complete") {
    void hydrate();
    return;
  }

  hero.addEventListener("hero-ascii-ready", () => void hydrate(), {
    once: true,
  });
  window.setTimeout(() => void hydrate(), 7000);

  element.setAttribute("data-hydration-gate", "hero-ready");
};

export default heroReady;
