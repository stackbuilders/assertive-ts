import { userEvent } from "@testing-library/react-native";
import Sinon from "sinon";

process.env.RNTL_SKIP_AUTO_DETECT_FAKE_TIMERS = "true";

const newUserEvent = userEvent.setup({
  advanceTimers: delay => Sinon.clock.tickAsync(delay).then(),
  delay: 0,
});

Object.assign(userEvent, newUserEvent);
