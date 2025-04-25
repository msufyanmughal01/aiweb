import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
export default function Theme(){
    return (
      // sign out 
        <Popover>
  <PopoverTrigger className="font-bold">Settings</PopoverTrigger>
  <PopoverContent></PopoverContent>
</Popover>
    )
}