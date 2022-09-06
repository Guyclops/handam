import React,{useState,useEffect} from 'react';
import {SafeAreaView, TouchableOpacity,SectionList} from 'react-native';
import { CommonActions,PhoneBookActions } from "../../store/actionCreator";
import { connect } from "react-redux";
import {TopView, ProfessorItem, RenderItemSeparator} from "../../components/phoneBook/View";
import {CallModal} from "../../components/phoneBook/Modal";
import { Title } from "../../components/common/View";

//교내연락처즐겨찾기페이지
const LikedPhoneBook = props => {
  const [modalVisible, setModalVisible] = useState(false); //callModal
  const [name, setName]=useState(); //modal name
  const [tel, setTel]=useState(); //modal tel
  const [likedPage, setLikedPage] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    PhoneBookActions.initMainTotal();
    PhoneBookActions.initMainPage();
  }, []);

  useEffect(() => {
    return async () => {
      CommonActions.handleLoading(true);
      await PhoneBookActions.hansungOfficeList(0,12);
      await PhoneBookActions.professorList(0,6);
      CommonActions.handleLoading(false);
    };
  },[]);

  return(
    <SafeAreaView style={{flex:1}}>
      <CallModal closeModal={() => closeModal()} modalVisible={modalVisible} tel={tel} name={name}/>
      
      <TopView>
      <Title title={"자주찾는 연락처"} leftInVisible={true} rightHandler={async () => {
        props.navigation.navigate("phonebook"); 
      }}/>
      </TopView>
    
      <SectionList
        sections={[
          {
            title: "교내연락처",
            data: props.contactFavored.office
          },
          {
            title: "교수연락처",
            data: props.contactFavored.professor
          }
        ]}
        renderItem={({item,section})=>(
          <TouchableOpacity onPress={()=>{
            setName(item.professorName?item.professorName:item.officeName);
            setTel(item.tel? item.tel:item.officeTel);
            setModalVisible(true);
          }}>
              <ProfessorItem
            index={item.officeIndex}
            proIndex={item.professorIndex}
            name={item.professorName?item.professorName:item.officeName}
            tel={item.tel? item.tel:item.officeTel}
            role={item.officeRole}
            email={item.email}
            location={item.location?item.location:item.officeLocation}
            track={item.track}
            isScrap={item.isScrap}
            likedPage={likedPage}
          /></TouchableOpacity>
        )}
        ItemSeparatorComponent={RenderItemSeparator}
        renderSectionHeader={RenderItemSeparator}
        keyExtractor={(item,index)=> index}/>             
    </SafeAreaView>
    );
}

export default connect(state => ({
  contactFavored: state.phonebook.contactFavored,
  contactOffice: state.phonebook.contactOffice,
  contactProfessor: state.phonebook.contactProfessor,
}))(LikedPhoneBook);
