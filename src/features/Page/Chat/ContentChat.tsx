import { Avatar } from '@mui/material';
import React from 'react';
import { getID } from 'utils/utils';
// import { backgroundColorThemeChat } from 'constant';
import { zoomState, dataChat, user } from '../../../models/zoom';
import ImageShow from 'components/Image';

interface Props {
  id: string;
  onDataMes: zoomState;
}

const ContentChat: React.FC<Props> = ({ onDataMes, id }: Props) => {
  return (
    <React.Fragment>
      <div className=" m-4">
        {onDataMes.data?.map((item: dataChat, index: number) => {
          if (item.userChat === id) {
            return (
              <MyChat
                key={index}
                data={item}
                avatar={
                  (
                    ((onDataMes.userId1 as user)._id === getID()
                      ? onDataMes.userId1
                      : onDataMes.userId2) as user
                  ).avatar
                }
              />
            );
          } else {
            return (
              <FriendChat
                key={index}
                data={item}
                avatar={
                  (
                    ((onDataMes.userId1 as user)._id !== getID()
                      ? onDataMes.userId1
                      : onDataMes.userId2) as user
                  ).avatar
                }
              />
            );
          }
        })}
      </div>
    </React.Fragment>
  );
};

interface ChatProps {
  data: dataChat;
  avatar: string;
}

const MyChat: React.FC<ChatProps> = ({ data, avatar }: ChatProps) => (
  <React.Fragment>
    <div className={`flex justify-end my-2`}>
      <div>
        {data.photo && (
          <div>
            <ImageShow className="max-h-32 h-32 w-32 max-w-32 " src={data.photo} />
          </div>
        )}
        {data.message && (
          <div
            className={`pr-3 w-auto max-w-[80%] px-2 rounded bg-[#0183ff] text-white text-left flex items-center`}
          >
            <p className="py-2">{data.message}</p>
          </div>
        )}
      </div>

      <Avatar alt="đây là ảnh đại diện" sx={{ width: 30, height: 30, zIndex: 1 }} src={avatar} />
    </div>
  </React.Fragment>
);

const FriendChat: React.FC<ChatProps> = ({ data, avatar }: ChatProps) => {
  return (
    <React.Fragment>
      <div className={`flex justify-start my-2`}>
        <Avatar alt="đây là ảnh đại diện" sx={{ width: 30, height: 30, zIndex: 1 }} src={avatar} />

        <div>
          {data.photo && (
            <div>
              <ImageShow className="max-h-32 h-32 w-32 max-w-32 " src={data.photo} />
            </div>
          )}
          {data.message && (
            <div
              className={`pl-3 w-auto max-w-[80%] px-2 rounded bg-[#0183ff] text-white text-left flex items-center`}
            >
              <p className="py-2">{data.message}</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ContentChat);
