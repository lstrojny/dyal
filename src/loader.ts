type SourceType = 'script' | 'link'
type SourceAttr = 'src' | 'href'
type Api = { [key: string]: (val: AttributeType) => Api } & { load: (doc: Document) => Promise<Asset> }
type AttributeType = string | null | boolean
type AttributeMap = { resource: string; [key: string]: AttributeType }
type Asset = AttributeMap & { srcAttr: SourceAttr; srcType: SourceType }

const MIME_TYPE_PREFIX = 'text/'
const RESOURCE = 'resource'
const ATTRIBUTE_SETTER = 'setAttribute'
const BaseAttributes = { integrity: null, nonce: null, crossOrigin: null }
const LinkAttributes = { type: MIME_TYPE_PREFIX + 'css', rel: 'stylesheet' }
const ScriptAttributes = { type: MIME_TYPE_PREFIX + 'javascript', defer: false, async: false }

const addEventListener = (element: Element, type: string, cb: Function, asset: Asset): void => {
  element.addEventListener(type, cb.bind(null, asset))
}

const mergeObjects = <T extends Object>(...objects: Object[]): T => {
  const target = {} as T

  for (let source of objects) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        ;(<any>target)[key] = (<any>source)[key]
      }
    }
  }

  return target
}

function api(attributes: AttributeMap, srcType: SourceType, srcAttr: SourceAttr): Api {
  const api = {} as Api

  for (const key in attributes) {
    api[key] = (val: AttributeType): Api => {
      attributes[key] = val
      return api
    }
  }

  api.load = (node: Node | null = document.head, doc: Document = document): Promise<Asset> => {
    const element = doc.createElement(srcType)

    const promise = new Promise<Asset>(
      (resolve: (asset: Asset) => void, reject: (asset: Asset) => void): void => {
        const asset = mergeObjects<Asset>(attributes, { [srcAttr]: attributes[RESOURCE] }, { srcAttr }, { srcType })
        addEventListener(element, 'load', resolve, asset)
        addEventListener(element, 'error', reject, asset)
      }
    )

    for (const key in attributes) {
      if (key !== RESOURCE && attributes[key] !== null) {
        element[ATTRIBUTE_SETTER](key, attributes[key]!.toString())
      }
    }

    element[ATTRIBUTE_SETTER](srcAttr, attributes[RESOURCE])

    node!.appendChild(element)

    return promise
  }

  return api
}

export const js = (resource: string): Api =>
  api(mergeObjects(BaseAttributes, ScriptAttributes, { resource }), 'script', 'src')
export const css = (resource: string): Api =>
  api(mergeObjects(BaseAttributes, LinkAttributes, { resource }), 'link', 'href')
export const asset = (asset: Asset): Api => api(asset, asset.srcType, asset.srcAttr)
