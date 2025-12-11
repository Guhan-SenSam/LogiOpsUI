import { useState } from 'react';
import type {
  DeviceButton,
  ButtonAction,
  GestureConfig,
  GestureDirection,
  GestureMode,
  ActionType,
} from '../types/config';
import { keyOptions, keyCategories } from '../data/keys';

interface ButtonConfigProps {
  button: DeviceButton;
  action: ButtonAction;
  onChange: (action: ButtonAction) => void;
}

const actionTypes: { value: ActionType; label: string; description: string }[] = [
  { value: 'None', label: 'None', description: 'No action' },
  { value: 'Keypress', label: 'Keypress', description: 'Send keyboard key(s)' },
  { value: 'Gestures', label: 'Gestures', description: 'Direction-based actions' },
  { value: 'ToggleSmartShift', label: 'Toggle SmartShift', description: 'Toggle scroll wheel mode' },
  { value: 'ToggleHiresScroll', label: 'Toggle HiRes Scroll', description: 'Toggle high-resolution scrolling' },
  { value: 'CycleDPI', label: 'Cycle DPI', description: 'Cycle through DPI values' },
  { value: 'ChangeDPI', label: 'Change DPI', description: 'Increase/decrease DPI' },
  { value: 'ChangeHost', label: 'Change Host', description: 'Switch connected device' },
];

const gestureDirections: GestureDirection[] = ['Up', 'Down', 'Left', 'Right'];
const gestureModes: { value: GestureMode; label: string }[] = [
  { value: 'OnRelease', label: 'On Release' },
  { value: 'NoPress', label: 'No Press' },
  { value: 'OnInterval', label: 'On Interval' },
  { value: 'OnThreshold', label: 'On Threshold' },
];

