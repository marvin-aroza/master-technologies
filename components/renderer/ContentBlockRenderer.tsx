import type { ContentBlock } from "../../types/topic";

interface ContentBlockRendererProps {
  block: ContentBlock;
}

function BlockTitle({ title }: { title?: string }) {
  return title ? <h3 className="topic-block-title">{title}</h3> : null;
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case "richText":
      return (
        <article className="topic-block topic-block-rich-text">
          <BlockTitle title={block.title} />
          <div
            className="topic-block-prose prose"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </article>
      );

    case "code":
      return (
        <article className="topic-block topic-block-code">
          <BlockTitle title={block.title} />
          <pre className="topic-block-code-frame">
            <code className={`language-${block.language}`}>{block.code}</code>
          </pre>
          {block.caption && <p className="topic-block-caption">{block.caption}</p>}
        </article>
      );

    case "compare":
      return (
        <article className="topic-block topic-block-compare">
          <BlockTitle title={block.title} />
          <div className="topic-block-compare-grid">
            {block.items.map((item) => (
              <section key={item.label} className="topic-block-compare-item">
                <h4 className="topic-block-compare-label">{item.label}</h4>
                <div
                  className="topic-block-prose prose"
                  dangerouslySetInnerHTML={{ __html: item.html }}
                />
              </section>
            ))}
          </div>
        </article>
      );

    case "trap":
      return (
        <article className="topic-block topic-block-trap" data-tone={block.tone ?? "warning"}>
          <BlockTitle title={block.title} />
          <div
            className="topic-block-prose prose"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </article>
      );

    case "mechanics":
      return (
        <article className="topic-block topic-block-mechanics">
          <BlockTitle title={block.title} />
          <ol className="topic-block-mechanics-list">
            {block.steps.map((step) => (
              <li key={step} className="topic-block-mechanics-step">
                {step}
              </li>
            ))}
          </ol>
        </article>
      );

    case "drill":
      return (
        <article className="topic-block topic-block-drill">
          <BlockTitle title={block.title} />
          <p className="topic-block-drill-prompt">{block.prompt}</p>
          <div
            className="topic-block-prose prose"
            dangerouslySetInnerHTML={{ __html: block.answerHtml }}
          />
        </article>
      );

    case "recap":
      return (
        <article className="topic-block topic-block-recap">
          <BlockTitle title={block.title} />
          <ul className="topic-block-recap-list">
            {block.items.map((item) => (
              <li key={item} className="topic-block-recap-item">
                {item}
              </li>
            ))}
          </ul>
        </article>
      );
  }
}
