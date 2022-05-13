import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { Layout, LeftLayout, RightLayout } from "./DirectMessage.style";

export default function DirectMessage({ portfolioOwnerId, isEditable }) {
  return (
    <Layout>
      <LeftLayout>left</LeftLayout>
      <RightLayout>right</RightLayout>
    </Layout>
  );
}
