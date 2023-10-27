import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const windowWidth = Dimensions.get('window').width;
const CustomTextInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  right,
}) => {
  const [isFocused, setFocused] = useState(false);
  

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const inputStyle = {
    borderColor: isFocused ? '#2680EB' : '#808080',
    borderWidth: 2,
    backgroundColor: isFocused ? '#FFF' : '#F1F1F1',
    borderRadius: 15,
  };

  return (
    <View style={styles.inputContainer}>
      <Text
        style={{
          color: '#000',
          fontSize: 18,
          fontWeight: '500',
          marginTop: 10,
          marginHorizontal: 10,
          width : windowWidth*0.4
        }}>
        {label}
      </Text>
      <View
        style={{
          borderRadius: 20,
          borderWidth: 6,
          borderColor: isFocused ? '#DFECFF' : 'transparent',
          marginTop: 8,
        }}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={`Enter your ${label.toLowerCase()}`}
          placeholderTextColor={'#555555'}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    minHeight: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    color: '#000',
    width: windowWidth* 0.5,
  },
  inputContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between'
  },
});
