import styled from "@emotion/styled";
import { colors } from "@/shared/lib";

export const ModalContentWrapper = styled.div`
  position: absolute;
  padding: 20px;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 750px;
  border-radius: 10px;
  min-height: 75vh;
  background-color: ${colors.white.default};
`;
export const ModalFormWrapper = styled.form`
  display: flex;
  padding: 20px;
  flex-direction: column;
  height: 75vh;
  justify-content: space-between;
`;
