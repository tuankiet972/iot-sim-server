const express = require("express");
const axios = require("axios");

const app = express();

// parse JSON body
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("IoT SIM Server Running");
});

// Endpoint để SIM gửi dữ liệu
app.post("/data", async (req, res) => {
  try {
    const data = req.body;
    console.log("Received from SIM:", data);

    // Gửi dữ liệu vào Firebase Realtime Database
    await axios.post(
      "https://iot-sim-server-default-rtdb.firebaseio.com/data.json",
      data
    );

    res.json({ status: "ok", received: data });
  } catch (err) {
    console.error("Error sending to Firebase:", err);
    res.status(500).json({ error: "Failed to save" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
