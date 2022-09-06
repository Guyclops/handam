import React, { useState, Fragment} from "react";
import Styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util.js";
import { UIActivityIndicator } from "react-native-indicators";
import { View, TouchableOpacity,FlatList } from 'react-native';
import { SelectedStar,LikedBookBtn,StarImageBtn } from "./Button";
import { CallModal } from "./Modal";
import { PhoneBookActions } from "../../store/actionCreator";
import { NBGBText, NBGLText } from "../../components/common/Text";

//TopView
export const TopView = Styled.View`  
  padding-vertical :  ${widthPercentageToDP(16)};
  padding-horizontal :  ${widthPercentageToDP(14)};
  flex-direction : row;
  width: 100%;
  height: ${widthPercentageToDP(60)};
  align-items: center;
  border-bottom-width:${widthPercentageToDP(0.5)};
  border-bottom-color:#dbdbdb;
`;
//TextInput View
export const TextSearchView = Styled.View`
  flex-direction:row;
  align-items: center;
  width: ${widthPercentageToDP(338)};
  height: ${widthPercentageToDP(40)};
  margin-left : ${widthPercentageToDP(19)};
  margin-top : ${widthPercentageToDP(18)};
  margin-right : ${widthPercentageToDP(18)};
  border-radius: ${widthPercentageToDP(8)};
  border-width:${widthPercentageToDP(1)};
  border-color:#dedede;
  background-color: #ffffff;
  
`;
//즐겨찾기버튼 HotListView
const HotListView = Styled.View`
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #dbdbdb;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${widthPercentageToDP(43)};
  padding-left: ${widthPercentageToDP(29)};
`;
export const HotList = props => {
  return (
    <HotListView>
    <SelectedStar />
    <LikedBookBtn {...props}/>
    </HotListView>
  );
};

//FlatListItemView
const ItemView = Styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: white;
`;
const DataContainerView = Styled.View`
  height: 100%;
  width: ${widthPercentageToDP(323)};
`;
const AlignView = Styled.View`
  margin-left: ${widthPercentageToDP(30)};
  margin-top: ${widthPercentageToDP(12)};
  margin-bottom: ${widthPercentageToDP(8)};
  flex-direction: row;
  justify-content: space-between;
`;
const RangeBox = Styled.View`
  width: 70%;
`;
const StarTouchableRange = Styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(52)};
  height: ${widthPercentageToDP(75)};
`;
//ItemSeparator
export const RenderItemSeparator =() => {
  return (
    <View
      style={{
      width:widthPercentageToDP(339),
      height: widthPercentageToDP(1),
      backgroundColor: '#ededed',
      marginLeft:widthPercentageToDP(18.5),
      }}></View>
  );
}
export const ProfessorItem = ({ index, proIndex, name, tel, role, email, location, track, isScrap, likedPage}) => {    
  const [checked, setChecked] = useState(isScrap);
  
  return (
    <ItemView>
      <DataContainerView>
        <AlignView><NBGBText>{name}</NBGBText><NBGLText>{tel}</NBGLText></AlignView>
        <AlignView><RangeBox>{email? <NBGLText>{email}</NBGLText>: null}{role? <NBGLText>{role}</NBGLText>: null}</RangeBox><NBGLText>{location}</NBGLText></AlignView>
          {track
            ? <AlignView><NBGLText>{track+''}</NBGLText></AlignView>
            : null} 
      </DataContainerView>

      <StarTouchableRange
        onPress={ async () => {
          checked? setChecked(false) : setChecked(true); //이미지만바꾸기위함
          await PhoneBookActions.insertFavoredList(track,index,proIndex);
          await PhoneBookActions.favoredList();
        }}>
        <StarImageBtn checked={likedPage === undefined ? checked: true}/>  
      </StarTouchableRange>
    </ItemView>   
  );
};

