import { Skeleton } from "@/components/ui/skeleton";

export const MeetingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border border-white/5 p-6 h-[280px] flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between mb-6">
            <Skeleton className="h-5 w-20 rounded-lg bg-white/5" />
            <Skeleton className="h-9 w-9 rounded-xl bg-white/5" />
          </div>
          <Skeleton className="h-7 w-3/4 mb-3 bg-white/5" />
          <Skeleton className="h-4 w-full mb-2 bg-white/5" />
          <Skeleton className="h-4 w-2/3 bg-white/5" />
        </div>
        <div className="pt-5 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((j) => (
              <Skeleton
                key={j}
                className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/5"
              />
            ))}
          </div>
          <Skeleton className="h-6 w-24 rounded-lg bg-white/5" />
        </div>
      </div>
    ))}
  </div>
);

export const AnalyticsSkeleton = () => (
  <div className="space-y-6 md:space-y-10">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-6 rounded-[2rem] bg-[#020617]/40 border border-white/5 h-32 flex flex-col justify-center"
        >
          <Skeleton className="h-3 w-20 mb-3 bg-white/5" />
          <Skeleton className="h-8 w-16 bg-white/5" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="p-8 rounded-[2.5rem] bg-[#020617]/40 border border-white/5 h-[360px]"
        >
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="w-10 h-10 rounded-xl bg-white/5" />
            <Skeleton className="h-6 w-40 bg-white/5" />
          </div>
          <Skeleton className="h-[220px] w-full bg-white/5 rounded-2xl" />
        </div>
      ))}
    </div>
  </div>
);
