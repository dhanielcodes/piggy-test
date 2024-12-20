jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest
      .fn()
      .mockImplementation(({children}) => children),
    Swipeable: jest.fn(),
    DrawerLayout: jest.fn(),
    State: {},
    PanGestureHandler: jest.fn(),
    TapGestureHandler: jest.fn(),
    FlingGestureHandler: jest.fn(),
    LongPressGestureHandler: jest.fn(),
    PinchGestureHandler: jest.fn(),
    RotationGestureHandler: jest.fn(),
    ScrollView: jest.fn(),
    Slider: jest.fn(),
    Switch: jest.fn(),
    TextInput: jest.fn(),
    ToolbarAndroid: jest.fn(),
    ViewPagerAndroid: jest.fn(),
    DrawerLayoutAndroid: jest.fn(),
    WebView: jest.fn(),
    NativeViewGestureHandler: jest.fn(),
    FlatList: jest.requireActual('react-native').FlatList,
    SectionList: jest.requireActual('react-native').SectionList,
  };
});
