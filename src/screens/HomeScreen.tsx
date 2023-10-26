import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const HomeScreen = ({navigation}) => {
  const [images_data, setImagesData] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const get_data = () => {
    var formdata = new FormData();
    formdata.append('user_id', '108');
    formdata.append('offset', '0');
    formdata.append('type', 'popular');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://dev3.xicom.us/xttest/getdata.php', requestOptions)
      .then(response => response.json())
      .then(result => setImagesData(result?.images))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <FlatList
        ItemSeparatorComponent={
          <>
            <View
              style={{
                paddingVertical: 10,
              }}
            />
          </>
        }
        data={images_data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Pressable onPress={() => navigation.navigate('HomeDetail')}>
              <Image
                style={{
                  height: 150,
                  width: windowWidth,
                }}
                source={{uri: item?.xt_image}}
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
