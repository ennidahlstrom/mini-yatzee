import {Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Col, Row, Grid} from 'react-native-easy-grid';
import styles from '../style/style';
import uuid from 'react-uuid';

// Mini-Yatzee
// Author: Enni Dahlström
// Tested on iPhone 6s

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_TURNS = 6;
const diceValues = [1,2,3,4,5,6];
const bonusLimit = 63;

export default function Game() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfTurnsLeft, setNbrOfTurnsLeft] = useState(NBR_OF_TURNS);

    // Game status, which instructs user to throw dices, set points, etc.
    const [status, setStatus] = useState('');

    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));

    // Button text depending on if game is running or over
    const [buttonText,setButtonText] = useState("Throw Dices");

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}
                value={i}>
                    <MaterialCommunityIcons
                        name={board[i]}
                        key={"row" + i}
                        size={55}
                        color={getDiceColor(i)}>
                    </MaterialCommunityIcons>
            </Pressable>
        );
    }


    // Array for the final row of dices after the third throw of a turn
    const [finalRow,setFinalRow] = useState([]);
    
    // points set for each dice spot count
    const [points, setPoints] = useState(new Array(NBR_OF_TURNS).fill(0));

    const [selectedDicePoints, setSelectedDicePoints] =
        useState(new Array(NBR_OF_TURNS).fill(false));    

    // icons for each dice spot count
    const diceSpots = [];
    for (let i = 0; i < NBR_OF_TURNS; i++) {
        diceSpots.push(
            <Pressable
                onPress= {() => selectDicePoints(i)}>
                    <MaterialCommunityIcons
                        name={"numeric-"+[i+1]+"-circle"}
                        key={"row" + i}
                        size={50}
                        color={getDicePointsColor(i)}>
                    </MaterialCommunityIcons>
            </Pressable>
        );
    }

    // Total points & distance from bonus points
    const [total, setTotal] = useState(0);
    const [awayFromBonus, setAwayFromBonus] = useState(bonusLimit);


    function selectDicePoints(i) {
        // Check if game is still running
        if (nbrOfTurnsLeft > 0) {

            // Check if turn is over or not
            if (nbrOfThrowsLeft > 0) {
                /// ---> turn isn't over
                setStatus("Throw 3 times before setting points.");
                return;
            } else {
                // ---> turn is over
                let chosen = [...selectedDicePoints];
                if (chosen[i] == true) {
                    // can't set points for the same dice twice
                    setStatus("You already selected points for dice "+diceValues[i]);
                    return;
                } else {
                    chosen[i] = true;
                    setSelectedDicePoints(chosen);
                    countPoints(i);
                    unselectDices(); // -> setting all dices to unselected before next turn
                    if (nbrOfTurnsLeft > 1) {
                        // Reset throws between turns
                        setNbrOfThrowsLeft(NBR_OF_THROWS); 

                        // If final turn was just played, amount of throws is not reset
                        // (throws remain at 0 until user presses Restart-button and starts a new game)
                    }
                setNbrOfTurnsLeft(nbrOfTurnsLeft-1);
            } 
            }
        } else {
            setStatus('Game over.');
        }
        }


    // array used for calculating the number of certain dices in the final row
    const amount = []; 
    
    function countPoints(i){
        // Points for the individual dice that got chosen
        let pickedDice = i+1;
        for (let j = 0; j < finalRow.length; j++) {
            // checking each dice in the row, if they have the same value 
            // as the dice picked.
            // -> if yes, they are added to the array
            if (finalRow[j] == 'dice-'+pickedDice) {
                amount.push(''); 
            }}
            // --->      points = value * amount
            points[i] = (pickedDice*amount.length);
         
         // Total points for all dices
         setTotal(total+points[i]);
    }

   
    function getDicePointsColor(i) {
        // all points have been set & game is over, 
        // -> images are gray
        if (nbrOfTurnsLeft == 0) {
            return "lightgray";
        } else {
            // if points for dice X have been set, color is black;
            // still available dices are blue
            return selectedDicePoints[i] ? "black" : "steelblue"; }
    }


    function getDiceColor(i) {
        // Color is based on if dice ...
        // 1. can't be chosen (gray), 
        // 2. is chosen (black), or 
        // 3. isn't chosen but is available (blue)

        // Checking game status to see if dice is available
            // -> No (game is over)
        if (nbrOfTurnsLeft == 0) {
            return "lightgray";

            // -> No (it's a new turn & user has not thrown dices yet)
        } else if (nbrOfThrowsLeft == NBR_OF_THROWS) {
            return "lightgray";

            // -> Yes (dices have been thrown and the turn is ongoing)
        } else if (nbrOfTurnsLeft > 0) {
            return selectedDices[i] ? "black" : "steelblue"; }
    }

    function selectDice(i) {
        if (nbrOfTurnsLeft > 0) {
            // User can't choose dices from previous turn, must throw again
            if (nbrOfThrowsLeft == NBR_OF_THROWS) {
                setStatus('New turn. Throw dices again.');
                return;
        } else {
            // Toggling dices chosen/unchosen
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices); 
        }
        } else {
            // Dices can't be chosen if game is already over
            setStatus('Game over.');
        }  
        }

    // Unselecting dices before next turn
    function unselectDices() {
            let dices = [...selectedDices];
            dices.fill(false);
            setSelectedDices(dices);
    }

    // Function for both resetting game and throwing dices
    function throwDices() {
        // Game is over, and user presses Restart button
            if (nbrOfTurnsLeft <= 0) {
            // -> everything gets reset
            resetGame();
            return;
        }
            // User presses button at the end of turn before setting points
        if (nbrOfThrowsLeft == 0) {
            setStatus('You must set points to continue.');
            return;
        } else {
            // User throws random dices
            for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        if (nbrOfThrowsLeft == 1) { 
            // This is the final throw of a turn
            // -> logging the final row for easy calculation
            setFinalRow([...board]);
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        }
        
    }

    // Restart -> everything back to initial values
    function resetGame() {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setNbrOfTurnsLeft(NBR_OF_TURNS);
        selectedDicePoints.fill(false);
        setTotal(0);
        points.fill(0);
        setButtonText('Throw Dices');
    }


    useEffect(() => {
        // Calculating how far from bonus
        setAwayFromBonus(bonusLimit-total);

        // Guiding text based on status of the game
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            if (nbrOfTurnsLeft == NBR_OF_TURNS) {
                setStatus('Throw dices to start a new game.');
            } else {
                setStatus('Throw dices to start the next turn.');
            }
        } else if (nbrOfThrowsLeft < NBR_OF_THROWS && nbrOfThrowsLeft > 0) {
            setStatus('Throw dices.');
        } else if (nbrOfThrowsLeft == 0) {
            setStatus('Set your points to continue.');
        }
       

        // Checking when game is over
        // ... texts are changed accordingly
        if (nbrOfTurnsLeft == 0) {
            setStatus('Game over.');
            setButtonText('Restart');
        }
    }, [nbrOfThrowsLeft, nbrOfTurnsLeft, total]);
    

    // How far from Bonus?
    function gotBonus() {
        if (awayFromBonus > 0) {
            return ('You are '+awayFromBonus+' points away from bonus');
        } else {
            return ('Congratulations, you got the bonus!');
        }
}

    return (
        <View style={styles.gameboard}>

            {/* Dices */}
            <View style={styles.flex}>{row}</View>

            {/* Throws left */}
                <Text style={styles.gameinfo}>
                    Throws left: {nbrOfThrowsLeft}
                </Text>

            {/* Advice to keep throwing, set points, etc */}
            <Text style={styles.gameinfo}>{status}</Text>

            {/* Button for 'Throw Dices' or 'Restart' depending on game status */}
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>

    {/* Total points */}
        <Text style={styles.total}>Total: {total}</Text>

    {/* How far from bonus / Got bonus */}
        <Text style={styles.totalInfo}>{gotBonus()}</Text>

    {/* Points for each dice */}
            <Grid style={styles.grid}>
            <Row size={0.09} >
                {
                points.map((_,i) => (
                 <React.Fragment key={uuid()}> 
                <Col style={styles.column} ><Text style={styles.points}>{points[i]}</Text></Col>
                 </React.Fragment>   
                ))
                }
            </Row>

    {/* Images for dice spot counts */}
            <Row>{diceSpots.map((_,i) => (
                 <React.Fragment key={uuid()}> 
                <Col style={styles.column} ><Text>{diceSpots[i]}</Text></Col>
                 </React.Fragment>   
                ))}</Row>
            </Grid>
            
        </View>
    );
}