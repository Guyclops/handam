import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { BaseView, Title, HCenterView } from "../../components/common/View";
import { Step, SelectView } from "../../components/signup/View";
import { SignUpNext } from "../../components/signup/Button";
import { NBGBText } from "../../components/common/Text";
import colors from "../../configs/colors";
import { WheelPicker } from "../../components/signup/Modal";
import { SignUpActions } from "../../store/actionCreator";
import { showMessage } from "../../utils/util";

const SignUp3 = ({
  userId,
  userPw,
  userNickName,
  major,
  doubleMajor,
  minor,
  connectedMajor,
  admissionYear,
  major_list,
  track_list = [],
  admission_list = [],
  navigation
}) => {
  const [majorModal, setMajorModal] = useState(false);
  const [doubleModal, setDoubleModal] = useState(false);
  const [minorModal, setMinorModal] = useState(false);
  const [connectedModal, setConnectedModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);

  const openMajorModal = useCallback(() => {
    setMajorModal(true);
  }, []);
  const closeMajorModal = useCallback(() => {
    setMajorModal(false);
  }, []);

  const openDoubleModal = useCallback(() => {
    setDoubleModal(true);
  }, []);
  const closeDoubleModal = useCallback(() => {
    setDoubleModal(false);
  }, []);

  const openMinorModal = useCallback(() => {
    setMinorModal(true);
  }, []);
  const closeMinorModal = useCallback(() => {
    setMinorModal(false);
  }, []);

  const openConnectedModal = useCallback(() => {
    setConnectedModal(true);
  }, []);
  const closeConnectedModal = useCallback(() => {
    setConnectedModal(false);
  }, []);

  const openYearModal = useCallback(() => {
    setYearModal(true);
  }, []);
  const closeYearModal = useCallback(() => {
    setYearModal(false);
  }, []);

  const setMajor = useCallback(value => {
    SignUpActions.majorAction(value);
  }, []);
  const setDoubleMajor = useCallback(value => {
    SignUpActions.doubleMajorAction(value);
  }, []);
  const setMinor = useCallback(value => {
    SignUpActions.minorAction(value);
  }, []);
  const setConnectedMajor = useCallback(value => {
    SignUpActions.connectedMajorAction(value);
  }, []);
  const setAdmissionYear = useCallback(value => {
    SignUpActions.admissionYearAction(value);
  }, []);

  const navigateReset = useCallback(async () => {
    await navigation.popToTop();
    SignUpActions.init();
  }, []);

  const signUp = useCallback(async () => {
    let userData = {
      userId: userId,
      userPw: userPw,
      userNickName: userNickName,
      major: major,
      minor: minor === "????????????" ? null : minor,
      doubleMajor: doubleMajor === "????????????" ? null : doubleMajor,
      connectedMajor: connectedMajor === "????????????" ? null : connectedMajor,
      admissionYear: admissionYear
    };
    let result = await SignUpActions.postSignUp(userData);
    if (result) {
      await navigateReset();
      showMessage("???????????? ??????!");
    }
  }, [
    userId,
    userPw,
    userNickName,
    major,
    doubleMajor,
    minor,
    connectedMajor,
    admissionYear
  ]);

  return (
    <HCenterView>
      <WheelPicker
        visible={majorModal}
        data={major_list}
        value={major}
        closeHandler={closeMajorModal}
        footerHandler={setMajor}
      />
      <WheelPicker
        visible={doubleModal}
        data={track_list}
        value={doubleMajor}
        closeHandler={closeDoubleModal}
        footerHandler={setDoubleMajor}
      />
      <WheelPicker
        visible={minorModal}
        data={track_list}
        value={minor}
        closeHandler={closeMinorModal}
        footerHandler={setMinor}
      />
      <WheelPicker
        visible={connectedModal}
        data={track_list}
        value={connectedMajor}
        closeHandler={closeConnectedModal}
        footerHandler={setConnectedMajor}
      />
      <WheelPicker
        visible={yearModal}
        data={admission_list}
        value={admissionYear}
        closeHandler={closeYearModal}
        footerHandler={setAdmissionYear}
      />

      <Title title="????????????" rightHandler={navigateReset} />
      <Step number={3} />
      <HCenterView>
        <SelectView
          subject={"??????(1??????)-??????"}
          value={major}
          onPress={openMajorModal}
        />
        <SelectView
          subject={"????????????(2??????)"}
          value={doubleMajor}
          onPress={openDoubleModal}
        />
        <SelectView subject={"?????????"} value={minor} onPress={openMinorModal} />
        <SelectView
          subject={"????????????"}
          value={connectedMajor}
          onPress={openConnectedModal}
        />
        <SelectView
          subject={"????????????-??????"}
          value={admissionYear}
          onPress={openYearModal}
        />
      </HCenterView>
      <SignUpNext
        disabled={major === null || admissionYear === null}
        onPress={signUp}
      >
        <NBGBText color={colors.white}>????????????</NBGBText>
      </SignUpNext>
    </HCenterView>
  );
};

export default connect(({ common, signup }) => ({
  major_list: common.major_list,
  track_list: common.track_list,
  admission_list: common.admission_list,
  userId: signup.userId,
  userPw: signup.userPw,
  userNickName: signup.userNickName,
  major: signup.major,
  doubleMajor: signup.doubleMajor,
  minor: signup.minor,
  connectedMajor: signup.connectedMajor,
  admissionYear: signup.admissionYear
}))(SignUp3);
