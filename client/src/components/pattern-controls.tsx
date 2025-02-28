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
    <div className="fixed top-4 left-0 right-0 w-full max-w-md mx-auto px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border z-10">
      <div className="flex items-center gap-4">
        <Label className="w-24 flex-shrink-0">Circle Size</Label>
        <Slider
          min={50}
          max={1000}
          step={10}
          value={[circleSize]}
          onValueChange={([value]) => onCircleSizeChange(value)}
        />
        <span className="text-sm text-muted-foreground w-16 text-right">
          {circleSize}px
        </span>
      </div>
    </div>
  );
}
