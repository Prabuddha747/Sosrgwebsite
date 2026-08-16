import { INDIA_MAP_VIEWBOX, INDIA_STATE_PATHS } from '../../data/indiaMapPaths';

// GADM-era names differ from current official names for two states.
const CURRENT_NAME: Record<string, string> = {
  Orissa: 'Odisha',
  Uttaranchal: 'Uttarakhand',
};

export const IndiaMap = ({ highlightState }: { highlightState?: string | null }) => (
  <svg viewBox={INDIA_MAP_VIEWBOX} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {INDIA_STATE_PATHS.map((state) => {
      const isHighlighted = highlightState != null && (CURRENT_NAME[state.name] ?? state.name) === highlightState;
      return (
        <path
          key={state.name}
          d={state.d}
          className="india-map-state"
          fill="var(--color-gold)"
          fillOpacity={isHighlighted ? 0.45 : 0.12}
          stroke="var(--color-gold)"
          strokeOpacity={isHighlighted ? 0.9 : 0.4}
          strokeWidth={isHighlighted ? 1.5 : 0.75}
        />
      );
    })}
  </svg>
);
