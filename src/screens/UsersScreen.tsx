import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import useUsers from '../hooks/useUsers';

const listLoader = () => <ActivityIndicator size={'small'} color={'black'} />;
const UsersScreen = () => {
  const {loader, users, getUsers} = useUsers();

  if (!loader && !users.length) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>No users</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        onEndReached={() => void getUsers()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={loader ? listLoader : null}
        renderItem={({item: user}) => {
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
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgrounColor: 'white',
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
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
});

export default UsersScreen;
