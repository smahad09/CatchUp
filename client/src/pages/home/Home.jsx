import "./home.css";
import Navbar from "../../components/navbar/Navbar";
// import Conversations from "../../components/conversations/Conversations";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Messages from "../../components/messages/Messages"
import axios from "axios";
import Conversations from "../../components/coversations/Conversations";
import { io } from "socket.io-client";

export default function Home() {
  const [conversations, setConversations] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [newMessage, setNewMessage] = useState("");

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef(); 

  const { user } = useContext(AuthContext);

  const scrollRef = useRef();


  useEffect(()=> {
    socket.current = io('ws://localhost:8900');
    socket.current.on("getMessage", data=> {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(()=> {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
    setMessages((prev)=> [...prev, arrivalMessage] );
  }, [arrivalMessage, currentChat]);


  useEffect(()=> {
    socket.current.emit("adduser",user._id);
    socket.current.on("getusers", users=> {
      setOnlineUsers(user.followings.filter((f)=> users.some((u)=> u.userId ===f)));
    })
  },[user]);


  useEffect(() => {
    const getConversations = async () => {
      try {
        console.log(user);
        const res = await axios.get("http://localhost:3001/conversation/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);


  useEffect(()=> {
      const getMessages = async()=> {
        try {
            const response = await axios.get("http://localhost:3001/message/"+currentChat?._id);
            setMessages(response.data);
        } catch(err) {console.log(err)}
      };
      getMessages();
  }, [currentChat])

  const handleSend = async (e)=> {
      e.preventDefault();
      const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id
      };
      
      const receiverId = currentChat.members.find((m)=> m !== user._id);

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage
      });

      try {
        const response = await axios.post('http://localhost:3001/message', message);
        setMessages([...messages,response.data]);
        setNewMessage("")
      } catch(err) {console.log(err)}
  }

  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  },[messages])

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={user} key={c._id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                    {messages.map(m=> (
                        <div ref={scrollRef}>
                            <Messages message={m} own={m.sender === user._id} />
                        </div>
                    ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea className="chatMessageInput" placeholder="write something..."
                    onChange={(e)=> setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSend}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentUser={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  );
}