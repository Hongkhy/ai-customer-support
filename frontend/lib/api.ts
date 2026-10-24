
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function checkApiHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health/`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}


type ChatResponse = {
  reply: string;
};

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API request failed: ${response.status}`);
  }

  return (data as ChatResponse).reply;
}
