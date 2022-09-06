import Styled from "styled-components/native";
import { widthPercentageToDP } from "../../utils/util.js";
import fonts from "../../configs/fonts";

//TextInput
export const TextSearch = Styled.TextInput`
  font-family: ${fonts.nanumBarunGothic};
  font-size: ${widthPercentageToDP(15)};
  color: black;
  margin-left : ${widthPercentageToDP(16)};
  margin-vertical : ${widthPercentageToDP(12)};
  width: ${widthPercentageToDP(280)};
  height: ${widthPercentageToDP(40)};
  
`;