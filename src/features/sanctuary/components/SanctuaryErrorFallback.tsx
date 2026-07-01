"use client";

type SanctuaryErrorFallbackProps = {
  onRetry: () => void;
};

export function SanctuaryErrorFallback({ onRetry }: SanctuaryErrorFallbackProps) {
  return (
    <section className="sanctuary-error" role="alert" aria-live="assertive">
      <div className="sanctuary-error__inner">
        <p className="sanctuary-error__eyebrow">Stardust Sanctuary</p>
        <p className="sanctuary-error__text">夜空暂时没有回应。</p>
        <button className="sanctuary-error__button" type="button" onClick={onRetry}>
          再试一次
        </button>
      </div>
    </section>
  );
}
