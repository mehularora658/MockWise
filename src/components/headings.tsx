import { cn } from "@/lib/utils"

interface HeadingsProps{
    title:string,
    description?:string,
    isSubheading?:boolean
}

export const Headings = ({title,description,isSubheading=false}: HeadingsProps) => {
  return (
    <div>
        <h2 className={cn(
            "text-2xl md:text-3xl text-gray-800 font-semibold font-sans",
            isSubheading && "text-lg md:text-xl"
        )}
        >
        {title}
        </h2>
        {
            description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )
        }
    </div>
  )
}
