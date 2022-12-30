import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home.js'
import AddBucketItem from './screens/AddBucketItem.js';
import EditBucketItem from './screens/EditBucketItem.js';

/***************************************************************************************
*  REFERENCES

*  Title: react-navigation
*  Author: satya164 et al.
*  Date: 11/4/2022
*  Code version: 6.3.4
*  URL: https://github.com/react-navigation/react-navigation
*  Software License: MIT License

*  Title: MyDailySchedule
*  Author: Mark Sherriff
*  Date: 9/21/2022
*  URL: https://github.com/uva-cs4720-f22/MyDailySchedule

***************************************************************************************/

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Your Bucket List"
        component={Home}
      />
      <Stack.Screen
        name="Add Bucket Item"
        component={AddBucketItem}
      />
      <Stack.Screen
        name="Edit Bucket Item"
        component={EditBucketItem}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
