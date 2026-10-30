// 4×5 pixel glyphs used by the loader and the hero artwork.
const GLYPHS: Record<string, string[]> = {
  K: ["X..X", "X.X.", "XX..", "X.X.", "X..X"],
  A: [".XX.", "X..X", "XXXX", "X..X", "X..X"],
};

export const GLYPH_COLS = 4;
export const GLYPH_ROWS = 5;

export type Cell = { x: number; y: number; on: boolean };

export function glyphCells(letter: string): Cell[] {
  const rows = GLYPHS[letter.toUpperCase()];
  return rows.flatMap((row, y) => row.split("").map((c, x) => ({ x, y, on: c === "X" })));
}