//DataListView
export const DataList = props => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); //callModal
  const [name, setName]=useState(); //modal name
  const [tel, setTel]=useState(); //modal tel

  const closeModal = () => {
    setModalVisible(false);
  }

  const RenderListFooter = () => {
    return loading ? (
      <View style={{height: widthPercentageToDP(122),
        width: widthPercentageToDP(375),
        justifyContent: "center",
        alignItems: "center"}}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };
    
  const RenderListFooter2 = () => {
    return loading2 ? (
      <View style={{height: widthPercentageToDP(122),
        width: widthPercentageToDP(375),
        justifyContent: "center",
        alignItems: "center"}}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ) : null;
  };
  
  if(props.selected === true){
    return (
      <Fragment>
      <CallModal closeModal={() => closeModal()} modalVisible={modalVisible} tel={tel} name={name}/>
      <FlatList
        {...props}
        data={props.officeData}
        style={{flexGrow: 1, width:"100%", height:"100%"}}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{
          setName(item.officeName);
          setTel(item.officeTel);
          setModalVisible(true);
        }}>            
        <ProfessorItem
          index={item.officeIndex}
          name={item.officeName}
          tel={item.officeTel}
          role={item.officeRole}
          location={item.officeLocation}
          isScrap={item.isScrap}
         /></TouchableOpacity>)}

        ItemSeparatorComponent={RenderItemSeparator}
        ListFooterComponent={RenderListFooter}
        onEndReachedThreshold={0.01}
        onEndReached={async ()=>{
          if(props.officeTotal-props.officeData.length>0 ){
            await setLoading(true);
            await PhoneBookActions.hansungOfficeList(props.officeData.length / 12 + 1, 12);
            await setLoading(false);
          }}}
        keyExtractor={(item, index) => index.toString()}
      /></Fragment>);
      }
  else{
    return (
      <Fragment>
      <CallModal closeModal={() => closeModal()} modalVisible={modalVisible} tel={tel} name={name}/>
      <FlatList
        {...props}
        data={props.professorData}
        style={{flexGrow: 1, width:"100%", height:"100%"}}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
            setName(item.professorName);
            setTel(item.tel);
            setModalVisible(true);
          }}> 
          <ProfessorItem
            proIndex={item.professorIndex}
            name={item.professorName}
            tel={item.tel}
            email={item.email}
            location={item.location}
            track={item.track}
            isScrap={item.isScrap}
          /></TouchableOpacity>)}
        ItemSeparatorComponent={RenderItemSeparator}
        ListFooterComponent={RenderListFooter2}
        onEndReachedThreshold={0.01}
        onEndReached={async ()=>{
          if(props.professorTotal-props.professorData.length>0 ){
            await setLoading2(true);
            await PhoneBookActions.professorList(props.professorData.length / 6 + 1, 6);
            await setLoading2(false);
          }}}
        keyExtractor={(item, index) => index.toString()}
      /></Fragment>);
      }    
};

//TapView
export const TabBoxView = Styled.View`
  border-bottom-color: #dbdbdb;
  flex-direction: row;
  width: 100%; 
  height: ${widthPercentageToDP(42)};
`;
const TabBtn = Styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  align-items: center;
  border-bottom-width: ${props => props.selected ? widthPercentageToDP(2) : widthPercentageToDP(1)};
  border-bottom-color: ${props => (props.selected ? "#259ffa" : "#dbdbdb")}; 
`;
    
export const TabCompo = props => {
  return (
    <TabBtn {...props}>
      <NBGBText color={props.selected ? "#259ffa" : "#dbdbdb"}>{props.title}</NBGBText>  
    </TabBtn>
  );
};
    
export const PhoneTaps = props => {
  const [selected, setSelected] = useState(true);

  return (
    <Fragment>
      <TabBoxView>
        <TabCompo
          title={"교내 연락처"}
          selected={selected}
          onPress={async () => {
            await PhoneBookActions.initMainPage();
            await PhoneBookActions.hansungOfficeList(props.officeData.length / 12, 12);
            setSelected(true);
          }}
        ></TabCompo>
        <TabCompo
          title={"교수님 연락처"}
          selected={!selected}
          onPress={async () => {
            await PhoneBookActions.initMainPage();
            await PhoneBookActions.professorList(props.professorData.length / 6, 6);
            setSelected(false);
          }}
        ></TabCompo>
      </TabBoxView>

      <HotList navigation={props.navigation}/>

      <DataList
        selected={selected}
        officeData={props.officeData}
        professorData={props.professorData}
        officeTotal={props.officeTotal}
        professorTotal={props.professorTotal}
      /> 
    </Fragment>
  );
};