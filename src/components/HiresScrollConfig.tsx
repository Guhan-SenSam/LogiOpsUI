import type { HiresScrollConfig as HiresScrollConfigType } from '../types/config';

interface HiresScrollConfigProps {
  config: HiresScrollConfigType;
  onChange: (config: HiresScrollConfigType) => void;
}

export function HiresScrollConfig({ config, onChange }: HiresScrollConfigProps) {
  return (
    <div className="config-section">
      <h3>High-Resolution Scroll Settings</h3>
      <p className="section-description">
        Configure high-resolution scrolling for smoother and more precise scroll behavior.
      </p>

      <div className="config-row">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={config.hires}
            onChange={(e) => onChange({ ...config, hires: e.target.checked })}
          />
          <span className="toggle-text">Enable HiRes Scrolling</span>
        </label>
        <p className="field-description">
          Enables high-resolution scroll mode for finer scroll increments.
        </p>
      </div>

      <div className="config-row">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={config.invert}
            onChange={(e) => onChange({ ...config, invert: e.target.checked })}
          />
          <span className="toggle-text">Invert Scroll Direction</span>
        </label>
        <p className="field-description">Reverses the scroll direction (natural scrolling).</p>
      </div>

      <div className="config-row">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={config.target}
            onChange={(e) => onChange({ ...config, target: e.target.checked })}
          />
          <span className="toggle-text">Target Mode</span>
        </label>
        <p className="field-description">
          Enables HID++ scroll notification target mode. Leave off unless you have specific needs.
        </p>
      </div>
    </div>
  );
}
