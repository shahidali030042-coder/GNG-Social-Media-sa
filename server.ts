import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("gng.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    points INTEGER DEFAULT 500,
    referral_code TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    campaign_name TEXT,
    budget_type TEXT,
    budget_amount REAL,
    target_audience TEXT,
    image_url TEXT,
    title TEXT,
    description TEXT,
    cta_text TEXT,
    duration_days INTEGER,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    amount REAL,
    points INTEGER,
    status TEXT DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed initial user if not exists
const seedUser = db.prepare("SELECT * FROM users WHERE email = ?").get("user@example.com");
if (!seedUser) {
  db.prepare("INSERT INTO users (email, points, referral_code) VALUES (?, ?, ?)").run(
    "user@example.com",
    500,
    "GNG-12345"
  );
}

// Seed initial ads if not exists
const adsCount = db.prepare("SELECT COUNT(*) as count FROM ads").get().count;
if (adsCount === 0) {
  const userId = db.prepare("SELECT id FROM users WHERE email = ?").get("user@example.com").id;
  const demoAds = [
    {
      campaign_name: "GNG Premium Launch",
      budget_type: "lifetime",
      budget_amount: 1000,
      target_audience: "All Users",
      image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=450",
      title: "Boost Your Social Presence with GNG",
      description: "Get started with GNG Social Media and reach millions of users worldwide. Join the revolution of points-based rewards!",
      cta_text: "Install Now",
      duration_days: 30
    },
    {
      campaign_name: "Summer Sale 2024",
      budget_type: "daily",
      budget_amount: 50,
      target_audience: "Young Adults",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450",
      title: "Exclusive Summer Deals are Here!",
      description: "Don't miss out on our biggest sale of the year. Shop now and earn extra GNG points on every purchase.",
      cta_text: "Shop Now",
      duration_days: 15
    },
    {
      campaign_name: "Connect with Experts",
      budget_type: "lifetime",
      budget_amount: 500,
      target_audience: "Professionals",
      image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=450",
      title: "Grow Your Network Today",
      description: "Connect with industry leaders and grow your professional network using GNG's advanced social tools.",
      cta_text: "WhatsApp Now",
      duration_days: 20
    }
  ];

  const insertAd = db.prepare(`
    INSERT INTO ads (user_id, campaign_name, budget_type, budget_amount, target_audience, image_url, title, description, cta_text, duration_days)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const ad of demoAds) {
    insertAd.run(
      userId,
      ad.campaign_name,
      ad.budget_type,
      ad.budget_amount,
      ad.target_audience,
      ad.image_url,
      ad.title,
      ad.description,
      ad.cta_text,
      ad.duration_days
    );
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/user/:email", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(req.params.email);
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
  });

  app.get("/api/ads", (req, res) => {
    const ads = db.prepare("SELECT * FROM ads ORDER BY created_at DESC").all();
    res.json(ads);
  });

  app.post("/api/ads", (req, res) => {
    const { user_id, campaign_name, budget_type, budget_amount, target_audience, image_url, title, description, cta_text, duration_days } = req.body;
    const result = db.prepare(`
      INSERT INTO ads (user_id, campaign_name, budget_type, budget_amount, target_audience, image_url, title, description, cta_text, duration_days)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(user_id, campaign_name, budget_type, budget_amount, target_audience, image_url, title, description, cta_text, duration_days);
    
    // Deduct points (mock logic: 1 point per 1 PKR budget)
    db.prepare("UPDATE users SET points = points - ? WHERE id = ?").run(budget_amount, user_id);
    
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/admin/stats", (req, res) => {
    const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    const totalAds = db.prepare("SELECT COUNT(*) as count FROM ads").get().count;
    const totalPoints = db.prepare("SELECT SUM(points) as sum FROM users").get().sum;
    res.json({ totalUsers, totalAds, totalPoints });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
