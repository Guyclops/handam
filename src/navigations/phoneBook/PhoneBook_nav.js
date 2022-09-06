import { createStackNavigator } from "react-navigation";
import PhoneBook from "../../containers/phoneBook/PhoneBook";
import LikedPhoneBook from "../../containers/phoneBook/LikedPhoneBook";
import SearchedResult from "../../containers/phoneBook/SearchedResult";

const PhoneBook_nav = createStackNavigator(

  {
    phonebook: { screen: PhoneBook},
    likedphonebook: { screen: LikedPhoneBook },
    searchedresult: {screen: SearchedResult}
  },
  {
    initialRouteName: "phonebook",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default PhoneBook_nav;