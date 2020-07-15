import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

function StartGameScreen(props) {
    const {onStartGame} = props;

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >= 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
            [{text : 'okay', style : 'destructive', onPress : resetInputHandler}])
        }
        else {
            setConfirmed(true);
            setSelectedNumber(choosenNumber);
            setEnteredValue('');
            Keyboard.dismiss();
        }
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style = {styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title = "START GAME" onPress = {() => {onStartGame(selectedNumber)}}/>
            </Card>
        )
    }

  return (
      <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
        <View style = {styles.screen}>
            <Text style = {styles.title}>Start a New Game!</Text>
            <Card style = {styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style = {styles.input} blurOnSubmit autoCapitalize = "none"
                    autoCorrect= {false} keyboardType = 'numeric' maxLength = {2}
                    onChangeText = {numberInputHandler} value = {enteredValue}
                />
                <View style = {styles.buttonContainer}>
                    <View style = {styles.buttonReset}>
                        <Button title = "RESET" color = "white" onPress = {resetInputHandler}/>
                    </View>
                    <View style = {styles.buttonConfirm}>
                        <Button title = 'CONFIRM' color = "white" onPress = {confirmInputHandler} />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },
    title : {
        fontSize : 20,
        marginVertical : 10
    },
    inputContainer : {
        width : 300,
        maxWidth : '80%',
        alignItems : 'center'
    },
    buttonContainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15
    },
    buttonConfirm : {
        width : '40%',
        backgroundColor : Colors.primary,
        borderRadius : 5
    },
    buttonReset : {
        width : '40%',
        backgroundColor : Colors.accent,
        borderRadius : 5
    },
    input : {
        width : '20%',
        textAlign : 'center'
    },
    summaryContainer : {
        marginTop : 20,
        alignItems : 'center'
    }
})

export default StartGameScreen;
