# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> quality and social proof sections appear and stay stable on scroll
- Location: tests/responsive.spec.ts:15:1

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/webkit-2272/pw_run.sh --inspector-pipe --headless --no-startup-window
<launched> pid=36115
[pid=36115][err] /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/webkit-2272/pw_run.sh: line 7: 36121 Abort trap: 6           DYLD_FRAMEWORK_PATH="$DYLIB_PATH" DYLD_LIBRARY_PATH="$DYLIB_PATH" "$PLAYWRIGHT" "$@"
Call log:
  - <launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/webkit-2272/pw_run.sh --inspector-pipe --headless --no-startup-window
  - <launched> pid=36115
  - [pid=36115][err] /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/webkit-2272/pw_run.sh: line 7: 36121 Abort trap: 6           DYLD_FRAMEWORK_PATH="$DYLIB_PATH" DYLD_LIBRARY_PATH="$DYLIB_PATH" "$PLAYWRIGHT" "$@"
  - [pid=36115] <gracefully close start>
  - [pid=36115] <kill>
  - [pid=36115] <will force kill>
  - [pid=36115] exception while trying to kill process: Error: kill ESRCH
  - [pid=36115] <process did exit: exitCode=134, signal=null>
  - [pid=36115] starting temporary directories cleanup
  - [pid=36115] finished temporary directories cleanup
  - [pid=36115] <gracefully close end>

```