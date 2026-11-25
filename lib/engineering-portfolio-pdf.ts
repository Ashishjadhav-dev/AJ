import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), "documents", "engineering-portfolio.pdf");

export async function readPortfolioPdf(): Promise<
  Uint8Array<ArrayBuffer> | undefined
> {
  try {
    return new Uint8Array(await readFile(file));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

export async function getPortfolioPdf() {
  try {
    const info = await stat(file);
    if (info.isFile() && info.size > 0) {
      return {
        href: "/case-studies/portfolio.pdf",
        size:
          info.size >= 1048576
            ? `${(info.size / 1048576).toFixed(1)} MiB`
            : `${Math.ceil(info.size / 1024)} KiB`,
      };
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}
