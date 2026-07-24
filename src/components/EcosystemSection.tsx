import React from 'react';

const nodes = [
  'Films', 'OTT', 'Literature', 'Agencies', 'Painting', 'Portfolio',
  'Workshops', 'Casting', 'Dance', 'Branding', 'Music', 'Theatre',
];

// True even radial layout (angle math), not hand-placed — a real hub-and-spoke,
// not an approximation. Hover is pure CSS (group-hover), no JS event handlers,
// so the highlight never depends on a listener firing correctly.
const EcosystemSection = () => {
  return (
    <section id="ecosystem" className="relative bg-[#090B10] py-32 md:py-40 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Living Ecosystem</p>
        <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight">
          Not a company. A connected network.
        </h2>
      </div>

      <div
        className="relative mx-auto [--r:120px] md:[--r:190px] h-[300px] md:h-[460px] w-full max-w-2xl"
      >
        {nodes.map((label, i) => {
          const angleDeg = (i / nodes.length) * 360 - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          // Rounded: raw Math.cos/sin can differ in the last decimal between
          // server and client engines, which fails SSR hydration otherwise.
          const cosA = Math.round(Math.cos(angleRad) * 1e4) / 1e4;
          const sinA = Math.round(Math.sin(angleRad) * 1e4) / 1e4;

          return (
            <div key={label} className="group absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/2 left-1/2 h-px bg-[#B9914A]/25 origin-left transition-all duration-200 group-hover:bg-[#B9914A] group-hover:h-[2px]"
                style={{ width: 'var(--r)', transform: `rotate(${angleDeg}deg)` }}
              />
              <button
                type="button"
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B9914A]/25 bg-[#11151B] text-[#F5F4F2] text-[10px] md:text-xs px-3 py-2 whitespace-nowrap transition-all duration-200 hover:scale-110 hover:bg-[#B9914A] hover:text-[#090B10] hover:border-[#B9914A]"
                style={{
                  left: `calc(50% + ${cosA} * var(--r))`,
                  top: `calc(50% + ${sinA} * var(--r))`,
                }}
              >
                {label}
              </button>
            </div>
          );
        })}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#B9914A] text-[#090B10] text-[10px] md:text-xs font-medium tracking-widest w-16 h-16 md:w-20 md:h-20">
          SOSRG
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
