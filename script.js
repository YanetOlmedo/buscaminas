//tamaño del juego
let rows = 16;
let cols = 20;
let BombPct = 18; // % de espacios que son bombas
let gameOver = 0;
let Score = 0;
let cantidadBomb = Math.floor((cols * rows * BombPct) / 100)

class board {
  constructor(cid, bid, r, c, col) {
    let elem = document.createElement("div");
    elem.style.backgroundImage = GetAColor(col);
    elem.style.borderStyle = "outset";
    elem.style.width = "20px";
    elem.style.height = "20px";
    elem.col = c;
    elem.row = r;
    elem.id = bid;
    elem.bomb = Math.floor(Math.random() * 300);
    elem.count = 0;
    elem.onclick = function () {
      boardClick(this);
    };
    document.getElementById(cid).appendChild(elem);
  }
}

function boardClick(box) {
  if (gameOver == 0) {
    if (box.bomb > rows * cols - cantidadBomb) {
      // si es una bomba, muestra todas las bombas
      gameOver = 1;
      document.getElementById("divScore").innerHTML =
        "Perdiste! Puntaje final: " + Score;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Get Block
          let board = GetBox(r, c);
          if (
            board.bomb >
            rows * cols - cantidadBomb
          ) {
            board.style.backgroundImage = GetAColor(3);
            box.style.borderStyle = "inset";
            board.innerHTML = "💣";
          }
        }
      }
    } else if (box.count > 0) {
      // si esto no es un 0 o una bomba, borra y muestra el conteo
      box.style.backgroundImage = GetAColor(1);
      box.style.textAlign = "center";
      box.innerHTML = box.count;
      box.style.borderStyle = "inset";
      Score++;
      document.getElementById("divScore").innerHTML = "Score: " + Score;
    } else {
      // si esto es un 0, busca los 0 adyacentes y los descubre


      box.style.backgroundImage = GetAColor(1);
      box.style.borderStyle = "inset";
      Score++;
      let c = box.col;
      let r = box.row;
      if (r - 1 >= 0 && c - 1 >= 0) {
        let b1 = GetBox(r - 1, c - 1);
        if (b1.count == 0) {
          b1.style.backgroundImage = GetAColor(1);
          b1.style.borderStyle = "inset";
          Score++;
        }
      }
      if (r - 1 >= 0) {
        let b2 = GetBox(r - 1, c);
        if (b2.count == 0) {
          b2.style.backgroundImage = GetAColor(1);
          b2.style.borderStyle = "inset";
          Score++;
        }
      }
      if (r - 1 >= 0 && c + 1 < cols) {
        let b3 = GetBox(r - 1, c + 1);
        if (b3.count == 0) {
          b3.style.backgroundImage = GetAColor(1);
          b3.style.borderStyle = "inset";
          Score++;
        }
      }
      if (c - 1 >= 0) {
        let b4 = GetBox(r, c - 1);
        if (b4.count == 0) {
          b4.style.backgroundImage = GetAColor(1);
          b4.style.borderStyle = "inset";
          Score++;
        }
      }
      if (c + 1 < cols) {
        let b5 = GetBox(r, c + 1);
        if (b5.count == 0) {
          b5.style.backgroundImage = GetAColor(1);
          b5.style.borderStyle = "inset";
          Score++;
        }
      }
      if (r + 1 < rows && c - 1 >= 0) {
        let b6 = GetBox(r + 1, c - 1);
        if (b6.count == 0) {
          b6.style.backgroundImage = GetAColor(1);
          b6.style.borderStyle = "inset";
          Score++;
        }
      }
      if (r + 1 < rows) {
        let b7 = GetBox(r + 1, c);
        if (b7.count == 0) {
          b7.style.backgroundImage = GetAColor(1);
          b7.style.borderStyle = "inset";
          Score++;
        }
      }
      if (r + 1 < rows && c + 1 < cols) {
        let b8 = GetBox(r + 1, c + 1);
        if (b8.count == 0) {
          b8.style.backgroundImage = GetAColor(1);
          b8.style.borderStyle = "inset";
          Score++;
        }
      }

      document.getElementById("divScore").innerHTML = "Score: " + Score;
    }
  }
  // Comprobar si el jugador ganó.
if (Score == (rows * cols) - cantidadBomb) {
  gameOver = 1;
  document.getElementById("divScore").innerHTML = "¡Ganaste! Puntaje final: " + Score;
}

}

function SetupBoard() {
  let table = document.getElementById("tableGame");
  table.innerHTML = "";
  Score = 0;
  gameOver = 0;
  document.getElementById("divScore").innerHTML = "Score: " + Score;

  // Construir la tabla usando dimensiones anteriores. 
  for (let r = 0; r < rows; r++) {
    let row = table.insertRow(-1);
    for (let c = 0; c < cols; c++) {
      let cell = row.insertCell(-1);
      cell.setAttribute("id", "r" + r + "c" + c);
      new board(cell.id, "b" + cell.id, r, c, 5);
    }
  }
  // Recorrer y actualizar los conteos.
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // obtener bloque
      let board = GetBox(r, c);
      // obtener adyacentes
      let ctr = 0;
      if (r - 1 >= 0 && c - 1 >= 0) {
        let b1 = GetBox(r - 1, c - 1);
        if (b1.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (r - 1 >= 0) {
        let b2 = GetBox(r - 1, c);
        if (b2.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (r - 1 >= 0 && c + 1 < cols) {
        let b3 = GetBox(r - 1, c + 1);
        if (b3.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (c - 1 >= 0) {
        let b4 = GetBox(r, c - 1);
        if (b4.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (c + 1 < cols) {
        let b5 = GetBox(r, c + 1);
        if (b5.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (r + 1 < rows && c - 1 >= 0) {
        let b6 = GetBox(r + 1, c - 1);
        if (b6.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (r + 1 < rows) {
        let b7 = GetBox(r + 1, c);
        if (b7.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      if (r + 1 < rows && c + 1 < cols) {
        let b8 = GetBox(r + 1, c + 1);
        if (b8.bomb > rows * cols - cantidadBomb) {
          ctr++;
        }
      }
      board.count = ctr;

        
    }
  }
}

function GetAColor(r) {

  let grad = "";
  switch (r) {
    case 1:
      grad = "linear-gradient(lightgreen, lawngreen)";
      break;
    case 2:
      grad = "linear-gradient(blue, lightblue)";
      break;
    case 3:
      grad = "linear-gradient(red, orangered)";
      break;
    case 4:
      grad = "linear-gradient(midnightblue, lightblue)";
      break;
    case 5:
      grad = "linear-gradient(gainsboro, lightgrey)";
      break;
    case 6:
      grad = "linear-gradient(transparent, transparent)";
      break;
  }
  return grad;
}

function GetBox(row, col) {
  let table = document.getElementById("tableGame");
  if (row < rows && col < cols) {
    return table.rows[row].cells[col].firstChild;
  } else {
    return null;
  }
}

SetupBoard();
