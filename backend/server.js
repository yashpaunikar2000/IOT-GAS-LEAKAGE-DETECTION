require("dotenv").config();

const express = require("express");
const http = require("http");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

let alreadyAlerted = false;

const app = express();
const server = http.createServer(app);
const PORT = 3000;

let latestGasValue = 0;
let gasStatus = "SAFE";

const arduino = new SerialPort({
  path: "COM7",
  baudRate: 9600,
});

const parser = arduino.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", async (line) => {
  line = line.trim();

  if (line.startsWith("GAS:")) {
    latestGasValue = parseInt(line.replace("GAS:", ""));

    if (latestGasValue <= 200) gasStatus = "SAFE";
    else if (latestGasValue <= 350) gasStatus = "WARNING";
    else gasStatus = "DANGER";

    console.log("Gas:", latestGasValue, "| Status:", gasStatus);

    if (gasStatus === "DANGER" && !alreadyAlerted) {
      alreadyAlerted = true;

      try {
        await client.messages.create({
          body: `⚠️ GAS ALERT!\nHazardous gas detected!\nReading: ${latestGasValue}\nStatus: DANGER\nAct immediately!`,
          from: process.env.TWILIO_WHATSAPP_FROM,
          to: process.env.TWILIO_WHATSAPP_TO,
        });

        console.log("📩 WhatsApp Alert Sent!");
      } catch (err) {
        console.log("❌ WhatsApp Error:", err.message);
      }
    }

    if (gasStatus === "SAFE") {
      alreadyAlerted = false;
    }
  }
});

// SSE Stream + Static folder remain SAME as before
app.use(express.static("public"));

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const interval = setInterval(() => {
    res.write(
      `data: ${JSON.stringify({
        value: latestGasValue,
        status: gasStatus,
      })}\n\n`
    );
  }, 100);

  req.on("close", () => clearInterval(interval));
});

server.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
);
