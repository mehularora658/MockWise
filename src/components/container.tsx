import { cn } from "@/lib/utils";

interface ContainerProps{
    children: React.ReactNode,
    className?: string;
}

export const Container = ({children , className} : ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-8 py-3 w-full ", className)}>{children}</div>
  )
}
