import serverless from "serverless-http";
import app from "./app";
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT ?? 4000;
  app.listen(PORT, () =>
    console.log(`Server 🚀 Started http://localhost:${PORT}/`)
  );
} else {
  module.exports.handler = serverless(app);
}
