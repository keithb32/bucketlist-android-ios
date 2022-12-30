import React, {useState, useCallback} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import BucketItem from '../models/BucketItem.js';
import BucketItemComponent from '../components/BucketItemComponent.js';

/***************************************************************************************
*  REFERENCES

*  Title: Using the Effect Hook
*  Code version: 18.2.0
*  URL: https://reactjs.org/docs/hooks-effect.html
*  Software License: MIT License

*  Title: react-navigation
*  Author: satya164 et al.
*  Date: 11/4/2022
*  Code version: 6.3.4
*  URL: https://github.com/react-navigation/react-navigation
*  Software License: MIT License
***************************************************************************************/

let item1 = BucketItem("Complete React Native App", new Date(2022, 10, 4), false, new Date());
let item2 = BucketItem("Complete Final Project", new Date(2022, 11, 5), false, new Date());
let item3 = BucketItem("Complete Android App", new Date(2022, 9, 14), true, new Date(2022, 9, 14));

const Home = ({ navigation, route }) => {

  const [bucketItems, setBucketItems] = useState([item1, item2, item3]);

  // function for adding new bucket item to bucket list
  const addItem = (itemName, dueDate, isComplete, compDate) => {
    let newItem = BucketItem(itemName, dueDate, isComplete, compDate);
    let newBucketItems = [...bucketItems, newItem]
    setBucketItems(sortItems(newBucketItems));
    route.params.prevScreen = "";
  };

  // function for editing the attributes of a bucket item in the current bucket list
  // invoked from the EditBucketItem screen
  const editItem = (index, newItemName, newDueDate, newIsComplete, newCompDate) => {
    let editedItem = BucketItem(newItemName, newDueDate, newIsComplete, newCompDate);
    let editedBucketItems = [...bucketItems]
    editedBucketItems[index] = editedItem;
    setTimeout(() => {setBucketItems(sortItems(editedBucketItems))}, 500);
    route.params.prevScreen = "";
  };

  // function for editing just the completion status of a bucket item in the current bucket list
  // invoked from checkbox on the Home screen
  const editItemCompletion = (index, newIsComplete) => {
    let editedBucketItems = [...bucketItems]
    if (newIsComplete){
      editedBucketItems[index] = {...editedBucketItems[index], isComplete: newIsComplete, completionDate: new Date().toISOString()}; 
    }
    else{
      editedBucketItems[index] = {...editedBucketItems[index], isComplete: newIsComplete};
    }
    setBucketItems(sortItems(editedBucketItems));
  };

  // returns list of sorted bucket items
  // incomplete bucket items appear before complete bucket items
  // incomplete items are sorted by earliest due date
  // complete items are sorted by earliest completion date
  const sortItems = (items) => {
    let incomplete = [...items].filter(item => !item.isComplete).sort((a, b) => {return a.dueDate.localeCompare(b.dueDate);});
    let complete = [...items].filter(item => item.isComplete).sort((a, b) => {return a.completionDate.localeCompare(b.dueDate);});
    return [...incomplete, ...complete];
  };

  // handler for actions from AddBucketItem and EditBucketItem screens
  useFocusEffect(
    useCallback(() => { 
      if (route.params?.prevScreen === "ADD_ITEM"){
        let dueDateToAdd = new Date(route.params?.dueDate);
        let compDateToAdd = new Date(route.params?.compDate ?? new Date());
        addItem(route.params?.itemName, dueDateToAdd, route.params?.isComplete, compDateToAdd);
      }
      else if (route.params?.prevScreen === "EDIT_ITEM"){
        let editedDueDate = new Date(route.params?.newDueDate);
        let editedCompDate = new Date(route.params?.newCompDate ?? new Date());
        editItem(route.params?.index, route.params?.newItemName, editedDueDate, route.params.newIsComplete, editedCompDate);
      }
      
      return () => {};
    }, [route.params?.prevScreen])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {
          bucketItems
          .map((item, index) => (
              <BucketItemComponent
              key={index}
              item={item}
              index={index}
              navigation={navigation}
              editItemCompletion={editItemCompletion}
              />
          ))
      }
      </ScrollView>
      <View>
        <Button
          title="Add Bucket Item"
          onPress={() =>
            navigation.navigate('Add Bucket Item')
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

