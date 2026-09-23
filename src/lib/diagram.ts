/**
 * Layout for the case-study architecture diagrams.
 *
 * A diagram is a list of columns (steps); nodes in one column run in parallel.
 * The layout is computed in the reading direction of the page, so in Arabic the
 * flow runs right to left while the text itself is never mirrored.
 */

export interface DiagramNodeInput {
  id: string;
  label: string;
  detail?: string | undefined;
}

export interface DiagramInput {
  columns: DiagramNodeInput[][];
  edges?: [string, string][] | undefined;
  gapLabels?: (string | null)[] | undefined;
}

export interface PlacedNode extends DiagramNodeInput {
  x: number;
  y: number;
  w: number;
  h: number;
  labelLines: string[];
  detailLines: string[];
  /** First or last step of the flow. */
  terminal: boolean;
}

export interface PlacedEdge {
  fromId: string;
  toId: string;
  d: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export interface PlacedLabel {
  text: string;
  x: number;
  y: number;
}

export interface DiagramLayout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  edges: PlacedEdge[];
  labels: PlacedLabel[];
}

export const LABEL_SIZE = 14;
export const DETAIL_SIZE = 12;
const LINE_GAP = 1.35;
const PAD_X = 10;
const PAD_Y = 12;

/** Rough text width; good enough to wrap short labels without measuring fonts. */
function textWidth(text: string, size: number): number {
  let units = 0;
  for (const ch of text) {
    if (/[؀-ۿ]/.test(ch)) units += 0.5;
    else if (/[A-Z0-9]/.test(ch)) units += 0.64;
    else if (/[a-z]/.test(ch)) units += 0.53;
    else units += 0.33;
  }
  return units * size;
}

