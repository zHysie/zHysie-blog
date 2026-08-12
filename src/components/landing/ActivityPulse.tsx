import React, { useState, useMemo } from "react";

export interface ActivityPoint {
  date: string; // YYYY-MM-DD
  posts: number;
  daily: number;
}

interface ActivityPulseProps {
  data: ActivityPoint[];
  title?: string;
  subtitle?: string;
}

const ASCII_SEGMENT_PATTERN = /([A-Za-z0-9()]+)/g;
const ASCII_SEGMENT_ONLY_PATTERN = /^[A-Za-z0-9()]+$/;

function renderMixedTypography(text: string) {
  return text.split(ASCII_SEGMENT_PATTERN).map((segment, index) =>
    ASCII_SEGMENT_ONLY_PATTERN.test(segment) ? (
      <span key={`${segment}-${index}`} className="font-mono">
        {segment}
      </span>
    ) : (
      segment
    ),
  );
}

export function ActivityPulse({
  data,
  title = "创作律动",
  subtitle = "记录过去 365 天的点滴轨迹",
}: ActivityPulseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxDisplayBars = 24;

  const displayData = useMemo(() => {
    if (data.length <= maxDisplayBars) {
      return data.map((item, i) => ({
        id: item.date + i,
        date: item.date,
        posts: item.posts,
        daily: item.daily,
      }));
    }

    const out = [];
    const bucketSize = Math.ceil(data.length / maxDisplayBars);
    for (let i = 0; i < maxDisplayBars; i++) {
      const start = i * bucketSize;
      if (start >= data.length) break;
      const end = Math.min(start + bucketSize, data.length);
      const slice = data.slice(start, end);
      if (slice.length === 0) continue;

      const startDate = slice[0].date;
      const endDate = slice[slice.length - 1].date;
      let posts = 0;
      let daily = 0;
      for (const item of slice) {
        posts += item.posts;
        daily += item.daily;
      }
      out.push({
        id: `${startDate}-${endDate}-${i}`,
        date: startDate === endDate ? startDate : `${startDate} ~ ${endDate}`,
        posts,
        daily,
      });
    }
    return out;
  }, [data]);

  const totalPosts = useMemo(
    () => data.reduce((acc, curr) => acc + curr.posts, 0),
    [data],
  );
  const totalDaily = useMemo(
    () => data.reduce((acc, curr) => acc + curr.daily, 0),
    [data],
  );

  const maxPostsInView = Math.max(...displayData.map((d) => d.posts), 0);
  const maxDailyInView = Math.max(...displayData.map((d) => d.daily), 0);

  function calcBarHeight(value: number, maxValue: number) {
    if (maxValue <= 0 || value <= 0) return "2px";
    const scaled = Math.round((value / maxValue) * 92);
    return `${Math.max(4, scaled)}px`;
  }

  return (
    <section className="mt-20 pb-12 md:mt-32">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="border-border mb-4 flex w-fit items-center gap-3 border-b pb-4">
            <span className="h-px w-8 bg-[var(--brand-logo-blue)] opacity-60"></span>
            <h2 className="text-foreground font-serif text-xl font-medium">
              {title}
            </h2>
          </div>
          <p className="text-muted-foreground font-sans text-sm">
            {renderMixedTypography(subtitle)}
          </p>
        </div>

        <div className="flex gap-8 font-sans">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[10px] uppercase">
              {renderMixedTypography("文章 (Posts)")}
            </span>
            <span
              className="font-mono text-2xl"
              style={{ color: "var(--brand-logo-blue)" }}
            >
              {totalPosts}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[10px] uppercase">
              {renderMixedTypography("日常 (Daily)")}
            </span>
            <span
              className="font-mono text-2xl"
              style={{ color: "var(--brand-logo-pink)" }}
            >
              {totalDaily}
            </span>
          </div>
        </div>
      </div>

      <div className="group/container relative my-8 flex h-64 w-full items-center justify-between">
        {/* Background Center Line */}
        <div className="bg-border absolute top-1/2 right-0 left-0 z-0 h-px -translate-y-1/2"></div>

        <div className="z-10 flex h-full w-full items-center justify-between gap-1 md:gap-2">
          {displayData.map((dataPoint, i) => (
            <div
              key={dataPoint.id}
              className="relative flex h-full flex-1 cursor-crosshair flex-col items-center justify-center"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top Bar (Posts / Blue) */}
              <div
                className="absolute bottom-[calc(50%+2px)] w-full max-w-[6px] rounded-full transition-all duration-500"
                style={{
                  height: calcBarHeight(dataPoint.posts, maxPostsInView),
                  backgroundColor: "var(--brand-logo-blue)",
                  opacity:
                    hoveredIndex === null || hoveredIndex === i ? 0.8 : 0.2,
                }}
              ></div>

              {/* Bottom Bar (Daily / Pink) */}
              <div
                className="absolute top-[calc(50%+2px)] w-full max-w-[6px] rounded-full transition-all duration-500"
                style={{
                  height: calcBarHeight(dataPoint.daily, maxDailyInView),
                  backgroundColor: "var(--brand-logo-pink)",
                  opacity:
                    hoveredIndex === null || hoveredIndex === i ? 0.7 : 0.15,
                }}
              ></div>

              {/* Hover Tooltip */}
              {hoveredIndex === i && (
                <div className="border-border bg-background absolute top-0 z-20 -translate-y-6 rounded-xl border px-3 py-2 whitespace-nowrap shadow-lg">
                  <div className="text-muted-foreground mb-1 font-mono text-[10px]">
                    {dataPoint.date}
                  </div>
                  <div className="flex items-center gap-2 font-sans text-xs font-medium">
                    <span style={{ color: "var(--brand-logo-blue)" }}>
                      <span className="font-mono">{dataPoint.posts}</span> 篇
                    </span>
                    <span className="font-mono opacity-30">/</span>
                    <span style={{ color: "var(--brand-logo-pink)" }}>
                      <span className="font-mono">{dataPoint.daily}</span> 条
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subtle Glow Decor */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/4 h-32 w-32 -translate-y-1/2 blur-[100px]"
          style={{ backgroundColor: "var(--brand-logo-blue)", opacity: 0.15 }}
        ></div>
        <div
          className="pointer-events-none absolute top-1/2 right-1/4 h-32 w-32 -translate-y-1/2 blur-[80px]"
          style={{ backgroundColor: "var(--brand-logo-pink)", opacity: 0.15 }}
        ></div>
      </div>

      <div className="text-muted-foreground flex items-center justify-between px-2 font-sans text-[10px] tracking-widest uppercase">
        <span>{renderMixedTypography("365 Days Ago")}</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: "var(--brand-logo-blue)",
                opacity: 0.8,
              }}
            ></span>
            <span>{renderMixedTypography("Posts (文章)")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: "var(--brand-logo-pink)",
                opacity: 0.7,
              }}
            ></span>
            <span>{renderMixedTypography("Daily (日常)")}</span>
          </div>
        </div>
        <span>{renderMixedTypography("Today")}</span>
      </div>
    </section>
  );
}
