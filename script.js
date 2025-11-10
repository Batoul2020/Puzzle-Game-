const piecesArea = document.getElementById("pieces");
const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
const messageArea = document.createElement("p");
messageArea.id = "game-message";
document.querySelector(".game-container").after(messageArea);

let correctPiecesCount = 0; // Correct piece counter

const positions = [
  { x: 0,   y: 0, index: 0 },
  { x: -100, y: 0, index: 1 },
  { x: -200, y: 0, index: 2 },
  { x: 0,   y: -100, index: 3 },
  { x: -100, y: -100, index: 4 },
  { x: -200, y: -100, index: 5 },
];

function createPieces() {
  piecesArea.innerHTML = "";
  board.innerHTML = "";
  messageArea.textContent = "";
  correctPiecesCount = 0;

  const shuffled = [...positions].sort(() => Math.random() - 0.5); // Shuffle order

  shuffled.forEach((pos) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");

    piece.style.backgroundPosition = `${pos.x}px ${pos.y}px`; // Set background position
    piece.setAttribute("data-index", pos.index); // Assign correct index
    piece.setAttribute("draggable", "true"); // Make piece draggable
    piece.addEventListener("dragstart", dragStart); // Add drag start listener

    piecesArea.appendChild(piece);
  });

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.classList.add("board-slot");
    slot.setAttribute("data-slot", i);

    slot.addEventListener("dragover", dragOver); // Add drop listeners
    slot.addEventListener("drop", dropPiece);

    board.appendChild(slot);
  }
}

let draggedPiece = null;

function dragStart(e) {
  if (e.target.classList.contains('correct')) {
    e.preventDefault(); // Prevent dragging if the piece is already correct
    return;
  }
  draggedPiece = e.target;
}

function dragOver(e) {
  e.preventDefault(); // Allow drop
}

function dropPiece(e) {
  e.preventDefault();
  const slot = e.target.classList.contains('board-slot') ? e.target : e.target.closest('.board-slot');

  if (!slot || slot.firstChild) return; // Prevent dropping into filled slot

  slot.appendChild(draggedPiece); // Place piece in slot

  const pieceIndex = draggedPiece.getAttribute("data-index");
  const slotIndex = slot.getAttribute("data-slot");

  if (pieceIndex === slotIndex) {
    draggedPiece.classList.add("correct"); // Correct placement
  } else {
    draggedPiece.classList.remove("correct"); // Incorrect placement
  }

  // Recalculate the count after the drop for robust state management
  let currentCorrectCount = 0;
  board.querySelectorAll('.board-slot').forEach(currentSlot => {
    const placedPiece = currentSlot.firstChild;
    
    // Check if the placed piece is correct and update slot visual
    if (placedPiece && placedPiece.classList.contains('correct')) {
        currentCorrectCount++;
        currentSlot.classList.add('correct-slot');
    } else {
        currentSlot.classList.remove('correct-slot'); // Ensure the slot loses its highlight
    }
  });
  correctPiecesCount = currentCorrectCount; // Update the global counter
  
  if (correctPiecesCount === 6) {
    messageArea.textContent = "🎉 Puzzle Completed! Great job!"; // Check if puzzle complete
  } else {
     messageArea.textContent = `Pieces Correct: ${correctPiecesCount}/6`; // Display current status
  }
}

resetBtn.addEventListener("click", createPieces);

createPieces(); // Start Puzzle on Page Load
