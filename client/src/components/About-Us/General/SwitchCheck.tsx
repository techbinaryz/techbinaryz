import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchCheck({
  isDark,
  setIsDark,
}: any) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={isDark}
        onCheckedChange={setIsDark}
      />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  );
}
