import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, SquareDashedMousePointer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const EmbedModal = ({ open, onOpenChange, onSubmit, variant }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "add" ? "Add Embed" : "Edit Embed"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" asChild>
              <p className="text-sm">
                Name<span className="text-red-600">*</span>
              </p>
            </Label>
            <Input placeholder="Name" id="name" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="embedId" asChild>
              <p className="text-sm">
                Embed ID<span className="text-red-600">*</span>
              </p>
            </Label>
            <div className="flex items-center gap-2">
              <Input placeholder="Embed ID" id="embedId" required />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Copy size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy Embed ID</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="selector" asChild>
              <p className="text-sm">
                Selector<span className="text-red-600">*</span>
              </p>
            </Label>
            <div className="flex items-center gap-2">
              <Input placeholder="Selector" id="selector" required />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline">
                      <SquareDashedMousePointer size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Target element from page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="selector" asChild>
              <p className="text-sm">
                Environment<span className="text-red-600">*</span>
              </p>
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="console">Console</SelectItem>
                <SelectItem value="beta-v2">Beta-V2</SelectItem>
                <SelectItem value="beta">Beta</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={onSubmit}>
              {variant === "add" ? "Add" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
