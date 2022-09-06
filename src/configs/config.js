import navigators from "../utils/navigators";
import values from "./values";

/**
 * 설정파일
 */

const init = {
  type: "dev",
  server: {
    dev: "",
    prod: "",
  },
  mailServer: {
    dev: "",
    prod: "",
  },
  shuttleWebView: {
    dev: "",
    prod: "",
  },
  pushKey: {
    dev: "",
    prod: "",
  },
  readingServer: {
    dev: "",
    prod: "",
  },
};

const config = {
  server: init.server[init.type],
  mailServer: init.mailServer[init.type],
  shuttleWebView: init.shuttleWebView[init.type],
  readingServer: init.readingServer[init.type],
  pushKey: init.pushKey[init.type],
  bus_url: "",
  bus_key: "",
  jongro: "100900010",
  seongbuk: "107900003",
  androidVersion: "2.1.0",
  iosVersion: "2.1.0",
  iosStore: {
    appID: 00000000000,
    appName: "한담",
  },
  androidStore: {
    packageName: "com.handamproject",
  },
  signDataKey: [
    "token",
    "userId",
    "BusFavorite",
    "pass_locking",
    "bio_locking",
    "lock_pass",
    "schedule_color",
    values.storeName.HOME_MENU,
  ],
  homeMenu: [
    {
      sort: 1,
      title: values.homeMenuTitle.SCHEDULE,
      image: require("HandamProject/assets/image/home/schedule.png"),
      enabled: true,
    },
    {
      sort: 2,
      title: values.homeMenuTitle.NOTICE,
      image: require("HandamProject/assets/image/home/notice.png"),
      enabled: true,
    },
    {
      sort: 3,
      title: values.homeMenuTitle.BUS,
      image: require("HandamProject/assets/image/home/bus.png"),
      enabled: true,
    },
    {
      sort: 4,
      title: values.homeMenuTitle.CIS,
      image: require("HandamProject/assets/image/home/cis.png"),
      enabled: true,
    },
    {
      sort: 5,
      title: values.homeMenuTitle.READING,
      image: require("HandamProject/assets/image/home/reading.png"),
      enabled: true,
    },
    {
      sort: 6,
      title: values.homeMenuTitle.CALCULATE,
      image: require("HandamProject/assets/image/home/calculation.png"),
      enabled: true,
    },
    {
      sort: 7,
      title: values.homeMenuTitle.RESTAURANT,
      image: require("HandamProject/assets/image/home/restaurant.png"),
      enabled: true,
    },
    {
      sort: 8,
      title: values.homeMenuTitle.MAP,
      image: require("HandamProject/assets/image/home/location.png"),
      enabled: true,
    },
    {
      sort: 9,
      title: values.homeMenuTitle.PHONEBOOK,
      image: require("HandamProject/assets/image/phonebook/contact_information.png"),
      enabled: true,
    },
  ],
};

export default config;
