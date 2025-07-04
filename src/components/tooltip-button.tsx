import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { Button } from "./ui/button"
import { Loader } from "lucide-react"

// assuming the button variants types are something like following

type ButtonVariant = 
    | "ghost"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;

    interface ToolTipButtonProps {
        content:string;
        icon: React.ReactNode;
        onClick: () => void;
        buttonVariant?: ButtonVariant;
        buttonClassName?: string;
        delay?: number;
        disabled?: boolean;
        loading?: boolean;
        }

    export const ToolTipButton = ({
        content,
        icon,
        onClick,
        buttonVariant = "ghost",
        buttonClassName = "",
        delay = 0,
        disabled = false,
        loading = false,
    }: ToolTipButtonProps) => {
        return (
            <TooltipProvider delayDuration={delay}>
                <Tooltip>
                    <TooltipTrigger asChild
                    className={disabled ? "cursor-not-allowed" : "cursor-pointer" }
                    >
                        <Button 
                            size={"icon"}
                            disabled={disabled}
                            variant={buttonVariant}
                            className={buttonClassName}
                            onClick={onClick}
                            >
                                {
                                    loading ? (
                                        <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500"/>
                                    ) : (
                                        icon
                                    )
                                }
                            </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{loading ? "Loading..." : content}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }  
