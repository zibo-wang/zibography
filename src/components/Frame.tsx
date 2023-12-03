import React from 'react';

const Frame: React.FC = () => {
    return (
        <div className="frame">
            <h1 className="frame__title">Scroll Loop Menu</h1>
            <div className="frame__links">
                <a href="https://tympanus.net/codrops/?p=49748" className="frame__link">Article</a>
                <a href="https://github.com/codrops/ScrollLoopMenu/" className="frame__link">GitHub</a>
            </div>
            <span className="frame__button" aria-hidden="true">Close</span>
        </div>
    );
};

export default Frame;
