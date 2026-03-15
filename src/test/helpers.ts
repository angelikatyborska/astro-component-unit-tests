import type { ComponentProps } from "astro/types";
import { experimental_AstroContainer as AstroContainer, type ContainerRenderOptions } from "astro/container";
import { Window } from "happy-dom";

type AstroComponentFactory = Parameters<AstroContainer["renderToString"]>[0];

type ComponentContainerRenderOptions<T extends AstroComponentFactory> = Omit<ContainerRenderOptions, 'props'> & {
  // @ts-expect-error ComponentProps expects a type that extends a function of arity 1, but
  // AstroComponentFactory is a function of arity 3. Either this is an internal mix up in Astro,
  // or I'm missing something.
  props?: ComponentProps<T>;
};

export async function renderAstroComponent<T extends AstroComponentFactory>(Component: T, options: ComponentContainerRenderOptions<T> = {}) {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Component, options);

  // In Astro 5.15.6, changes were added that prevent Astro components from rendering "in the browser",
  // which also applies to rendering Astro components after happy-dom has been loaded.
  // To work around this problem, we need to render the Astro component first, and only then
  // initialize happy-dom to get access to the DOM.
  const window = new Window({
    innerHeight: 768,
    innerWidth: 1024,
    url: "http://localhost:4321",
  });

  window.document.write(`<html><head><title>Test page</title></head><body></body></html>`);

  await window.happyDOM.waitUntilComplete();

  const template = window.document.createElement("template");
  template.innerHTML = result;

  await window.happyDOM.close();

  // Overwriting happy-dom DocumentFragment type with the TS DOM DocumentFragment type.
  // happy-dom types for DocumentFragment.querySelector are completely illogical.
  // They expect the selector to be the element name, e.g. querySelector<'span'>('.line') is a type error.
  return template.content as unknown as DocumentFragment;
}
