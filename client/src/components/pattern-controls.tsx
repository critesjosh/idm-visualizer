import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PatternControlsProps {
  circleSize: number;
  onCircleSizeChange: (value: number) => void;
}

export default function PatternControls({
  circleSize,
  onCircleSizeChange,
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
    </div>
  );
}
