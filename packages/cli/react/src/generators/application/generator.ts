import {
  Tree,
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot
} from '@nx/devkit'
import * as path from 'path'

import { toPascalCase } from '../../utils/casing'
import { GeneratorSchema } from './schema'

interface NormalizedSchema extends GeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  categoryPrefix: string
  parsedTags: string[]
  projectLabel: string
  cdnPath: string
  e2eProjectName: string
  e2eProjectRoot: string
  mockProjectName: string
  mockProjectRoot: string
}

function normalizeOptions(
  tree: Tree,
  options: GeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName
  const category = options.category || 'apps'

  let categoryPrefix = 'apps'
  if (options.category != 'app') {
    const suffix =
      options.category == 'vezham' ? `_${category}` : `_${category}s`
    categoryPrefix += suffix
  }

  const projectDirectory = options.directory
    ? `${categoryPrefix}${names(options.directory).fileName}/${name}`
    : `${categoryPrefix}/${name}`

  // For project name, we don't include the category prefix to keep it clean
  const projectName = options.directory
    ? `${names(options.directory).fileName}-${name}`
    : name

  // const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`
  const projectRoot = `${projectDirectory}`

  // E2E and mock projects follow the same category structure
  const e2eProjectName = `${projectName}-e2e`
  const e2eProjectRoot = `${projectDirectory}-e2e`
  const mockProjectName = `${projectName}-mock`
  const mockProjectRoot = `${projectDirectory}-mock`

  const parsedTags = [] //options.tags ? options.tags.split(',').map(s => s.trim()) : []

  // Add category as a tag
  parsedTags.push(`category:${category}`)

  // for projectLabel
  const projectLabel = toPascalCase(projectName)

  // for CDN
  const cdnPath =
    options.cdnHost === 'cdn'
      ? `https://static.cdn.vezham.com/${projectDirectory}`
      : '/vx-app'

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    categoryPrefix,
    parsedTags,
    projectLabel,
    cdnPath,
    e2eProjectName,
    e2eProjectRoot,
    mockProjectName,
    mockProjectRoot
  }
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: ''
  }

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  )

  addVxProjectConfiguration(tree, options)
}

// targets: {
//   build: {
//     executor: '@nx/vite:build',
//     outputs: ['{options.outputPath}'],
//     options: {
//       outputPath: `dist/${normalizedOptions.projectRoot}`
//     }
//   },
//   serve: {
//     executor: '@nx/vite:dev-server',
//     defaultConfiguration: 'development',
//     options: {
//       buildTarget: `${normalizedOptions.projectName}:build`
//     },
//     configurations: {
//       development: {
//         buildTarget: `${normalizedOptions.projectName}:build:development`,
//         hmr: true
//       }
//     }
//   },
//   lint: {
//     executor: '@nx/eslint:lint',
//     outputs: ['{options.outputFile}'],
//     options: {
//       lintFilePatterns: [
//         `${normalizedOptions.projectRoot}/**/*.{ts,tsx,js,jsx}`
//       ]
//     }
//   },
//   test: {
//     executor: '@nx/vitest:test',
//     outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
//     options: {
//       config: `${normalizedOptions.projectRoot}/vite.config.ts`,
//       passWithNoTests: true
//     }
//   }
// }
function addVxProjectConfiguration(tree: Tree, options: NormalizedSchema) {
  const targets: any = {}
  targets['config-local-hostile'] = {
    executor: 'nx:run-commands',
    options: {
      cwd: options.projectRoot,
      commands: [
        `sudo pnpm exec hostile set localhost ${options.projectName}.vezham.local && sudo pnpm exec hostile set localhost ${options.projectName}.mock.vezham.local`
      ],
      parallel: false
    }
  }

  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'application',
    sourceRoot: `${options.projectRoot}/src`,
    targets,
    tags: options.parsedTags
  })
}

function addE2eFiles(tree: Tree, options: NormalizedSchema) {
  // if (options.e2eTestRunner === 'none') {
  //   return
  // }

  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.e2eProjectRoot),
    template: ''
  }

  generateFiles(
    tree,
    path.join(__dirname, 'files-e2e-playwright'),
    options.e2eProjectRoot,
    templateOptions
  )

  addE2eProjectConfiguration(tree, options)
}

// targets.e2e = {
//   executor: '@nx/playwright:playwright',
//   options: {
//     config: `${options.e2eProjectRoot}/playwright.config.ts`
//   },
//   configurations: {
//     production: {
//       devServerTarget: `${options.projectName}:serve:production`
//     }
//   }
// }
function addE2eProjectConfiguration(tree: Tree, options: NormalizedSchema) {
  const targets: any = {}

  addProjectConfiguration(tree, options.e2eProjectName, {
    root: options.e2eProjectRoot,
    projectType: 'application',
    sourceRoot: `${options.e2eProjectRoot}/src`,
    targets,
    tags: [...options.parsedTags, 'e2e'],
    implicitDependencies: [options.projectName]
  })
}

function addMockFiles(tree: Tree, options: NormalizedSchema) {
  if (!options.mockServer) {
    return
  }

  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.mockProjectRoot),
    template: ''
  }

  generateFiles(
    tree,
    path.join(__dirname, 'files-mock-server'),
    options.mockProjectRoot,
    templateOptions
  )

  addMockProjectConfiguration(tree, options)
}

// targets: {
//   serve: {
//     executor: 'nx:run-commands',
//     options: {
//       command: 'npm run dev',
//       cwd: options.mockProjectRoot
//     }
//   },
//   generate: {
//     executor: 'nx:run-commands',
//     options: {
//       command: 'npm run generate',
//       cwd: options.mockProjectRoot
//     }
//   },
//   seed: {
//     executor: 'nx:run-commands',
//     options: {
//       commands: ['npm run generate', 'npm run start'],
//       cwd: options.mockProjectRoot,
//       parallel: false
//     }
//   },
//   build: {
//     executor: 'nx:run-commands',
//     options: {
//       command: 'npm run build',
//       cwd: options.mockProjectRoot
//     }
//   }
// }
function addMockProjectConfiguration(tree: Tree, options: NormalizedSchema) {
  const targets: any = {}
  targets.serve = {
    executor: 'nx:run-commands',
    options: {
      cwd: options.mockProjectRoot,
      commands: ['pnpm serve'],
      parallel: false
    }
  }
  targets.build = {
    executor: 'nx:run-commands',
    options: {
      cwd: options.mockProjectRoot,
      commands: ['pnpm build'],
      parallel: false
    }
  }
  targets.generate = {
    executor: 'nx:run-commands',
    options: {
      cwd: options.mockProjectRoot,
      commands: ['pnpm generate'],
      parallel: false
    }
  }

  addProjectConfiguration(tree, options.mockProjectName, {
    root: options.mockProjectRoot,
    projectType: 'application',
    sourceRoot: `${options.mockProjectRoot}/src`,
    targets,
    tags: [...options.parsedTags, 'mock']
  })
}

export default async function (tree: Tree, options: GeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options)
  // console.log(normalizedOptions) // wjdlz/TODO: remove

  addFiles(tree, normalizedOptions)
  addE2eFiles(tree, normalizedOptions)
  addMockFiles(tree, normalizedOptions)

  await formatFiles(tree)
}
