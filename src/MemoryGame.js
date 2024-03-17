import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

import css from './images/css.webp';
import html from './images/html.webp';
import js from './images/js.png';
import node from './images/node.png';
import react from './images/react.webp';
import tailwind from './images/tailwind.webp';
import ts from './images/typescript.png';
import vsc from './images/vsc.png';

const MemoryGame = () => {
    const [tiles, setTiles] = useState([]);
    const [selectedTiles, setSelectedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);

    let images = [
        css, html, js, node, react, tailwind, ts, vsc,
    ];

    images = images.map((img) => <img src={img} alt="Logo" length="64px" width="64px" />)

    const setInitialTiles = () => {
        const initialTiles = images.concat(images).sort(() => Math.random() - 0.5);
        setTiles(initialTiles);
    }

    useEffect(() => {
        setInitialTiles();
    }, []);

    useEffect(() => {
        if (matchedTiles.length === 16) {
            setInitialTiles();
            setMatchedTiles([]);
        }

    }, [matchedTiles.length])

    const handleTileClick = (index) => {
        if (selectedTiles.length === 2 || matchedTiles.includes(index)) return;

        setSelectedTiles([...selectedTiles, index]);

        if (selectedTiles.length === 1) {
            if (tiles[selectedTiles[0]] === tiles[index]) {
                setMatchedTiles([...matchedTiles, selectedTiles[0], index]);
            }

            
            setTimeout(() => setSelectedTiles([]), 1000);
        }
    };

    const renderTile = (index) => {
        if (selectedTiles.includes(index) || matchedTiles.includes(index)) {
            return <div className="tile">{tiles[index]}</div>;
        } else {
            return (
                <div
                    className="tile"
                    onClick={() => handleTileClick(index)}
                >

                </div>
            );
        }
    };

    return (
        <div className="memory-game">
            <h1>Memory Game</h1>
            <div className="board">
                {tiles.map((tile, index) => (
                    <div className="tile-container" key={index}>
                        {renderTile(index)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;