import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";
import {getData} from "../../../utils/util";

const CONTACT_OFFICE = "phonebook/CONTACT_OFFICE";
const CONTACT_OFFICE_INIT = "phonebook/CONTACT_OFFICE_INIT";
const CONTACT_OFFICE_TOTAL = "phonebook/CONTACT_OFFICE_TOTAL";
const CONTACT_OFFICE_TOTAL_INIT = "phonebook/CONTACT_OFFICE_TOTAL_INIT";

const CONTACT_PROFESSOR = "phonebook/CONTACT_PROFESSOR";
const CONTACT_PROFESSOR_INIT = "phonebook/CONTACT_PROFESSOR_INIT";
const CONTACT_PROFESSOR_TOTAL = "phonebook/CONTACT_PROFESSOR_TOTAL";
const CONTACT_PROFESSOR_TOTAL_INIT = "phonebook/CONTACT_OFFICE_TOTAL_INIT";

const CONTACT_FAVORED = "phonebook/CONTACT_FAVORED";

const SEARCHED_OFFICE = "phonebook/SEARCHED_OFFICE";
const SEARCHED_OFFICE_INIT = "phonebook/SEARCHED_OFFICE_INIT";
const SEARCHED_OFFICE_TOTAL = "phonebook/SEARCHED_OFFICE_TOTAL";
const SEARCHED_OFFICE_TOTAL_INIT = "phonebook/SEARCHED_OFFICE_TOTAL_INIT";

const SEARCHED_PROFESSOR = "phonebook/SEARCHED_PROFESSOR";
const SEARCHED_PROFESSOR_INIT = "phonebook/SEARCHED_PROFESSOR_INIT";
const SEARCHED_PROFESSOR_TOTAL = "phonebook/SEARCHED_PROFESSOR_TOTAL";
const SEARCHED_PROFESSOR_TOTAL_INIT = "phonebook/SEARCHED_PROFESSOR_TOTAL_INIT";

const SEARCHINGTEXT = "phonebook/SEARCHINGTEXT";

const officeAction = createAction(CONTACT_OFFICE); //office데이터가져오기
const officeInitAction = createAction(CONTACT_OFFICE_INIT);//office데이터init
const officeTotalAction = createAction(CONTACT_OFFICE_TOTAL);//총데이터개수
const officeTotalInitAction = createAction(CONTACT_OFFICE_TOTAL_INIT);//총데이터init

const professorAction = createAction(CONTACT_PROFESSOR);
const professorInitAction = createAction(CONTACT_PROFESSOR_INIT);
const professorTotalAction = createAction(CONTACT_PROFESSOR_TOTAL);
const professorTotalInitAction = createAction(CONTACT_PROFESSOR_TOTAL_INIT);

const favoredAction = createAction(CONTACT_FAVORED);

const searchedOfficeAction = createAction(SEARCHED_OFFICE);
const searchedOffice_initAction = createAction(SEARCHED_OFFICE_INIT);
const s_officeTotalAction = createAction(SEARCHED_OFFICE_TOTAL);
const s_officeTotalInitAction = createAction(SEARCHED_OFFICE_TOTAL_INIT);

const searchedProfessorAction = createAction(SEARCHED_PROFESSOR);
const searchedProfessor_initAction = createAction(SEARCHED_PROFESSOR_INIT);
const s_professorTotalAction = createAction(SEARCHED_PROFESSOR_TOTAL);
const s_professorTotalInitAction = createAction(SEARCHED_PROFESSOR_TOTAL_INIT);

const setSearchingTextAction = createAction(SEARCHINGTEXT);

const initState={
    contactOffice: [], //메인페이지 교내연락처 리스트
    contactProfessor: [], //메인페이지 교수님연락처 리스트
    contactFavored: [], //즐겨찾기 리스트
    searchedOffice: [], //검색결과 교내연락처 리스트
    searchedProfessor: [], //검색결과 교수님연락처 리스트

    searchingText: null, //검색데이터
    office_total: null, //메인페이지 교내연락처 데이터 개수
    professor_total: null, //메인페이지 교수님연락처 데이터 개수
    s_office_total: null, //검색결과 교내연락처 데이터 개수
    s_professor_total: null, //검색결과 교수님연락처 데이터 개수
};

//메인페이지의 교내연락처,교수님연락처리스트 초기화
export const initMainPage = () => dispatch => {
  dispatch(officeInitAction(CONTACT_OFFICE_INIT));
  dispatch(professorInitAction(CONTACT_PROFESSOR_INIT));
}
export const initMainTotal = () => dispatch => {
  dispatch(officeTotalInitAction(CONTACT_OFFICE_TOTAL_INIT));
  dispatch(professorTotalInitAction(CONTACT_PROFESSOR_TOTAL_INIT));
}
//검색결과리스트의 교내연락처,교수님연락처리스트 초기화
export const initSearchedResult = () => dispatch => {
  dispatch(searchedOffice_initAction(SEARCHED_OFFICE_INIT));
  dispatch(searchedProfessor_initAction(SEARCHED_PROFESSOR_INIT));
};
export const initSearchedTotal = () => dispatch => {
  dispatch(s_officeTotalInitAction(SEARCHED_OFFICE_TOTAL_INIT));
  dispatch(s_professorTotalInitAction(SEARCHED_PROFESSOR_TOTAL_INIT));
}

//즐겨찾기 추가 및 취소
export const insertFavoredList = (track,index,proIndex) => async dispatch => {
  try{
    const token = await getData("token");
    if(track == null){ // office 데이터 이면
      const jsonData = await api.put(
        `/contactSubscriber/officeIndex/${index}`,
        {token: token}
      );
    }
    else{
      const jsonData = await api.put(
        `/contactSubscriber/professorIndex/${proIndex}`,
        {token: token}
      );
    }
  }catch{
    throw "error";
  }
};

