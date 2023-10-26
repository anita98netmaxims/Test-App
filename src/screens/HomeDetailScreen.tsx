import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';

const HomeDetailScreen = ({route}) => {
  const image = route?.params?.image_data;

  const windowWidth = Dimensions.get('window').width;

  console.log(image);

  return (
    <View>
      <Text>HomeDetailScreen</Text>
      <Image
        style={{
          height: 150,
          width: windowWidth,
        }}
        source={{uri: image}}
      />
    </View>
  );
};

export default HomeDetailScreen;
