"use client";

type LoadingOverlayProps = {
  visible: boolean;
};

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <section className="sanctuary-loading" aria-live="polite" aria-label="正在加载体验">
      <div className="sanctuary-loading__inner">
        <p className="sanctuary-loading__eyebrow">Loading</p>
        <p className="sanctuary-loading__text">正在整理夜空……</p>
        <p className="sanctuary-loading__progress">星尘正在归位</p>
      </div>
    </section>
  );
}
