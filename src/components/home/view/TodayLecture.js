import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  widthPercentageToDP,
  scheduleContent,
  scheduleTime
} from "../../../utils/util";
import { ButtonStyle } from "../../common/Button";
import { Image, View } from "react-native";
import { HCenterView, CenterView } from "../../common/View";
import { NBGBText, NBGText } from "../../common/Text";
import colors from "../../../configs/colors";
import { connect } from "react-redux";

const CertificateButton = styled(ButtonStyle)`
width: ${widthPercentageToDP(128)}
height: ${widthPercentageToDP(36)}
margin-bottom: ${widthPercentageToDP(97)}
background-color: #24a0fa
`;

const ScheduleView = styled.View`
  margin-top: ${widthPercentageToDP(12)};
`;

const ScheduleItem = styled.View`
  width: ${widthPercentageToDP(310)}
  height: ${widthPercentageToDP(63)}
  padding-left: ${widthPercentageToDP(20)}
  padding-right: ${widthPercentageToDP(17.6)}
  margin-bottom: ${widthPercentageToDP(10)}
  border-radius: ${widthPercentageToDP(10)}
  background-color: #f8f8f8
  flex-direction: row
  justify-content: space-between
  align-items: center
`;

const ScheduleTimeView = styled.View`
  align-items: center;
`;

const ScheduleTimeText = styled(NBGBText)`
  font-size: ${widthPercentageToDP(13)}
  color: #646464
`;

const NoScheduleView = styled.View`
  padding-top: ${widthPercentageToDP(69.5)}
  padding-bottom: ${widthPercentageToDP(69.5)}
  justify-content: center
  align-items: center
`;

const TodayLecture = ({
  hansunginfo = null,
  schedule_loading,
  goCertificate,
  day,
  loadSchedule,
  Loading
}) => {
  if (hansunginfo === null) {
    return (
      <HCenterView>
        <Image
          style={{
            width: widthPercentageToDP(55),
            height: widthPercentageToDP(55),
            marginTop: widthPercentageToDP(47.5),
            marginBottom: widthPercentageToDP(8)
          }}
          source={require("HandamProject/assets/image/home/certificationimage.png")}
        />
        <NBGBText fontSize={15} color={"#646464"} marginBottom={7.5}>
          ?????????????????? ??????????????????!
        </NBGBText>
        <NBGText fontSize={13} color={"#9e9e9e"} marginBottom={21.5}>
          ????????? ?????? ???????????? ????????? ??? ????????????.
        </NBGText>
        <CertificateButton onPress={goCertificate}>
          <NBGBText color={colors.white}>???????????? ??????!</NBGBText>
        </CertificateButton>
      </HCenterView>
    );
  } else if (schedule_loading) {
    return (
      <HCenterView>
        <View
          style={{
            width: widthPercentageToDP(82),
            height: widthPercentageToDP(82),
            marginTop: widthPercentageToDP(20.5)
          }}
        >
          {Loading}
        </View>
        <NBGText
          fontSize={12}
          style={{
            textAlign: "center",
            marginBottom: widthPercentageToDP(97),
            lineHeight: widthPercentageToDP(20)
          }}
          color={"#767676"}
        >
          {"???????????? ???????????? ????????????.\n????????? ??????????????????."}
        </NBGText>
      </HCenterView>
    );
  } else if (hansunginfo !== null && hansunginfo.status === "UNVERIFIED") {
    return (
      <HCenterView style={{ paddingTop: widthPercentageToDP(69.5) }}>
        <NBGBText fontSize={15} color={"#646464"}>
          ????????????????????? ??????????????????.
        </NBGBText>
      </HCenterView>
    );
  } else if (hansunginfo !== null && hansunginfo.status === "FAIL") {
    return (
      <HCenterView style={{ paddingTop: widthPercentageToDP(69.5) }}>
        <NBGBText fontSize={15} color={"#646464"} marginBottom={7.5}>
          ????????????????????? ????????? ??????????????????.
        </NBGBText>
        <NBGBText fontSize={15} color={"#646464"} marginBottom={7.5}>
          ???????????? ???????????? ?????? ??????????????????.
        </NBGBText>
      </HCenterView>
    );
  } else if (
    hansunginfo !== null &&
    hansunginfo.schedule.monday === undefined
  ) {
    return (
      <HCenterView>
        <Image
          style={{
            width: widthPercentageToDP(71),
            height: widthPercentageToDP(67),
            marginTop: widthPercentageToDP(35.5),
            marginBottom: widthPercentageToDP(8)
          }}
          source={require("HandamProject/assets/image/home/scheduleimage.png")}
        />
        <NBGBText fontSize={15} color={"#646464"} marginBottom={7.5}>
          ???????????? ??????????????????!
        </NBGBText>
        <NBGText fontSize={13} color={"#9e9e9e"} marginBottom={21.5}>
          ??????????????? ????????? ????????? ??? ????????????.
        </NBGText>
        <CertificateButton onPress={loadSchedule}>
          <NBGBText color={colors.white}>????????????</NBGBText>
        </CertificateButton>
      </HCenterView>
    );
  } else {
    return (
      <ScheduleView>
        {hansunginfo.schedule[day] === undefined ||
        hansunginfo.schedule[day].length === 0 ? (
          <NoScheduleView>
            <NBGText fontSize={13} color={"#767676"}>
              ????????? ????????? ????????????!
            </NBGText>
          </NoScheduleView>
        ) : (
          hansunginfo.schedule[day].map(item => {
            const content = scheduleContent(item.content);
            const time = scheduleTime(item.time);
            return (
              <ScheduleItem>
                <View style={{ width: widthPercentageToDP(158.4) }}>
                  <NBGBText
                    fontSize={15}
                    color={"#363636"}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {content[0]}
                  </NBGBText>
                </View>
                <ScheduleTimeView>
                  <ScheduleTimeText numberOfLines={1} marginBottom={6.5}>
                    {content[2]}
                  </ScheduleTimeText>
                  <ScheduleTimeText numberOfLines={1}>
                    {`${time[0]}:${time[1]}`} - {`${time[2]}:${time[3]}`}
                  </ScheduleTimeText>
                </ScheduleTimeView>
              </ScheduleItem>
            );
          })
        )}
      </ScheduleView>
    );
  }
};

export default connect(({ hansung }) => ({
  hansunginfo: hansung.hansunginfo,
  schedule_loading: hansung.schedule_loading
}))(TodayLecture);
