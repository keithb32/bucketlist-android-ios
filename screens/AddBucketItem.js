import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';

/***************************************************************************************
*  REFERENCES
*  Title: react-native-date-picker
*  Author: henninghall
*  Date: 11/2/2022
*  Code version: 4.2.6
*  URL: https://github.com/henninghall/react-native-date-picker
*  Software License: MIT License

*  Title: @react-native-community/checkbox
*  Author: nicholaslee119 et al.
*  Date: 11/1/2022
*  Code version: 0.5.13
*  URL: https://github.com/react-native-checkbox/react-native-checkbox
*  Software License: MIT License

*  Title: how to setup Onpress On Textinput in react-native
*  Author: Kuldeep Saxena
*  Date: 11-19-2020
*  URL: https://stackoverflow.com/questions/54707607/how-to-setup-onpress-on-textinput-in-react-native

***************************************************************************************/

const AddBucketItem = ({ navigation }) => {
    const [itemName, onChangeItemName] = useState("");

    const [dueDate, setDueDate] = useState(new Date());
    const [openDueDate, setOpenDueDate] = useState(false);

    const [isComplete, setIsComplete] = useState(false)

    const [compDate, setCompDate] = useState(new Date());
    const [openCompDate, setOpenCompDate] = useState(false);


    const onSubmit = (itemName, dueDate, isComplete, compDate) => {
        if (!isComplete){
            compDate = null
        }
        // Validate input
        // Rules: MUST provide item name and dueDate. If item is completed, must also provide a completion date
        if (itemName ===  "" || (isComplete && compDate === null)){
            let errorText = "Please provide the following fields: ";
            if (itemName === ""){
                errorText += "Item Name\n";
            }
            if (isComplete && compDate === null){
                errorText += "Completion Date\n ";
            }
            Alert.alert(errorText);
        }
        else{
            navigation.navigate({
                name: 'Your Bucket List',
                params: {prevScreen: "ADD_ITEM", itemName: itemName, dueDate: dueDate?.toISOString(), isComplete: isComplete, compDate: compDate?.toISOString()}, 
                merge: true
            });
        }

    }

    return(
        <SafeAreaView style={styles.formContainer}>
            <Text style={styles.instructions}>Please provide the following information to add a new item to your bucket list.</Text>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeItemName}
                value={itemName}
            />
            <Text style={styles.label}>Due Date</Text>
            <Pressable onPress={() => setOpenDueDate(true)}>
                <View pointerEvents="none">
                    <TextInput style={styles.input} editable={false} >
                        {dueDate.toDateString()}
                        <DatePicker
                            modal
                            open={openDueDate}
                            date={dueDate}
                            mode='date'
                            onConfirm={(date) => {setOpenDueDate(false); setDueDate(date)}}
                            onCancel={() => {setOpenDueDate(false);}}
                        />
                    </TextInput>
                </View>
            </Pressable>
            <Text style={styles.label}>Completed?</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={isComplete}
                    onValueChange={(newValue) => setIsComplete(newValue)}
                />
            </View>
            { isComplete &&
            <Text style={styles.label}>Completion Date</Text> &&
            <Pressable onPress={() => setOpenCompDate(true)}>
                <View pointerEvents="none">
                    <TextInput style={styles.input} editable={false} >
                        {compDate.toDateString()}
                        <DatePicker
                            modal
                            open={openCompDate}
                            date={compDate}
                            mode='date'
                            onConfirm={(date) => {setOpenCompDate(false); setCompDate(date)}}
                            onCancel={() => {setOpenCompDate(false);}}
                        />
                    </TextInput>
                </View>
            </Pressable>
            }
            <View style={styles.buttonContainer}>
                <Button title="Save"  onPress={() => {onSubmit(itemName, dueDate, isComplete, compDate);}} />
            </View>
        </SafeAreaView>
    );
}

styles = StyleSheet.create({
    formContainer:{
        flexDirection: 'column',
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',        
        alignSelf: 'center',
        width: 100,
        marginBottom: 20,
        padding: 10,
    },
    instructions:{
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
    },
    label:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        padding: 10,
    }
})

export default AddBucketItem;