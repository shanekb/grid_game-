const express = require("express");
const cors = require("cors"); 

const app = express();
app.use(cors());
app.use(express.json());

// Game state (simple version)
let player1 = { x: 0, y: 0 };
let player2 = { x: 9, y: 9 };

// Get current positions
app.get("/position", (req, res) => {
  res.json({ player1, player2 });
});

// Move a player
app.post("/move", (req, res) => {
  const { direction, secret, player } = req.body;

  if (secret !== "MY_SECRET_KEY") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const p = player === "player1" ? player1 : player2;

  if (direction === "up" && p.y > 0) p.y--;
  if (direction === "down" && p.y < 9) p.y++;
  if (direction === "left" && p.x > 0) p.x--;
  if (direction === "right" && p.x < 9) p.x++;

  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
