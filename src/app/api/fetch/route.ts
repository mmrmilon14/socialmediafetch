import { NextResponse } from "next/server";
import { resolve } from "@/lib/resolve";

const httpStatus: Record<string, number> = {
  ok: 200,
  planned: 200,
  needs_config: 200,
  restricted: 200,
  not_found: 200,
  invalid: 400,
  unsupported: 422,
  error: 502,
};

async function handle(url: unknown) {
  if (typeof url !== "string") {
    return NextResponse.json({ status: "invalid", message: "Missing url." }, { status: 400 });
  }
  const result = await resolve(url);
  return NextResponse.json(result, { status: httpStatus[result.status] ?? 200 });
}

export async function GET(req: Request) {
  return handle(new URL(req.url).searchParams.get("url"));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return handle((body as { url?: unknown }).url);
}
