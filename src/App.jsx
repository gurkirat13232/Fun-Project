import { EmbedModal } from "@/components/dialogs/embed";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Check,
  CirclePlay,
  FileDown,
  FileUp,
  Plus,
  TextSearch,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    embeds: [
      {
        enabled: true,
        id: "123",
        name: "Embed 1",
        selector: "",
        environment: "",
      },
    ],
    errors: {},
    isDeveloperMode: false,
  });
  const [logs, setLogs] = useState([
    {
      type: "info",
      message: "This is an info message",
    },
    {
      type: "warn",
      message: "This is a warning message",
    },
    {
      type: "error",
      message:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      type: "debug",
      message: "This is a debug message",
    },
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAddEmbedDialogOpen, setIsAddEmbedDialogOpen] = useState(false);
  const [isLogsDialogOpen, setIsLogsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-4 py-3 shadow-md sticky top-0 z-10">
        <div>
          <Logo
            size={32}
            fill={data.isDeveloperMode ? "#FF0000" : "#6729FF"}
            onDoubleClick={() => {
              setData((prev) => ({
                ...prev,
                isDeveloperMode: !prev.isDeveloperMode,
              }));
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="gap-2 select-none"
            variant="outline"
            size="sm"
            onClick={() => setIsImportDialogOpen(true)}
          >
            <FileDown size={16} />
            Import
          </Button>
          <Button
            className={cn(
              "gap-2 select-none",
              isCopied ? "bg-green-500 hover:bg-green-500" : ""
            )}
            variant={isCopied ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (navigator.clipboard && data.embeds.length > 0 && !isCopied) {
                navigator.clipboard.writeText(JSON.stringify(data.embeds));
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }
            }}
          >
            {isCopied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <FileUp size={16} />
                Export
              </>
            )}
          </Button>
          <Button
            className="gap-2 select-none"
            size="sm"
            onClick={() => setIsAddEmbedDialogOpen(true)}
          >
            <Plus size={16} />
            Add
          </Button>
        </div>
      </div>
      {data.embeds.length === 0 ? (
        <div className="flex items-center justify-center flex-1 h-full w-full">
          <p className="text-sm select-none">No Active Embeds</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-end gap-2">
            {data.isDeveloperMode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2"
                      onClick={() => setIsLogsDialogOpen(true)}
                    >
                      <TextSearch size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Logs</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Button
              variant="outline"
              className="gap-2 text-destructive border-destructive hover:bg-destructive/5 hover:text-destructive select-none"
              size="sm"
              onClick={() => {}}
            >
              <Trash2 size={18} color="hsl(0 84.2% 60.2%)" />
              Delete All
            </Button>
          </div>
          {data.embeds.map((embed, index) => (
            <div key={index}>
              <Card className="px-3 py-2 cursor-pointer flex items-center gap-2 rounded">
                <CirclePlay
                  size={18}
                  stroke={embed.enabled ? "#6729FF" : "#B9B9B9"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setData((prev) => ({
                      ...prev,
                      embeds: prev.embeds.map((item) =>
                        item.id === embed.id
                          ? { ...item, enabled: !item.enabled }
                          : item
                      ),
                    }));
                  }}
                />
                <p
                  className={cn(
                    "text-sm flex-1 select-none",
                    embed.enabled ? "text-black" : "text-gray-500"
                  )}
                >
                  {embed.name}
                </p>
                <Trash2
                  size={18}
                  color="hsl(0 84.2% 60.2%)"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Import Dialog */}
      <Dialog
        open={isImportDialogOpen}
        onOpenChange={() => {
          setIsImportDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Embeds</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Paste Import JSON here..."
              className="font-mono max-h-[70vh]"
              rows="3"
            />
            <div className="flex items-center justify-end gap-2">
              <Button size="sm">Import</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Embed Dialog */}
      <EmbedModal
        variant="add"
        open={isAddEmbedDialogOpen}
        onOpenChange={() => {
          setIsAddEmbedDialogOpen(false);
        }}
        onSubmit={() => {}}
      />

      {/* Logs Dialog */}
      <Dialog
        open={isLogsDialogOpen}
        onOpenChange={() => {
          setIsLogsDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logs</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1 bg-black rounded h-[80vh] overflow-y-auto p-2">
            {logs.map((log, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p
                  className={cn(
                    "font-mono text-[11px] leading-tight grid grid-cols-[8ch,1fr] gap-1 text-gray-400",
                    log.type === "info" && "text-blue-400",
                    log.type === "warn" && "text-yellow-400",
                    log.type === "error" && "text-red-400"
                  )}
                >
                  <span>[{log.type.toUpperCase()}]</span>
                  <span>{log.message}</span>
                </p>
                {index !== logs.length - 1 && (
                  <hr className="border-gray-800" />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
