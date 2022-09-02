import React, {useCallback} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersScreen from '../screens/UsersScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import {Text, TouchableOpacity} from 'react-native';
import {MainNavigatorScreenList} from './StackScreenList';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {EmainStack} from '../constants/navigations';

const {Navigator, Screen} =
  createNativeStackNavigator<MainNavigatorScreenList>();

type navigationProps = NativeStackNavigatorProps;

const AddUserButton = () => {
  const {navigate} = useNavigation<navigationProps>();

  const handleAdd = useCallback(() => {
    navigate({name: EmainStack.AddUser, params: undefined});
  }, [navigate]);
  return (
    <TouchableOpacity onPress={handleAdd}>
      <Text style={{color: 'blue'}}>Add</Text>
    </TouchableOpacity>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name={EmainStack.Users}
          component={UsersScreen}
          options={{
            headerRight: () => <AddUserButton />,
          }}
        />
        <Screen name={EmainStack.AddUser} component={CreateUserScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
