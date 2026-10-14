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

export default async function TestPage() {
  // Read at request time so a deployed app can use its current environment.
  await connection();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl shadow-cyan-950/40 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Test page
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Environment details
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
          These values are read from the server environment. Missing or empty
          values are shown as <strong className="font-semibold text-slate-200">NA</strong>.
        </p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {details.map(({ label, key }) => (
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              key={key}
            >
              <dt className="text-sm font-medium text-slate-400">{label}</dt>
              <dd className="mt-2 break-words text-lg font-semibold text-white">
                {getEnvironmentValue(key)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
