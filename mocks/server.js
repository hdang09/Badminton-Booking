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

          let newCenter = schema.centers.create(attrs);

          return newCenter;
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // PUT /badminton-booking/api/center
      this.put("/badminton-booking/api/center", (schema, request) => {
        try {
          let attrs = JSON.parse(request.requestBody);
          let centerId = attrs.id;
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

      // GET /badminton-booking/api/court?centerId=3?courtId=1
      this.get("/badminton-booking/api/court", (schema, request) => {
        const centerId = request.queryParams.centerId;
        const courtId = request.queryParams.courtId;

        if (!centerId) {
          return new Response(400, {}, { message: "CenterId is required" });
        }

        let courts = schema.courts.where({
          courtCenterId: parseInt(centerId),
        });

        if (courtId) {
          courts = schema.courts.where({
            id: parseInt(courtId),
          });

          if (courts.length === 0) {
            return new Response(404, {}, { message: "No court found for this center" });
          }

          return courts.models[0].attrs;
        }

        if (courts.length === 0) {
          return new Response(404, {}, { message: "No court found for this center" });
        }

        return courts.models;
      });

      // POST /badminton-booking/api/center
      this.post("/badminton-booking/api/court", (schema, request) => {
        try {
          let attrs = JSON.parse(request.requestBody);

          let newCourt = schema.courts.create(attrs);

          return newCourt;
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // PUT /badminton-booking/api/center
      this.put("/badminton-booking/api/center", (schema, request) => {
        try {
          let attrs = JSON.parse(request.requestBody);
          let court = schema.courts.find(attrs.id);

          if (court) {
            return court.update(attrs);
          } else {
            return new Response(404, {}, { message: "Court not found" });
          }
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // GET /badminton-booking/api/dashboard
      this.get("/badminton-booking/api/dashboard", (schema, request) => {
        try {
          return {
            reports: [
              {
                title: "Tổng trung tâm",
                total: schema.centers.all().models.length,
                isIncrease: true,
                percentage: 25,
              },
              {
                title: "Tổng sân",
                total: schema.courts.all().models.length,
                isIncrease: false,
                percentage: 10,
              },
              {
                title: "Tổng lịch đặt",
                total: 10,
                isIncrease: true,
                percentage: 50,
              },
              {
                title: "Tổng doanh thu",
                total: 1600,
                isIncrease: false,
                percentage: 5,
              },
            ],
            top5Centers: schema.centers.all().models.slice(0, 5),
            countCourtByCenter: {
              labels: ["Trung tâm Hà Nội", "Trung tâm Đà Nẵng", "Trung tâm Bình Dương"],
              data: [5, 4, 8],
            },
          };
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });

      // GET /badminton-booking/api/payment
      this.get("/badminton-booking/api/payment", (schema, request) => {
        try {
          return [
            {
              id: 1,
              fullName: "Nguyễn Văn A",
              phone: "0123456789",
              amount: 425000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 2,
              fullName: "Nguyễn Văn B",
              phone: "0123456789",
              amount: 425000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 3,
              fullName: "Nguyễn Văn C",
              phone: "0123456789",
              amount: 565000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 4,
              fullName: "Nguyễn Văn D",
              phone: "0123456789",
              amount: 425000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 5,
              fullName: "Nguyễn Văn E",
              phone: "0123456789",
              amount: 565000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 6,
              fullName: "Nguyễn Văn F",
              phone: "0123456789",
              amount: 425000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 7,
              fullName: "Nguyễn Văn G",
              phone: "0123456789",
              amount: 425000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
            {
              id: 8,
              fullName: "Nguyễn Văn H",
              phone: "0123456789",
              amount: 565000,
              paymentType: "Chuyển khoản",
              createdAt: "2021-06-01",
            },
          ];
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });

      // GET /badminton-booking/api/booking?ownerId=1&centerId=1
      this.get("/badminton-booking/api/booking", (schema, request) => {
        try {
          return [
            { title: "Sân Vip 1", start: "2024-08-26T10:00:00", end: "2024-08-26T11:00:00" },
            { title: "Sân Vip 2", start: "2024-08-27T13:30:00", end: "2024-08-27T15:00:00" },
            { title: "Sân Vip 3", start: "2024-08-28T09:00:00", end: "2024-08-28T10:30:00" },
            { title: "Sân Vip 4", start: "2024-08-29T14:00:00", end: "2024-08-29T16:00:00" },
            { title: "Sân Vip 5", start: "2024-08-30T08:00:00", end: "2024-08-30T09:00:00" },
            { title: "Sân Vip 6", start: "2024-08-31T17:00:00", end: "2024-08-31T18:00:00" },
            { title: "Sân Vip 7", start: "2024-09-01T15:00:00", end: "2024-09-01T16:30:00" },
          ];
        } catch (error) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
      });
    },
  });

  return server;
}
