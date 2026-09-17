---
name: mobile-web-game-ux
description: >-
  Best practices, design patterns, and code implementations for mobile browser gaming UX,
  touch controls (virtual joysticks, D-pads, throttle pedals), thumb ergonomics, viewport locking,
  safe area insets, and cross-browser Fullscreen API handling for iOS and Android.
  Use when building or refining mobile game controls, HUD overlays, or resolving touch gesture conflicts.
---

# Mobile Web Game UX & Touch Ergonomics Guide

This skill provides battle-tested patterns for optimizing mobile web games and simulations (such as Circuit Racing, Projectile Game, and Mars Hexapod) across iOS Safari and Android Chrome.

---

## 1. Ergonomic HUD Layout (Dual-Thumb Zone)

Place controls within natural thumb arcs:
- **Left Thumb Zone**: Steering, direction, joystick, or horizontal aiming.
- **Right Thumb Zone**: Throttle, boost, fire, brake, or primary action triggers.
- **Top / Corners**: Secondary stats, pause, mute, and fullscreen toggle. Keep clear of active thumb sweep areas to prevent accidental taps.

```css
/* Prevent selection, callouts, and default scroll gestures */
.game-hud, .touch-btn, .joystick-area {
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: none;
}

/* Safe Area Padding for notched devices (iPhone, modern Android) */
.mobile-hud-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: max(12px, env(safe-area-inset-top));
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
  pointer-events: none; /* Let canvas receive taps except on buttons */
}

.mobile-hud-container .interactive {
  pointer-events: auto;
}
```

---

## 2. Robust Touch Event Handling (No Sticky Inputs)

Never use standard `click` events for real-time game controls due to the 300ms tap delay and lack of hold-state detection. Always bind `touchstart`, `touchend`, and `touchcancel`:

```javascript
export function bindHoldButton(buttonElement, onStart, onEnd) {
  let isPressed = false;

  const handleStart = (e) => {
    e.preventDefault(); // Prevent text selection and zoom
    if (!isPressed) {
      isPressed = true;
      buttonElement.classList.add('active');
      if (typeof onStart === 'function') onStart();
    }
  };

  const handleEnd = (e) => {
    e.preventDefault();
    if (isPressed) {
      isPressed = false;
      buttonElement.classList.remove('active');
      if (typeof onEnd === 'function') onEnd();
    }
  };

  // Bind touch events with passive: false to allow e.preventDefault()
  buttonElement.addEventListener('touchstart', handleStart, { passive: false });
  buttonElement.addEventListener('touchend', handleEnd, { passive: false });
  buttonElement.addEventListener('touchcancel', handleEnd, { passive: false });

  // Mouse fallbacks for desktop preview
  buttonElement.addEventListener('mousedown', handleStart);
  window.addEventListener('mouseup', handleEnd);
}
```

---

## 3. Cross-Platform Fullscreen API & iOS Safari Fallback

Standard `element.requestFullscreen()` works on Android Chrome and desktop, but iOS Safari on iPhone only supports `webkitEnterFullscreen()` on `<video>` elements or standalone PWA web-app mode.

```javascript
export function toggleGameFullscreen(containerElement) {
  const isFullscreen = document.fullscreenElement ||
                       document.webkitFullscreenElement ||
                       document.mozFullScreenElement;

  if (!isFullscreen) {
    if (containerElement.requestFullscreen) {
      containerElement.requestFullscreen().catch(handleFullscreenError);
    } else if (containerElement.webkitRequestFullscreen) {
      containerElement.webkitRequestFullscreen();
    } else {
      // iOS Safari Fallback: Simulate fullscreen via CSS viewport fill
      containerElement.classList.add('ios-fake-fullscreen');
      window.scrollTo(0, 1);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    containerElement.classList.remove('ios-fake-fullscreen');
  }
}

function handleFullscreenError(err) {
  console.warn("Fullscreen request declined or unsupported:", err);
}
```

---

## 4. Landscape Orientation Handling

For driving and simulation games requiring horizontal screen space:

```javascript
export function checkOrientation() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const rotatePrompt = document.getElementById('rotate-prompt-overlay');

  if (rotatePrompt) {
    rotatePrompt.style.display = isLandscape ? 'none' : 'flex';
  }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
```
