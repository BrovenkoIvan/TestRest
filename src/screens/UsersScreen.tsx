import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);

  const getUsers = useCallback(async () => {
    setLoader(true);
    await fetch('https://gorest.co.in/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 73f0ec441de336957a924cc8d2d2f5d9032de3589cc1bfcaeeabef11b5aafa3c',
      },
    })
      .then(res => res.json().then(responce => setUsers(responce)))
      .catch(e => console.warn(e))
      .finally(() => setLoader(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      void getUsers();
    }, [getUsers]),
  );

  if (loader) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }
  if (!users.length) {
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>No users</Text>
    </View>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 50}}>
      {users.map(user => {
        const [firstName, lastName] = user.name.split(' ');
        return (
          <TouchableOpacity style={styles.userContainer} key={user.id}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.userAvatar}>
                <Text style={{fontWeight: '500'}}>
                  {firstName && firstName[0]}
                  {lastName && lastName[0]}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UsersScreen;
