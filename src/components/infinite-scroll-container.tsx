import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteContainerProps extends PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className,
}: InfiniteContainerProps) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) onBottomReached();
    },
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
