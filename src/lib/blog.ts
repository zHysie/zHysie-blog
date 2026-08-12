function cleanMarkdownInline(value: string) {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~]/g, "")
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/^\s{0,3}(?:>|[-+*]|\d+[.)])\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateExcerpt(value: string, limit: number) {
  if (value.length <= limit) return value;

  const sliced = value.slice(0, Math.max(1, limit - 1)).trimEnd();
  const lastSpace = sliced.lastIndexOf(" ");
  const cutoff =
    lastSpace >= Math.floor(limit * 0.65) ? sliced.slice(0, lastSpace) : sliced;

  return `${cutoff}…`;
}

export function getMarkdownExcerpt(markdown: string, limit = 220) {
  const source = markdown
    .replace(/<!--[^]*?-->/g, "")
    .replace(/```[^]*?```/g, "")
    .replace(/~~~[^]*?~~~/g, "")
    .replace(/^\s*(?:import|export)\s+[^\n]+$/gm, "")
    .trim();

  const blocks = source.split(/\r?\n\s*\r?\n/);

  for (const block of blocks) {
    const candidate = block.trim();
    if (
      !candidate ||
      /^\s{0,3}#{1,6}\s+/.test(candidate) ||
      /^\s{0,3}(?:[-*_]\s*){3,}$/.test(candidate) ||
      /^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(candidate) ||
      /^\s*\|.*\|\s*$/.test(candidate)
    ) {
      continue;
    }

    const excerpt = cleanMarkdownInline(candidate);
    if (excerpt) return truncateExcerpt(excerpt, limit);
  }

  return "";
}
