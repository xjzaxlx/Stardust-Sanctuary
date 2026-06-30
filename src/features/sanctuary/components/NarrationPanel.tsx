"use client";

type NarrationPanelProps = {
  text: string;
};

export function NarrationPanel({ text }: NarrationPanelProps) {
  return (
    <aside className="sanctuary-narration" aria-live="polite">
      <p>{text}</p>
    </aside>
  );
}
