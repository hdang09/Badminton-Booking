import { createServer, Model, Response } from "miragejs";
import users from "./fixtures/users";
import auths from "./fixtures/auths";
import centers from "./fixtures/centers";
import courts from "./fixtures/courts";
import { getRandomInt } from "@/libs/helper";
const API_URL = "https://badminton-booking-api-v3mmhjoipq-as.a.run.app/badminton-booking";

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
        try {
          const res = fetch(`${API_URL}/api/auth/sign-in`, {
            method: "POST",
            body: JSON.stringify(attrs),
            headers: {
              "Content-Type": "application/json",
            },
          });
          return res.json();
        } catch (e) {
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
        }
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

      // GET /center/owner?ownerId=1
      this.get("/center/owner", async (schema, request) => {
        try {
          const res = await fetch(
            `https://badminton-booking-api-v3mmhjoipq-as.a.run.app/badminton-booking/api/center/owner?ownerId=${request.queryParams.ownerId}`,
          );
          return res.json();
        } catch (error) {
          console.log("error", error);

          return schema.centers.all().models;
        }
      });

      // GET /center/{{centerId}}
      this.get("/center/:centerId", async (schema, request) => {
        try {
          const res = await fetch(`${API_URL}/api/center/${request.params.centerId}`);
          return res.json();
        } catch (error) {
          let centerId = request.params.centerId;
          let center = schema.centers.find(centerId);

          if (center) {
            return center.attrs;
          } else {
            return new Response(404, {}, { message: "Center not found" });
          }
        }
      });

      // POST /center
      this.post("/center", async (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        try {
          console.log("1");

          const res = await fetch(`${API_URL}/api/center`, {
            method: "POST",
            body: JSON.stringify(attrs),
            headers: {
              "Content-Type": "application/json",
            },
          });
          return res.json();
        } catch (error) {
          console.log("2");

          let newCenter = schema.centers.create(attrs);
          return newCenter;
        }
      });

      // PUT /center
      this.put("/center", (schema, request) => {
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

      // GET /court?centerId=3?courtId=1
      this.get("/court", (schema, request) => {
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

      // POST /center
      this.post("/court", (schema, request) => {
        try {
          let attrs = JSON.parse(request.requestBody);

          let newCourt = schema.courts.create(attrs);

          return newCourt;
        } catch (error) {
          return new Response(500, {}, { message: "Internal Server Error" });
        }
      });

      // PUT /center
      this.put("/center", (schema, request) => {
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

      // GET /dashboard
      this.get("/dashboard", (schema, request) => {
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

      // GET /payment
      this.get("/payment", (schema, request) => {
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

      // GET /booking?ownerId=1&centerId=1
      this.get("/booking", (schema, request) => {
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

      this.passthrough(`${API_URL}/**`);
    },
  });

  return server;
}
