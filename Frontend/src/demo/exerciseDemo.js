import {
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;

const LEFT_ELBOW = 13;
const RIGHT_ELBOW = 14;

const LEFT_WRIST = 15;
const RIGHT_WRIST = 16;

const LEFT_HIP = 23;
const RIGHT_HIP = 24;

const LEFT_KNEE = 25;
const RIGHT_KNEE = 26;

const LEFT_ANKLE = 27;
const RIGHT_ANKLE = 28;

const POSE_CONNECTIONS_EXERCISE = [
  [11, 12],

  [11, 13],
  [13, 15],

  [12, 14],
  [14, 16],

  [11, 23],
  [12, 24],
  [23, 24],

  [23, 25],
  [25, 27],

  [24, 26],
  [26, 28],

  [27, 29],
  [27, 31],

  [28, 30],
  [28, 32],
];

let poseLandmarker = null;
let stream = null;
let animationFrame = null;

let video = null;
let canvas = null;
let ctx = null;

let currentExercise = "bicep";
let repetitions = 0;
let exerciseState = "ready";
let lastRepTime = 0;

let isRunning = false;
let lastVideoTime = -1;

const EXERCISES = {
  bicep: {
    name: "Bicep Curls",
    icon: "💪",
    description: "Curl your arms upward and return to the starting position.",
  },

  lunge: {
    name: "Lunges",
    icon: "🦵",
    description: "Step forward, lower your body, then return to standing.",
  },

  press: {
    name: "Shoulder Press",
    icon: "🏋️",
    description: "Press your hands upward and return to shoulder height.",
  },

  jumping: {
    name: "Jumping Jacks",
    icon: "⭐",
    description: "Open your arms and legs, then return to the starting position.",
  },

  pushup: {
    name: "Push-ups",
    icon: "🔥",
    description: "Lower your chest and push yourself back up.",
  },
};

function angle(a, b, c) {
  if (!a || !b || !c) return 180;

  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);

  let degrees = Math.abs((radians * 180) / Math.PI);

  if (degrees > 180) {
    degrees = 360 - degrees;
  }

  return degrees;
}

function distance(a, b) {
  if (!a || !b) return 0;

  return Math.sqrt(
    Math.pow(a.x - b.x, 2) +
    Math.pow(a.y - b.y, 2)
  );
}

function average(a, b) {
  return (a + b) / 2;
}

function visible(point) {
  return (
    point &&
    typeof point.x === "number" &&
    typeof point.y === "number" &&
    (point.visibility === undefined || point.visibility > 0.45)
  );
}

