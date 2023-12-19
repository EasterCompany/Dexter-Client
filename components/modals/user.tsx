// Library
import { useState, useRef } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { __INIT_USER__, oapi, logout, deleteAllCookies, isLoggedIn } from '../../shared/library/api';
import { launchImageLibraryAsync, MediaTypeOptions, UIImagePickerControllerQualityType } from 'expo-image-picker';
// Assets
import UserIcon from '../../assets/images/user_black.png';
import SuccessPNG from '../../assets/images/success.png';
import WarningPNG from '../../assets/images/warning.png';
// Components
import SlideModal from './slide';
import TextBtn from '../buttons/text';
import InputText from '../inputs/text';
import { EmailInput, PasswordInput, SubmitBtn } from './login';
// Styles
import theme from '../../App.style';


const UserModal = ({ user, reCheckUserData, visible, onClose }) => {
  const [ currentView, setView ] = useState<string>('profile');

  const refreshUser = () => oapi(
    "user/refresh",
    (resp) => {},
    (resp) => __INIT_USER__(resp).then(() => reCheckUserData()),
    { uuid: user.uuid, session: user.session }
  );

  const resetView = () => setView('profile');
  const onPressChangeDetails = () => setView('change-details');
  const onPressChangeEmail = () => setView('change-email');
  const onPressChangePassword = () => setView('change-password');
  const onPressDeleteAccount = () => setView('confirm-account-deletion');
  const onUpdateUserDetails = () => {refreshUser();resetView();};
  const onConfirmDeleteAccount = async () => {
    await deleteAllCookies();
    reCheckUserData();
    resetView();
    onClose();
  }
  const onPressLogout = () => logout().then(() => {
    reCheckUserData();
    resetView();
    onClose();
  });

  return <SlideModal
    title="Profile"
    visible={visible}
    onClose={() => {onClose();resetView();}}
  >
    {
      currentView === 'change-details' ? <ChangeDetails
        user={user}
        onDone={onUpdateUserDetails}
        onCancel={resetView}
      /> :
      currentView === 'change-email' ? <ChangeEmail
        user={user}
        onDone={onUpdateUserDetails}
        onCancel={resetView}
      /> :
      currentView === 'change-password' ? <ChangePassword
        user={user}
        onDone={resetView}
        onCancel={resetView}
      /> :
      currentView === 'confirm-account-deletion' ? <ConfirmDeleteAccount
        user={user}
        onDone={onConfirmDeleteAccount}
        onCancel={resetView}
      /> :
      <>
        <View style={bannerSection}>
          <Image source={{uri: user.displayImage}} blurRadius={10} style={bannerImage}/>
          <Image source={{uri: user.displayImage}} style={displayImage}/>
        </View>
        <View style={detailSection}>
          <Text style={detail}>{userFullName(user)}</Text>
          <Text style={detail}>{user.email}</Text>
          <Text style={detailMinor}>Permissions: {user.permissions}</Text>
          <Text style={detailMinor}>Member Since: {user.dateJoined}</Text>
        </View>
        <View style={profileBtnSection}>
          <TextBtn text="Change Details" onPress={onPressChangeDetails} style={profileBtn}/>
          <TextBtn text="Change Email" onPress={onPressChangeEmail} style={profileBtn}/>
          <TextBtn text="Change Password" onPress={onPressChangePassword} style={profileBtn}/>
          <TextBtn text="Logout" onPress={onPressLogout} style={profileBtn}/>
          <TextBtn text="Delete Account" onPress={onPressDeleteAccount} style={deleteAccountBtn}/>
        </View>
      </>
    }
  </SlideModal>
}


