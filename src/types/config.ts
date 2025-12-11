// Types for Logiops configuration

export type GestureDirection = 'Up' | 'Down' | 'Left' | 'Right' | 'None';
export type GestureMode = 'NoPress' | 'OnRelease' | 'OnInterval' | 'OnThreshold' | 'Axis';

export type ActionType =
  | 'None'
  | 'Keypress'
  | 'Gestures'
  | 'ToggleSmartShift'
  | 'ToggleHiresScroll'
  | 'CycleDPI'
  | 'ChangeDPI'
  | 'ChangeHost';

export interface KeypressAction {
  type: 'Keypress';
  keys: string[];
}

export interface GesturesAction {
  type: 'Gestures';
  gestures: GestureConfig[];
}

export interface ToggleSmartShiftAction {
  type: 'ToggleSmartShift';
}

export interface ToggleHiresScrollAction {
  type: 'ToggleHiresScroll';
}

export interface CycleDPIAction {
  type: 'CycleDPI';
  dpis: number[];
}

export interface ChangeDPIAction {
  type: 'ChangeDPI';
  inc: number;
}

export interface ChangeHostAction {
  type: 'ChangeHost';
  host: number | 'next' | 'prev';
}

export interface NoneAction {
  type: 'None';
}

export type ButtonAction =
  | NoneAction
  | KeypressAction
  | GesturesAction
  | ToggleSmartShiftAction
  | ToggleHiresScrollAction
  | CycleDPIAction
  | ChangeDPIAction
  | ChangeHostAction;

export interface GestureConfig {
  direction: GestureDirection;
  mode: GestureMode;
  action: ButtonAction;
}

export interface ButtonConfig {
  cid: number;
  action: ButtonAction;
}

export interface SmartShiftConfig {
  on: boolean;
  threshold: number;
  defaultThreshold?: number;
  torque?: number;
}

export interface HiresScrollConfig {
  hires: boolean;
  invert: boolean;
  target: boolean;
}

export interface ThumbwheelConfig {
  divert: boolean;
  invert: boolean;
}

export interface DeviceConfig {
  name: string;
  dpi: number;
  smartshift?: SmartShiftConfig;
  hiresscroll?: HiresScrollConfig;
  thumbwheel?: ThumbwheelConfig;
  buttons: ButtonConfig[];
}

export interface LogiopsConfig {
  devices: DeviceConfig[];
}

// Device definition types
export interface DeviceButton {
  cid: number;
  name: string;
  description: string;
  defaultAction?: ButtonAction;
  supportsGestures?: boolean;
}

export interface DeviceDefinition {
  id: string;
  name: string;
  displayName: string;
  maxDPI: number;
  defaultDPI: number;
  hasSmartShift: boolean;
  hasHiresScroll: boolean;
  hasThumbwheel: boolean;
  buttons: DeviceButton[];
}
