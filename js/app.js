// Starts the page by wiring the empty modules together.

import { mountScreens } from "./screens.js";
import { createGame } from "./game.js";
import { createScoreStore } from "./storage.js";
import { createTiltInput } from "./orientation.js";
import { createFeedback } from "./feedback.js";

const scores = createScoreStore();
const tilt = createTiltInput();
const feedback = createFeedback();
const game = createGame({ scores, tilt, feedback });

mountScreens(document.body, { game });
