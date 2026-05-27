let handlerPromise;

async function getHandler() {
  handlerPromise ??= import("../dist/api.js").then(module => module.default);
  return handlerPromise;
}

export default async function handler(req, res) {
  try {
    const handle = await getHandler();
    return handle(req, res);
  } catch (error) {
    console.error("[api bootstrap failed]", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("API bootstrap failed");
  }
}
