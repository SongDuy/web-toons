import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getAllComic } from "../../../common/store/comic";
import { getAllVideo } from "../../../common/store/Video";
import { auth } from "../../../common/themes/firebase";
import { getAccount } from "../../../common/store/Account";

const Loading = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const User = useSelector((state) => state.AuthJs.User);

  useEffect(() => {
    const get = async () => {
      try {
        setloading(false);
        if (User) {
          const account = await dispatch(getAccount(auth?.currentUser?.uid));

          const user = unwrapResult(account);
          if (user?.checkage) {
            const age = account?.payload?.birthday
              ? new Date(Date.now())?.getFullYear() -
                new Date(user.birthday)?.getFullYear()
              : 15;
            const comic = await dispatch(getAllComic(age));
            const video = await dispatch(getAllVideo(age));

            unwrapResult(comic);
            unwrapResult(video);
          } else {
            const comic = await dispatch(getAllComic());
            const video = await dispatch(getAllVideo());
            unwrapResult(comic);
            unwrapResult(video);
          }
        } else {
          const comic = await dispatch(getAllComic());
          const video = await dispatch(getAllVideo());
          unwrapResult(comic);
          unwrapResult(video);
        }
        setloading(true);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [dispatch, User]);
  return (
    <div>
      {loading ? (
        children
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Loading;