export function wrap(text: string, size: number, maxWidth: number, maxLines = 3): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, size) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1]}…`;
    return kept;
  }
  return lines;
}

function nodeHeight(labelLines: number, detailLines: number): number {
  const label = labelLines * LABEL_SIZE * LINE_GAP;
  const detail = detailLines ? 6 + detailLines * DETAIL_SIZE * LINE_GAP : 0;
  return Math.ceil(PAD_Y * 2 + label + detail);
}

function edgePairs(input: DiagramInput): [string, string][] {
  if (input.edges) return input.edges;
  const pairs: [string, string][] = [];
  input.columns.forEach((column, i) => {
    const next = input.columns[i + 1];
    if (!next) return;
    for (const a of column) for (const b of next) pairs.push([a.id, b.id]);
  });
  return pairs;
}

/** Horizontal flow for wide screens. `rtl` mirrors the flow, not the text. */
export function layoutHorizontal(input: DiagramInput, rtl: boolean, width = 1040): DiagramLayout {
  const n = input.columns.length;
  const hasLabels = input.gapLabels?.some(Boolean) ?? false;
  const gap = hasLabels ? 52 : 40;
  const colW = Math.floor((width - (n - 1) * gap) / n);
  const vGap = 16;
  const inner = colW - PAD_X * 2;

  const wrapped = input.columns.map((column) =>
    column.map((node) => ({
      node,
      labelLines: wrap(node.label, LABEL_SIZE, inner, 2),
      detailLines: node.detail ? wrap(node.detail, DETAIL_SIZE, inner, 3) : [],
    })),
  );
  const nodeH = Math.max(...wrapped.flat().map((w) => nodeHeight(w.labelLines.length, w.detailLines.length)));
  const maxRows = Math.max(...input.columns.map((c) => c.length));
  const top = 4;
  const height = top + maxRows * nodeH + (maxRows - 1) * vGap + 4;
  const bodyH = maxRows * nodeH + (maxRows - 1) * vGap;

  const nodes: PlacedNode[] = [];
  wrapped.forEach((column, i) => {
    const x = rtl ? width - (i + 1) * colW - i * gap : i * (colW + gap);
    const stackH = column.length * nodeH + (column.length - 1) * vGap;
    column.forEach((w, j) => {
      nodes.push({
        ...w.node,
        x,
        y: top + (bodyH - stackH) / 2 + j * (nodeH + vGap),
        w: colW,
        h: nodeH,
        labelLines: w.labelLines,
        detailLines: w.detailLines,
        terminal: i === 0 || i === n - 1,
      });
    });
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const edges: PlacedEdge[] = [];
  for (const [fromId, toId] of edgePairs(input)) {
    const a = byId.get(fromId);
    const b = byId.get(toId);
    if (!a || !b) continue;
    const from = { x: rtl ? a.x : a.x + a.w, y: a.y + a.h / 2 };
    const to = { x: rtl ? b.x + b.w : b.x, y: b.y + b.h / 2 };
    const mid = (from.x + to.x) / 2;
    edges.push({ fromId, toId, from, to, d: `M${from.x},${from.y} C${mid},${from.y} ${mid},${to.y} ${to.x},${to.y}` });
  }

  const labels = gapLabels(input, edges, (from, to) => ({
    x: (from.x + to.x) / 2,
    y: from.y,
  }));

  return { width, height, nodes, edges, labels };
}

/**
 * Gap labels sit on the connection they describe: on the curve's midpoint when
 * a single edge crosses the gap, or where the edges fan out when there are several.
 */
function gapLabels(
  input: DiagramInput,
  edges: PlacedEdge[],
  fanOut: (from: { x: number; y: number }, to: { x: number; y: number }) => { x: number; y: number },
): PlacedLabel[] {
  const labels: PlacedLabel[] = [];
  input.gapLabels?.forEach((text, i) => {
    if (!text) return;
    const sources = new Set(input.columns[i]?.map((n) => n.id));
    const crossing = edges.filter((edge) => sources.has(edge.fromId));
    const first = crossing[0];
    if (!first) return;
    const at =
      crossing.length === 1
        ? { x: (first.from.x + first.to.x) / 2, y: (first.from.y + first.to.y) / 2 }
        : fanOut(first.from, first.to);
    labels.push({ text, ...at });
  });
  return labels;
}

/** Vertical flow for narrow screens: steps run top to bottom. */
export function layoutVertical(input: DiagramInput, rtl: boolean, width = 340): DiagramLayout {
  const hGap = 10;
  const vGap = 34;
  const nodes: PlacedNode[] = [];
  let y = 2;
  const n = input.columns.length;

  input.columns.forEach((column, i) => {
    const k = column.length;
    const w = Math.floor((width - (k - 1) * hGap) / k);
    const inner = w - PAD_X * 2;
    const rows = column.map((node) => ({
      node,
      labelLines: wrap(node.label, LABEL_SIZE, inner, 2),
      detailLines: node.detail ? wrap(node.detail, DETAIL_SIZE, inner, 3) : [],
    }));
    const h = Math.max(...rows.map((r) => nodeHeight(r.labelLines.length, r.detailLines.length)));
    rows.forEach((r, j) => {
      const x = rtl ? width - (j + 1) * w - j * hGap : j * (w + hGap);
      nodes.push({ ...r.node, x, y, w, h, labelLines: r.labelLines, detailLines: r.detailLines, terminal: i === 0 || i === n - 1 });
    });
    y += h + vGap;
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const edges: PlacedEdge[] = [];
  for (const [fromId, toId] of edgePairs(input)) {
    const a = byId.get(fromId);
    const b = byId.get(toId);
    if (!a || !b) continue;
    const from = { x: a.x + a.w / 2, y: a.y + a.h };
    const to = { x: b.x + b.w / 2, y: b.y };
    const mid = (from.y + to.y) / 2;
    edges.push({ fromId, toId, from, to, d: `M${from.x},${from.y} C${from.x},${mid} ${to.x},${mid} ${to.x},${to.y}` });
  }

  const labels = gapLabels(input, edges, (from, to) => ({ x: from.x, y: (from.y + to.y) / 2 }));

  return { width, height: y - vGap + 2, nodes, edges, labels };
}
