import React from 'react';


class Rules extends React.Component {

    render(){
    return (
        <div>

            <h4> Five In A Row Game Rules</h4>
            <p>
                Objective: To claim five connected spaces in a row diagonallly, horizontally, or vertically.
            </p>
            <h4>Rules</h4>
            <ul>
                <li>All players start with four cards.</li>
                <li>Players may not have more than four cards in their hand at a time</li>
                <li>Each turn, a player may either draw a card OR play a card</li>
                <li>Once a player has played a card, they may play on any unplayed space that is equal to or GREATER to the card value played</li>
                <li>If all spaces that are greater in value to a card in your hand, that card becomes a dead card, and cannot be played for the rest of the game</li> 
            </ul>
            <button onClick={this.props.hideRules}>Hide Rules</button>
        </div>
    )
}
}

export default Rules;