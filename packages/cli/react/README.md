# @vx-cli/react

A comprehensive NX plugin that provides enhanced React application and specialized library generators with modern templates and configurations as per Vezham design system.

## Features

- 🚀 Custom React application generator with modern setup
- 📦 Custom React library generators with publishing support
- 🎨 Beautiful, responsive templates with custom styling
- 🔧 TypeScript, ESLint, and Jest configuration out of the box
- 🌐 Routing support for applications
- 📱 Mobile-responsive designs
- ⚡ Vite-powered development experience
- 🧩 Specialized generators for common, components, hooks, layouts, and more

## Installation

### As a workspace plugin

1. Install the package in your NX workspace:

```bash
pnpm add @vx-cli/react --save-dev
```

2. Add the plugin to your `nx.json`:

```json
{
  "plugins": ["@vx-cli/react"]
}
```

3. Initialize the plugin (optional - overrides default generators):

```bash
nx g @vx-cli/react:init
```

### As a standalone CLI

```bash
pnpx @vx-cli/react
```

## Usage

### Initialize the plugin (optional)

```bash
nx g @vx-cli/react:init
```

### Generate a custom React application

```bash
# Basic application
nx g @vx-cli/react:application my-app

# With category and custom options
nx g @vx-cli/react:application my-app --category=pod --style=tailwind

# Different categories
nx g @vx-cli/react:application my-app --category=app    # Creates: apps_apps/my-app
nx g @vx-cli/react:application my-app --category=pod    # Creates: apps_pods/my-app
nx g @vx-cli/react:application my-app --category=internal # Creates: apps_internal/my-app

# Using the alias
nx g @vx-cli/react:app my-app
```

### Generate a custom React library

```bash
# Basic library
nx g @vx-cli/react:library my-lib

# Publishable library
nx g @vx-cli/react:library my-lib --publishable

# Using the alias
nx g @vx-cli/react:lib my-lib

# Specialized libraries
nx g @vx-cli/react:component my-components
nx g @vx-cli/react:hook my-hooks
nx g @vx-cli/react:utilities my-utils
nx g @vx-cli/react:layout my-layouts
nx g @vx-cli/react:core my-core
nx g @vx-cli/react:common my-common
nx g @vx-cli/react:component-store my-store
nx g @vx-cli/react:template my-templates
```

## Generator Options

### React Application (`application`)

| Option           | Type                           | Default      | Description                                |
| ---------------- | ------------------------------ | ------------ | ------------------------------------------ |
| `name`           | string                         | -            | The name of the application                |
| `category`       | 'pods' \| 'apps' \| 'internal' | 'apps'       | Application category for project structure |
| `directory`      | string                         | -            | Directory where the app is placed          |
| `tags`           | string                         | -            | Tags for linting                           |
| `unitTestRunner` | 'vitest' \| 'none'             | 'vitest'     | Unit test runner                           |
| `e2eTestRunner`  | 'playwright' \| 'none'         | 'playwright' | E2E test runner                            |
| `linter`         | 'eslint' \| 'none'             | 'eslint'     | Linter to use                              |
| `style`          | 'css' \| 'tailwind'            | 'css'        | Style framework                            |
| `routing`        | boolean                        | true         | Generate with routing                      |
| `strict`         | boolean                        | true         | Enable strict mode                         |

### React Library (`library`)

| Option           | Type                         | Default  | Description                       |
| ---------------- | ---------------------------- | -------- | --------------------------------- |
| `name`           | string                       | -        | The name of the library           |
| `directory`      | string                       | -        | Directory where the lib is placed |
| `linter`         | 'eslint' \| 'none'           | 'eslint' | Linter to use                     |
| `unitTestRunner` | 'jest' \| 'vitest' \| 'none' | 'jest'   | Unit test runner                  |
| `tags`           | string                       | -        | Tags for linting                  |
| `publishable`    | boolean                      | false    | Create a publishable library      |
| `buildable`      | boolean                      | false    | Generate a buildable library      |
| `importPath`     | string                       | -        | Import path for the library       |
| `component`      | boolean                      | true     | Generate a default component      |

### Specialized Library Generators

| Generator         | Description                                | Default Publishable |
| ----------------- | ------------------------------------------ | ------------------- |
| `common`          | Common utilities and shared code           | No                  |
| `component`       | Reusable UI components with Storybook      | Yes                 |
| `component-store` | Components with state management           | Yes                 |
| `core`            | Core business logic and services           | No                  |
| `hook`            | Custom React hooks                         | Yes                 |
| `layout`          | Layout components and responsive utilities | Yes                 |
| `template`        | Template library for scaffolding           | No                  |
| `utilities`       | Helper functions and TypeScript utilities  | Yes                 |

## Template Features

### React Applications

- Modern React 18 with TypeScript
- Vite for fast development and building
- Beautiful gradient designs with hover effects
- Responsive layouts for mobile and desktop
- Optional React Router integration
- Counter component example with modern button styles
- Professional page layouts (Home/About when routing is enabled)
- Custom CSS with Inter font integration

### React Libraries

- TypeScript support with proper type definitions
- Flexible component architecture with props interface
- CSS modules for styling
- Comprehensive testing setup
- Support for both buildable and publishable libraries
- Modern component patterns with variants and sizes
- Ready-to-use component with beautiful styling

## Development

### Building the plugin

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

### Publishing

```bash
pnpm publish
```

## Override Default Generators

When you run the init generator with `overrideDefaults: true`, it will configure your workspace to use these custom generators instead of the default NX React generators:

- `@nx/react:application` → `@vx-cli/react:application`
- `@nx/react:library` → `@vx-cli/react:library`

This means you can continue using the standard NX commands, but they'll use your custom templates:

```bash
# These will now use your custom generators
nx g app my-app
nx g lib my-lib
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
