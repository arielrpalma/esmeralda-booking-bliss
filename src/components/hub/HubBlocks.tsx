import type { HubBlock } from "@/content/hub";

/** Renders the block-based body of a hub entry or cluster page. */
const HubBlocks = ({ blocks }: { blocks: HubBlock[] }) => (
  <>
    {blocks.map((block, i) => {
      switch (block.type) {
        case "h2":
          return (
            <h2 key={i} className="text-2xl md:text-3xl font-display font-semibold text-foreground mt-10 mb-4">
              {block.text}
            </h2>
          );
        case "h3":
          return (
            <h3 key={i} className="text-xl font-display font-semibold text-foreground mt-8 mb-3">
              {block.text}
            </h3>
          );
        case "p":
          return (
            <p key={i} className="font-body text-foreground/85 leading-relaxed mb-4">
              {block.text}
            </p>
          );
        case "ul":
          return (
            <ul key={i} className="font-body text-foreground/85 list-disc pl-6 mb-6 space-y-2">
              {block.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          );
        case "ol":
          return (
            <ol key={i} className="font-body text-foreground/85 list-decimal pl-6 mb-6 space-y-2">
              {block.items.map((it, j) => <li key={j}>{it}</li>)}
            </ol>
          );
        case "quote":
          return (
            <blockquote key={i} className="border-l-4 border-primary bg-primary/5 px-6 py-5 rounded-r-lg my-8 font-body italic text-foreground">
              {block.text}
            </blockquote>
          );
        case "table":
          return (
            <div key={i} className="my-8 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left font-body text-sm">
                {block.caption && (
                  <caption className="caption-bottom px-4 py-3 text-xs text-muted-foreground text-left">
                    {block.caption}
                  </caption>
                )}
                <thead className="bg-muted/60">
                  <tr>
                    {block.headers.map((h, j) => (
                      <th key={j} scope="col" className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j} className="border-t border-border">
                      {row.map((cell, k) => (
                        <td key={k} className="px-4 py-3 text-foreground/85 align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
      }
    })}
  </>
);

export default HubBlocks;
