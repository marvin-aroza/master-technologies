import type { Card } from "@/types/topic";

interface ContentCardProps {
  card: Card;
}

export function ContentCard({ card }: ContentCardProps) {
  return (
    <article className="content-card">
      {card.title && <h2 className="content-card-title">{card.title}</h2>}
      <div
        className="content-card-body prose"
        dangerouslySetInnerHTML={{ __html: card.contentHtml }}
      />
    </article>
  );
}
