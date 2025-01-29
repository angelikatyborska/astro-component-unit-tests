// @vitest-environment happy-dom
import { describe, test, expect } from 'vitest';
import { getByText, getAllByRole } from "@testing-library/dom";
import Counter from "./Counter.astro";
import {renderAstroComponent} from "../test/helpers.ts";

describe("Counter", () => {
  test("has default initial count", async () => {
    const result = await renderAstroComponent(Counter)
    const currentCount = getByText(result, "0")
    expect(currentCount).not.toBeNull();
  })

  test("accepts a custom initial count", async () => {
    const result = await renderAstroComponent(
      Counter,
      { props: { initialCount: 4 } }
    );

    const currentCount = getByText(result, "4")
    expect(currentCount).not.toBeNull();
  })

  test("has two buttons", async () => {
    const result = await renderAstroComponent(Counter)

    const buttons = getAllByRole(result, "button")
    expect(buttons.length).toEqual(2)
    expect(buttons[0]).toHaveAccessibleName("-1")
    expect(buttons[1]).toHaveAccessibleName("+1")
  })
})
