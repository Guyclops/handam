import React from "react";
import Styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util.js";
import { Modal} from "react-native";
import call from "react-native-communications";
import { NBGText } from "../../components/common/Text";

const ModalBackGround = Styled.View`
  flex: 1;
  background-color: #000000aa;
  height: 100%;
  align-items : center;
`;
const Callbox = Styled.TouchableOpacity`
  justify-content: center;
  align-items : center;
  width : ${widthPercentageToDP(359)};
  height : ${widthPercentageToDP(58.1)};
  margin-top : ${widthPercentageToDP(3.5)};
  margin-bottom : ${widthPercentageToDP(3.5)};
  border-radius : ${widthPercentageToDP(14)};
  background-color: #ffffff;
`;
const CallView = Styled.View`
  position: absolute;
  bottom:${widthPercentageToDP(6.9)};;
`;

export const CallModal = props => {
   
  callTo = phoneNum => {
    if(phoneNum === undefined) call.phonecall("X",false);
    else{
      let phoneNumber = phoneNum.replace("-", "");
      call.phonecall(phoneNumber, false);
    }
  }
  return (
    <Modal transparent={true} visible={props.modalVisible} animationType={"fade"}>
      <ModalBackGround>
        <CallView>
          <Callbox onPress={() => {props.closeModal(); callTo(props.tel);}}>
            <NBGText fontSize={widthPercentageToDP(18)} color={"#259ffa"}>{props.tel? props.name+"에게 전화하기" : "X"}</NBGText></Callbox>
          <Callbox onPress={() => {props.closeModal();}}>
            <NBGText fontSize={widthPercentageToDP(18)}>취소</NBGText></Callbox> 
        </CallView>
      </ModalBackGround>
    </Modal>
  );
}

