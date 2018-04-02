import { AbstractLoader } from 'mixins'

export class LinkLoader extends AbstractLoader<HTMLLinkElement> {
  private readonly _href: string

  constructor(aHref: string) {
    super()
    this._href = aHref
  }

  public load(node: Node = document.head, doc: Document = document): Promise<this> {
    const [element, promise] = this.createElement(doc)

    node.appendChild(element)

    return promise
  }

  private createElement(doc: Document): [HTMLLinkElement, Promise<this>] {
    const [element, promise] = this.createResourceElement(doc, 'link')

    element.href = this._href
    element.type = 'text/css'
    element.rel = 'stylesheet'

    return [element, promise]
  }
}
