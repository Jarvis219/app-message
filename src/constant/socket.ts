export const SOCKET_ON = 'app-message';

export enum zoomSocket {
  chatFriend = 'chat-friend',
  chatGround = 'chat-ground',
}

export enum zoomSocketEvent {
  evenChatFriend = 'event-chat-friend',
  eventChatGround = 'event-chat-ground',
  eventGetAllMyChat = 'event-get-all-my-chat',
}

export enum zoomSocketEventTypeActive {
  updateActive = 'update-active',
  viewActive = 'view-active',
}
