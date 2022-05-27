import styled from "styled-components";

export const Layout = styled.div`
  /* border: 2px solid #000000; */
  border-radius: 5px;
  margin: 20px;
  padding: 10px;
  height: 80vh;
  display: flex;
  justify-content: center;
`;

export const LeftLayout = styled.div`
  border: 2px solid #cccccc;
  border-radius: 5px;
  width: 30vw;
  background-color: white;
`;

export const RightLayout = styled.div`
  border: 2px solid #cccccc;
  border-radius: 5px;
  width: 50vw;
  background-color: white;
`;

export const ChatContent = styled.div`
  height: 70vh;
  background-color: white;
  /* justify-content: center; */
  text-align: center;
`;

export const ChatWrapper = styled.div`
  height: 7.5vh;
  background-color: white;
  display: flex;
  border-radius: 5px;
`;

export const ChatInput = styled.input`
  width: 40vw;
  background-color: rgb(201, 201, 201);
  border: 2px solid #cccccc;
  border-radius: 3px;
`;

export const ChatButton = styled.button`
  width: 10vw;
  background-color: #6c8bf1;
  border: 2px solid #cccccc;
  border-radius: 3px;
  border-bottom-left-radius: 0px;
`;

export const ExampleImg = styled.img`
  border-radius: 5px;
`;
