const {spawn} = require("child_process");

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

console.log(`
🎬 MovieMania Development

Data source:
${useMock ? "🟢 MOCK DATA" : "🟡 TMDB API"}

Commands:
  npm run dev       → API
  npm run dev:mock  → Mock

`);

const next = spawn("next", ["dev"], {
  stdio: "inherit",
  shell: true,
});

next.on("close", (code) => {
  process.exit(code);
});