function drawSkeleton(landmarks) {
  if (!ctx || !canvas || !Array.isArray(landmarks)) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  POSE_CONNECTIONS_EXERCISE.forEach(([a, b]) => {
    const p1 = landmarks[a];
    const p2 = landmarks[b];

    if (!visible(p1) || !visible(p2)) return;

    ctx.beginPath();
    ctx.moveTo(
      p1.x * canvas.width,
      p1.y * canvas.height
    );

    ctx.lineTo(
      p2.x * canvas.width,
      p2.y * canvas.height
    );

    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  landmarks.forEach((point) => {
    if (!visible(point)) return;

    ctx.beginPath();

    ctx.arc(
      point.x * canvas.width,
      point.y * canvas.height,
      5,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#34d399";
    ctx.fill();
  });
}

function getExerciseData(landmarks) {
  const leftShoulder = landmarks[LEFT_SHOULDER];
  const rightShoulder = landmarks[RIGHT_SHOULDER];

  const leftElbow = landmarks[LEFT_ELBOW];
  const rightElbow = landmarks[RIGHT_ELBOW];

  const leftWrist = landmarks[LEFT_WRIST];
  const rightWrist = landmarks[RIGHT_WRIST];

  const leftHip = landmarks[LEFT_HIP];
  const rightHip = landmarks[RIGHT_HIP];

  const leftKnee = landmarks[LEFT_KNEE];
  const rightKnee = landmarks[RIGHT_KNEE];

  const leftAnkle = landmarks[LEFT_ANKLE];
  const rightAnkle = landmarks[RIGHT_ANKLE];

  const leftElbowAngle = angle(
    leftShoulder,
    leftElbow,
    leftWrist
  );

  const rightElbowAngle = angle(
    rightShoulder,
    rightElbow,
    rightWrist
  );

  const leftKneeAngle = angle(
    leftHip,
    leftKnee,
    leftAnkle
  );

  const rightKneeAngle = angle(
    rightHip,
    rightKnee,
    rightAnkle
  );

  return {
    leftShoulder,
    rightShoulder,

    leftElbow,
    rightElbow,

    leftWrist,
    rightWrist,

    leftHip,
    rightHip,

    leftKnee,
    rightKnee,

    leftAnkle,
    rightAnkle,

    elbowAngle: average(
      leftElbowAngle,
      rightElbowAngle
    ),

    kneeAngle: average(
      leftKneeAngle,
      rightKneeAngle
    ),

    shoulderWidth: distance(
      leftShoulder,
      rightShoulder
    ),

    ankleWidth: distance(
      leftAnkle,
      rightAnkle
    ),

    wristWidth: distance(
      leftWrist,
      rightWrist
    ),
  };
}

function updateBicep(data) {
  const angleValue = data.elbowAngle;

  if (angleValue < 65) {
    exerciseState = "up";
  }

  if (
    exerciseState === "up" &&
    angleValue > 145 &&
    Date.now() - lastRepTime > 600
  ) {
    repetitions++;
    exerciseState = "down";
    lastRepTime = Date.now();
  }

  return {
    metric: `${Math.round(angleValue)}°`,
    label: "Elbow Angle",
    feedback:
      angleValue < 65
        ? "Good curl — squeeze at the top."
        : angleValue > 145
          ? "Lower your arms."
          : "Keep curling.",
  };
}

function updateLunge(data) {
  const knee = data.kneeAngle;

  if (knee < 105) {
    exerciseState = "down";
  }

  if (
    exerciseState === "down" &&
    knee > 155 &&
    Date.now() - lastRepTime > 700
  ) {
    repetitions++;
    exerciseState = "up";
    lastRepTime = Date.now();
  }

  return {
    metric: `${Math.round(knee)}°`,
    label: "Knee Angle",
    feedback:
      knee < 105
        ? "Good depth."
        : knee > 155
          ? "Return to standing."
          : "Lower into the lunge.",
  };
}

function updateShoulderPress(data) {
  const elbow = data.elbowAngle;

  if (elbow < 100) {
    exerciseState = "down";
  }

  if (
    exerciseState === "down" &&
    elbow > 155 &&
    Date.now() - lastRepTime > 700
  ) {
    repetitions++;
    exerciseState = "up";
    lastRepTime = Date.now();
  }

  return {
    metric: `${Math.round(elbow)}°`,
    label: "Elbow Angle",
    feedback:
      elbow > 155
        ? "Arms extended — good."
        : elbow < 100
          ? "Press upward."
          : "Keep pressing.",
  };
}

function updateJumpingJacks(data) {
  const wristsAboveShoulders =
    data.leftWrist &&
    data.rightWrist &&
    data.leftShoulder &&
    data.rightShoulder &&
    data.leftWrist.y < data.leftShoulder.y &&
    data.rightWrist.y < data.rightShoulder.y;

  const legsOpen =
    data.ankleWidth >
    data.shoulderWidth * 1.45;

  const armsAndLegsOpen =
    wristsAboveShoulders && legsOpen;

  const armsDown =
    data.leftWrist &&
    data.rightWrist &&
    data.leftShoulder &&
    data.rightShoulder &&
    data.leftWrist.y > data.leftShoulder.y &&
    data.rightWrist.y > data.rightShoulder.y;

  const legsClosed =
    data.ankleWidth <
    data.shoulderWidth * 1.25;

  const closed =
    armsDown && legsClosed;

  if (armsAndLegsOpen) {
    exerciseState = "open";
  }

  if (
    exerciseState === "open" &&
    closed &&
    Date.now() - lastRepTime > 500
  ) {
    repetitions++;
    exerciseState = "closed";
    lastRepTime = Date.now();
  }

  return {
    metric: armsAndLegsOpen ? "OPEN" : "CLOSED",
    label: "Position",
    feedback: armsAndLegsOpen
      ? "Good — bring your arms and legs back."
      : "Jump open.",
  };
}

function updatePushup(data) {
  const elbow = data.elbowAngle;

  if (elbow < 95) {
    exerciseState = "down";
  }

  if (
    exerciseState === "down" &&
    elbow > 155 &&
    Date.now() - lastRepTime > 700
  ) {
    repetitions++;
    exerciseState = "up";
    lastRepTime = Date.now();
  }

  return {
    metric: `${Math.round(elbow)}°`,
    label: "Elbow Angle",
    feedback:
      elbow < 95
        ? "Good depth — push up."
        : elbow > 155
          ? "Good — lower again."
          : "Keep your body controlled.",
  };
}

function processExercise(landmarks) {
  const data = getExerciseData(landmarks);

  switch (currentExercise) {
    case "bicep":
      return updateBicep(data);

    case "lunge":
      return updateLunge(data);

    case "press":
      return updateShoulderPress(data);

    case "jumping":
      return updateJumpingJacks(data);

    case "pushup":
      return updatePushup(data);

    default:
      return {
        metric: "--",
        label: "Metric",
        feedback: "Choose an exercise.",
      };
  }
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function selectExercise(exercise) {
  currentExercise = exercise;
  repetitions = 0;
  exerciseState = "ready";
  lastRepTime = 0;

  const info = EXERCISES[exercise];

  setText("fs-exercise-name", `${info.icon} ${info.name}`);
  setText("fs-exercise-description", info.description);
  setText("fs-reps", "0");
  setText("fs-feedback", "Get into position.");

  document
    .querySelectorAll(".fs-exercise-button")
    .forEach((button) => {
      button.classList.toggle(
        "fs-active",
        button.dataset.exercise === exercise
      );
    });
}

async function createPoseLandmarker() {
  if (poseLandmarker) {
    return poseLandmarker;
  }

  setText(
    "fs-status",
    "Loading AI pose detector..."
  );

  const vision = await FilesetResolver.forVisionTasks(
    WASM_URL
  );

  poseLandmarker =
    await PoseLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "GPU",
        },

        runningMode: "VIDEO",

        numPoses: 1,

        minPoseDetectionConfidence: 0.5,

        minPosePresenceConfidence: 0.5,

        minTrackingConfidence: 0.5,
      }
    );

  return poseLandmarker;
}

async function startExerciseCamera() {
  try {
    if (isRunning) return;

    const detector =
      await createPoseLandmarker();

    stream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          width: {
            ideal: 1280,
          },

          height: {
            ideal: 720,
          },

          facingMode: "user",
        },

        audio: false,
      });

    video.srcObject = stream;

    await video.play();

    isRunning = true;
    lastVideoTime = -1;

    setText(
      "fs-status",
      "AI camera is running"
    );

    processFrame(detector);
  } catch (error) {
    console.error(
      "Exercise camera error:",
      error
    );

    setText(
      "fs-status",
      "Camera or AI failed to start."
    );

    setText(
      "fs-feedback",
      error.message ||
        "Check camera permission."
    );
  }
}

