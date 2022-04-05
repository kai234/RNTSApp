/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Dimensions,
  NativeModules
} from 'react-native';
import VideoListPage from './src/pages/videoListPage'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const { width, height} = Dimensions.get('window')

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Style = {
    width,
    height,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={Style}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <VideoListPage />
    </SafeAreaView>
  );
};

export default App;
