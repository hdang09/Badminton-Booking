import { createServer, Model, Response } from "miragejs";
import users from "./fixtures/users";
import auths from "./fixtures/auths";

function checkValidToken(token) {
  if (token) {
    const [timeOut, id] = token.split(" ")[1].split("-");
    if (timeOut && id && Date.now() <= parseInt(timeOut)) {
      return id;
    }
  }
  throw Error("Unauthorized");
}

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend(),
      auth: Model.extend(),
    },

    fixtures: {
      users,
      auths,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.namespace = "api";

      // POST /api/auth/signin
      this.post("/auth/sign-in", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const auth = schema.auths.findBy({
          username: attrs.username,
          password: attrs.password,
        });
        if (auth) {
          return {
            token: `${Date.now() + 1 * 60 * 1000}-${auth.id}`,
          };
        }
        return new Response(401, {}, "Unauthorized");
      });

      // GET /api/user/:id
      this.get("/users/profile", (schema, request) => {
        const token = request.requestHeaders.Authorization;
        try {
          const userId = checkValidToken(token);
          return schema.users.find(userId).attrs;
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });
    },
  });

  return server;
}
