import React from 'react';
import keyboardIcon from '../../images/icons/keyboard.png';
import playIcon from '../../images/icons/play.png';

function Home({ player, setPlayer }) {
    const handlePlayer = (playerInput) => {
        let name = playerInput.value;

        if (name.length === 0) {
            setPlayer({ ...player, playerName: name, playerNameError: true });
            return false;
        } else {
            setPlayer({ ...player, playerName: name, playerNameError: false });
            return true;
        }
    };

    const handleDifficulty = (difficultyInput) => {
        let difficulty = difficultyInput.value;

        if (difficulty.length === 0) {
            setPlayer({ ...player, difficulty: difficulty, difficultyError: true });
            return false;
        } else {
            let diffFactor = difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1.5 : 1;

            setPlayer({ ...player, difficulty: difficulty, difficultyFactor: diffFactor, difficultyError: false });
            return true;
        }
    };

    const startGame = (ev) => {
        ev.preventDefault();
        if (handlePlayer(ev.target.elements.playername) && handleDifficulty(ev.target.elements.difficulty)) {
            setPlayer({ ...player, page: 'game' });
        } else {
        }
    };

    return (
        <div className="home">
            <img src={keyboardIcon} alt="Keyboard" className="img-fluid keyboard-image" />
            <h1 className="game-title">Fast Fingers</h1>
            <h6 className="game-subtitle">
                <span className="left"></span> the ultimate typing game <span className="right"></span>
            </h6>

            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <form onSubmit={(ev) => startGame(ev)}>
                        <input type="text" name="playername" onInput={(ev) => handlePlayer(ev.target)} placeholder="TYPE YOUR NAME" />
                        <div className="text-danger">
                            <h5>{player.playerNameError ? 'Please Enter Name' : ''}</h5>
                        </div>
                        <br />
                        <select name="difficulty" onChange={(ev) => handleDifficulty(ev.target)}>
                            <option value="">SELECT DIFFICULT LEVEL</option>
                            <option value="easy">EASY</option>
                            <option value="medium">MEDIUM</option>
                            <option value="hard">HARD</option>
                        </select>
                        <div className="text-danger">
                            <h5>{player.difficultyError ? 'Please Select Difficulty' : ''}</h5>
                        </div>
                        <button type="submit" className="start-game-btn">
                            <img src={playIcon} alt="Play" />
                            Start Game
                        </button>
                    </form>
                </div>
                <div className="col-sm-3 text-right"></div>
            </div>
        </div>
    );
}

export default Home;
