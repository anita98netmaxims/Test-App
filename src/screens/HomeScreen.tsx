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

  const [page, setPage] = useState(0);
  const imagesPerPage = 4;
  const startIdx = (page - 1) * imagesPerPage;
  const endIdx = startIdx + imagesPerPage;

  const get_data = () => {
    var formdata = new FormData();
    formdata.append('user_id', '108');
    formdata.append('offset', page);
    formdata.append('type', 'popular');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://dev3.xicom.us/xttest/getdata.php', requestOptions)
      .then(response => response.json())
      .then(result => setImagesData([...images_data, ...result?.images]))
      .catch(error => console.log('error', error));
  };

  const [imageSize, setImageSize] = useState([{width: 100, height: 100}]);

  useEffect(() => {
    const len = images_data.length;
    if (len) {
      for (let index = 0; index < len; index++) {
        const element = images_data[index];

        Image.getSize(
          element?.xt_image,
          (width, height) => {
            setImageSize(prevState => {
              let array = [...prevState];

              array[index] = {width, height};

              return array;
            });
          },
          error => {
            console.error('Failed to get image size: ', error);
          },
        );
      }
    }
  }, [images_data]);

  useEffect(() => {
    get_data();
  }, [page]);

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <FlatList
        data={images_data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={
          <>
            <View
              style={{
                paddingVertical: 10,
              }}
            />
          </>
        }
        renderItem={({item, index}) => (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() =>
                navigation.navigate('HomeDetail', {image_data: item?.xt_image})
              }>
              <Image
                style={{
                  ...imageSize[index],
                  resizeMode: 'cover',
                }}
                source={{uri: item?.xt_image}}
              />
            </Pressable>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={loadMoreImages}>
        <Text style={styles.text}>Load More</Text>
      </TouchableOpacity>
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
