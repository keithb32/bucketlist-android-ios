import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

/***************************************************************************************
*  REFERENCES

*  Title: @react-native-community/checkbox
*  Author: nicholaslee119 et al.
*  Date: 11/1/2022
*  Code version: 0.5.13
*  URL: https://github.com/react-native-checkbox/react-native-checkbox
*  Software License: MIT License

*  Title: Using the Effect Hook
*  Code version: 18.2.0
*  URL: https://reactjs.org/docs/hooks-effect.html
*  Software License: MIT License

***************************************************************************************/

const BucketItemComponent = (props) => {
    
    const [isComplete, setIsComplete] = useState(props.item.isComplete);

    // Update checkbox on homescreen whenever toggled via EditBucketItem screen or Home screen
    useEffect(() => {
       setIsComplete(props.item.isComplete);
    }, [props.item.isComplete])

    const formatDate = (dateISOString) => {
        return dateISOString.substring(5,7) + '-' + dateISOString.substring(8,10) + '-' + dateISOString.substring(0, 4);
    }

    // Convert ISO 8601 date string to MM-DD-YYYY
    formattedDueDate = formatDate(props.item.dueDate);
    formattedCompDate = formatDate(props.item.completionDate);

    return(
        <View style={styles.container}>
            <Pressable 
                onPress={() => props.navigation.navigate(
                    {
                    name: 'Edit Bucket Item', 
                    params: {index: props.index, itemName:props.item.itemName, dueDate: new Date(props.item.dueDate).toISOString(), isComplete: props.item.isComplete, compDate: new Date(props.item.completionDate).toISOString() ?? new Date().toISOString()}
                    }
                )}
            >
                <View style={styles.itemContainer} onPress={() => {}}>
                    <Text style={styles.itemNameText}>{props.item.itemName}</Text>
                    <Text>Due: {formattedDueDate}</Text>
                    {props.item.isComplete && <Text>Completed: {formattedCompDate}</Text>}
                </View>
            </Pressable>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={isComplete}
                    onValueChange={(newIsComplete) => {
                        props.editItemCompletion(props.index, newIsComplete);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height: 'auto',
        marginTop: 10,
        marginHorizontal: 5,
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 10,
    },
    itemContainer:{
        justifyContent:'center',
        paddingTop: 5,
        paddingLeft: 5,
    },
    itemNameText:{
        fontWeight: 'bold',
        fontSize: 14

    },
    checkboxContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default BucketItemComponent;