function stopExerciseCamera() {
  isRunning = false;

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });

    stream = null;
  }

  if (video) {
    video.pause();
    video.srcObject = null;
  }

  if (ctx && canvas) {
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  setText(
    "fs-status",
    "Camera stopped"
  );
}

function processFrame(detector) {
  if (!isRunning || !video.videoWidth) {
    animationFrame =
      requestAnimationFrame(() =>
        processFrame(detector)
      );

    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const now = performance.now();

  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;

    try {
      const result =
        detector.detectForVideo(
          video,
          now
        );

      const landmarks =
        result?.landmarks?.[0];

      if (landmarks) {
        drawSkeleton(landmarks);

        const exerciseResult =
          processExercise(landmarks);

        setText(
          "fs-reps",
          String(repetitions)
        );

        setText(
          "fs-metric",
          exerciseResult.metric
        );

        setText(
          "fs-metric-label",
          exerciseResult.label
        );

        setText(
          "fs-feedback",
          exerciseResult.feedback
        );

        setText(
          "fs-status",
          "Pose detected ✓"
        );
      } else {
        setText(
          "fs-status",
          "Looking for your body..."
        );

        setText(
          "fs-feedback",
          "Move back so your full body is visible."
        );
      }
    } catch (error) {
      console.error(
        "Exercise pose error:",
        error
      );

      setText(
        "fs-status",
        "Pose processing error"
      );
    }
  }

  animationFrame =
    requestAnimationFrame(() =>
      processFrame(detector)
    );
}

