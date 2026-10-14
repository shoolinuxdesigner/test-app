import { connection } from "next/server";

export const instant = false;

const details = [
  { label: "Application name", key: "APP_NAME" },
  { label: "Environment", key: "APP_ENV" },
  { label: "Service region", key: "APP_REGION" },
  { label: "Public API URL", key: "PUBLIC_API_URL" },
  { label: "Support email", key: "SUPPORT_EMAIL" },
];

function getEnvironmentValue(key) {
  const value = process.env[key]?.trim();
  return value || "NA";
}

export default async function Home() {
  // Keep environment values dynamic so .env and deployment values are current.
  await connection();

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-slate-100 sm:items-center sm:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.18),_transparent_35%)]" />

      <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/75 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-12">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Test environment
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Configuration at a glance.
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400 sm:text-right">
            Values are supplied from the server environment. Missing or empty
            values automatically display as <span className="font-semibold text-slate-200">NA</span>.
          </p>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ label, key }, index) => (
            <div
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06]"
              key={key}
            >
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-slate-400">{label}</dt>
                <span className="text-xs font-semibold text-cyan-300/80">0{index + 1}</span>
              </div>
              <dd className="mt-5 break-words text-xl font-semibold tracking-tight text-white">
                {getEnvironmentValue(key)}
              </dd>
              <p className="mt-2 font-mono text-xs text-slate-500">{key}</p>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
