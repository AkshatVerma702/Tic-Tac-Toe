import React from 'react'
import './TicTacToe.css'
import circle_icon from '../Assests/circle.png'
import cross_icon from '../Assests/cross.png'
import { useState, useEffect} from 'react'
export const TicTacToe = () => {
    let [lock, setLock] = useState(false);
    let [data, setData] = useState(Array(9).fill(''));
    let [move, setmove] = useState(0);
    let [winner, setWin] = useState();
    let result = []
    useEffect(() => {
        console.log(data);
      }, [data]);
    
      const checkWin = () => {
        let checks = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        for (let i = 0; i < checks.length; i++) {
          const [a, b, c] = checks[i];
          if (data[a] && data[a] === data[b] && data[a] === data[c]) {
            setWin(data[a]);
            setTimeout(() => {
              setLock(true);
            }, 0);
            result = [a,b,c]
            return 1;
          }
        }
    
        // Draw
        if (move === 9) {
          setLock(true);
          
        }
    
        return 0;
      };
      const play = (e, index) => {
        if (checkWin() || lock) {
          let tiles = document.querySelectorAll('.box')
          tiles.forEach((box,index) => {
            if(result.includes(index)){
                box.classList.add('winner-tiles')
            }
          })
        }
        if (!lock) {
          if (move % 2 === 0) {
            e.target.innerHTML = `<img src = '${cross_icon}'></img>`;
            const newData = [...data];
            newData[index] = 'X';
            setData(newData);
            setmove(++move);
          } else if (move % 2 !== 0) {
            e.target.innerHTML = `<img src = '${circle_icon}'></img>`;
            const newData = [...data];
            newData[index] = 'O';
            setData(newData);
            setmove(++move);
          }
        }
      };
      useEffect(() => {
        if (checkWin()) {
          
        }
      }, [data, checkWin]);
      const reset = () => {
        let boxes = document.querySelectorAll('.box');
            boxes.forEach((box) => {
            box.innerHTML = '';
            box.classList.remove('winner-tiles');
        });

        setmove(0);
        setLock(false);
        setWin(null);
        setData(Array(9).fill(''));
      };
    
  return (
    <div className='container'>
        <div className="title">
            <h1>Tic Tac Toe</h1>
        </div>
        <div className="game-board">
            <div className="row1">
                <div className="box" id="0" onClick={(e) =>{play(e,0)}}></div>
                <div className="box" id="1" onClick={(e) =>{play(e,1)}}></div>
                <div className="box" id="2" onClick={(e) =>{play(e,2)}}></div>
            </div>
            <div className="row2">
                <div className="box" id="3" onClick={(e) =>{play(e,3)}}></div>
                <div className="box" id="4" onClick={(e) =>{play(e,4)}}></div>
                <div className="box" id="5" onClick={(e) =>{play(e,5)}}></div>
            </div>
            <div className="row3">
                <div className="box" id="6" onClick={(e) =>{play(e,6)}}></div>
                <div className="box" id="7" onClick={(e) =>{play(e,7)}}></div>
                <div className="box" id="8" onClick={(e) =>{play(e,8)}}></div>
            </div>
        </div>
        <button className="reset" onClick={(e) =>{reset()}}>
            Reset
        </button>
    </div>
  )
}
