# DYAL
## JS / CSS asset loader to enable retry and fallback use cases

### Use cases
 * If the CDN fails, download an asset from the original domain
 * If [SRI](https://www.w3.org/TR/SRI/) validation fails, fall back to a different resource
 * If an asset fails to load, retry

### Design goals
 * **Compact**: halfway small so to be directly included in each page: it’s 1.6K right now and it’s likely gonna shrink.
   This is why it does not have (and should not have) any external runtime dependencies
 * **Familiar**: Sane defaults to not offer too many surprises
 * **Recognizable**: offers a Promise based API for asynchronicity

**Full disclosure:** `DYAL` is mostly an excuse for me to learn some TypeScript but maybe it’s also useful.

## Tooling
 * `yarn install` will the relevant development dependencies
 * `yarn build` will output `dist/loader.js` which is meant to be used
 * `yarn testbed` will build a development version and run a webserver on `localhost:8081` to serve a testbed (open the
 developer console to see if things work)
 * `yarn fmt` will format all the code
 * `yarn dev` will run rollup in watch mode
