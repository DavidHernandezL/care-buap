import React, { useState } from 'react';
import ReturnHeader from '../components/ReturnHeader/ReturnHeader';
import styled from 'styled-components';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }
    setMessages([...messages, { message, user: 'user' }]);
    setMessage('');
  };

  return (
    <>
      <ReturnHeader title={'Chat'} />
      <Container>
        <ChatContainer>
          {messages.map((message, index) => {
            if (message.user === 'user') {
              return <MessageUser key={index}>{message.message}</MessageUser>;
            } else {
              return <MessageBot key={index}>{message.message}</MessageBot>;
            }
          })}
        </ChatContainer>
        <form onSubmit={handleSendMessage}>
          <InputMessage
            type='text'
            placeholder='Escribe un mensaje'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton type='submit'>
            <i className='bx bx-send'></i>
          </SendButton>
        </form>
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 92vh;
  background-image: url('/assets/chat.png');

  form {
    width: 60%;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 1.5rem;
  }
`;

const ChatContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  padding: 1rem;
  width: 60%;
  border-radius: 1rem;
  position: relative;
`;

const InputMessage = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SendButton = styled.button`
  width: 60px;
  height: 60px;
  padding: 1rem;
  border-radius: 50%;
  border: none;
  outline: none;
  margin-bottom: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #00b5e2;

  i {
    color: #fff;
    font-size: 1.5rem;
    line-height: 1rem;
    display: flex;
    justify-content: center;
  }
`;

const MessageUser = styled.p`
  padding: 1rem;
  border-radius: 2rem;
  background-color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  align-self: flex-end;
`;

const MessageBot = styled.p`
  padding: 1rem;
  border-radius: 2rem;
  background-color: #00b5e2;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  align-self: flex-start;
`;
export default Chat;