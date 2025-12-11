import { devices } from '../data/devices';
import type { DeviceDefinition } from '../types/config';

interface DeviceSelectorProps {
  selectedDevice: DeviceDefinition | null;
  onSelectDevice: (device: DeviceDefinition) => void;
}

export function DeviceSelector({ selectedDevice, onSelectDevice }: DeviceSelectorProps) {
  return (
    <div className="device-selector">
      <h2>Select Your Device</h2>
      <div className="device-grid">
        {devices.map((device) => (
          <button
            key={device.id}
            className={`device-card ${selectedDevice?.id === device.id ? 'selected' : ''}`}
            onClick={() => onSelectDevice(device)}
          >
            <div className="device-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3>{device.displayName}</h3>
            <p className="device-name">{device.name}</p>
            <div className="device-specs">
              <span>Max DPI: {device.maxDPI}</span>
              {device.hasSmartShift && <span>SmartShift</span>}
              {device.hasHiresScroll && <span>HiRes Scroll</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
