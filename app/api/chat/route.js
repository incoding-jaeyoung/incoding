export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: body.messages,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}