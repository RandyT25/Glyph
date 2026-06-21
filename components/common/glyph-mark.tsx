interface GlyphMarkProps {
  size?: number;
  color?: string;
  showDot?: boolean;
  className?: string;
}

export default function GlyphMark({
  size = 32,
  color = "#4F46E5",
  showDot = true,
  className,
}: GlyphMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Glyph mark"
    >
      {/* Vertical stroke */}
      <line
        x1="38"
        y1="14"
        x2="38"
        y2="106"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Upper diagonal stroke */}
      <line
        x1="38"
        y1="60"
        x2="90"
        y2="16"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Lower diagonal stroke */}
      <line
        x1="38"
        y1="60"
        x2="90"
        y2="104"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Amber dot — outer */}
      {showDot && (
        <>
          <circle cx="90" cy="16" r="9" fill="#F59E0B" />
          <circle cx="90" cy="16" r="5" fill="#FCD34D" />
        </>
      )}
    </svg>
  );
}
