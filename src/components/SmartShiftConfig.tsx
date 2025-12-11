import type { SmartShiftConfig as SmartShiftConfigType } from '../types/config';

interface SmartShiftConfigProps {
  config: SmartShiftConfigType;
  onChange: (config: SmartShiftConfigType) => void;
}

export function SmartShiftConfig({ config, onChange }: SmartShiftConfigProps) {
  return (
    <div className="config-section">
      <h3>SmartShift Settings</h3>
      <p className="section-description">
        SmartShift automatically switches between ratchet and free-spin scroll modes based on
        scroll speed.
      </p>

      <div className="config-row">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={config.on}
            onChange={(e) => onChange({ ...config, on: e.target.checked })}
          />
          <span className="toggle-text">Enable SmartShift</span>
        </label>
      </div>

      <div className="config-row">
        <label htmlFor="threshold">
          Threshold: <strong>{config.threshold}</strong>
        </label>
        <p className="field-description">
          Speed threshold for switching to free-spin mode (1-255). Lower values make it easier to
          trigger free-spin.
        </p>
        <input
          id="threshold"
          type="range"
          min={1}
          max={255}
          value={config.threshold}
          onChange={(e) => onChange({ ...config, threshold: Number(e.target.value) })}
          disabled={!config.on}
        />
        <div className="range-labels">
          <span>More sensitive (1)</span>
          <span>Less sensitive (255)</span>
        </div>
      </div>

      <div className="config-row">
        <label htmlFor="torque">
          Torque: <strong>{config.torque ?? 50}</strong>
        </label>
        <p className="field-description">
          Ratcheting force in ratchet mode. Higher values mean stronger click feedback.
        </p>
        <input
          id="torque"
          type="range"
          min={1}
          max={255}
          value={config.torque ?? 50}
          onChange={(e) => onChange({ ...config, torque: Number(e.target.value) })}
          disabled={!config.on}
        />
        <div className="range-labels">
          <span>Lighter (1)</span>
          <span>Stronger (255)</span>
        </div>
      </div>
    </div>
  );
}
