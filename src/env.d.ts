
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'uview-plus'
interface ImportMetaEnv {
  VITE_BASE_AUTHID: any
  VITE_BASE_URL: string,
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Uni {
  $u: any
}


