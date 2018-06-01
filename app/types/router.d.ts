declare module "reach__router";

declare module "react" {
  interface IntrinsicAttributes<T> {
    path?: string;
    default?: boolean;
  }
}
