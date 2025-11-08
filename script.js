/* -----------------------------
   PUZZLE GAME — DRAG & DROP
------------------------------ */

const piecesArea = document.getElementById("pieces");
const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");

let correctPieces = 0;

/* --- Create 6 puzzle pieces (2 rows × 3 columns) --- */
const positions = [
  { x: 0,   y: 0 },
  { x: -100, y: 0 },
  { x: -200, y: 0 },
  { x: 0,   y: -100 },
  { x: -100, y: -100 },
  { x: -200, y: -100 },
];

/* --- Create shuffled pieces --- */
function createPieces() {
  piecesArea.innerHTML = "";
  board.innerHTML = "";
  correctPieces = 0;

  // Shuffle order
  const shuffled = [...positions].sort(() => Math.random() - 0.5);

  shuffled.forEach((pos, index) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");

    // Set background position
    piece.style.backgroundPosition = `${pos.x}px ${pos.y}px`;

    // Assign correct index (0 to 5)
    piece.setAttribute("data-index", positions.indexOf(pos));

    // Make draggable
    piece.setAttribute("draggable", "true");

    // Drag Events
    piece.addEventListener("dragstart", dragStart);

    piecesArea.appendChild(piece);
  });

  // Create empty slots in board
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.setAttribute("data-slot", i);

    // Allow dropping
    slot.addEventListener("dragover", dragOver);
    slot.addEventListener("drop", dropPiece);

    board.appendChild(slot);
  }
}

/* --- Drag Functions --- */
let draggedPiece = null;

function dragStart(e) {
  draggedPiece = e.target;
}

function dragOver(e) {
  e.preventDefault(); // allow drop
}

function dropPiece(e) {
  const slot = e.target;

  // Avoid dropping into filled slot
  if (slot.firstChild) return;

  // Place piece in slot
  slot.appendChild(draggedPiece);

  const pieceIndex = draggedPiece.getAttribute("data-index");
  const slotIndex = slot.getAttribute("data-slot");

  if (pieceIndex === slotIndex) {
    correctPieces++;
  }

  // Check if puzzle complete
  if (correctPieces === 6) {
    setTimeout(() => alert("🎉 Puzzle Completed!"), 100);
  }
}

/* --- Reset Button --- */
resetBtn.addEventListener("click", createPieces);

/* --- Start Puzzle on Page Load --- */
createPieces();
