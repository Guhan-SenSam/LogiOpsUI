import type { DeviceConfig, ButtonAction, GestureConfig, ButtonConfig } from '../types/config';

const indent = (level: number): string => '    '.repeat(level);

const formatAction = (action: ButtonAction, level: number): string => {
  const i = indent(level);
  const i1 = indent(level + 1);

  switch (action.type) {
    case 'None':
      return `{\n${i1}type: "None";\n${i}}`;

    case 'Keypress': {
      const keys = action.keys.map((k) => `"${k}"`).join(', ');
      return `{\n${i1}type: "Keypress";\n${i1}keys: [${keys}];\n${i}}`;
    }

    case 'ToggleSmartShift':
      return `{\n${i1}type: "ToggleSmartShift";\n${i}}`;

    case 'ToggleHiresScroll':
      return `{\n${i1}type: "ToggleHiresScroll";\n${i}}`;

    case 'CycleDPI': {
      const dpis = action.dpis.join(', ');
      return `{\n${i1}type: "CycleDPI";\n${i1}dpis: [${dpis}];\n${i}}`;
    }

    case 'ChangeDPI':
      return `{\n${i1}type: "ChangeDPI";\n${i1}inc: ${action.inc};\n${i}}`;

    case 'ChangeHost': {
      const hostValue = typeof action.host === 'string' ? `"${action.host}"` : action.host;
      return `{\n${i1}type: "ChangeHost";\n${i1}host: ${hostValue};\n${i}}`;
    }

    case 'Gestures': {
      const gestures = action.gestures
        .map((g) => formatGesture(g, level + 2))
        .join(',\n');
      return `{\n${i1}type: "Gestures";\n${i1}gestures: (\n${gestures}\n${i1});\n${i}}`;
    }

    default:
      return `{\n${i1}type: "None";\n${i}}`;
  }
};

const formatGesture = (gesture: GestureConfig, level: number): string => {
  const i = indent(level);
  const i1 = indent(level + 1);

  const actionStr = formatAction(gesture.action, level + 1);

  return `${i}{\n${i1}direction: "${gesture.direction}";\n${i1}mode: "${gesture.mode}";\n${i1}action = ${actionStr}\n${i}}`;
};

const formatButton = (button: ButtonConfig, level: number): string => {
  const i = indent(level);
  const i1 = indent(level + 1);

  const cidHex = `0x${button.cid.toString(16).padStart(4, '0')}`;
  const actionStr = formatAction(button.action, level + 1);

  return `${i}{\n${i1}cid: ${cidHex};\n${i1}action = ${actionStr}\n${i}}`;
};

export const generateConfig = (config: DeviceConfig): string => {
  const lines: string[] = [];

  lines.push('devices: (');
  lines.push('{');

  // Device name
  lines.push(`    name: "${config.name}";`);

  // DPI
  lines.push(`    dpi: ${config.dpi};`);

  // SmartShift
  if (config.smartshift) {
    lines.push('    smartshift: {');
    lines.push(`        on: ${config.smartshift.on};`);
    lines.push(`        threshold: ${config.smartshift.threshold};`);
    if (config.smartshift.torque !== undefined) {
      lines.push(`        torque: ${config.smartshift.torque};`);
    }
    lines.push('    };');
  }

  // HiresScroll
  if (config.hiresscroll) {
    lines.push('    hiresscroll: {');
    lines.push(`        hires: ${config.hiresscroll.hires};`);
    lines.push(`        invert: ${config.hiresscroll.invert};`);
    lines.push(`        target: ${config.hiresscroll.target};`);
    lines.push('    };');
  }

  // Thumbwheel
  if (config.thumbwheel) {
    lines.push('    thumbwheel: {');
    lines.push(`        divert: ${config.thumbwheel.divert};`);
    lines.push(`        invert: ${config.thumbwheel.invert};`);
    lines.push('    };');
  }

  // Buttons
  if (config.buttons && config.buttons.length > 0) {
    lines.push('    buttons: (');
    const buttonStrings = config.buttons.map((btn) => formatButton(btn, 2));
    lines.push(buttonStrings.join(',\n'));
    lines.push('    );');
  }

  lines.push('}');
  lines.push(');');

  return lines.join('\n');
};

export const downloadConfig = (config: string, filename: string = 'logid.cfg'): void => {
  const blob = new Blob([config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
