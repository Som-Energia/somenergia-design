import tokensToCss from "./css.js"
import tokens from "./index.js"

describe("tokensToCss", () => {
  const css = tokensToCss(tokens)

  test("exposes shared tokens as --som-* variables on :root", () => {
    expect(css).toContain(`--som-font-family: ${tokens.font.family};`)
    expect(css).toContain(`--som-radius-xl: ${tokens.radius.xl};`)
    expect(css).toContain(`--som-space-4: ${tokens.space[4]};`)
  })

  test("converts nested camelCase keys to kebab-case", () => {
    expect(css).toContain(
      `--som-color-primary-hover: ${tokens.color.light.primaryHover};`,
    )
    expect(css).toContain(
      `--som-color-chart-axis-label: ${tokens.color.light.chart.axisLabel};`,
    )
  })

  test("overrides colors for data-theme dark and the system preference", () => {
    const darkText = `--som-color-text: ${tokens.color.dark.text};`

    expect(css).toMatch(
      /:root\[data-theme="dark"\] \{[^}]*--som-color-text: #f0f3ec;/,
    )
    expect(css).toMatch(
      /:root:not\(\[data-theme="light"\]\) \{[^}]*--som-color-text: #f0f3ec;/,
    )
    expect(css.split(darkText)).toHaveLength(3)
  })
})

describe("typography", () => {
  const css = tokensToCss(tokens)

  test("exposes font sizes and weights", () => {
    expect(css).toContain(`--som-font-size-md: ${tokens.font.size.md};`)
    expect(css).toContain(`--som-font-size-2xl: ${tokens.font.size["2xl"]};`)
    expect(css).toContain(`--som-font-weight-bold: 700;`)
  })

  test("text styles use only sizes and weights from the scale", () => {
    const sizes = Object.values(tokens.font.size)
    const weights = Object.values(tokens.font.weight)

    for (const style of Object.values(tokens.text)) {
      expect(sizes).toContain(style.fontSize)
      expect(weights).toContain(style.fontWeight)
      expect(typeof style.lineHeight).toBe("number")
    }
  })

  test("exposes text styles as --som-text-* variables", () => {
    expect(css).toContain(
      `--som-text-h1-font-size: ${tokens.font.size["3xl"]};`,
    )
    expect(css).toContain(`--som-text-h1-line-height: 0.96;`)
    expect(css).toContain(`--som-text-h1-letter-spacing: -0.039em;`)
    expect(css).toContain(`--som-text-body-m-font-weight: 400;`)
  })
})

// WCAG 2 relative luminance and contrast ratio for #rrggbb colors.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

describe.each(["light", "dark"])("%s status colors", (scheme) => {
  const color = tokens.color[scheme]

  test.each(["danger", "warning", "success", "info"])(
    "%sText meets WCAG AA on its surface",
    (status) => {
      expect(
        contrast(color[`${status}Text`], color[`${status}Surface`]),
      ).toBeGreaterThanOrEqual(4.5)
    },
  )
})
