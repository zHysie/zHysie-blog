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

  const totalPosts = useMemo(() => data.reduce((acc, curr) => acc + curr.posts, 0), [data]);
  const totalDaily = useMemo(() => data.reduce((acc, curr) => acc + curr.daily, 0), [data]);

  const maxPostsInView = Math.max(...displayData.map((d) => d.posts), 0);
  const maxDailyInView = Math.max(...displayData.map((d) => d.daily), 0);

  function calcBarHeight(value: number, maxValue: number) {
    if (maxValue <= 0 || value <= 0) return "2px";
    const scaled = Math.round((value / maxValue) * 92);
    return `${Math.max(4, scaled)}px`;
  }

  // User's requested base colors
  // Pink (posts/up): #e3acb7
  // Blue (daily/down): #6ea8da
  // They requested it to be transparent/grayish, so we'll use opacity /60

  return (
    <section className="mt-20 md:mt-32 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-800 pb-4 w-fit">
            <span className="h-px w-8 bg-[#6ea8da]/60"></span>
            <h2 className="text-xl font-serif font-medium text-black dark:text-white">{title}</h2>
          </div>
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="flex gap-8 font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400">文章 (Posts)</span>
            <span className="text-2xl" style={{ color: "#6ea8da" }}>{totalPosts}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400">日常 (Daily)</span>
            <span className="text-2xl" style={{ color: "#e3acb7" }}>{totalDaily}</span>
          </div>
        </div>
      </div>

      <div className="relative h-64 w-full flex items-center justify-between group/container my-8">
        {/* Background Center Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-black/10 dark:bg-white/10 z-0"></div>

        <div className="flex items-center justify-between w-full h-full gap-1 md:gap-2 z-10">
          {displayData.map((dataPoint, i) => (
            <div
              key={dataPoint.id}
              className="relative flex-1 flex flex-col items-center justify-center h-full cursor-crosshair"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top Bar (Posts / Blue) */}
              <div
                className="absolute bottom-[calc(50%+2px)] w-full max-w-[6px] rounded-full transition-all duration-500"
                style={{
                  height: calcBarHeight(dataPoint.posts, maxPostsInView),
                  backgroundColor: "#6ea8da",
                  opacity: hoveredIndex === null || hoveredIndex === i ? 0.8 : 0.2,
                }}
              ></div>

              {/* Bottom Bar (Daily / Pink) */}
              <div
                className="absolute top-[calc(50%+2px)] w-full max-w-[6px] rounded-full transition-all duration-500"
                style={{
                  height: calcBarHeight(dataPoint.daily, maxDailyInView),
                  backgroundColor: "#e3acb7",
                  opacity: hoveredIndex === null || hoveredIndex === i ? 0.7 : 0.15,
                }}
              ></div>

              {/* Hover Tooltip */}
              {hoveredIndex === i && (
                <div className="absolute top-0 -translate-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-xl shadow-lg z-20 whitespace-nowrap">
                  <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mb-1">{dataPoint.date}</div>
                  <div className="text-xs font-medium flex items-center gap-2">
                    <span style={{ color: "#6ea8da" }}>{dataPoint.posts} 篇</span>
                    <span className="opacity-30">/</span>
                    <span style={{ color: "#e3acb7" }}>{dataPoint.daily} 条</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subtle Glow Decor */}
        <div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-32 blur-[100px] pointer-events-none"
          style={{ backgroundColor: "rgba(110, 168, 218, 0.15)" }}
        ></div>
        <div
          className="absolute right-1/4 top-1/2 -translate-y-1/2 w-32 h-32 blur-[80px] pointer-events-none"
          style={{ backgroundColor: "rgba(227, 172, 183, 0.15)" }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 dark:text-gray-400 tracking-widest uppercase px-2">
        <span>365 Days Ago</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#6ea8da", opacity: 0.8 }}></span>
            <span>Posts (文章)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#e3acb7", opacity: 0.7 }}></span>
            <span>Daily (日常)</span>
          </div>
        </div>
        <span>Today</span>
      </div>
    </section>
  );
}