const ChangeDetails = ({ user, onDone, onCancel }) => {
  const [ errorMessage, setError ] = useState<string>("");
  const [ newDisplayImage, setDisplayImage ] = useState(null);
  const input = useRef({
    firstName: user.firstName,
    middleNames: user.middleNames,
    lastName: user.lastName
  });

  const onUpdateFirstName = (text) => {
    input.current.firstName = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdateMiddleNames = (text) => {
    input.current.middleNames = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdateLastName = (text) => {
    input.current.lastName = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdateDisplayImage = async () => {
    launchImageLibraryAsync({
      base64: true,
      aspect: [1, 1],
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images
    }).then((result) => {if (!result.canceled) setDisplayImage(result.assets[0])})
    if (errorMessage.length > 0) setError("");
  };
  const onSubmit = () => oapi(
    "user/edit/details",
    (resp) => setError(resp),
    (resp) => onDone(),
    {
      uuid: user.uuid,
      session: user.session,
      first_name: input.current.firstName,
      middle_names: input.current.middleNames,
      last_name: input.current.lastName,
      display_image: newDisplayImage ? newDisplayImage.base64 : undefined
    }
  );

  return <View style={subView}>
    <Text style={[theme.boldHeader, { color: theme.alt.color }]}>Change Details</Text>
    {newDisplayImage ? <Image source={{uri: newDisplayImage.uri}} style={{
      width: 132,
      height: 132,
      borderRadius: displayImage.borderRadius
    }}/> : <></>}
    <TextBtn text="Change Display Image" onPress={onUpdateDisplayImage} style={{
      color: '#202029',
      width: '95%',
      maxWidth: 420,
      marginTop: 16,
      marginBottom: 16,
      borderColor: '#202029',
      backgroundColor: 'transparent'
    }}/>
    <InputText
      icon={UserIcon}
      label="First Name"
      placeholder={user.firstName}
      onChangeText={onUpdateFirstName}
      onPressEnter={onSubmit}
    />
    <InputText
      icon={UserIcon}
      label="Middle Name(s)"
      placeholder={user.middleNames}
      onChangeText={onUpdateMiddleNames}
      onPressEnter={onSubmit}
    />
    <InputText
      icon={UserIcon}
      label="Last Name"
      placeholder={user.lastName}
      onChangeText={onUpdateLastName}
      onPressEnter={onSubmit}
    />
    <ErrorMessage error={errorMessage}/>
    <SubmitBtn text="Update" onSubmit={onSubmit} style={formBtn}/>
    <SubmitBtn text="Cancel" onSubmit={onCancel} style={formBtn}/>
  </View>;
};


const ChangeEmail = ({ user, onDone, onCancel }) => {
  const [ errorMessage, setError ] = useState<string>("");
  const input = useRef({
    email: '',
    password: ''
  });

  const onUpdateEmail = (text) => {
    input.current.email = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdatePassword = (text) => {
    input.current.password = text;
    if (errorMessage.length > 0) setError("");
  };
  const onSubmit = () => oapi(
    'user/edit/email',
    (resp) => setError(resp),
    (resp) => onDone(),
    {
      uuid: user.uuid,
      new_email: input.current.email,
      password: input.current.password
    }
  );

  return <View style={subView}>
    <Text style={[theme.boldHeader, { color: theme.alt.color }]}>Change Email</Text>
    <EmailInput
      label="New Email Address"
      autoComplete="email"
      onChangeText={onUpdateEmail}
      onPressEnter={onSubmit}
    />
    <PasswordInput
      label="Password"
      autoComplete="current-password"
      onChangeText={onUpdatePassword}
      onPressEnter={onSubmit}
    />
    <ErrorMessage error={errorMessage}/>
    <SubmitBtn text="Update" onSubmit={onSubmit} style={formBtn}/>
    <SubmitBtn text="Cancel" onSubmit={onCancel} style={formBtn}/>
  </View>;
};


const ChangePassword = ({ user, onDone, onCancel }) => {
  const [ successMessage, setSuccess ] = useState<boolean>(false);
  const [ errorMessage, setError ] = useState<string>("");
  const passwordInput = useRef({
    current: '',
    new: '',
    confirm: ''
  });

  const onUpdateCurrent = (text) => {
    passwordInput.current.current = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdateNew = (text) => {
    passwordInput.current.new = text;
    if (errorMessage.length > 0) setError("");
  };
  const onUpdateConfirm = (text) => {
    passwordInput.current.confirm = text;
    if (errorMessage.length > 0) setError("");
  };
  const onSubmit = () => oapi(
    'user/edit/password',
    (resp) => setError(resp),
    (resp) => setSuccess(true),
    {
      uuid: user.uuid,
      current_password: passwordInput.current.current,
      new_password: passwordInput.current.new,
      confirm_password: passwordInput.current.confirm
    }
  );

  return <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }}>{
    successMessage ? <SuccessfullyUpdated label="Changed password" onDone={onDone}/> : <>
      <Text style={[theme.boldHeader, { color: theme.alt.color }]}>Change Password</Text>
      <PasswordInput
        label="Current Password"
        autoComplete="current-password"
        onChangeText={onUpdateCurrent}
        onPressEnter={onSubmit}
      />
      <PasswordInput
        label="New Password"
        autoComplete="new-password"
        onChangeText={onUpdateNew}
        onPressEnter={onSubmit}
      />
      <PasswordInput
        label="Confirm New Password"
        autoComplete="new-password"
        onChangeText={onUpdateConfirm}
        onPressEnter={onSubmit}
      />
      <ErrorMessage error={errorMessage}/>
      <SubmitBtn text="Update" onSubmit={onSubmit} style={formBtn}/>
      <SubmitBtn text="Cancel" onSubmit={onCancel} style={formBtn}/>
    </>
  }</View>;
};


const ConfirmDeleteAccount = ({ user, onDone, onCancel }) => {
  const [ errorMessage, setError ] = useState<string>("");
  const passwordInput = useRef("");

  const onConfirmDeleteAccount = () => oapi('user/delete', setError, onDone, {
    uuid: user.uuid,
    password: passwordInput.current
  });

  return <View style={[
    subView,
    {backgroundColor: theme.error.backgroundColor}
  ]}>
    <Image
      source={WarningPNG}
      style={{ width: 132, height: 132 }}
    />
    <Text style={[theme.boldHeader, { marginBottom: 0 } ]}>
      Warning!{'\n'}
      You're about to permanently delete your account.
    </Text>
    <Text style={[ theme.header, { marginTop: 0 } ]}>
      There is no way to recover your account once it has been deleted.
    </Text>
    <PasswordInput
      label="Password"
      onChangeText={(text) => passwordInput.current = text}
      onPressEnter={onConfirmDeleteAccount}
    />
    <ErrorMessage error={errorMessage}/>
    <SubmitBtn text="Delete Account" onSubmit={onConfirmDeleteAccount} style={formBtn}/>
    <SubmitBtn text="Cancel" onSubmit={onCancel} style={formBtn}/>
  </View>
}


const SuccessfullyUpdated = ({ label, onDone }) => <>
  <Image
    source={SuccessPNG}
    style={{ width: 132, height: 132 }}
  />
  <Text style={[theme.boldHeader, { color: theme.alt.color, marginBottom: 16 } ]}>{label}</Text>
  <SubmitBtn text="Done" onSubmit={onDone} style={formBtn}/>
</>


const ErrorMessage = ({ error }) => error.length > 0 ? <View style={[ theme.error, { marginBottom: 16 } ]}>
  <Text style={theme.error}>{error}</Text>
</View> : <></>


const userFullName = (user) => {
  return user.middleNames !== undefined && user.middleNames.length > 0 ?
    `${user.firstName} ${user.middleNames} ${user.lastName}` :
    `${user.firstName} ${user.lastName}`
}


const subView = {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100%'
}

const bannerSection = {
  top: 0,
  width: '100%',
  height: '20%',
  marginBottom: 48,
  backgroundColor: '#202029'
};

const bannerImage = {
  width: '100%',
  height: '100%',
  marginBottom: '-20%'
}

const displayImage = {
  width: 132,
  height: 132,
  marginTop: 'auto',
  marginBottom: -32,
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: 48,
  borderWidth: 3,
  borderColor: '#E5E7EB',
  borderBottomWidth: 0,
  backgroundColor: '#202029'
};

const detail = {
  color: '#202029',
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 500,
  fontFamily: 'Metro',
  marginBottom: 12,
};

const detailMinor = {
  color: '#202029',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 500,
  fontFamily: 'Metro-Thin',
  marginBottom: 12,
};

const detailSection = {
  marginBottom: 'auto'
};

const formBtn = {
  marginTop: 0,
  marginBottom: 16
}

const profileBtn = {
  color: '#202029',
  height: 52,
  borderWidth: 0,
  borderBottomWidth: 2,
  borderRadius: 0,
  borderColor: 'rgba(25,25,25,.25)',
  backgroundColor: 'transparent',
};

const profileBtnSection = {
  width: '100%',
  marginTop: 48,
  borderTopWidth: 2,
  borderColor: 'rgba(25,25,25,.25)'
};

const deleteAccountBtn = {
  color: '#ffff',
  height: 52,
  borderWidth: 0,
  borderBottomWidth: 2,
  borderRadius: 0,
  borderColor: 'rgba(25,25,25,.25)',
  backgroundColor: theme.error.backgroundColor,
};

export default UserModal;
