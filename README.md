# 🚨 IoT-Based Smart Gas Monitoring & Emergency Alert System

A compact embedded + cloud IoT solution that detects hazardous gas leaks using MQ-2, triggers local alarms, and instantly sends remote alerts through WhatsApp/SMS using a Node.js server integrated with Twilio.

This system demonstrates end-to-end embedded engineering, from sensor-level firmware to cloud communication and real-time monitoring.

## 🔍 Project Summary

This device keeps track of combustible gas levels in real time.
When readings cross predefined safety limits:

- The buzzer + LED activate on-device
- Gas data is sent to a backend server via UART
- Twilio API pushes WhatsApp/SMS alerts for emergencies
- A live dashboard reflects updated gas levels in real-time

Ideal for home safety, laboratories, hostels, chemical storage, and industrial setups.

---

## 🧩 System Workflow

<img width="1565" height="1104" alt="image" src="https://github.com/user-attachments/assets/66625476-232c-4596-bbe3-f24ecdcbc4f5" />

---

## 🔧 Circuit Reference

<img width="1080" height="720" alt="image" src="https://github.com/user-attachments/assets/2d97971d-6dca-4ab2-8da7-6f302757bceb" />

<img width="447" height="503" alt="image" src="https://github.com/user-attachments/assets/a0f43339-0563-423b-b413-5699ab5115fd" />

---

## 🔌 Circuit Diagram (Add Your PNG Here)

Add your own circuit.png in the repo.

![Circuit Diagram](https://github.com/user-attachments/assets/21dea74d-d6ce-4207-b9d2-2f56c954f632)

---

## 🌟 Key Features

- Continuous gas sensing using MQ-2
- Arduino-based embedded firmware (C/C++)
- Safety alerts via buzzer & LED
- UART serial communication with backend
- WhatsApp/SMS emergency alert automation (Twilio)
- Real-time dashboard using Server-Sent Events
- Simple, modular folder structure suitable for resume projects

---

## 🛠️ Technology Stack

### Hardware / Embedded
- Arduino Uno
- MQ-2 Gas Sensor
- Buzzer + Indicator LED
- Analog-to-Digital Conversion
- UART serial communication
- C/C++ Firmware

### Backend Services
- Node.js + Express
- Twilio Messaging APIs
- SerialPort library
- SSE (Live updates to client)

---

# 📂 Folder Structure

```
iot-gas-detection-embedded-system/
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── public/
│
├── firmware/
│   └── gas_firmware.ino
│
├── docs/
│   ├── architecture.png
│   ├── circuit.png
│   └── report.pdf
│
├── .gitignore
└── README.md
```

---


## 🚀 Operational Flow (Simple Explanation)

- MQ-2 measures gas concentration every few milliseconds
- The microcontroller reads analog values and compares them with thresholds
- If the value enters Warning or Danger, local alarm activates
- Arduino sends data to the backend through UART
- Backend evaluates risk and sends WhatsApp/SMS alerts using Twilio
- Dashboard displays real-time sensor readings via SSE

---

## 📊 Gas Level Interpretation

| Range | State | Meaning |
|-------|--------|-------------|
| 0–200 | 🟢 Normal | Safe environment |
| 201–350 | 🟡 Caution | Slight increase detected |
| 351+ | 🔴 Critical | High risk → Alerts triggered |

---

## 👤 Created By

Yash Paunikar (NIT Warangal)  
Embedded Systems + IoT Enthusiast

---

## 🙏 Thanks for Checking Out This Project!

If you plan to extend or optimize this system, feel free to fork the repo and experiment.


