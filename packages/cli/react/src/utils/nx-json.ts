import { Tree, readJson, writeJson } from '@nx/devkit'

export function addPluginToNxJson(tree: Tree, pluginName: string) {
  const nxJson = readJson(tree, 'nx.json')

  if (!nxJson.plugins) {
    nxJson.plugins = []
  }

  if (!nxJson.plugins.includes(pluginName)) {
    nxJson.plugins.push(pluginName)
  }

  writeJson(tree, 'nx.json', nxJson)
}

export function addGeneratorOverride(
  tree: Tree,
  generatorName: string,
  override: string
) {
  const nxJson = readJson(tree, 'nx.json')

  if (!nxJson.generators) {
    nxJson.generators = {}
  }

  nxJson.generators[generatorName] = {
    generator: override
  }

  writeJson(tree, 'nx.json', nxJson)
}
