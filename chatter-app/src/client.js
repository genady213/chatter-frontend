import Pusher from 'pusher-js';

const PusherAppKey = "abe185cdca80fe92b3cb";


/*export const pusher = new Pusher(PusherAppKey, {
    cluster: "us2",
    encrypted: true,
    forceTLS: true,
});

pusher.connection.bind("connected", () => {
    console.log("Websocket Connected");
});

pusher.connection.bind("unavailable", () => {
    console.log("Websocket Disconnected");
});
export const PusherClient = (userid, convoid) => {
const channel = pusher.subscribe(userid);
createConversationBind(convoid);

channel.bind("user-event", function (data) {
    switch (data.eventType) {
        case "create-conversation":
            createConversationBind(data.conversationId);
            break;
    }
    console.log(data);
});

function createConversationBind(channelID) {
    const conversationChannel = pusher.subscribe(channelID);
    conversationChannel.bind("message", function (data) {
        console.log("New Message Recieved: " + JSON.stringify(data));
    });
    conversationChannel.bind("status", function (data) {
        console.log("New Status Received: " + JSON.stringify(data));
    });
};};*/

//export default PusherClient(userid, convoid);