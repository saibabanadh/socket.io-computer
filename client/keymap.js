
var shifting = module.exports.shifting = false;
var ctrling = module.exports.ctrling = false;
var alting = module.exports.alting = false;

var lastx = module.exports.lastx = 0;
var lasty = module.exports.lasty = 0;

// maps javascript keycodes to qemu key names
var keymap = module.exports.keymap = {
    8: 'backspace'
  , 9: 'tab'
  , 13: 'ret'
  , 16: 'shift'
  , 17: 'ctrl'
  , 18: 'alt'
  , 19: '?'// pause
  , 20: 'caps_lock'
  , 27: 'esc'
  , 32: 'spc'
  , 33: 'pgup'
  , 34: 'pgdn'
  , 35: 'end'
  , 36: 'home'
  , 37: 'left'
  , 38: 'up'
  , 39: 'right'
  , 40: 'down'
  , 44: 'print'
  , 45: 'insert'
  , 46: 'delete'
  , 48: '0'
  , 49: '1'
  , 50: '2'
  , 51: '3'
  , 52: '4'
  , 53: '5'
  , 54: '6'
  , 55: '7'
  , 56: '8'
  , 57: '9'
  , 59: 'semicolon'
  , 61: 'equal'
  , 65: 'a'
  , 66: 'b'
  , 67: 'c'
  , 68: 'd'
  , 69: 'e'
  , 70: 'f'
  , 71: 'g'
  , 72: 'h'
  , 73: 'i'
  , 74: 'j'
  , 75: 'k'
  , 76: 'l'
  , 77: 'm'
  , 78: 'n'
  , 79: 'o'
  , 80: 'p'
  , 81: 'q'
  , 82: 'r'
  , 83: 's'
  , 84: 't'
  , 85: 'u'
  , 86: 'v'
  , 87: 'w'
  , 88: 'x'
  , 89: 'y'
  , 90: 'z'
  , 107: 'equal'
  , 109: 'minus'
  , 112: 'f1'
  , 113: 'f2'
  , 114: 'f3'
  , 115: 'f4'
  , 116: 'f5'
  , 117: 'f6'
  , 118: 'f7'
  , 119: 'f8'
  , 120: 'f9'
  , 121: 'f10'
  , 122: 'f11'
  , 123: 'f12'
  , 144: 'num_lock'
  , 145: 'scroll_lock'
  , 186: 'semicolon'
  , 187: 'equal'
  , 188: 'comma'
  , 189: 'minus'
  , 190: 'dot'
  , 191: 'slash'
  , 192: 'apostrophe'
  , 219: 'bracket_left'
  , 220: 'backslash'
  , 221: 'bracket_right'
  , 222: '\''
}

// returns the string to send to the qemu sendkey api from a javascript
// key-event keycode.
module.exports.qemukey = function(keycode) {
  if (keycode == 16) {
    shifting = true; return null;
  } else if (keycode == 17) {
    ctrling = true; return null;
  } else if (keycode == 18) {
    alting = true; return null;
  }

  var mapping = keymap[keycode];
  if (!mapping) return null;

  var prefix = '';
  if (shifting) prefix += 'shift-';
  if (ctrling) prefix += 'ctrl-';
  if (alting) prefix += 'alt-';

  return prefix + mapping;
}

module.exports.keyup = function(keycode) {
  if (keycode == 16) {
    shifting = false;
  } else if (keycode == 17) {
    ctrling = false;
  } else if (keycode == 18) {
    alting = false;
  }
}

// takes clientX and clientY from mouse, updates mouse position, and returns delta
module.exports.mousemove = function(x, y) {
  var dx = x - lastx;
  var dy = y - lasty;

  lastx = x;
  lasty = y;

  return {dx: dx, dy: dy};
}

// takes a mouse click event and returns qemu state of mouse
module.exports.mouseclick = function(ev) {
  switch (ev.which) {
    case 1: return '1';
    case 2: return '2';
    case 3: return '4';
    default: return '1';
  }
}
