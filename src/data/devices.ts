import type { DeviceDefinition } from '../types/config';

// Common button definitions for MX Master series
const commonMxMasterButtons = [
  {
    cid: 0x0050,
    name: 'Left Click',
    description: 'Primary mouse button',
  },
  {
    cid: 0x0051,
    name: 'Right Click',
    description: 'Secondary mouse button',
  },
  {
    cid: 0x0052,
    name: 'Middle Click',
    description: 'Middle mouse button / scroll wheel click',
  },
  {
    cid: 0x0053,
    name: 'Back Button',
    description: 'Side button for navigation back',
    defaultAction: { type: 'Keypress' as const, keys: ['KEY_BACK'] },
  },
  {
    cid: 0x0056,
    name: 'Forward Button',
    description: 'Side button for navigation forward',
    defaultAction: { type: 'Keypress' as const, keys: ['KEY_FORWARD'] },
  },
  {
    cid: 0x00c3,
    name: 'Gesture Button',
    description: 'Thumb button that supports gestures (hold and move)',
    supportsGestures: true,
    defaultAction: {
      type: 'Gestures' as const,
      gestures: [
        {
          direction: 'Up' as const,
          mode: 'OnRelease' as const,
          action: { type: 'Keypress' as const, keys: ['KEY_VOLUMEUP'] },
        },
        {
          direction: 'Down' as const,
          mode: 'OnRelease' as const,
          action: { type: 'Keypress' as const, keys: ['KEY_VOLUMEDOWN'] },
        },
        {
          direction: 'Left' as const,
          mode: 'OnRelease' as const,
          action: { type: 'Keypress' as const, keys: ['KEY_PREVIOUSSONG'] },
        },
        {
          direction: 'Right' as const,
          mode: 'OnRelease' as const,
          action: { type: 'Keypress' as const, keys: ['KEY_NEXTSONG'] },
        },
      ],
    },
  },
  {
    cid: 0x00c4,
    name: 'SmartShift Button',
    description: 'Button below scroll wheel to toggle SmartShift',
    defaultAction: { type: 'ToggleSmartShift' as const },
  },
];

export const devices: DeviceDefinition[] = [
  {
    id: 'mx-master-2',
    name: 'Wireless Mouse MX Master',
    displayName: 'MX Master 2',
    maxDPI: 1600,
    defaultDPI: 1000,
    hasSmartShift: true,
    hasHiresScroll: true,
    hasThumbwheel: true,
    buttons: [
      ...commonMxMasterButtons,
      {
        cid: 0x00d7,
        name: 'Switch Receiver',
        description: 'Button to switch between receivers/hosts',
        defaultAction: { type: 'ChangeHost' as const, host: 'next' },
      },
    ],
  },
  {
    id: 'mx-master-2s',
    name: 'MX Master 2S',
    displayName: 'MX Master 2S',
    maxDPI: 4000,
    defaultDPI: 1000,
    hasSmartShift: true,
    hasHiresScroll: true,
    hasThumbwheel: true,
    buttons: [
      ...commonMxMasterButtons,
      {
        cid: 0x00d7,
        name: 'Switch Receiver',
        description: 'Button to switch between receivers/hosts',
        defaultAction: { type: 'ChangeHost' as const, host: 'next' },
      },
    ],
  },
  {
    id: 'mx-master-3',
    name: 'MX Master 3',
    displayName: 'MX Master 3',
    maxDPI: 4000,
    defaultDPI: 1000,
    hasSmartShift: true,
    hasHiresScroll: true,
    hasThumbwheel: true,
    buttons: [
      ...commonMxMasterButtons,
      {
        cid: 0x00d7,
        name: 'Switch Receiver',
        description: 'Button to switch between receivers/hosts',
        defaultAction: { type: 'ChangeHost' as const, host: 'next' },
      },
    ],
  },
  {
    id: 'mx-master-3s',
    name: 'MX Master 3S',
    displayName: 'MX Master 3S',
    maxDPI: 8000,
    defaultDPI: 1000,
    hasSmartShift: true,
    hasHiresScroll: true,
    hasThumbwheel: true,
    buttons: [
      ...commonMxMasterButtons,
      {
        cid: 0x00d7,
        name: 'Switch Receiver',
        description: 'Button to switch between receivers/hosts',
        defaultAction: { type: 'ChangeHost' as const, host: 'next' },
      },
    ],
  },
  {
    id: 'mx-master-4',
    name: 'Logitech MX Master 4',
    displayName: 'MX Master 4',
    maxDPI: 8000,
    defaultDPI: 1600,
    hasSmartShift: true,
    hasHiresScroll: true,
    hasThumbwheel: true,
    buttons: [
      ...commonMxMasterButtons,
      {
        cid: 0x00d7,
        name: 'Switch Receiver',
        description: 'Button to switch between receivers/hosts',
        defaultAction: { type: 'ChangeHost' as const, host: 'next' },
      },
      {
        cid: 0x01a0,
        name: 'Thumb Button',
        description: 'Additional thumb button below gesture button',
        defaultAction: { type: 'Keypress' as const, keys: ['KEY_LEFTMETA'] },
      },
    ],
  },
];

export const getDeviceById = (id: string): DeviceDefinition | undefined => {
  return devices.find((d) => d.id === id);
};
