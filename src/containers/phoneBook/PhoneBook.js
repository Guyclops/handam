import React, { useState, useEffect} from "react";
import { SafeAreaView,TouchableOpacity } from "react-native";
import { CommonActions,PhoneBookActions } from "../../store/actionCreator";
import { connect } from "react-redux";
import { TopView,PhoneTaps,TextSearchView} from "../../components/phoneBook/View";
import { SearchImageBtn} from "../../components/phoneBook/Button";
import { TextSearch} from "../../components/phoneBook/Text";
import { Title } from "../../components/common/View";

//교내연락처메인페이지
const PhoneBook = props => {
  const [searchingText, setSearchingText] = useState(""); //검색Text
  return (   
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}> 
      <TopView>
        <Title title={"교내 연락처"} rightInVisible={true}/>
      </TopView>
      
      <TextSearchView>
        <TextSearch
          onChangeText={text => setSearchingText(text)}
          onSubmitEditing={async () => {
            CommonActions.handleLoading(true);
            await PhoneBookActions.initSearchedTotal();
            await PhoneBookActions.initSearchedResult();
            await PhoneBookActions.findData(searchingText,props.searchedOffice.length/12,12);
            await PhoneBookActions.findData2(searchingText,props.searchedProfessor.length/6,6);
            CommonActions.handleLoading(false);
            props.navigation.navigate("searchedresult");
          }}
          placeholder={"교내부서, 연락처, 이름 등"}
        ></TextSearch>
        <TouchableOpacity
          onPress={async () => {
            CommonActions.handleLoading(true);
            await PhoneBookActions.initSearchedTotal();
            await PhoneBookActions.initSearchedResult();
            await PhoneBookActions.findData(searchingText,props.searchedOffice.length/12,12);
            await PhoneBookActions.findData2(searchingText,props.searchedProfessor.length/6,6);
            CommonActions.handleLoading(false);
            props.navigation.navigate("searchedresult");
        }}
        ><SearchImageBtn/></TouchableOpacity>   
      </TextSearchView>
          
      <PhoneTaps
        navigation ={props.navigation}
        officeData={props.contactOffice}
        professorData={props.contactProfessor}
        officeTotal={props.office_total}
        professorTotal={props.professor_total}
      />
    </SafeAreaView>
  );
};

export default connect(state => ({
  contactOffice: state.phonebook.contactOffice,
  office_total: state.phonebook.office_total,
  contactProfessor: state.phonebook.contactProfessor,
  professor_total: state.phonebook.professor_total,
  contactSearched: state.phonebook.contactSearched,
  searchedOffice: state.phonebook.searchedOffice,
  searchedProfessor: state.phonebook.searchedProfessor,
  s_office_total: state.phonebook.s_office_total,
  s_professor_total: state.phonebook.s_professor_total,
}))(PhoneBook);
