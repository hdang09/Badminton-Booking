import { createServer, Model, Response } from "miragejs";
import users from "./fixtures/users";
import auths from "./fixtures/auths";
import centers from "./fixtures/centers";
import courts from "./fixtures/courts";

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
      centers: Model.extend(),
      courts: Model.extend(),
    },

    fixtures: {
      users,
      auths,
      centers,
      courts,
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

      // GET /badminton-booking/api/center/owner/{{ownerId}}?size=5&page=1&sort=courtCenterName&direction=DESC
      this.get("/badminton-booking/api/center/owner", (schema, request) => {
        try {
          return schema.centers.all().models;
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });

      // GET /badminton-booking/api/center/{{centerId}}
      this.get("/badminton-booking/api/center/:centerId", (schema, request) => {
        try {
          let centerId = request.params.centerId;
          let center = schema.centers.find(centerId);

          if (center) {
            return center.attrs;
          } else {
            return new Response(404, {}, { message: "Center not found" });
          }
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // POST /badminton-booking/api/center
      this.post("/badminton-booking/api/center", (schema, request) => {
        try {
          let attrs = JSON.parse(request.requestBody);

          let newCenter = schema.centers.create({
            courtOwnerId: attrs.courtOwnerId,
            createdBy: attrs.createdBy,
            courtCenterName: attrs.courtCenterName,
            address: attrs.address,
            latitude: attrs.latitude,
            longtitude: attrs.longtitude,
            province: attrs.province,
            district: attrs.district,
            ward: attrs.ward,
          });

          return newCenter;
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // PUT /badminton-booking/api/center/:centerId
      this.put("/badminton-booking/api/center/:centerId", (schema, request) => {
        try {
          let centerId = request.params.centerId;
          let attrs = JSON.parse(request.requestBody);
          let center = schema.centers.find(centerId);

          if (center) {
            return center.update(attrs);
          } else {
            return new Response(404, {}, { message: "Center not found" });
          }
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // GET /badminton-booking/api/center/owner/{{ownerId}}?size=5&page=1&sort=courtCenterName&direction=DESC
      this.get("/badminton-booking/api/center/owner", (schema, request) => {
        try {
          return schema.centers.all().models;
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });

      // GET /badminton-booking/api/court?centerId=3
      this.get("/badminton-booking/api/court", (schema, request) => {
        const centerId = request.queryParams.centerId;

        if (!centerId) {
          return new Response(400, {}, { message: "CenterId is required" });
        }

        const courts = schema.courts.where({ centerId: parseInt(centerId) });

        if (courts.length === 0) {
          return new Response(404, {}, { message: "No courts found for this center" });
        }

        return courts;
      });

      // GET /badminton-booking/api/court?centerId=3?courtId=1
      this.get("/badminton-booking/api/court", (schema, request) => {
        const centerId = request.queryParams.centerId;
        const courtId = request.queryParams.courtId;

        if (!centerId) {
          return new Response(400, {}, { message: "CenterId is required" });
        }

        const courts = schema.courts.where({ centerId: parseInt(centerId), id: parseInt(courtId) });

        if (courts.length === 0) {
          return new Response(404, {}, { message: "No court found for this center" });
        }

        return courts;
      });
    },
  });

  return server;
}
