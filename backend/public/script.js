// SSE Real-time connection
const stream = new EventSource("/stream");

stream.onmessage = (event) => {
  const data = JSON.parse(event.data);

  document.getElementById("value").innerText = data.value;

  const statusEl = document.getElementById("status");
  statusEl.innerText = data.status;

  if (data.status === "SAFE") {
    statusEl.style.color = "green";
  } else if (data.status === "WARNING") {
    statusEl.style.color = "orange";
  } else {
    statusEl.style.color = "red";
  }
};
