import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeDetailScreen = ({route}) => {
  const image = route?.params?.image_data;

  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  interface ValidationErrors {
    text?: string;
    phone?: string;
    firstname?: string;
    lastname?: string;
  }

  const [imageSize, setImageSize] = useState({width: 0, height: 0});

  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handle_validation = () => {
    setIsDirty(true);

    const errors: ValidationErrors = {};
    if (firstname.trim() === '' || !nameRegex.test(firstname)) {
      errors.firstname = 'Please enter a valid first name';
    }
    if (lastname.trim() === '' || !nameRegex.test(lastname)) {
      errors.lastname = 'Please enter a valid last name';
    }
    if (email.trim() === '') {
      errors.text = 'Email-Id is required.';
    }
    if (!emailRegex.test(email.trim())) {
      errors.text = 'Enter valid Email-Id.';
    }
    if (phone.trim() === '' || !phoneRegex.test(phone)) {
      errors.phone = 'Enter 10 digit Phone Number.';
    }

    setValidationErrors(errors);
    return errors;
    // if (Object.keys(errors).length === 0) {
    //   handleSubmit();
    //   setIsDirty(false);
    // }
  };

  const handleSubmit = async () => {
    const image_url = image.replace('http://', 'https://');
    console.log(image_url, 'images...');

    if (Object.keys(handle_validation()).length === 0) {
      try {
        const responseImage = await fetch(image_url);

        const blob = await responseImage.blob();

        blob._data.name = 'image.jpg';
        blob._data.type = 'image/jpeg';

        var formdata = new FormData();
        formdata.append('first_name', firstname);
        formdata.append('last_name', lastname);
        formdata.append('email', email);
        formdata.append('phone', phone);
        // formdata.append('user_image', blob?._data, 'image.jpg');
        // formdata.append('user_image', blob._data, 'image.jpg');
        formdata.append('user_image', {
          uri: image_url,
          type: blob._data.type,
          name: blob._data.name,
        });

        console.log(blob);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };

        const responseFormData = await fetch(
          'https://dev3.xicom.us/xttest/savedata.php',
          requestOptions,
        );

        if (!responseFormData.ok) {
          throw new Error(`HTTP error! status: ${responseFormData.status}`);
        }
        const responseData = await responseFormData.json();
        console.log('Response:', responseData);
        if (responseData?.status === 'success') {
          Alert.alert(responseData?.message);
          navigation?.goBack();
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert(error?.message);
      }
    }
  };

  useEffect(() => {
    Image.getSize(
      image,
      (width, height) => {
        setImageSize({width, height});
      },
      error => {
        console.error('Failed to get image size: ', error);
      },
    );
  }, [image]);

  useEffect(() => {
    if (isDirty) {
      handle_validation();
    }
  }, [firstname, lastname, email, phone]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
      }}>
      <Image
        style={{
          ...imageSize,
          resizeMode: 'cover',
        }}
        source={{uri: image}}
      />
      <View
        style={{
          marginTop: 30,
        }}>
        <CustomTextInput
          label="First Name"
          value={firstname}
          onChangeText={setFirstName}
        />

        {validationErrors?.firstname ? (
          <View style={styles.errorView}>
            <Text style={styles.errorTextColor}>
              {validationErrors.firstname}
            </Text>
          </View>
        ) : (
          ''
        )}
        <CustomTextInput
          label="Last Name"
          value={lastname}
          onChangeText={setLastName}
        />

        {validationErrors?.lastname ? (
          <View style={styles.errorView}>
            <Text style={styles.errorTextColor}>
              {validationErrors.lastname}
            </Text>
          </View>
        ) : (
          ''
        )}

        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {validationErrors?.text ? (
          <View style={styles.errorView}>
            <Text style={styles.errorTextColor}>{validationErrors.text}</Text>
          </View>
        ) : (
          ''
        )}

        <CustomTextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType={'numeric'}
        />

        {validationErrors?.phone ? (
          <View style={styles.errorView}>
            <Text style={styles.errorTextColor}>{validationErrors.phone}</Text>
          </View>
        ) : (
          ''
        )}

        <Pressable
          onPress={handleSubmit}
          style={{
            paddingVertical: 15,
            marginHorizontal: 10,
            backgroundColor: 'blue',
            marginBottom: 50,
            alignItems: 'center',
            marginTop: validationErrors?.phone ? 10 : 0,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeDetailScreen;

const styles = StyleSheet.create({
  errorTextColor: {
    color: 'red',
    marginTop: -10,
    marginHorizontal: 10,
  },
  errorView: {
    marginLeft: windowWidth * 0.45,
  },
});
