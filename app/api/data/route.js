let latestData = {};

export async function POST(req) {
  const data = await req.json();
  latestData = data;
  console.log("Received data:", latestData);
  return new Response("Data received", { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify(latestData), { status: 200 });
} 