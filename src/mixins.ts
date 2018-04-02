type CrossOriginPolicy = 'anonymous' | 'use-credentials'

export abstract class AbstractLoader<TElement extends HTMLElement> {
  protected _crossOrigin: CrossOriginPolicy | null = null
  protected _integrity: string | null = null
  protected _nonce: string | null = null

  public crossOrigin(aCrossOriginPolicy: CrossOriginPolicy): this {
    this._crossOrigin = aCrossOriginPolicy

    return this
  }

  public integrity(anIntegrity: string): this {
    this._integrity = anIntegrity

    return this
  }

  public nonce(aNonce: string): this {
    this._nonce = aNonce

    return this
  }

  abstract load(node: Node, doc: Document): Promise<this>

  protected createResourceElement(doc: Document, type: string): [TElement, Promise<this>] {
    const element: TElement = doc.createElement(type) as TElement

    if (this._crossOrigin !== null) {
      element.setAttribute('crossOrigin', this._crossOrigin)
    }

    if (this._integrity !== null) {
      element.setAttribute('integrity', this._integrity)
    }

    if (this._nonce !== null) {
      element.setAttribute('nonce', this._nonce)
    }

    const promise = new Promise<this>(
      (resolve, reject): void => {
        element.addEventListener('load', resolve.bind(null, this))
        element.addEventListener('error', reject.bind(null, this))
      }
    )

    return [element, promise]
  }
}
