# Forked from https://github.com/serenadeai/serenade

## Differences

### Features
- Added IDE support for cursor, vscodium, windsurf
- Vue, svelte, astro files (also .mjs, .cjs, .mts, .cts) are detected as JS. (No specific training on these frameworks was done.)

### Bugs
- Dictation box: Retains previous clipboard content on "cancel"
- Invisible mini window (left of the main window when not using compact UI, might only be a problem on Windows) "removed"
- Fixed position drift of when closing/reopening settings and dictation box windows

### Minor improvements
- Dictation box: Dicated text is copied to the clipboard when using the "close" or "send" command. (This solves the problem where the dictated text is lost if returning the focus to the correct app doesn't work.)
- Improved theme (particularly dark mode)
- Improved security by forcing the UI to only accept local connections (and fonts via typekit)
- Native scrollbars throughout
- Slightly faster startup time

### Dev changes
- Modernized client (node 22+ support, latest dependencies as of 11/2025, pnpm, vite)


<img src="https://cdn.serenade.ai/img/logo-github.png" width="250px" alt="Serenade Logo" />

# Serenade

Welcome to the Serenade monorepo! This repository contains the code for the Serenade client application, online services (like our speech engine, code engine, and core application), and model training.

## Getting Help

If you need help getting started with Serenade or have any questions, check out our [Discord Community](https://serenade.ai/community).

## Docs

An overview of Serenade services can be found in the [docs](https://github.com/serenadeai/serenade/tree/master/docs) directory.

## Contributing

If you're interested in contributing to Serenade, check out our [Contributing Guidelines](https://github.com/serenadeai/serenade/blob/master/CONTRIBUTING.md). We're excited to welcome contributions from the community, but please follow the Contributing Guidelines, or we won't be able to accept your changes.

## Plugins

Serenade supports plugins for a variety of applications, each located in a separate repository:

* [VS Code](https://github.com/serenadeai/code)
* [Atom](https://github.com/serenadeai/atom)
* [JetBrains](https://github.com/serenadeai/intellij)
* [Chrome](https://github.com/serenadeai/chrome)
* [Hyper](https://github.com/serenadeai/hyper)
* [iTerm2](https://github.com/serenadeai/iterm2)

## Packages

We've published several open-source packages that are used by Serenade, but also more broadly useful:

* [speech-recorder](https://github.com/serenadeai/speech-recorder): A native npm module for microphone access and voice activity detection
* [serenade-driver](https://github.com/serenadeai/driver): A native npm module with platform-specific OS hooks for keystrokes, mouse movement, etc.
