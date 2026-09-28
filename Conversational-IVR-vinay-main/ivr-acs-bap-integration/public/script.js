document.addEventListener("DOMContentLoaded", () => {
  const screens = {
    call: document.getElementById("call-screen"),
    keypad: document.getElementById("keypad-screen"),
  };

  const callScreen = screens.call;
  const keypadScreen = screens.keypad;

  const keypadToggleButton = document.getElementById("keypad-toggle-btn");
  const transcript = document.getElementById("transcript");
  const keypadButtons = document.querySelectorAll(".key");
  const talkBtnMain = document.getElementById("talk-btn-main");
  const talkBtnKeypad = document.getElementById("talk-btn-keypad");
  const timerDisplay = document.getElementById("timer");
  const hangupBtns = document.querySelectorAll(".hangup-btn");

  const sessionId = `session-${Date.now()}`;
  let recognition;
  let callEnded = false;

  // =========================
  // Speech Recognition
  // =========================

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      if (callEnded) return;

      const speechResult = event.results[0][0].transcript;

      addToTranscript(speechResult, "user");

      sendRequest("/api/ivr/conversation", {
        sessionId,
        query: speechResult,
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }

  // =========================
  // Initial Greeting
  // =========================

  const initialGreeting =
    "Hello, what can I help you with? Please choose from the following options. Say 'Balance' for account balance, 'Pay' for bill payment, or 'Speak to an agent'.";

  let greeted = false;

  // =========================
  // Keypad Toggle
  // =========================

  keypadToggleButton.addEventListener("click", () => {
    if (callEnded) return;

    callScreen.style.display = "none";
    keypadScreen.style.display = "flex";

    if (!greeted) {
      displayResponse(initialGreeting);
      greeted = true;
    }
  });

  // =========================
  // Talk Buttons
  // =========================

  talkBtnMain.addEventListener("click", handleSpeechInput);
  talkBtnKeypad.addEventListener("click", handleSpeechInput);

  function handleSpeechInput() {
    if (callEnded) return;

    if (recognition) {
      try {
        speechSynthesis.cancel();
        recognition.start();
      } catch (error) {
        console.error("Unable to start speech recognition:", error);
      }
    } else {
      displayResponse(
        "Speech recognition is not supported in this browser."
      );
    }
  }

  // =========================
  // Keypad Buttons
  // =========================

  keypadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (callEnded) return;

      const digit = button.textContent.trim().charAt(0);

      if (!isNaN(digit) || digit === "*" || digit === "#") {
        handleDtmfInput(digit);
      }
    });
  });

  // =========================
  // Call Timer
  // =========================

  let seconds = 0;

  const callTimer = setInterval(() => {
    if (callEnded) return;

    seconds++;

    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);

  // =========================
  // END CALL
  // =========================

  hangupBtns.forEach((button) => {
    button.addEventListener("click", endCall);
  });

  function endCall() {
  if (callEnded) return;

  callEnded = true;

  // Stop timer
  clearInterval(callTimer);

  // Stop speech recognition
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.log("Speech recognition already stopped.");
    }
  }

  // Stop text-to-speech
  speechSynthesis.cancel();

  // Hide call screens
  callScreen.style.display = "none";
  keypadScreen.style.display = "none";

  // Create ended screen
  const endedScreen = document.createElement("div");
  endedScreen.id = "ended-screen";
  endedScreen.className = "ended-screen";

  endedScreen.innerHTML = `
    <div class="ended-icon">
      <i class="fas fa-phone-slash"></i>
    </div>

    <h2>Call Ended</h2>

    <p>Thank you for using our banking service.</p>

    <button id="new-call-btn">
      <i class="fas fa-phone"></i>
      Start New Call
    </button>
  `;

  document.body.appendChild(endedScreen);

  // Start new call
  document
    .getElementById("new-call-btn")
    .addEventListener("click", () => {
      location.reload();
    });

  console.log("Call ended successfully.");
}

  // =========================
  // DTMF Input
  // =========================

  function handleDtmfInput(digit) {
    if (callEnded) return;

    addToTranscript(`Pressed: ${digit}`, "user");

    const payload = {
      sessionId,
      inputType: "DTMF",
      inputValue: digit,
    };

    sendRequest("/api/ivr/handle-input", payload);
  }

  // =========================
  // API Request
  // =========================

  async function sendRequest(endpoint, payload) {
    if (callEnded) return;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const responseText =
        data.message || data.error || "No response text found.";

      if (!callEnded) {
        displayResponse(responseText);
      }
    } catch (error) {
      console.error("API Error:", error);

      if (!callEnded) {
        displayResponse("Sorry, there was a connection error.");
      }
    }
  }

  // =========================
  // Display Response
  // =========================

  function displayResponse(text) {
    if (callEnded) return;

    addToTranscript(text, "bot");
    speakText(text);
  }

  // =========================
  // Text To Speech
  // =========================

  function speakText(text) {
    if (callEnded) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);
  }

  // =========================
  // Transcript
  // =========================

  function addToTranscript(text, type) {
    const p = document.createElement("p");

    p.textContent = text;

    p.className =
      type === "user" ? "user-message" : "bot-message";

    transcript.appendChild(p);

    transcript.scrollTop = transcript.scrollHeight;
  }
});