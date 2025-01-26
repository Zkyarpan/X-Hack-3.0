import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { chromium } from "playwright";
import userRouter from "./routes/sellerRoutes.js";
import farmerRouter from "./routes/farmerRouter.js";
import plantRouter from "./routes/plantRouter.js";
import plantRequestRouter from "./routes/plantRequestRouter.js";
import blogRouter from "./routes/blogRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Let's hack the hackathon..." });
});

app.use("/api", userRouter);
app.use("/api/farmers", farmerRouter);
app.use("/api/plants", plantRouter);
app.use("/api/plantsrequest", plantRequestRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/dashboard", dashboardRouter);

async function fetchVegetablePrices() {
  const browser = await chromium.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Path to Chrome
    headless: true, // Run in headless mode
  });

  const page = await browser.newPage();
  await page.goto("https://nepalipatro.com.np/vegetables");

  // Extract table data
  const vegetables = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    return rows.map((row) => {
      const columns = row.querySelectorAll("td");
      return {
        name: columns[0]?.innerText.trim(),
        avgPrice: columns[1]?.innerText.trim(),
        minPrice: columns[2]?.innerText.trim(),
        maxPrice: columns[3]?.innerText.trim(),
      };
    });
  });

  await browser.close();
  return vegetables;
}

// API endpoint to fetch vegetable prices
app.get("/api/vegetable-prices", async (req, res) => {
  try {
    const vegetables = await fetchVegetablePrices();

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [{ message: "Vegetable Prices Succcessfully Implmented" }],
      Result: { data: vegetables },
    });
  } catch (error) {
    return res.status(500).json({
      IsSuccess: false,
      message: "Failed to fetch vegetable prices",
    });
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
