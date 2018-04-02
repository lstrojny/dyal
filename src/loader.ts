type SourceType = 'script' | 'link'
type SourceAttr = 'src' | 'href'
type Api = { [key: string]: (val: AttributeType) => Api } & { load: (doc: Document) => Promise<Asset> }
type AttributeType = string | null | boolean
type AttributeMap = { resource: string; [key: string]: AttributeType }
type Asset = AttributeMap & { srcAttr: SourceAttr; srcType: SourceType }

const BaseAttributes = { integrity: null, nonce: null, crossOrigin: null }
const LinkAttributes = { type: 'text/css', rel: 'stylesheet' }
const ScriptAttributes = { type: 'text/javascript', defer: false, async: false }

function api(attributes: AttributeMap, srcType: SourceType, srcAttr: SourceAttr): Api {
  const api = {} as Api

  for (const key in attributes) {
    api[key] = (val: AttributeType): Api => {
      attributes[key] = val
      return api
    }
  }

  api.load = (node: Node = document.head, doc: Document = document): Promise<Asset> => {
    const element = doc.createElement(srcType)

    const promise = new Promise<Asset>((resolve, reject): void => {
      const asset = { ...attributes, [srcAttr]: attributes['resource'], srcAttr, srcType }
      element.addEventListener('load', resolve.bind(null, asset))
      element.addEventListener('error', reject.bind(null, asset))
    })

    for (const key in attributes) {
      if (key !== 'resource' && attributes[key] !== null) {
        element.setAttribute(key, attributes[key]!.toString())
      }
    }

    element.setAttribute(srcAttr, attributes.resource)

    node.appendChild(element)

    return promise
  }

  return api
}

export const js = (resource: string): Api => api({ ...BaseAttributes, ...ScriptAttributes, resource }, 'script', 'src')
export const css = (resource: string): Api => api({ ...BaseAttributes, ...LinkAttributes, resource }, 'link', 'href')
export const asset = (asset: Asset): Api => api(asset, asset.srcType, asset.srcAttr)
