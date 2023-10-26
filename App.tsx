import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
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
        data={images_data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={{uri: item?.xt_image}}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
