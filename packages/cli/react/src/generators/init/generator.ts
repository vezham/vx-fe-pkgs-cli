import { Tree, formatFiles } from '@nx/devkit'

import { addGeneratorOverride, addPluginToNxJson } from '../../utils/nx-json'
import { GeneratorSchema } from './schema'

export default async function (tree: Tree, options: GeneratorSchema) {
  // Add plugin to nx.json
  addPluginToNxJson(tree, '@vx-cli/react')

  // Override default generators if requested
  if (options.overrideDefaults) {
    addGeneratorOverride(
      tree,
      '@nx/react:application',
      '@vx-cli/react:application'
    )
    addGeneratorOverride(tree, '@nx/react:library', '@vx-cli/react:library')
  }

  await formatFiles(tree)
}
