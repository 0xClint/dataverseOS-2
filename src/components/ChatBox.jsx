import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import Loader from "./Loader";

const ChatBox = ({ chatMenu, setChatMenu }) => {
  const [loader, setLoader] = useState(false);
  const [xmtp, setxmtp] = useState(true);
  const [message, setMessage] = useState("");
  const [activemessage, setactivemessages] = useState([]);

  return (
    <div className="absolute downMenu flex justify-end left-0 bottom-0 z-10 text-black">
      {loader && <Loader />}
      {xmtp ? (
        <div className="chat-container bg-white w-[500px] h-[90vh] flex rounded-lg ">
          <span
            className="absolute translate-x-[440px] translate-y-2 cursor-pointer"
            onClick={() => setChatMenu(false)}
          >
            {"<<"}
          </span>
          <div className="chatContent flex flex-col justify-end w-full  text-2xl">
            <div className="chats flex flex-col m-2 text-white gap-2 font-vt overflow-y-scroll h-full">
              {activemessage
                ? activemessage.map((item) => {
                    return (
                      <div
                        className="flex"
                        // style={{
                        //   justifyContent: `${
                        //     account == item?.senderAddress?.toLowerCase()
                        //       ? "end"
                        //       : "start"
                        //   }`,
                        // }}
                        key={item}
                      >
                        <div className="bg-[#5A5A8E] inline-block px-3 rounded-md">
                          {item}
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="inputContainer flex mb-2 h-10">
              <input
                type="text"
                className="border border-black w-full px-2 h-10 rounded-md text-base"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                // onClick={async () =>  sendData({ to: "*" , payload : "JSON.stringify(message)" , label : "Ankit" })}
                onClick={() => console.log("sending data")}
                className="btn bg-blue-600 text-white mx-1 hover:scale-105"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-container w-[650px] h-[90vh]  bg-[#4a4a4a41] flex justify-center items-center">
          <button className="btn bg-blue-600 text-white mx-auto hover:scale-105">
            Connect XMTP
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
