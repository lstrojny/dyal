import { AbstractLoader } from 'mixins'

export class ScriptLoader extends AbstractLoader<HTMLScriptElement> {
  private readonly _src: string
  private _type: string = 'text/javascript'
  private _async: boolean = false
  private _defer: boolean = false

  public constructor(anSrc: string) {
    super()
    this._src = anSrc
  }

  public async(isAsync: boolean): this {
    this._async = isAsync

    return this
  }

  public defer(isDeferred: boolean): this {
    this._defer = isDeferred

    return this
  }

  public load(node: Node = document.head, doc: Document = document): Promise<this> {
    const [element, promise] = this.createElement(doc)

    node.appendChild(element)

    return promise
  }

  private createElement(doc: Document): [HTMLScriptElement, Promise<this>] {
    const [element, promise] = this.createResourceElement(doc, 'script')

    element.async = this._async
    element.defer = this._defer
    element.type = this._type
    element.src = this._src

    return [element, promise]
  }
}
