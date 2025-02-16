import ConversationArea from "./ConversationArea";
import Footer from "./Footer";

export default function MainComponent() {
    return (
      <div className="w-[1117.86px] h-[748.75px] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
        <ConversationArea/>
        <Footer/>
      </div>
    );
  }