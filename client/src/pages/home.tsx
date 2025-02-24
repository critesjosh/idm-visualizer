import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CirclePattern from "@/components/circle-pattern";
import PatternControls from "@/components/pattern-controls";

export default function Home() {
  const [circleSize, setCircleSize] = useState(100);
  const [rows, setRows] = useState(3);
  const overlap = 0.15; // Fixed at 15%

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Circle Pattern Generator</h1>
          <p className="text-muted-foreground">
            Create beautiful patterns with interlocking circles
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Card className="order-2 md:order-1">
            <CardContent className="p-6">
              <div className="aspect-[16/9] w-full overflow-auto bg-white rounded-lg">
                <CirclePattern 
                  size={circleSize}
                  rows={rows}
                  overlap={overlap}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="order-1 md:order-2">
            <CardContent className="p-6">
              <PatternControls
                circleSize={circleSize}
                onCircleSizeChange={setCircleSize}
                rows={rows}
                onRowsChange={setRows}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}