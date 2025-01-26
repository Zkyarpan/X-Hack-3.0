import React, { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const apiKey = 'dz5f4d5kzrue';
const userId = 'calm-base-3';
const userName = 'calm';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2FsbS1iYXNlLTMiLCJleHAiOjE3Mzc4NDcyNzB9.J1A0Sf2vCFr_ExY_Pqeu7aAQd8NKr25tzAc9CzdX140';

const App = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: { 
      id: userId,
      name: userName,
      image: 'https://getstream.io/random_svg/?name=' + userName
    }
  });

  useEffect(() => {
    const initChannel = async () => {
      if (!client) return;
      
      try {
        const channel = client.channel('messaging', 'general', {
          name: 'General Chat',
          members: [userId]
        });
        
        await channel.watch();
      } catch (error) {
        console.error('Error creating channel:', error);
      }
    };

    initChannel();
  }, [client]);

  if (!client) return <div>Loading chat...</div>;

  return (
    <Chat client={client} theme="messaging light">
      <div className="flex h-screen">
        <div className="w-1/4 border-r">
          <ChannelList 
            filters={{
              members: { $in: [userId] },
              type: 'messaging'
            }}
          />
        </div>
        <div className="w-3/4">
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
};

export default App;