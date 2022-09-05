import {useCallback, useEffect, useRef, useState} from 'react';
import {ApiMethods, MAIN_URL, token} from '../config/API';
import {Alert} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(true);
  const nextUrl = useRef<null | string>(null);
  const url = nextUrl.current ? nextUrl.current : MAIN_URL;

  const getUsers = useCallback(async () => {
    setLoader(true);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await fetch(url, {
      method: ApiMethods.GET,
      headers,
    })
      .then(async response => {
        nextUrl.current = response.headers.get('x-links-next');
        await response.json().then(newList => setUsers([...users, ...newList]));
      })
      .catch(() => {
        Alert.alert('Error', 'Failed to fetch user');
      })
      .finally(() => {
        setLoader(false);
      });
  }, [url, users]);

  useEffect(() => {
    void getUsers();
  }, []);

  return {loader, users, getUsers};
};