function createExerciseUI() {
  if (document.getElementById("fs-exercise-overlay")) {
    return;
  }

  const style =
    document.createElement("style");

  style.textContent = `
    #fs-exercise-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: none;
      background: #020617;
      color: white;
      font-family: Inter, system-ui, sans-serif;
    }

    #fs-exercise-overlay.fs-visible {
      display: block;
    }

    .fs-shell {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .fs-topbar {
      height: 72px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-bottom: 1px solid rgba(148,163,184,.2);
      background: rgba(15,23,42,.96);
    }

    .fs-brand {
      font-size: 20px;
      font-weight: 800;
    }

    .fs-close {
      border: 1px solid #475569;
      background: #0f172a;
      color: white;
      padding: 9px 15px;
      border-radius: 10px;
      cursor: pointer;
    }

    .fs-content {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: 270px 1fr 270px;
      gap: 16px;
      padding: 16px;
    }

    .fs-panel {
      background: rgba(15,23,42,.9);
      border: 1px solid rgba(148,163,184,.2);
      border-radius: 18px;
      padding: 16px;
      overflow-y: auto;
    }

    .fs-panel h3 {
      margin: 0 0 12px;
      font-size: 14px;
      color: #94a3b8;
    }

    .fs-exercise-button {
      width: 100%;
      text-align: left;
      padding: 13px;
      margin-bottom: 9px;
      border-radius: 12px;
      border: 1px solid #334155;
      background: #0f172a;
      color: white;
      cursor: pointer;
      font-weight: 700;
    }

    .fs-exercise-button:hover,
    .fs-exercise-button.fs-active {
      border-color: #22d3ee;
      background: rgba(8,145,178,.18);
    }

    .fs-camera {
      position: relative;
      min-width: 0;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(148,163,184,.2);
    }

    .fs-camera video,
    .fs-camera canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .fs-camera video {
      transform: scaleX(-1);
    }

    .fs-camera canvas {
      transform: scaleX(-1);
      pointer-events: none;
    }

    .fs-camera-message {
      position: absolute;
      top: 14px;
      left: 14px;
      z-index: 3;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(2,6,23,.75);
      border: 1px solid rgba(148,163,184,.25);
      font-size: 13px;
    }

    .fs-stat {
      text-align: center;
      padding: 18px 10px;
      margin-bottom: 12px;
      background: rgba(30,41,59,.65);
      border-radius: 14px;
    }

    .fs-reps-number {
      font-size: 64px;
      line-height: 1;
      font-weight: 900;
      color: #22d3ee;
    }

    .fs-stat-label {
      margin-top: 8px;
      color: #94a3b8;
      font-size: 13px;
    }

    .fs-metric {
      font-size: 28px;
      font-weight: 800;
    }

    .fs-feedback {
      line-height: 1.5;
      color: #cbd5e1;
    }

    .fs-controls {
      display: flex;
      gap: 8px;
      margin-top: 15px;
    }

    .fs-control {
      flex: 1;
      padding: 12px;
      border: 0;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 800;
    }

    .fs-start {
      background: #22d3ee;
      color: #082f49;
    }

    .fs-stop {
      background: #334155;
      color: white;
    }

    @media (max-width: 900px) {
      .fs-content {
        grid-template-columns: 1fr;
        overflow-y: auto;
      }

      .fs-panel {
        max-height: none;
      }

      .fs-camera {
        min-height: 55vh;
      }
    }
  `;

  document.head.appendChild(style);

  const overlay =
    document.createElement("div");

  overlay.id =
    "fs-exercise-overlay";

  overlay.innerHTML = `
    <div class="fs-shell">

      <div class="fs-topbar">
        <div class="fs-brand">
          FitStreak AI • Exercise Studio
        </div>

        <button
          class="fs-close"
          id="fs-close"
        >
          Close
        </button>
      </div>

      <div class="fs-content">

        <div class="fs-panel">

          <h3>CHOOSE EXERCISE</h3>

          <button
            class="fs-exercise-button fs-active"
            data-exercise="bicep"
          >
            💪 Bicep Curls
          </button>

          <button
            class="fs-exercise-button"
            data-exercise="lunge"
          >
            🦵 Lunges
          </button>

          <button
            class="fs-exercise-button"
            data-exercise="press"
          >
            🏋️ Shoulder Press
          </button>

          <button
            class="fs-exercise-button"
            data-exercise="jumping"
          >
            ⭐ Jumping Jacks
          </button>

          <button
            class="fs-exercise-button"
            data-exercise="pushup"
          >
            🔥 Push-ups
          </button>

        </div>

        <div class="fs-camera">

          <video
            id="fs-video"
            autoplay
            playsinline
            muted
          ></video>

          <canvas
            id="fs-canvas"
          ></canvas>

          <div
            class="fs-camera-message"
            id="fs-status"
          >
            Camera not started
          </div>

        </div>

        <div class="fs-panel">

          <h3 id="fs-exercise-name">
            💪 Bicep Curls
          </h3>

          <p
            id="fs-exercise-description"
            class="fs-feedback"
          >
            Curl your arms upward and return to the starting position.
          </p>

          <div class="fs-stat">

            <div
              class="fs-reps-number"
              id="fs-reps"
            >
              0
            </div>

            <div class="fs-stat-label">
              REPETITIONS
            </div>

          </div>

          <div class="fs-stat">

            <div
              class="fs-metric"
              id="fs-metric"
            >
              --
            </div>

            <div
              class="fs-stat-label"
              id="fs-metric-label"
            >
              Metric
            </div>

          </div>

          <div class="fs-stat">

            <div
              class="fs-feedback"
              id="fs-feedback"
            >
              Get into position.
            </div>

          </div>

          <div class="fs-controls">

            <button
              class="fs-control fs-start"
              id="fs-start"
            >
              Start Camera
            </button>

            <button
              class="fs-control fs-stop"
              id="fs-stop"
            >
              Stop
            </button>

          </div>

        </div>

      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  video =
    document.getElementById("fs-video");

  canvas =
    document.getElementById("fs-canvas");

  ctx =
    canvas.getContext("2d");

  document
    .getElementById("fs-close")
    .addEventListener(
      "click",
      () => {
        stopExerciseCamera();

        overlay.classList.remove(
          "fs-visible"
        );
      }
    );

  document
    .getElementById("fs-start")
    .addEventListener(
      "click",
      startExerciseCamera
    );

  document
    .getElementById("fs-stop")
    .addEventListener(
      "click",
      stopExerciseCamera
    );

  document
    .querySelectorAll(
      ".fs-exercise-button"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          selectExercise(
            button.dataset.exercise
          );
        }
      );
    });
}

function addExerciseButton() {
  const buttons =
    Array.from(
      document.querySelectorAll("button")
    );

  const liveDemoButton =
    buttons.find((button) =>
      button.textContent
        ?.toLowerCase()
        .includes("watch live demo")
    );

  if (!liveDemoButton) {
    return;
  }

  // Prevent the original Live Demo action
  // and open the new AI Exercise Studio instead.
  liveDemoButton.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const overlay =
        document.getElementById(
          "fs-exercise-overlay"
        );

      if (!overlay) {
        return;
      }

      overlay.classList.add(
        "fs-visible"
      );

      selectExercise("bicep");
    },
    true
  );
}

function initialize() {
  createExerciseUI();

  addExerciseButton();

  setTimeout(
    addExerciseButton,
    1000
  );

  setTimeout(
    addExerciseButton,
    2500
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );
} else {
  initialize();
}