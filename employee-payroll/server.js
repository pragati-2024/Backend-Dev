import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import pageRoute from "./routes/pageRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import { loggingMiddleware } from "./middleware/loging.js";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(loggingMiddleware);
app.use("/", pageRoute);
app.use("/api", employeeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
