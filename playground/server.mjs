import path from "path";
import mime from "mime/lite";

const ROOT_DIR = process.cwd();
const STATIC_DIR = path.join(ROOT_DIR, "playground/dist");

Bun.serve({
    port: 9001,
    fetch(request) {
        const url = new URL(request.url);
        console.log("request: " + url.pathname);
        let filePath = path.join(STATIC_DIR, url.pathname);
        if (/\/$/.test(url.pathname)) {
            filePath = filePath + "index.html";
        }
        console.log("serve file: " + filePath);
        return createFileResponse(filePath);
    },
    error() {
        return new Response("Not Found", { status: 404 });
    },
});

async function createFileResponse(filePath) {
    const ext = path.extname(filePath);
    const mimeType = mime.getType(ext);
    const headers = {
        "Content-Type": mimeType,
    };
    const fileContent = await Bun.file(filePath).bytes();
    return new Response(fileContent, { headers });
}