function KeySelector({
  selectedKeys,
  onChange,
}: {
  selectedKeys: string[];
  onChange: (keys: string[]) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState('Modifiers');

  const toggleKey = (key: string) => {
    if (selectedKeys.includes(key)) {
      onChange(selectedKeys.filter((k) => k !== key));
    } else {
      onChange([...selectedKeys, key]);
    }
  };

  const filteredKeys = keyOptions.filter((k) => k.category === selectedCategory);

  return (
    <div className="key-selector">
      <div className="selected-keys">
        <label>Selected Keys:</label>
        <div className="key-chips">
          {selectedKeys.length === 0 ? (
            <span className="no-keys">No keys selected</span>
          ) : (
            selectedKeys.map((key) => {
              const keyInfo = keyOptions.find((k) => k.value === key);
              return (
                <span key={key} className="key-chip" onClick={() => toggleKey(key)}>
                  {keyInfo?.label || key} &times;
                </span>
              );
            })
          )}
        </div>
      </div>
      <div className="category-tabs">
        {keyCategories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="key-grid">
        {filteredKeys.map((key) => (
          <button
            key={key.value}
            className={`key-btn ${selectedKeys.includes(key.value) ? 'selected' : ''}`}
            onClick={() => toggleKey(key.value)}
          >
            {key.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function GestureEditor({
  gesture,
  onChange,
}: {
  gesture: GestureConfig;
  onChange: (gesture: GestureConfig) => void;
}) {
  const [showKeySelector, setShowKeySelector] = useState(false);

  const handleActionTypeChange = (type: ActionType) => {
    let newAction: ButtonAction;
    switch (type) {
      case 'Keypress':
        newAction = { type: 'Keypress', keys: [] };
        break;
      case 'ToggleSmartShift':
        newAction = { type: 'ToggleSmartShift' };
        break;
      case 'ToggleHiresScroll':
        newAction = { type: 'ToggleHiresScroll' };
        break;
      case 'CycleDPI':
        newAction = { type: 'CycleDPI', dpis: [800, 1200, 1600] };
        break;
      case 'ChangeDPI':
        newAction = { type: 'ChangeDPI', inc: 200 };
        break;
      case 'ChangeHost':
        newAction = { type: 'ChangeHost', host: 'next' };
        break;
      default:
        newAction = { type: 'None' };
    }
    onChange({ ...gesture, action: newAction });
  };

  return (
    <div className="gesture-editor">
      <div className="gesture-direction">{gesture.direction}</div>
      <div className="gesture-config">
        <select
          value={gesture.mode}
          onChange={(e) => onChange({ ...gesture, mode: e.target.value as GestureMode })}
        >
          {gestureModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
        <select
          value={gesture.action.type}
          onChange={(e) => handleActionTypeChange(e.target.value as ActionType)}
        >
          {actionTypes
            .filter((at) => at.value !== 'Gestures')
            .map((at) => (
              <option key={at.value} value={at.value}>
                {at.label}
              </option>
            ))}
        </select>
        {gesture.action.type === 'Keypress' && (
          <div className="inline-key-config">
            <button
              className="edit-keys-btn"
              onClick={() => setShowKeySelector(!showKeySelector)}
            >
              {gesture.action.keys.length > 0
                ? gesture.action.keys.map(k => keyOptions.find(ko => ko.value === k)?.label || k).join(' + ')
                : 'Select Keys'}
            </button>
            {showKeySelector && (
              <>
                <div className="key-selector-overlay" onClick={() => setShowKeySelector(false)} />
                <div className="key-selector-popup">
                  <div className="popup-header">
                    <h4>Select Keys</h4>
                    <button className="close-btn" onClick={() => setShowKeySelector(false)}>&times;</button>
                  </div>
                  <KeySelector
                    selectedKeys={gesture.action.keys}
                    onChange={(keys) =>
                      onChange({ ...gesture, action: { type: 'Keypress', keys } })
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
        {gesture.action.type === 'CycleDPI' && (
          <input
            type="text"
            placeholder="800, 1200, 1600"
            value={gesture.action.dpis.join(', ')}
            onChange={(e) => {
              const dpis = e.target.value
                .split(',')
                .map((s) => parseInt(s.trim()))
                .filter((n) => !isNaN(n));
              onChange({ ...gesture, action: { type: 'CycleDPI', dpis } });
            }}
          />
        )}
        {gesture.action.type === 'ChangeDPI' && (
          <input
            type="number"
            placeholder="200"
            value={gesture.action.inc}
            onChange={(e) =>
              onChange({
                ...gesture,
                action: { type: 'ChangeDPI', inc: parseInt(e.target.value) || 0 },
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export function ButtonConfig({ button, action, onChange }: ButtonConfigProps) {
  const [expanded, setExpanded] = useState(false);
  const [showKeySelector, setShowKeySelector] = useState(false);

  const handleActionTypeChange = (type: ActionType) => {
    let newAction: ButtonAction;
    switch (type) {
      case 'Keypress':
        newAction = { type: 'Keypress', keys: [] };
        break;
      case 'Gestures':
        newAction = {
          type: 'Gestures',
          gestures: gestureDirections.map((dir) => ({
            direction: dir,
            mode: 'OnRelease' as GestureMode,
            action: { type: 'None' as const },
          })),
        };
        break;
      case 'ToggleSmartShift':
        newAction = { type: 'ToggleSmartShift' };
        break;
      case 'ToggleHiresScroll':
        newAction = { type: 'ToggleHiresScroll' };
        break;
      case 'CycleDPI':
        newAction = { type: 'CycleDPI', dpis: [800, 1200, 1600] };
        break;
      case 'ChangeDPI':
        newAction = { type: 'ChangeDPI', inc: 200 };
        break;
      case 'ChangeHost':
        newAction = { type: 'ChangeHost', host: 'next' };
        break;
      default:
        newAction = { type: 'None' };
    }
    onChange(newAction);
  };

  const updateGesture = (index: number, gesture: GestureConfig) => {
    if (action.type === 'Gestures') {
      const newGestures = [...action.gestures];
      newGestures[index] = gesture;
      onChange({ type: 'Gestures', gestures: newGestures });
    }
  };

  const getActionSummary = (): string => {
    switch (action.type) {
      case 'None':
        return 'No action';
      case 'Keypress':
        if (action.keys.length === 0) return 'Keypress (none)';
        return action.keys.map(k => keyOptions.find(ko => ko.value === k)?.label || k).join(' + ');
      case 'Gestures': {
        const activeGestures = action.gestures.filter(g => g.action.type !== 'None').length;
        return `Gestures (${activeGestures} configured)`;
      }
      case 'ToggleSmartShift':
        return 'Toggle SmartShift';
      case 'ToggleHiresScroll':
        return 'Toggle HiRes Scroll';
      case 'CycleDPI':
        return `Cycle DPI (${action.dpis.join(', ')})`;
      case 'ChangeDPI':
        return `Change DPI (${action.inc > 0 ? '+' : ''}${action.inc})`;
      case 'ChangeHost':
        return `Change Host (${action.host})`;
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`button-config ${expanded ? 'expanded' : ''}`}>
      <div className="button-header" onClick={() => setExpanded(!expanded)}>
        <div className="button-info">
          <span className="button-name">{button.name}</span>
          <span className="button-cid">CID: 0x{button.cid.toString(16).padStart(4, '0')}</span>
        </div>
        <div className="button-action-summary">{getActionSummary()}</div>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="button-body">
          <p className="button-description">{button.description}</p>

          <div className="action-type-select">
            <label>Action Type:</label>
            <select value={action.type} onChange={(e) => handleActionTypeChange(e.target.value as ActionType)}>
              {actionTypes
                .filter((at) => at.value !== 'Gestures' || button.supportsGestures)
                .map((at) => (
                  <option key={at.value} value={at.value}>
                    {at.label}
                  </option>
                ))}
            </select>
          </div>

          {action.type === 'Keypress' && (
            <div className="action-config">
              <button
                className="edit-keys-btn large"
                onClick={() => setShowKeySelector(!showKeySelector)}
              >
                {action.keys.length > 0
                  ? `Keys: ${action.keys.map(k => keyOptions.find(ko => ko.value === k)?.label || k).join(' + ')}`
                  : 'Click to select keys'}
              </button>
              {showKeySelector && (
                <>
                  <div className="key-selector-overlay" onClick={() => setShowKeySelector(false)} />
                  <div className="key-selector-popup">
                    <div className="popup-header">
                      <h4>Select Keys</h4>
                      <button className="close-btn" onClick={() => setShowKeySelector(false)}>&times;</button>
                    </div>
                    <KeySelector
                      selectedKeys={action.keys}
                      onChange={(keys) => onChange({ type: 'Keypress', keys })}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {action.type === 'Gestures' && (
            <div className="gestures-config">
              <p className="gestures-help">
                Configure actions for each gesture direction when holding this button and moving
                the mouse.
              </p>
              <div className="gestures-grid">
                {action.gestures.map((gesture, index) => (
                  <GestureEditor
                    key={gesture.direction}
                    gesture={gesture}
                    onChange={(g) => updateGesture(index, g)}
                  />
                ))}
              </div>
            </div>
          )}

          {action.type === 'CycleDPI' && (
            <div className="action-config">
              <label>DPI Values (comma-separated):</label>
              <input
                type="text"
                value={action.dpis.join(', ')}
                onChange={(e) => {
                  const dpis = e.target.value
                    .split(',')
                    .map((s) => parseInt(s.trim()))
                    .filter((n) => !isNaN(n));
                  onChange({ type: 'CycleDPI', dpis });
                }}
                placeholder="800, 1200, 1600, 2000"
              />
            </div>
          )}

          {action.type === 'ChangeDPI' && (
            <div className="action-config">
              <label>DPI Change Amount:</label>
              <input
                type="number"
                value={action.inc}
                onChange={(e) => onChange({ type: 'ChangeDPI', inc: parseInt(e.target.value) || 0 })}
                placeholder="200"
              />
              <p className="field-description">
                Positive values increase DPI, negative values decrease it.
              </p>
            </div>
          )}

          {action.type === 'ChangeHost' && (
            <div className="action-config">
              <label>Host Selection:</label>
              <select
                value={typeof action.host === 'string' ? action.host : action.host.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  const host = val === 'next' || val === 'prev' ? val : parseInt(val);
                  onChange({ type: 'ChangeHost', host });
                }}
              >
                <option value="next">Next Host</option>
                <option value="prev">Previous Host</option>
                <option value="1">Host 1</option>
                <option value="2">Host 2</option>
                <option value="3">Host 3</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
