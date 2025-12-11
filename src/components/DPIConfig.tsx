import type { DeviceDefinition } from '../types/config';

interface DPIConfigProps {
  device: DeviceDefinition;
  dpi: number;
  onDPIChange: (dpi: number) => void;
}

export function DPIConfig({ device, dpi, onDPIChange }: DPIConfigProps) {
  return (
    <div className="config-section">
      <h3>DPI Settings</h3>
      <p className="section-description">
        Set the mouse sensitivity. Higher DPI means faster cursor movement.
      </p>
      <div className="dpi-control">
        <label htmlFor="dpi-slider">
          DPI: <strong>{dpi}</strong>
        </label>
        <input
          id="dpi-slider"
          type="range"
          min={100}
          max={device.maxDPI}
          step={100}
          value={dpi}
          onChange={(e) => onDPIChange(Number(e.target.value))}
        />
        <div className="dpi-range">
          <span>100</span>
          <span>{device.maxDPI}</span>
        </div>
      </div>
      <div className="dpi-presets">
        <span>Presets:</span>
        {[400, 800, 1000, 1200, 1600, 2000].filter(d => d <= device.maxDPI).map((preset) => (
          <button
            key={preset}
            className={`preset-btn ${dpi === preset ? 'active' : ''}`}
            onClick={() => onDPIChange(preset)}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
