import { createServer } from "./server";

createServer().then((server) => {
  server.listen(8080, () => {
    console.log(`Listening on http://localhost:8080`);
  });
});
