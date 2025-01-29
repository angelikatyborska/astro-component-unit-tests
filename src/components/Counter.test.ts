// @vitest-environment happy-dom
import { describe, test, expect } from 'vitest';
import Counter from "./Counter.astro";
import {renderAstroComponent} from "../test/helpers.ts";

describe("Counter", () => {
  test("has default initial count", async () => {
    const result = await renderAstroComponent(Counter)
    const currentCount = result.querySelector('[data-current-count]')

    expect(currentCount).not.toBeNull();
    expect(currentCount!.textContent).toEqual("0")
  })

  test("accepts a custom initial count", async () => {
    const result = await renderAstroComponent(
      Counter,
      { props: { initialCount: 4 } }
    );

    const currentCount = result.querySelector('[data-current-count]')

    expect(currentCount).not.toBeNull();
    expect(currentCount!.textContent).toEqual("4")
  })
})
