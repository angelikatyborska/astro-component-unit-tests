import type { ComponentProps } from "astro/types";
import { experimental_AstroContainer as AstroContainer, type ContainerRenderOptions } from "astro/container";

type AstroComponentFactory = Parameters<AstroContainer["renderToString"]>[0];

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = ContainerRenderOptions & {
  // @ts-expect-error ComponentProps expects a type that extends a function of arity 1, but
  // AstroComponentFactory is a function of arity 3. Either this is an internal mix up in Astro,
  // or I'm missing something.
  props?: ComponentProps<T>;
};

export async function renderAstroComponent<T extends AstroComponentFactory>(Component: T, options: ComponentContainerRenderOptions<T> = {}) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component, options);

  const template = document.createElement("template");
  template.innerHTML = result;

  return template.content;
}
