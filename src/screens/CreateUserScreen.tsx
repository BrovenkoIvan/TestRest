import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CreateUserScreen = () => {
  const {goBack} = useNavigation();
  const [name, setName] = useState('');
  const [male, setMale] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState('');

  const handleSubmit = useCallback(async () => {
    await fetch('https://gorest.co.in/public/v2/users', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 73f0ec441de336957a924cc8d2d2f5d9032de3589cc1bfcaeeabef11b5aafa3c',
      },
      body: JSON.stringify({
        name: name,
        gender: male,
        email: email,
        status: active,
      }),
    }).then(res => {
      res.ok && goBack();
    });
  }, [active, email, male, name, goBack]);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize={'none'}
        style={styles.inputStyle}
        placeholder={'FirstName LastName'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        autoCapitalize={'none'}
        style={styles.inputStyle}
        placeholder={'male'}
        value={male}
        onChangeText={setMale}
      />
      <TextInput
        autoCapitalize={'none'}
        style={styles.inputStyle}
        placeholder={'test@gmail.com'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize={'none'}
        style={styles.inputStyle}
        placeholder={'active'}
        value={active}
        onChangeText={setActive}
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  inputStyle: {
    marginHorizontal: 24,
    marginVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    height: 50,
    paddingLeft: 24,
  },
  buttonStyle: {
    marginHorizontal: 24,
    marginVertical: 12,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontWeight: '500',
    color: 'white',
  },
});

export default CreateUserScreen;
