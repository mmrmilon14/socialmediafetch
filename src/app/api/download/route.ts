import { isDownloadHost } from "@/lib/resolve";

const MAX_BYTES = 25 * 1024 * 1024;

/** Streams an image from an allowlisted platform CDN with a download filename. */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  let target = params.get("url") ?? "";
  const name = (params.get("name") ?? "socialmediafetch").replace(/[^\w.-]+/g, "-").slice(0, 80);

  // Follow redirects by hand so every hop is checked against the allowlist.
  let res: Response | null = null;
  for (let hop = 0; hop < 4; hop++) {
    if (!isDownloadHost(target)) return new Response("This file host isn't allowed.", { status: 400 });
    res = await fetch(target, { redirect: "manual", signal: AbortSignal.timeout(10000) }).catch(() => null);
    if (!res) return new Response("Couldn't reach the file host.", { status: 502 });
    const next = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && next) {
      target = new URL(next, target).href;
      continue;
    }
    break;
  }
  if (!res || !res.ok || !res.body) return new Response("The file isn't available.", { status: 404 });

  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return new Response("Only images can be downloaded here.", { status: 415 });
  const size = Number(res.headers.get("content-length") ?? 0);
  if (size > MAX_BYTES) return new Response("File is too large.", { status: 413 });

  const ext = type.split("/")[1]?.split(";")[0].replace("jpeg", "jpg") || "jpg";
  const filename = /\.\w{2,4}$/.test(name) ? name : `${name}.${ext}`;
  return new Response(res.body, {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
      ...(size ? { "Content-Length": String(size) } : {}),
    },
  });
}
