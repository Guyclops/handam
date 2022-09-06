import React,{useState, useEffect} from 'react';
import { View, TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import { widthPercentageToDP } from "../../utils/util.js";
import { connect } from "react-redux";
import { CommonActions,PhoneBookActions } from "../../store/actionCreator";
import { UIActivityIndicator } from "react-native-indicators";
import { TopView,TabCompo,TabBoxView, ProfessorItem, RenderItemSeparator } from "../../components/phoneBook/View";
import { CallModal } from "../../components/phoneBook/Modal";
import { Title } from "../../components/common/View";

//교내연락처검색결과페이지
const SearchedResult = props => {
  const [tapSelected, setTapSelected] = useState(!!props.searchedOffice.length);
  const [loading, setLoading] = useState(false); //교내검색결과RenderListFooter
  const [loading2, setLoading2] = useState(false);//교수님검샐결과RenderListFooter2

  const [modalVisible, setModalVisible] = useState(false); //callModal
  const [name, setName]=useState(); //modal name
  const [tel, setTel]=useState(); //modal tel
  const closeModal = () => {
    setModalVisible(false);
  }  
  const RenderListFooter = () => {
    return loading?(
      <View style={{height: widthPercentageToDP(122),
        width: widthPercentageToDP(375),
        justifyContent: "center",
        alignItems: "center"}}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ):null;
  };
  const RenderListFooter2 = () => {
    return loading2?(
      <View style={{height: widthPercentageToDP(122),
        width: widthPercentageToDP(375),
        justifyContent: "center",
        alignItems: "center"}}>
        <UIActivityIndicator size={widthPercentageToDP(30)} color={"#727272"} />
      </View>
    ):null;
  };
  
  useEffect(() => {
    PhoneBookActions.initMainTotal();
    PhoneBookActions.initMainPage();
  }, []);

  useEffect(()=>{
    return async() => {
      CommonActions.handleLoading(true);
      await PhoneBookActions.hansungOfficeList(0, 12);
      await PhoneBookActions.professorList(0, 6);
      CommonActions.handleLoading(false);
    };
  },[]);

  return(
  <SafeAreaView style={{flex:1}}>
    <CallModal closeModal={() => closeModal()} modalVisible={modalVisible} tel={tel} name={name}/>

    <TopView>
    <Title title={"검색결과"} leftInVisible={true} rightHandler={async () => {
      props.navigation.goBack();
      }}/>
    </TopView> 
      
    <TabBoxView>
      <TabCompo
        title={"교내 연락처"}
        selected={tapSelected}
        onPress={async () => {
          await PhoneBookActions.initSearchedTotal();
          await PhoneBookActions.initSearchedResult();
          await PhoneBookActions.findData(props.searchingText,props.searchedOffice.length/12,12);
          setTapSelected(true); 
        }}
      ></TabCompo>
      <TabCompo
        title={"교수님 연락처"}
        selected={!tapSelected}
        onPress={async () => {
          await PhoneBookActions.initSearchedTotal();
          await PhoneBookActions.initSearchedResult();
          await PhoneBookActions.findData2(props.searchingText,props.searchedProfessor.length/6,6);
          setTapSelected(false);
        }}
      ></TabCompo>
    </TabBoxView>

      {
        tapSelected
        ?
        <FlatList
          data={props.searchedOffice}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              setName(item.professorName?item.professorName:item.officeName);
              setTel(item.tel? item.tel:item.officeTel);
              setModalVisible(true);
            }}>
              <ProfessorItem
                index={item.officeIndex}
                name={item.officeName}
                tel={item.officeTel}
                role={item.officeRole}
                location={item.officeLocation}
                isScrap={item.isScrap}
              /></TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={RenderItemSeparator}
          ListFooterComponent={RenderListFooter}
          onEndReachedThreshold={0.01}
          onEndReached={async ()=>{
            if(props.s_office_total-props.searchedOffice.length>0){
              await setLoading(true);
              await PhoneBookActions.findData(props.searchingText,props.searchedOffice.length/12 + 1, 12);
              await setLoading(false);
            }
          }}
        />
        :
        <FlatList
        data={props.searchedProfessor}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
            setName(item.professorName?item.professorName:item.officeName);
            setTel(item.tel? item.tel:item.officeTel);
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
          /></TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={RenderItemSeparator}
        ListFooterComponent={RenderListFooter2}
        onEndReachedThreshold={0.01}
        onEndReached={async ()=>{
          if(props.s_professor_total-props.searchedProfessor.length>0){
            await setLoading2(true);
            await PhoneBookActions.findData2(props.searchingText,props.searchedProfessor.length/6 + 1, 6);
            await setLoading2(false);
          }
        }}
      />     
      }
    </SafeAreaView>
  );
}

export default connect(state => ({
  contactOffice:state.phonebook.contactOffice,
  contactProfessor:state.phonebook.contactProfessor,
  searchedOffice: state.phonebook.searchedOffice,
  searchedProfessor: state.phonebook.searchedProfessor,
  s_office_total: state.phonebook.s_office_total,
  s_professor_total: state.phonebook.s_professor_total,
  searchingText: state.phonebook.searchingText,
}))(SearchedResult);