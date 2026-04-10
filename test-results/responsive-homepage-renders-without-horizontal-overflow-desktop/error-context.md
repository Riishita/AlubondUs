# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> homepage renders without horizontal overflow
- Location: tests/responsive.spec.ts:3:1

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-x64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/playwright_chromiumdev_profile-gjnZ2i --remote-debugging-pipe --no-startup-window
<launched> pid=36159
[pid=36159][err] Received signal 11 SEGV_MAPERR 000000000010
[pid=36159][err]  [0x00010a19f2c3]
[pid=36159][err]  [0x00010a1a3103]
[pid=36159][err]  [0x7ff8043b63bd]
[pid=36159][err]  [0x00000000010b]
[pid=36159][err]  [0x000106e51065]
[pid=36159][err]  [0x000106814061]
[pid=36159][err]  [0x000106a2a176]
[pid=36159][err]  [0x0001081c29b2]
[pid=36159][err]  [0x0001081c39dc]
[pid=36159][err]  [0x00020ef96bb8]
[pid=36159][err] [end of stack trace]
Call log:
  - <launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-x64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/playwright_chromiumdev_profile-gjnZ2i --remote-debugging-pipe --no-startup-window
  - <launched> pid=36159
  - [pid=36159][err] Received signal 11 SEGV_MAPERR 000000000010
  - [pid=36159][err]  [0x00010a19f2c3]
  - [pid=36159][err]  [0x00010a1a3103]
  - [pid=36159][err]  [0x7ff8043b63bd]
  - [pid=36159][err]  [0x00000000010b]
  - [pid=36159][err]  [0x000106e51065]
  - [pid=36159][err]  [0x000106814061]
  - [pid=36159][err]  [0x000106a2a176]
  - [pid=36159][err]  [0x0001081c29b2]
  - [pid=36159][err]  [0x0001081c39dc]
  - [pid=36159][err]  [0x00020ef96bb8]
  - [pid=36159][err] [end of stack trace]
  - [pid=36159] <gracefully close start>
  - [pid=36159] <kill>
  - [pid=36159] <will force kill>
  - [pid=36159] exception while trying to kill process: Error: kill ESRCH
  - [pid=36159] <process did exit: exitCode=null, signal=SIGSEGV>
  - [pid=36159] starting temporary directories cleanup
  - [pid=36159] finished temporary directories cleanup
  - [pid=36159] <gracefully close end>

```