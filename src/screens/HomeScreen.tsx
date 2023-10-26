import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const HomeScreen = ({navigation}) => {
  const [images_data, setImagesData] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [visibleImages, setVisibleImages] = useState(3);

  const loadMoreImages = () => {
    setVisibleImages(visibleImages + 3);
  };

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

  const LoadMoreButton = ({onPress}) => {
    console.log('load more');
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Load More</Text>
      </TouchableOpacity>
    );
  };

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
      {visibleImages < images_data.length && (
        <TouchableOpacity style={styles.button} onPress={loadMoreImages}>
          <Text style={styles.text}>Load More</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: 'white',
  },
});
