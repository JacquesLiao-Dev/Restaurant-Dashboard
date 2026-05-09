import cors from "cors";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";

import { env } from "./config/env";
import { customersRouter } from "./modules/customers/customers.routes";
import { menuRouter } from "./modules/menu/menu.routes";
import { ordersRouter } from "./modules/orders/orders.routes";
import { settingsRouter } from "./modules/settings/settings.routes";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";

export const app = express();

app.use(
  pinoHttp({
    transport:
      env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
          }
        : undefined,
  }),
);
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  return response.json({
    status: "ok",
    service: "restaurant-dashboard-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/customers", customersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/menu", menuRouter);
app.use("/api/settings", settingsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
