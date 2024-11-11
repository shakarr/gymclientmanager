const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
const maxResBtn = document.getElementById("maxResBtn");
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");
const version = document.getElementById("version");
const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

function changeMaxResBtn(isMaximizedApp) {
  if (isMaximizedApp) {
    maxResBtn.title = "Restore";
    maxResBtn.classList.remove("maximizeBtn");
    maxResBtn.classList.add("restoreBtn");
  } else {
    maxResBtn.title = "Maximize";
    maxResBtn.classList.remove("restoreBtn");
    maxResBtn.classList.add("maximizeBtn");
  }
}

function closeNotification() {
  notification.classList.add("hidden");
}
function restartApp() {
  ipcRenderer.send("restart_app");
}

closeBtn.addEventListener("click", () => {
  ipc.send("closeApp");
});

ipc.on("isMaximized", () => {
  changeMaxResBtn(true);
});
ipc.on("isRestored", () => {
  changeMaxResBtn(false);
});

minimizeBtn.addEventListener("click", () => {
  ipc.send("minimizeApp");
});

ipcRenderer.send("app_version");

ipcRenderer.on("app_version", (event, arg) => {
  ipcRenderer.removeAllListeners("app_version");
  version.innerText = arg.version;
});

ipcRenderer.on("update_available", () => {
  ipcRenderer.removeAllListeners("update_available");
  message.innerText = "Hay una nueva actualización disponible. Descargando...";
  notification.classList.remove("hidden");
});

ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Actualización descargada. Se instalará después de reiniciar. ¿Desea reiniciar ahora?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});
