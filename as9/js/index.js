
   // 91.61 Assignment6: Scrabble Game
   // Tak Kwan Lo, UMass Lowell Computer Science, Tak_Lo@student.uml.edu
   // Copyright (c) 2018 by Tak K. Lo. All rights reserved. May be
   // freely copied or excerpted for educational purposes with credit to the
   // author.
   // updated by TKL on December 16, 2018



$(() => {
  // define data structure
  const words = ['', 'Umass Lowell', 'Yiu', 'Players']
  const letters = 'abcdefghijklmnopqrstuvwxyz '
  const scores = {
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10,
    'blank': 0
  }

  // define tiles type
  const NORMAL = 'normal'
  const DOUBLE_LETTER = 'doubleLetter'
  const DOUBLE_WORD = 'doubleWord'

  class Tile {
    constructor(letter, type) {
      this.letter = letter
      this.type = type // normal, doubleLetter, doubleWord
    }
  }

  // define new rack
  function newRack () {
    let rack = [...new Array(7).keys()]

    rack = rack.map(letter => {
      const randIndex = Math.floor(Math.random() * letters.length)
      return letters[randIndex]
    })

    return rack
  }

  // define new board
  function newBoard () {
    let board = [...new Array(7).keys()]
    board = board.map(tile => new Tile('', NORMAL))
    board[0].type = DOUBLE_LETTER
    board[4].type = DOUBLE_LETTER
    board[6].type = DOUBLE_WORD
    return board
  }

  /*
   * function: display rack to user
   *  @params: (array)
   *  @return: nothing (undefined)
   */
  function displayRack (arr) {
    // capitalize all letters
    const array = arr.join('').toUpperCase().split('')
    // <img> template tag
    const imgHTML = letter => `
      <img src="img/Scrabble_Tiles/Scrabble_Tile_${letter}.jpg" class="tile" letter=${letter}>
    `
    // map each letter with a new <img> tag and join them together
    const imagesHTML = array
      .map(letter => {
          letter === ' ' && (letter = 'Blank')
          return imgHTML(letter)
        })
      .join('')
    // display images to rack
    $('#rack').html(imagesHTML)
  }

  /*
   * function: display board to user
   *  @params: (array)
   *  @return: nothing (undefined)
   */
  function displayBoard (arr) {
    // text for display
    const text = {
      doubleLetter: 'DOUBLE LETTER SCORE',
      doubleWord: 'DOUBLE WORD SCORE',
      normal: ''
    }
    // <li> template tag
    const tileHTML= (tile, idx) =>
      `<li class="board_tile ${tile.type}" tile-index=${idx}>
        ${text[tile.type]}
      </li>`

    // map each tile with a <li> tag and join them together
    const tilesHTML = arr
      .map((tile, idx) => tileHTML(tile, idx))
      .join('')

    // update the #board html
    $('#board').html(tilesHTML)
  }

  /*
   * function: update score
   *  @params: nothing
   *  @return: nothing (undefined)
   */
  function updateScore () {
    // calcualte word(array of tiles) score
    function toScore (word) {
      let numOfDoubleWord = 1
      const score = word.reduce((acc, crr) => {
        const letter = crr.letter.toLowerCase()
        let letterScore = scores[letter]
        crr.type === DOUBLE_LETTER && (letterScore *= 2)
        crr.type === DOUBLE_WORD && (numOfDoubleWord++)
        return acc + letterScore
      }, 0)
      return score * numOfDoubleWord
    }

    // make words(array of array of tiles)
    let words = [[]]
    for (let i = 0; i < board.length; i++) {
      const tile = board[i]
      if (tile.letter === 'Blank' || tile.letter === '') {
        words.push([])
      } else {
        words[words.length-1].push(tile)
      }
    }

    // map each word with their score
    const totalScore = words
      .map(word => toScore(word))
      .reduce((acc, crr) => acc + crr, 0)

    // update current score
    score = totalScore

    // display score to user
    $('#score').html(`Score: ${totalScore}`)
  }

  /*
   * function: handle droppable event
   *  @params: (event, ui(draggable) )
   *  @return: nothing (undefined)
   */
  function handleDrop (event, ui) {
    // using save <img> template function from displayRack
    const imgHTML = letter => `
      <img src="img/Scrabble_Tiles/Scrabble_Tile_${letter}.jpg" class="tile" letter=${letter}>
    `
    // retreive letter from <img>
    const letter = $(ui.draggable).attr('letter')
    // place <img> into corresponding droppable object
    $(event.target).html(imgHTML(letter))
    // remove <img> from rack
    $(ui.draggable).remove()

    // retreive index from current droppable object
    const index = $(event.target).attr('tile-index')
    // set corresponding tile with new letter
    board[index].letter = letter

    // update the score
    updateScore()
    // console.log(board)
  }

  /*
   * function: clean rack and board in both logical and visual
   *  @params: (event)
   *  @return: nothing (undefined)
   */
  function newGame (e) {
    rack = newRack()
    board = newBoard()
    saveScores.push(score)
    score = 0

    displayRack(rack)
    displayBoard(board)
    $('#score').html(`Score: ${score}`)

    $(".tile").draggable({
      revert: "invalid"
    })

    $(".board_tile").droppable({
        accept: '.tile',
        drop: handleDrop
    })

    //update previous score
    $('#prevScores').html(`Previous Scores: ${saveScores.join(', ')}`)
    // console.log('rack', rack)
    // console.log('board', board)
    // console.log('saveScores', saveScores)
  }

  // Main procedures start here
  const saveScores = []
  let rack = newRack()
  let board = newBoard()
  let score = 0
  displayRack(rack)
  displayBoard(board)

  // make tile draggable
  $(".tile").draggable({
    revert: "invalid"
  })

  // make tile droppable on board
  $(".board_tile").droppable({
      accept: '.tile',
      drop: handleDrop
  })

  // new game button handler
  $("#newGame").on('click', newGame)
})
