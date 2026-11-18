// Local preview server for this landing page: npm start -> http://localhost:8080
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = __dirname, PORT = process.env.PORT || 8080;
const TYPES = { ".html": "text/html; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".jpg": "image/jpeg", ".mp4": "video/mp4", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]).replace(/\/+$/, "") || "/";
  const rel = url === "/" ? "index.html" : url.slice(1);
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found");
  }
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  const size = fs.statSync(file).size, range = /bytes=(d*)-(d*)/.exec(req.headers.range || "");
  if (range) {
    const start = range[1] ? +range[1] : 0, end = range[2] ? Math.min(+range[2], size - 1) : size - 1;
    res.writeHead(206, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    return fs.createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Length": size });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Preview running at http://localhost:${PORT}`));
