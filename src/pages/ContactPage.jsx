import React, { useState } from "react";
import "./ContactPage.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import firestore from "./firebaseConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserData } from "../data/UserData";
import { FaLinkedinIn } from "react-icons/fa";
import Mani1 from "../Assets/images/17kassets/mani1.png";
import FixedImage from "../Assets/images/17kassets/kitchen5.png";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";

export default function ContactPage() {
  const socialMedia = UserData.socialMedia;

  const socialMediaIcons = {
    AiFillGithub: AiFillGithub,
    FaLinkedinIn: FaLinkedinIn,
    AiOutlineTwitter: AiOutlineTwitter,
    AiFillInstagram: AiFillInstagram,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(false);
  const [mobileApp, setMobileApp] = useState(false);
  const [graphicDesign, setGraphicDesign] = useState(false);
  const [threeD, setThreeD] = useState(false);
  const [uiux, setUiux] = useState(false);
  const [logo, setLogo] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "website":
        setWebsite(checked);
        break;
      case "mobileApp":
        setMobileApp(checked);
        break;
      case "graphicDesign":
        setGraphicDesign(checked);
        break;
      case "threeD":
        setThreeD(checked);
        break;
      case "uiux":
        setUiux(checked);
        break;
      case "logo":
        setLogo(checked);
        break;
      default:
        break;
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addFormDataToFirestore({
        name,
        email,
        note,
        website,
        mobileApp,
        graphicDesign,
        threeD,
        uiux,
        logo,
      });
      setFormStatus("success");
      // Reset form fields
      setName("");
      setEmail("");
      setNote("");
      setWebsite(false);
      setMobileApp(false);
      setGraphicDesign(false);
      setThreeD(false);
      setUiux(false);
      setLogo(false);
    } catch (error) {
      console.error("Error submitting form data to Firestore:", error);
      setFormStatus("error");
    }
  };

  const addFormDataToFirestore = async (formData) => {
    // Add form data to Firestore under "PortfolioForm" collection
    await addDoc(collection(firestore, "PortfolioForm"), {
      ...formData,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="ContactDiv">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="ml-[2%]  gap-2  text-gray-100 hover:text-gray-900 lg:flex lg:items-center "
      >
        <FaArrowLeft />
        <span
          className="cursor-pointer text-gray-100"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </span>
      </div>
      <div
        style={{
          top: 0,
          bottom: 0,
          backgroundImage: `url(${Mani1})`,
          backgroundColor: "#00000055",
          backgroundPositionY: "center",
          backgroundBlendMode: "overlay",
          paddingTop: "20px",
          paddingBottom: "20px",
          borderBottom: "solid 2px #414042",
          borderTop: "solid 2px #414042",
        }}
      >
        <div className="ContactDiv2">
          <h2> Don't hesitate to reach out!</h2>
          <div className="ContactEmpty" />
        </div>
      </div>

      <div className="ContactContentDiv">
        <div className="ContactContent">
          <form onSubmit={handleSubmit} className="ContactContentForm">
            <div>
              <p>Name</p>
              <input
                className="inputName"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <br />
            <div>
              <p>Email</p>
              <input
                className="inputEmail"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <br />
            <div>
              <p>Tell us about your project:</p>
              <textarea
                className="inputNote"
                value={note}
                onChange={handleNoteChange}
              />
            </div>
            <br />
            <div className="helpP">
              <p>What area do you need our help with?</p>
            </div>
            <div className="checkboxDiv">
              <div>
                <div>Website</div>
                <input
                  type="checkbox"
                  name="website"
                  checked={website}
                  onChange={handleCheckboxChange}
                />
              </div>

              <div>
                <div>MobileApp</div>
                <input
                  type="checkbox"
                  name="mobileApp"
                  checked={mobileApp}
                  onChange={handleCheckboxChange}
                />
              </div>

              <div>
                <div>GraphicDesign</div>
                <input
                  type="checkbox"
                  name="graphicDesign"
                  checked={graphicDesign}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <div>3D</div>
                <input
                  type="checkbox"
                  name="threeD"
                  checked={threeD}
                  onChange={handleCheckboxChange}
                />
              </div>

              <div>
                <div>Uiux</div>
                <input
                  type="checkbox"
                  name="uiux"
                  checked={uiux}
                  onChange={handleCheckboxChange}
                />
              </div>

              <div>
                <div>Logo</div>
                <input
                  type="checkbox"
                  name="logo"
                  checked={logo}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
            <br />
            {formStatus === "success" && (
              <div style={{ color: "green" }}>Form submitted successfully!</div>
            )}
            {formStatus === "error" && (
              <div style={{ color: "red" }}>Error submitting form data!</div>
            )}
            <button className="contactSubmitButton" type="submit">
              Submit
            </button>
            <div className="mt-4 flex gap-8 lg:gap-0">
              {socialMedia.map((data, index) => {
                const IconComponent = socialMediaIcons[data.icon];
                return (
                  <button
                    className="flex items-center justify-center rounded-lg border-none bg-transparent hover:bg-white hover:bg-opacity-20 hover:opacity-80 hover:shadow-lg lg:h-12 lg:w-24"
                    key={index}
                    onClick={() => window.open(data.url)}
                  >
                    <IconComponent className="icon text-gray-100" />
                  </button>
                );
              })}
            </div>
          </form>
        </div>
        <div className=" ContactImageDiv flex items-center justify-center ">
          <h2 className=" flex text-center text-[80px] opacity-70">
            Write me <br /> a message
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
