export interface ApplicationGeneratorSchema {
  name: string
  directory?: string
  // tags?: string
  category?: 'app' | 'internal' | 'cdn' | 'pod' | 'suit' | 'platform' | 'widget'

  // generic
  // style?: 'tailwind' | 'css'
  // linter?: 'eslint' | 'none'
  // unitTestRunner?: 'vitest' | 'none'
  // e2eTestRunner?: 'playwright' | 'none'

  // props
  mockServer?: boolean
  cdnHost: 'cdn' | 'self'

  // config
  strict?: boolean
  // routing?: boolean
}
