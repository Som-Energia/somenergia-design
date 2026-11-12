// Compiled with tsc against the built package (self-reference through
// "exports") to check that consumers get typed tokens.

import tokens from "@somenergia/design-tokens"

const primary: string = tokens.color.light.primary
const darkWarning: string = tokens.color.dark.warningText
const h1Size: string = tokens.text.h1.fontSize
const bold: number = tokens.font.weight.bold
const space: string = tokens.space[4]

// @ts-expect-error misspelled tokens must not compile
void tokens.color.light.primry

// @ts-expect-error tokens that do not exist must not compile
void tokens.text.h7

export { bold, darkWarning, h1Size, primary, space }
