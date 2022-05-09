function generateAvatar() {
  /**
   * Copyright: https://gist.github.com/desaroxx/42de36d8b34f9748c168#file-avatar-js
   * see code in action: https://jsfiddle.net/desaroxx/jp4pmd2u/
   */

  /* Configuration variables */
  var MAX_COLOR = 200; // Max value for a color component
  var MIN_COLOR = 120; // Min value for a color component
  var FILL_CHANCE = 0.5; // Chance of a square being filled [0, 1]
  var SQUARE = 80; // Size of a grid square in pixels
  var GRID = 5; // Number of squares width and height
  var PADDING = SQUARE / 2; // Padding on the edge of the canvas in px
  var SIZE = SQUARE * GRID + PADDING * 2; // Size of the canvas
  var FILL_COLOR = "#F0ECE6"; // canvas background color

  /* Create a temporary canvas */
  function setupCanvas() {
    var canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    // Fill canvas background
    var context = canvas.getContext("2d");
    context.beginPath();
    context.rect(0, 0, SIZE, SIZE);
    context.fillStyle = FILL_COLOR;
    context.fill();
    return canvas;
  }

  /* Fill in a square of the canvas */
  function fillBlock(x, y, color, context) {
    context.beginPath();
    context.rect(PADDING + x * SQUARE, PADDING + y * SQUARE, SQUARE, SQUARE);
    context.fillStyle = "rgb(" + color.join(",") + ")";
    context.fill();
  }

  /* Generate a random color with low saturation. */
  function generateColor() {
    var rgb = [];
    for (var i = 0; i < 3; i++) {
      var val = Math.floor(Math.random() * 256);
      var minEnforced = Math.max(MIN_COLOR, val);
      var maxEnforced = Math.min(MAX_COLOR, minEnforced);
      rgb.push(maxEnforced);
    }
    return rgb;
  }

  /* Generate a random identicon */
  function generateIdenticon() {
    var canvas = setupCanvas();
    var context = canvas.getContext("2d");
    var color = generateColor(); // Generate custom tile color

    // Iterate through squares on left side
    for (var x = 0; x < Math.ceil(GRID / 2); x++) {
      for (var y = 0; y < GRID; y++) {
        // Randomly fill squares
        if (Math.random() < FILL_CHANCE) {
          fillBlock(x, y, color, context);

          // Fill right side symmetrically
          if (x < Math.floor(GRID / 2)) {
            fillBlock(GRID - 1 - x, y, color, context);
          }
        }
      }
    }
    return canvas.toDataURL();
  }

  // Attach finished identicon to DOM
  var urlDataImage = generateIdenticon(); // Generate identicon
  var image = new Image(); // Create new image object
  image.src = urlDataImage; // Assign url data to image
  //   document.body.appendChild(image); // Append to body
  return image.src;
}

// returns a base64Encoded image url
let avatar = generateAvatar();
export default avatar;
