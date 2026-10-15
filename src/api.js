const BASE = (import.meta.env.VITE_API_URL || "https://infylebackend.vercel.app").replace(/\/$/, "");

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, options);
  } catch {
    throw new Error("Server se connect nahi ho pa raha. Internet check karke dobara try karo.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || "Kuch gadbad ho gayi");
  return data;
}

export async function submitTest(payload) {
  const data = await request("/api/test/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return data.result;
}

export async function fetchResult(id) {
  const data = await request(`/api/test/result/${id}`);
  return data.data;
}
