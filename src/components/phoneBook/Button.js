import React from "react";
import Styled from "styled-components";
import { widthPercentageToDP } from "../../utils/util";
import fonts from "../../configs/fonts";
import { PhoneBookActions } from "../../store/actionCreator";

const Btn = Styled.TouchableOpacity``;

const StarImage = Styled.Image`
  width: ${widthPercentageToDP(19)};
  height: ${widthPercentageToDP(19)};
 `;
const SearchImage = Styled.Image` 
  width: ${widthPercentageToDP(23)};
  height: ${widthPercentageToDP(23)};
  margin-left: ${widthPercentageToDP(7)};
`;
const NavigateImage = Styled.Image`
  margin-right: ${widthPercentageToDP(18)};
  margin-left: ${widthPercentageToDP(193)};
  width: ${widthPercentageToDP(16)};
  height: ${widthPercentageToDP(16)};
`;
const TextView=Styled.Text`
  color: black;
  font-family:${fonts.nanumBarunGothic};
`;

export const StarImageBtn = props => {
    return(
        <StarImage
            source={
                props.checked
                ? require("../../../assets/image/phonebook/selectedStar.png")
                : require("../../../assets/image/phonebook/unselectedStar.png")
        }/>
    ); 
};
export const SelectedStar = () => {
    return(
        <StarImage
            source={require("../../../assets/image/phonebook/selectedStar.png")}
            style={{marginRight: widthPercentageToDP(9)}}
        />
    );
}


export const SearchImageBtn = () => {
    return(
        <SearchImage    
            source={require("../../../assets/image/community/search.png")}/>
    );
}


export const LikedBookBtn = props => { //교내메인페이지 자주찾는 연락처버튼
    return(
        <Btn
          onPress={async () => {
            await PhoneBookActions.favoredList();
            props.navigation.navigate("likedphonebook");
          }}
          style={{ flexDirection: "row", alignItems: "center", height: "100%" }}>
          <TextView>자주찾는 연락처</TextView>
          <NavigateImage source={require("../../../assets/image/phonebook/back.png")}/>
        </Btn>
    );
}
