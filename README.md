# gis-routing-service

A serverless GIS Routing Service built with Node.js and TypeScript. This service provides routing and geospatial functionalities, designed to be deployed on serverless infrastructure.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Serverless deployment (see `serverless.yml`)
- Modular architecture (Admin, Driver modules)
- TypeScript support
- RESTful API endpoints for routing and reporting
- Configurable via environment variables

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- pnpm (or npm/yarn)
- Serverless Framework (optional, for deployment)

### Installation

Clone the repository:

```bash
git clone git@github.com:sfgco/gis-routing-service.git
cd gis-routing-service
```

Install dependencies:

```bash
pnpm install
# or
npm install
```

Copy the example environment file and configure as needed:

```bash
cp .env.example .env
```

### Running Locally

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

## Configuration

Configuration files are located in `src/configs/`. Update `.env` as needed for your environment.

## Project Structure

```
gis-routing-service/
├── src/
│   ├── configs/         # Configuration files
│   ├── models/          # Data models (location, order, user)
│   ├── modules/         # Feature modules (admin, driver)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── serverless.yml       # Serverless deployment config
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
└── .env.example         # Example environment variables
```

## Usage

- The service exposes RESTful endpoints for routing and reporting.
- See the `src/modules/` directory for available modules and endpoints.

## Development

- Use TypeScript for all source files.
- Follow the existing modular structure for new features.
- Lint and format code before submitting changes.

## Testing

Add your testing instructions here (e.g., using Jest, Mocha, etc.).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
