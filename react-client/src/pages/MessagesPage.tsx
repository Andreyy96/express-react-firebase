import {MessageForm} from "../components/Messages-Container/MessagesForm/MessageForm";
import {Messages} from "../components/Messages-Container/Messages/Messages";



const MessagesPage = () => {

    return (
        <div>
            <Messages/>
            <MessageForm/>
        </div>
    );
};

export {MessagesPage}