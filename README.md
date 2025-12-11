# LogiOps Config Generator

A React web application for generating configuration files for [logiops](https://github.com/PixlOne/logiops) - the unofficial driver for Logitech mice on Linux.

## Features

- Support for MX Master 2, 2S, 3, 3S, and 4
- Configure DPI settings with presets and custom values
- SmartShift configuration (threshold and torque)
- High-resolution scroll settings
- Button remapping with support for:
  - Keyboard key mappings
  - Gestures (direction-based actions)
  - Toggle SmartShift/HiRes Scroll
  - DPI cycling and adjustment
  - Host switching for multi-device setups
- Real-time config preview
- Copy to clipboard or download as `logid.cfg`
- Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Select your Logitech mouse model from the device selector
2. Configure DPI, SmartShift, and HiRes scroll settings
3. Customize button mappings (click to expand each button)
4. Preview the generated configuration
5. Copy or download the config file
6. Save as `/etc/logid.cfg` on your Linux system
7. Restart the logid service: `sudo systemctl restart logid`

## Configuration File Location

The generated configuration should be saved to `/etc/logid.cfg`. After saving, restart the logiops daemon:

```bash
sudo systemctl restart logid
```

Or reload the configuration:

```bash
sudo pkill -HUP logid
```

## Supported Devices

- MX Master 2 (Wireless Mouse MX Master)
- MX Master 2S
- MX Master 3
- MX Master 3S
- MX Master 4

## Tech Stack

- React 19
- TypeScript
- Vite

## License

MIT
