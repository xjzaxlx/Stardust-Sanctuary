"use client";

type IntroOverlayProps = {
  onEnter: () => void;
};

export function IntroOverlay({ onEnter }: IntroOverlayProps) {
  return (
    <section className="sanctuary-intro" aria-labelledby="sanctuary-title">
      <div className="sanctuary-intro__inner">
        <p className="sanctuary-intro__eyebrow">Stardust Sanctuary</p>
        <h1 id="sanctuary-title">星尘收容所</h1>
        <div className="sanctuary-intro__copy">
          <p>把散落的念头，慢慢放回夜空。</p>
          <p>每一块碎片，都不是错误。</p>
          <p>连接它们，直到它们变成可以被看见的星座。</p>
        </div>
        <button className="sanctuary-intro__button" type="button" onClick={onEnter}>
          进入收容所
        </button>
      </div>
    </section>
  );
}
