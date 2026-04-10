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

<launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-x64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/playwright_chromiumdev_profile-h40Z74 --remote-debugging-pipe --no-startup-window
<launched> pid=36435
[pid=36435][err] Received signal 11 SEGV_MAPERR 000000000010
[pid=36435][err]  [0x000107f0f2c3]
[pid=36435][err]  [0x000107f13103]
[pid=36435][err]  [0x7ff8043b63bd]
[pid=36435][err]  [0x00000000010b]
[pid=36435][err]  [0x000104bc1065]
[pid=36435][err]  [0x000104584061]
[pid=36435][err]  [0x00010479a176]
[pid=36435][err]  [0x000105f329b2]
[pid=36435][err]  [0x000105f339dc]
[pid=36435][err]  [0x00020ce15bb8]
[pid=36435][err] [end of stack trace]
Call log:
  - <launching> /var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/cursor-sandbox-cache/522577c4ba72d71494f5a9907ba0b946/playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-x64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --enable-automation --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --user-data-dir=/var/folders/2p/x67np4bd0ns137np2b4l9l380000gn/T/playwright_chromiumdev_profile-h40Z74 --remote-debugging-pipe --no-startup-window
  - <launched> pid=36435
  - [pid=36435][err] Received signal 11 SEGV_MAPERR 000000000010
  - [pid=36435][err]  [0x000107f0f2c3]
  - [pid=36435][err]  [0x000107f13103]
  - [pid=36435][err]  [0x7ff8043b63bd]
  - [pid=36435][err]  [0x00000000010b]
  - [pid=36435][err]  [0x000104bc1065]
  - [pid=36435][err]  [0x000104584061]
  - [pid=36435][err]  [0x00010479a176]
  - [pid=36435][err]  [0x000105f329b2]
  - [pid=36435][err]  [0x000105f339dc]
  - [pid=36435][err]  [0x00020ce15bb8]
  - [pid=36435][err] [end of stack trace]
  - [pid=36435] <gracefully close start>
  - [pid=36435] <kill>
  - [pid=36435] <will force kill>
  - [pid=36435] exception while trying to kill process: Error: kill EPERM
  - [pid=36435] <process did exit: exitCode=null, signal=SIGSEGV>
  - [pid=36435] starting temporary directories cleanup
  - [pid=36435] finished temporary directories cleanup
  - [pid=36435] <gracefully close end>

```