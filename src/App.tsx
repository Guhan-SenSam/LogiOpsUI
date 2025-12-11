import { useState, useMemo } from 'react';
import { DeviceSelector } from './components/DeviceSelector';
import { DPIConfig } from './components/DPIConfig';
import { SmartShiftConfig } from './components/SmartShiftConfig';
import { HiresScrollConfig } from './components/HiresScrollConfig';
import { ButtonConfig } from './components/ButtonConfig';
import { ConfigPreview } from './components/ConfigPreview';
import type {
  DeviceDefinition,
  DeviceConfig,
  SmartShiftConfig as SmartShiftConfigType,
  HiresScrollConfig as HiresScrollConfigType,
  ButtonConfig as ButtonConfigType,
  ButtonAction,
} from './types/config';
import { generateConfig } from './utils/configGenerator';
import './App.css';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceDefinition | null>(null);
  const [dpi, setDpi] = useState<number>(1000);
  const [smartshift, setSmartshift] = useState<SmartShiftConfigType>({
    on: true,
    threshold: 30,
    torque: 50,
  });
  const [hiresscroll, setHiresscroll] = useState<HiresScrollConfigType>({
    hires: true,
    invert: false,
    target: false,
  });
  const [buttonActions, setButtonActions] = useState<Record<number, ButtonAction>>({});

  const handleDeviceSelect = (device: DeviceDefinition) => {
    setSelectedDevice(device);
    setDpi(device.defaultDPI);
    // Initialize button actions from device defaults
    const actions: Record<number, ButtonAction> = {};
    device.buttons.forEach((btn) => {
      if (btn.defaultAction) {
        actions[btn.cid] = btn.defaultAction;
      } else {
        actions[btn.cid] = { type: 'None' };
      }
    });
    setButtonActions(actions);
  };

  const handleButtonChange = (cid: number, action: ButtonAction) => {
    setButtonActions((prev) => ({ ...prev, [cid]: action }));
  };

  const deviceConfig: DeviceConfig | null = useMemo(() => {
    if (!selectedDevice) return null;

    const buttons: ButtonConfigType[] = selectedDevice.buttons
      .filter((btn) => {
        const action = buttonActions[btn.cid];
        // Only include buttons that have non-None actions
        return action && action.type !== 'None';
      })
      .map((btn) => ({
        cid: btn.cid,
        action: buttonActions[btn.cid],
      }));

    return {
      name: selectedDevice.name,
      dpi,
      smartshift: selectedDevice.hasSmartShift ? smartshift : undefined,
      hiresscroll: selectedDevice.hasHiresScroll ? hiresscroll : undefined,
      buttons,
    };
  }, [selectedDevice, dpi, smartshift, hiresscroll, buttonActions]);

  const generatedConfig = useMemo(() => {
    if (!deviceConfig) return '';
    return generateConfig(deviceConfig);
  }, [deviceConfig]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>LogiOps Config Generator</h1>
        <p>Generate configuration files for Logitech mice on Linux</p>
      </header>

      <main className="app-main">
        <DeviceSelector selectedDevice={selectedDevice} onSelectDevice={handleDeviceSelect} />

        {selectedDevice && (
          <div className="config-container">
            <div className="config-panel">
              <h2>Configure {selectedDevice.displayName}</h2>

              <DPIConfig device={selectedDevice} dpi={dpi} onDPIChange={setDpi} />

              {selectedDevice.hasSmartShift && (
                <SmartShiftConfig config={smartshift} onChange={setSmartshift} />
              )}

              {selectedDevice.hasHiresScroll && (
                <HiresScrollConfig config={hiresscroll} onChange={setHiresscroll} />
              )}

              <div className="config-section">
                <h3>Button Configuration</h3>
                <p className="section-description">
                  Configure button actions. Click on a button to expand and customize its behavior.
                </p>
                <div className="buttons-list">
                  {selectedDevice.buttons.map((btn) => (
                    <ButtonConfig
                      key={btn.cid}
                      button={btn}
                      action={buttonActions[btn.cid] || { type: 'None' }}
                      onChange={(action) => handleButtonChange(btn.cid, action)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="preview-panel">
              <ConfigPreview config={generatedConfig} />
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          For use with{' '}
          <a href="https://github.com/PixlOne/logiops" target="_blank" rel="noopener noreferrer">
            logiops
          </a>{' '}
          - An unofficial driver for Logitech mice and keyboards
        </p>
      </footer>
    </div>
  );
}

export default App;
