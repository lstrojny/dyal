import { ScriptLoader } from 'script'
import { LinkLoader } from 'link'

export function js(aJsResource: string): ScriptLoader {
  return new ScriptLoader(aJsResource)
}

export function css(aCssResource: string): LinkLoader {
  return new LinkLoader(aCssResource)
}
