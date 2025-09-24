#!/usr/bin/env node
import { logger } from '@nx/devkit'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(`
🚀 VX CLI - React Generators

Usage:
  pnpx @vx-cli/react <generator> [options]

Available Generators:
  application       app           Create a custom React application
  library           lib           Create a custom React library
  common                          Create a common utilities library
  component         comp          Create a reusable component library
  component-store   comp-store    Create a component library with state management
  core                            Create a core business logic library
  hook                            Create a custom React hooks library
  layout                          Create a layout components library
  template                        Create a template library for scaffolding
  utilities         utils         Create a utilities and helper functions library

Examples:
  pnpx @vx-cli/react init
  pnpx @vx-cli/react app my-app
  pnpx @vx-cli/react lib my-lib --publishable
  pnpx @vx-cli/react comp my-components
  pnpx @vx-cli/react hook my-hooks
  pnpx @vx-cli/react utils my-utils
  `)
  process.exit(0)
}

logger.info('🚀 VX CLI - React Generators')
logger.info('Use this package as an NX plugin in your workspace')
logger.info('Add to your nx.json plugins array: "@vx-cli/react"')
