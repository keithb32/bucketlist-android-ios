import React, {useState} from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Pressable,
    StyleSheet
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




const EditBucketItem = ({navigation, route}) => {

    const [itemName, onChangeItemName] = useState(route.params?.itemName);

    const [dueDate, setDueDate] = useState(new Date(route.params?.dueDate));
    const [openDueDate, setOpenDueDate] = useState(false);

    const [isComplete, setIsComplete] = useState(route.params?.isComplete)

    const [compDate, setCompDate] = useState(new Date(route.params?.compDate));
    const [openCompDate, setOpenCompDate] = useState(false);

    return(
        <SafeAreaView style={styles.formContainer}>
            <Text style={styles.instructions}>Please provide the following information to update your bucket list item.</Text>
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
                    onValueChange={(newIsComplete) => {
                        setIsComplete(newIsComplete);
                        if (!newIsComplete){
                            setCompDate(new Date());
                        }
                    }}
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
                <Button title="Save"  
                    onPress={() => navigation.navigate({
                            name: "Your Bucket List",
                            params: {prevScreen: "EDIT_ITEM", index:route.params?.index, newItemName:itemName, newDueDate:dueDate.toISOString(), newIsComplete: isComplete, newCompDate: compDate.toISOString()},
                            merge: true
                            })
                        } 
                />
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


export default EditBucketItem;
