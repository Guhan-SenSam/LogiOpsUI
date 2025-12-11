// Common keyboard keys supported by logiops (from linux input-event-codes.h)
export interface KeyOption {
  value: string;
  label: string;
  category: string;
}

export const keyCategories = [
  'Modifiers',
  'Letters',
  'Numbers',
  'Function Keys',
  'Navigation',
  'Media',
  'System',
  'Punctuation',
];

export const keyOptions: KeyOption[] = [
  // Modifiers
  { value: 'KEY_LEFTCTRL', label: 'Left Ctrl', category: 'Modifiers' },
  { value: 'KEY_RIGHTCTRL', label: 'Right Ctrl', category: 'Modifiers' },
  { value: 'KEY_LEFTSHIFT', label: 'Left Shift', category: 'Modifiers' },
  { value: 'KEY_RIGHTSHIFT', label: 'Right Shift', category: 'Modifiers' },
  { value: 'KEY_LEFTALT', label: 'Left Alt', category: 'Modifiers' },
  { value: 'KEY_RIGHTALT', label: 'Right Alt', category: 'Modifiers' },
  { value: 'KEY_LEFTMETA', label: 'Super/Win (Left)', category: 'Modifiers' },
  { value: 'KEY_RIGHTMETA', label: 'Super/Win (Right)', category: 'Modifiers' },

  // Letters
  { value: 'KEY_A', label: 'A', category: 'Letters' },
  { value: 'KEY_B', label: 'B', category: 'Letters' },
  { value: 'KEY_C', label: 'C', category: 'Letters' },
  { value: 'KEY_D', label: 'D', category: 'Letters' },
  { value: 'KEY_E', label: 'E', category: 'Letters' },
  { value: 'KEY_F', label: 'F', category: 'Letters' },
  { value: 'KEY_G', label: 'G', category: 'Letters' },
  { value: 'KEY_H', label: 'H', category: 'Letters' },
  { value: 'KEY_I', label: 'I', category: 'Letters' },
  { value: 'KEY_J', label: 'J', category: 'Letters' },
  { value: 'KEY_K', label: 'K', category: 'Letters' },
  { value: 'KEY_L', label: 'L', category: 'Letters' },
  { value: 'KEY_M', label: 'M', category: 'Letters' },
  { value: 'KEY_N', label: 'N', category: 'Letters' },
  { value: 'KEY_O', label: 'O', category: 'Letters' },
  { value: 'KEY_P', label: 'P', category: 'Letters' },
  { value: 'KEY_Q', label: 'Q', category: 'Letters' },
  { value: 'KEY_R', label: 'R', category: 'Letters' },
  { value: 'KEY_S', label: 'S', category: 'Letters' },
  { value: 'KEY_T', label: 'T', category: 'Letters' },
  { value: 'KEY_U', label: 'U', category: 'Letters' },
  { value: 'KEY_V', label: 'V', category: 'Letters' },
  { value: 'KEY_W', label: 'W', category: 'Letters' },
  { value: 'KEY_X', label: 'X', category: 'Letters' },
  { value: 'KEY_Y', label: 'Y', category: 'Letters' },
  { value: 'KEY_Z', label: 'Z', category: 'Letters' },

  // Numbers
  { value: 'KEY_1', label: '1', category: 'Numbers' },
  { value: 'KEY_2', label: '2', category: 'Numbers' },
  { value: 'KEY_3', label: '3', category: 'Numbers' },
  { value: 'KEY_4', label: '4', category: 'Numbers' },
  { value: 'KEY_5', label: '5', category: 'Numbers' },
  { value: 'KEY_6', label: '6', category: 'Numbers' },
  { value: 'KEY_7', label: '7', category: 'Numbers' },
  { value: 'KEY_8', label: '8', category: 'Numbers' },
  { value: 'KEY_9', label: '9', category: 'Numbers' },
  { value: 'KEY_0', label: '0', category: 'Numbers' },

  // Function Keys
  { value: 'KEY_F1', label: 'F1', category: 'Function Keys' },
  { value: 'KEY_F2', label: 'F2', category: 'Function Keys' },
  { value: 'KEY_F3', label: 'F3', category: 'Function Keys' },
  { value: 'KEY_F4', label: 'F4', category: 'Function Keys' },
  { value: 'KEY_F5', label: 'F5', category: 'Function Keys' },
  { value: 'KEY_F6', label: 'F6', category: 'Function Keys' },
  { value: 'KEY_F7', label: 'F7', category: 'Function Keys' },
  { value: 'KEY_F8', label: 'F8', category: 'Function Keys' },
  { value: 'KEY_F9', label: 'F9', category: 'Function Keys' },
  { value: 'KEY_F10', label: 'F10', category: 'Function Keys' },
  { value: 'KEY_F11', label: 'F11', category: 'Function Keys' },
  { value: 'KEY_F12', label: 'F12', category: 'Function Keys' },

  // Navigation
  { value: 'KEY_UP', label: 'Up Arrow', category: 'Navigation' },
  { value: 'KEY_DOWN', label: 'Down Arrow', category: 'Navigation' },
  { value: 'KEY_LEFT', label: 'Left Arrow', category: 'Navigation' },
  { value: 'KEY_RIGHT', label: 'Right Arrow', category: 'Navigation' },
  { value: 'KEY_HOME', label: 'Home', category: 'Navigation' },
  { value: 'KEY_END', label: 'End', category: 'Navigation' },
  { value: 'KEY_PAGEUP', label: 'Page Up', category: 'Navigation' },
  { value: 'KEY_PAGEDOWN', label: 'Page Down', category: 'Navigation' },
  { value: 'KEY_INSERT', label: 'Insert', category: 'Navigation' },
  { value: 'KEY_DELETE', label: 'Delete', category: 'Navigation' },
  { value: 'KEY_BACK', label: 'Browser Back', category: 'Navigation' },
  { value: 'KEY_FORWARD', label: 'Browser Forward', category: 'Navigation' },
  { value: 'KEY_TAB', label: 'Tab', category: 'Navigation' },
  { value: 'KEY_ESC', label: 'Escape', category: 'Navigation' },
  { value: 'KEY_ENTER', label: 'Enter', category: 'Navigation' },
  { value: 'KEY_SPACE', label: 'Space', category: 'Navigation' },
  { value: 'KEY_BACKSPACE', label: 'Backspace', category: 'Navigation' },

  // Media
  { value: 'KEY_PLAYPAUSE', label: 'Play/Pause', category: 'Media' },
  { value: 'KEY_STOPCD', label: 'Stop', category: 'Media' },
  { value: 'KEY_PREVIOUSSONG', label: 'Previous Track', category: 'Media' },
  { value: 'KEY_NEXTSONG', label: 'Next Track', category: 'Media' },
  { value: 'KEY_VOLUMEUP', label: 'Volume Up', category: 'Media' },
  { value: 'KEY_VOLUMEDOWN', label: 'Volume Down', category: 'Media' },
  { value: 'KEY_MUTE', label: 'Mute', category: 'Media' },

  // System
  { value: 'KEY_PRINT', label: 'Print Screen', category: 'System' },
  { value: 'KEY_SCROLLLOCK', label: 'Scroll Lock', category: 'System' },
  { value: 'KEY_PAUSE', label: 'Pause', category: 'System' },
  { value: 'KEY_CAPSLOCK', label: 'Caps Lock', category: 'System' },
  { value: 'KEY_NUMLOCK', label: 'Num Lock', category: 'System' },
  { value: 'KEY_COPY', label: 'Copy', category: 'System' },
  { value: 'KEY_PASTE', label: 'Paste', category: 'System' },
  { value: 'KEY_CUT', label: 'Cut', category: 'System' },
  { value: 'KEY_UNDO', label: 'Undo', category: 'System' },
  { value: 'KEY_REDO', label: 'Redo', category: 'System' },
  { value: 'KEY_FIND', label: 'Find', category: 'System' },
  { value: 'KEY_REFRESH', label: 'Refresh', category: 'System' },
  { value: 'KEY_SLEEP', label: 'Sleep', category: 'System' },

  // Punctuation
  { value: 'KEY_MINUS', label: 'Minus (-)', category: 'Punctuation' },
  { value: 'KEY_EQUAL', label: 'Equals (=)', category: 'Punctuation' },
  { value: 'KEY_LEFTBRACE', label: 'Left Bracket ([)', category: 'Punctuation' },
  { value: 'KEY_RIGHTBRACE', label: 'Right Bracket (])', category: 'Punctuation' },
  { value: 'KEY_SEMICOLON', label: 'Semicolon (;)', category: 'Punctuation' },
  { value: 'KEY_APOSTROPHE', label: 'Apostrophe (\')', category: 'Punctuation' },
  { value: 'KEY_GRAVE', label: 'Grave (`)', category: 'Punctuation' },
  { value: 'KEY_BACKSLASH', label: 'Backslash (\\)', category: 'Punctuation' },
  { value: 'KEY_COMMA', label: 'Comma (,)', category: 'Punctuation' },
  { value: 'KEY_DOT', label: 'Period (.)', category: 'Punctuation' },
  { value: 'KEY_SLASH', label: 'Slash (/)', category: 'Punctuation' },
];

export const getKeysByCategory = (category: string): KeyOption[] => {
  return keyOptions.filter((k) => k.category === category);
};
