
"use client";

import { useEffect, useState } from "react";

type ApiResponse = {
  status: string;
  message: string;
};

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/health/"
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not connect to the backend."
        );
      }
    }

    checkBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">
        AI Customer Support
      </h1>

      <p>Backend Connection Test</p>

      {data && (
        <div className="rounded-lg border border-green-500 p-5">
          <p>Status: {data.status}</p>
          <p>{data.message}</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500 p-5">
          <p>Connection failed: {error}</p>
        </div>
      )}

      {!data && !error && <p>Connecting to backend...</p>}
    </main>
  );
}
