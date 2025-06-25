const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api/songs", (req, res) => {
  res.send("mfw songs");
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})