//검색한 데이터 중 교내연락처 검색결과 가져오기
export const findData= (text,page,count) => async dispatch =>{
  try{
    const token = await getData("token");

    let url=`/contact/search?page=${page}&count=${count}&searchKeyword=${text}`;
    const jsonData = await api.get(url, {
      token: token
    });

    if(jsonData.statusCode == 200){
      const searchedList = jsonData.result;
      dispatch(setSearchingTextAction(text));
      dispatch(s_officeTotalAction(jsonData.officeCount));
      dispatch(searchedOfficeAction(searchedList.office));
    }
  }catch{
    throw "error";
  }
}
//검색한 데이터 중 교수님연락처 검색결과 가져오기
export const findData2= (text,page,count) => async dispatch =>{
  try{
    const token = await getData("token");

    let url=`/contact/search?page=${page}&count=${count}&searchKeyword=${text}`;
    const jsonData = await api.get(url, {
      token: token
    });

    if(jsonData.statusCode == 200){
      const searchedList = jsonData.result;
      dispatch(setSearchingTextAction(text));
      dispatch(s_professorTotalAction(jsonData.professorCount));
      dispatch(searchedProfessorAction(searchedList.professor));
    }
  }catch{
    throw "error";
  }
}

//나의 즐겨찾기 리스트 가져오기
export const favoredList= () => async dispatch =>{
  try{
    const token = await getData("token");

    let url=`/contactSubscriber/scrap`;
    const jsonData = await api.get(url, {
      token: token
    });

    if(jsonData.statusCode == 200){
      const favoredList = jsonData.result;
      dispatch(favoredAction(favoredList));
    }
  }catch(e){
    throw "error";
  }
}

//메인페이지 교내연락처 가져오기
export const hansungOfficeList= (page, count) =>async dispatch=>{
  
    try{
      const token= await getData("token");
 
      let url=`/contact/office?page=${page}&count=${count}`;
      const jsonData = await api.get(url, {
        token: token
      });
  
      if(jsonData.statusCode==200){
        const willBeListed  = jsonData.result;
        dispatch(officeTotalAction(jsonData.resultCount));
        dispatch(officeAction(willBeListed));
      }
    }catch{
      throw "error";
    } 
  };
  
//메인페이지 교수님연락처 가져오기
export const professorList= (page,count) =>async dispatch=>{
  
    try{
      const token= await getData("token");
 
      let url=`/contact/professor?page=${page}&count=${count}`;
      const jsonData = await api.get(url, {
        token: token
      });
  
      if(jsonData.statusCode==200){
        const willBeListed  = jsonData.result;
        dispatch(professorTotalAction(jsonData.resultCount));
        dispatch(professorAction(willBeListed));
       
      }else{
        dispatch(professorTotalAction(0));
      }
    }catch{
      throw "error";
    } 
  };
  export default handleActions(
      {
          //office
          [CONTACT_OFFICE]: (state, { payload }) =>
            produce(state, draft => {
              payload.map(item => {
                draft.contactOffice.push(item);
            });
          }),
          [CONTACT_OFFICE_INIT]: (state,{payload})=>
            produce(state,draft => {
              draft.contactOffice = [];
          }),
          [CONTACT_OFFICE_TOTAL]: (state,{payload})=>
            produce(state,draft => {
              draft.office_total = payload;
          }),
          [CONTACT_OFFICE_TOTAL_INIT]: (state,{payload})=>
            produce(state,draft => {
              draft.office_total = 0;
          }),
          //professor
          [CONTACT_PROFESSOR]: (state, { payload }) =>
            produce(state, draft => {
              payload.map(item => {
                draft.contactProfessor.push(item);
            });
          }),
          [CONTACT_PROFESSOR_INIT]: (state,{payload})=>
            produce(state,draft => {
              draft.contactProfessor = [];
          }),
          [CONTACT_PROFESSOR_TOTAL]: (state,{payload})=>
            produce(state,draft => {
              draft.professor_total = payload;
          }),
          [CONTACT_PROFESSOR_TOTAL_INIT]: (state,{payload})=>
            produce(state,draft => {
              draft.professor_total = 0;
          }),
          //favoredList
          [CONTACT_FAVORED]: (state,{payload})=>
            produce(state,draft => {
              draft.contactFavored = payload;
          }),
          //searchedList
          [SEARCHED_OFFICE]: (state, { payload }) =>
            produce(state, draft => {
              payload.map(item => {
                draft.searchedOffice.push(item);
            });
          }),
          [SEARCHED_PROFESSOR]: (state, { payload }) =>
            produce(state, draft => {
              payload.map(item => {
                draft.searchedProfessor.push(item);
            });
          }),
          [SEARCHED_OFFICE_TOTAL]: (state,{payload})=>
            produce(state,draft => {
              draft.s_office_total = payload;
          }),
          [SEARCHED_PROFESSOR_TOTAL]: (state,{payload})=>
            produce(state,draft => {
              draft.s_professor_total = payload;
          }),
          [SEARCHED_OFFICE_INIT]: (state,{payload})=>
            produce(state, draft => {
              draft.searchedOffice = [];
          }),
          [SEARCHED_PROFESSOR_INIT]: (state,{payload})=>
            produce(state, draft => {
              draft.searchedProfessor = [];
          }),
          [SEARCHINGTEXT]: (state,{payload})=>
            produce(state,draft => {
              draft.searchingText = payload;
          }),
      },
      initState
  );

