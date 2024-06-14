import { UserData } from "../data/UserData";
import FixedImage from "../Assets/images/17kassets/kitchen5.png";
import { useNavigate } from "react-router-dom";

function Contact() {
  const { FooterLink } = UserData;
  const navigate = useNavigate();
  return (
    <div className="relative mb-40 flex w-full items-center justify-center  md:h-screen lg:mb-4">
      <div
        className="relative z-10 flex flex-col items-center justify-center  bg-opacity-30 bg-cover bg-fixed bg-center p-6"
        style={{
          backgroundImage: `url(${FixedImage})`,
          backgroundColor: "#00000055",
          backgroundBlendMode: "overlay",
        }}
      >
        <h2 className="pb-6 pt-12 text-center text-3xl tracking-wider text-gray-100 lg:text-5xl">
          Get In Touch
        </h2>
        <p className="font-poppins mx-auto px-2 pb-6 text-center text-sm tracking-wider text-gray-100 lg:w-[50%]">
          I'd love to connect and explore exciting opportunities with you!
          Whether you have interesting projects, creative ideas, or just want to
          chat, please don't hesitate to reach out. My inbox is open 24/7!
        </p>
        <button
          onClick={() => {
            navigate("/ContactPage");
          }}
          className="flex h-[50px] w-[200px] items-center justify-center border-2 border-white bg-transparent text-white hover:bg-gray-900 hover:bg-opacity-40"
        >
          Connect Now 🚀
        </button>
      </div>
    </div>
  );
}

export default Contact;
