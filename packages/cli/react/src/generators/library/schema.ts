export interface LibraryGeneratorSchema {
  name: string
  directory?: string
  tags?: string

  // generic
  // style?: 'tailwind' | 'css'
  linter?: 'eslint' | 'none'
  unitTestRunner?: 'vitest' | 'none'

  // props
  importPath?: string
  component?: boolean
  skipFormat?: boolean
  skipTsConfig?: boolean
  buildable?: boolean
  publishable?: boolean
}
