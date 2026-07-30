// Shared "thumbnail" helpers so product cards and cart rows show the same
// deterministic gradient + monogram for a given product (we have no real images).
const GRADIENTS = [
  "from-sky-400 to-blue-600",
  "from-violet-400 to-indigo-600",
  "from-rose-400 to-pink-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
  "from-fuchsia-400 to-purple-600",
];

export function gradientFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export function initials(name = "") {
  return name
    .replace(/^Vibe\s+/i, "") // drop the shared "Vibe" prefix for nicer monograms
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
