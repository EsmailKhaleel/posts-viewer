if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((err) => console.log("Service Worker Registration Failed", err));
}

let leavingTime;
let timeLeft = 30;
let hasAlerted = false;

let btn = document.createElement('input');
btn.type = 'button';
btn.value = 'Show Notification';
btn.style.display = 'block';
btn.style.margin = '20px auto';
document.body.prepend(btn);
btn.onclick = function(){
  sendNotification("hello user");
}

Notification.requestPermission().then((permission) => {
  if (permission !== "granted") {
    alert("Please allow notifications to avoid losing your exam!");
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    startCountDown();
  } else {
    clearInterval(leavingTime);
    timeLeft = 30;
    hasAlerted = false;
  }
});

function startCountDown() {
  if (!hasAlerted) {
    sendNotification(`Warning! You have ${timeLeft} seconds to return before the exam closes!`);
    hasAlerted = true;
  }

  leavingTime = setInterval(() => {
    timeLeft--;

    if (timeLeft > 0) {
      sendNotification(`You have ${timeLeft} seconds left! Return now!`);
    } else {
      sendNotification("Exam Closed! You did not return in time.");
      confirm("Exam is now closed. Click OK to exit.");
      location.href = 'timeOut.html';
      clearInterval(leavingTime);
    }
  }, 1000);
}

function sendNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("Exam Warning", { body: message, tag: "exam-countdown" });
  } else {
    alert(message);
  }
}
