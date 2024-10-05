export const patterns = [{
  service: 'amazon-echo',
  value: /https?:\/\/(www\.)?amazon\.(com|in)\/.+$/i,
  message: "Invalid Amazon Echo installation link."
}, {
  service: 'android',
  value: /https?:\/\/play\.google\.com\/.+$/i,
  message: "Invalid Android installation link."
}, {
  service: 'email',
  value: /^(mailto:([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  message: "Invalid email link. Please use the following format: mailto:something@example.com"
}, {
  service: 'google-assistant',
  value: /https?:\/\/assistant\.google\.com\/.+$/i,
  message: "Invalid Google Assistant installation link."
},{
  service: 'kik',
  value: /https?:\/\/bots\.kik\.com\/.+$/i,
  message: "Invalid Kik installation link."
},{
  service: 'line',
  value: /https?:\/\/(www\.)?line\.me\/.+$/i,
  message: "Invalid LINE installation link."
},{
  service: 'microsoft-teams',
  value: /https?:\/\/((appsource|teams)\.)?microsoft\.com\/.+$/i,
  message: "Invalid Microsoft installation link."
},{
  service: 'skype',
  value: /https?:\/\/((join|www)\.)?skype\.com\/.+$/i,
  message: "Invalid Skype installation link."
},{
  service: 'imessage',
  value: /https?:\/\/((itunes|www)\.)?apple\.com\/.+$/i,
  message: "Invalid iMessage installation link."
},{
  service: 'whats-app',
  value: /https?:\/\/((api|www|web)\.)?whatsapp\.com\/.+$/i,
  message: "Invalid Whats App installation link."
},{
  service: 'imessage',
  value: /https?:\/\/((itunes|www)\.)?apple\.com\/.+$/i,
  message: "Invalid iMessage installation link."
},{
  service: 'viber',
  value: /https?:\/\/((chats|www)\.)?viber\.com\/.+$/i,
  message: "Invalid Viber installation link."
},{
  service: 'messenger',
  value: /https?:\/\/(www\.)?((me|fb)\.me|(messenger|facebook)\.com)\/.+$/i,
  message: "Invalid Facebook Messenger installation link."
},{
  service: 'telegram',
  value: /https?:\/\/(www\.)?(t\.me|telegram\.org)\/.+$/i,
  message: "Invalid Telegram installation link."
},{
  service: 'twitter',
  value: /https?:\/\/(www\.)?(t\.co|twitter\.com)\/.+$/i,
  message: "Invalid Twitter installation link."
},{
  service: 'webex',
  value: /https?:\/\/((apphub|www)\.)?webex\.com\/.+$/i,
  message: "Invalid WEBEX installation link."
}];
