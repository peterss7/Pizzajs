
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`http://localhost:3000${path}`, {
    ...options,
    credentials: "include", // <-- key for cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    // try to pull json error message if your API returns it
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }

  // if you have endpoints that return no body, adjust as needed
  return (await res.json()) as T;
}
