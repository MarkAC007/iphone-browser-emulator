# iPhone Browser Emulator

[![Release](https://github.com/MarkAC007/iphone-browser-emulator/actions/workflows/release.yml/badge.svg)](https://github.com/MarkAC007/iphone-browser-emulator/actions/workflows/release.yml)

<p align="center">
  <strong>Preview websites in a photorealistic iPhone frame - no device required</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a>
</p>

<!-- Security -->
[![Semgrep](https://img.shields.io/github/actions/workflow/status/MarkAC007/iphone-browser-emulator/semgrep.yml?branch=main&label=Semgrep&logo=semgrep)](https://github.com/MarkAC007/iphone-browser-emulator/actions/workflows/semgrep.yml)
[![Gitleaks](https://img.shields.io/github/actions/workflow/status/MarkAC007/iphone-browser-emulator/gitleaks.yml?branch=main&label=Gitleaks&logo=git)](https://github.com/MarkAC007/iphone-browser-emulator/actions/workflows/gitleaks.yml)

<!-- Tech Stack -->
[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org/)

<!-- Project Info -->
[![GitHub Release](https://img.shields.io/github/v/release/MarkAC007/iphone-browser-emulator)](https://github.com/MarkAC007/iphone-browser-emulator/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/MarkAC007/iphone-browser-emulator)](https://github.com/MarkAC007/iphone-browser-emulator/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/MarkAC007/iphone-browser-emulator/pulls)

---

A lightweight, browser-based web application that renders a photorealistic iPhone device frame containing an embedded browser viewport. Preview how any website appears on iPhone without physical hardware or heavyweight simulators.

## Features

| Feature | Description |
|---------|-------------|
| **Photorealistic Frame** | Accurate iPhone device frame with realistic bezels, notch, and buttons |
| **Interactive Browser** | Embedded viewport with URL input and navigation controls |
| **Multiple Models** | Support for different iPhone screen dimensions and aspect ratios |
| **Zero Installation** | Runs entirely in your browser - no setup required |
| **Cross-Platform** | Works on Windows, macOS, and Linux |
| **Fast & Lightweight** | Built with Vue 3 and Vite for optimal performance |

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Vite** - Next-generation build tool
- **VueUse** - Collection of Vue composition utilities

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MarkAC007/iphone-browser-emulator.git
cd iphone-browser-emulator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

## Usage

1. Open the application in your browser
2. Enter a URL in the address bar
3. View the website rendered within the iPhone frame
4. Switch between different iPhone models as needed

### Use Cases

- **Frontend Developers** - Validate responsive breakpoints and mobile styling
- **UI/UX Designers** - Present designs in realistic device context
- **QA Engineers** - Identify rendering issues without physical devices
- **Digital Marketers** - Preview mobile landing pages and campaigns
- **Technical Writers** - Capture accurate mobile screenshots for documentation

## Project Structure

```
iphone-browser-emulator/
├── src/
│   ├── components/     # Vue components
│   ├── stores/         # Pinia state management
│   └── ...
├── public/             # Static assets
├── index.html          # Entry point
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Version Labels

Use these labels on PRs to control version bumps:
- `major` or `breaking` - Breaking changes (v1.0.0 → v2.0.0)
- `minor` or `feature` - New features (v1.0.0 → v1.1.0)
- `patch` or `fix` - Bug fixes (v1.0.0 → v1.0.1)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
