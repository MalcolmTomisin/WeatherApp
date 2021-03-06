import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
            "lato-bold": require("../assets/fonts/Lato-Bold.ttf"),
            "lato-medium": require("../assets/fonts/Lato-Medium.ttf"),
            "lato-regular": require("../assets/fonts/Lato-Regular.ttf"),
            "lato-semibold": require("../assets/fonts/Lato-Semibold.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}