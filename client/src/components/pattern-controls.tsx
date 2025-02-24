import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PatternControlsProps {
  circleSize: number;
  onCircleSizeChange: (value: number) => void;
  rows: number;
  onRowsChange: (value: number) => void;
  overlap: number;
  onOverlapChange: (value: number) => void;
}

export default function PatternControls({
  circleSize,
  onCircleSizeChange,
  rows,
  onRowsChange,
  overlap,
  onOverlapChange
}: PatternControlsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Circle Size</Label>
        <Slider
          min={50}
          max={200}
          step={10}
          value={[circleSize]}
          onValueChange={([value]) => onCircleSizeChange(value)}
        />
        <p className="text-sm text-muted-foreground">{circleSize}px</p>
      </div>

      <div className="space-y-2">
        <Label>Number of Rows</Label>
        <Slider
          min={2}
          max={10}
          step={1}
          value={[rows]}
          onValueChange={([value]) => onRowsChange(value)}
        />
        <p className="text-sm text-muted-foreground">{rows} rows</p>
      </div>

      <div className="space-y-2">
        <Label>Circle Overlap</Label>
        <Slider
          min={0}
          max={0.8}
          step={0.05}
          value={[overlap]}
          onValueChange={([value]) => onOverlapChange(value)}
        />
        <p className="text-sm text-muted-foreground">
          {Math.round(overlap * 100)}% overlap
        </p>
      </div>
    </div>
  );
}