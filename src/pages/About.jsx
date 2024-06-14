import React from "react";
import { UserData } from "../data/UserData";
import Marquee from "react-fast-marquee";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";

import ThreeScene2 from "../components/threejs2";

function About() {
  const { about } = UserData;
  return (
    <div className="relative mb-24 h-auto w-full sm:mb-0 md:h-screen lg:mb-[200px]">
      <div
        className="mx-auto flex w-[90%] flex-col justify-between rounded-lg bg-transparent p-4 shadow-lg md:flex-row md:items-center"
        style={{ flexDirection: "column" }}
      >
        <div className="flex w-full flex-col md:w-[90%]">
          <p
            className="pb-2 text-2xl font-semibold tracking-wide text-gray-100"
            style={{ textAlign: "center" }}
          >
            About Me
          </p>
          <p className="font-poppins text-sm text-gray-500">{about}</p>
          <div className="mt-8">
            <Marquee
              gradient={false}
              speed={150}
              pauseOnClick={true}
              delay={0}
              play={true}
              direction="right"
            >
              {skillsData.map((skill, id) => (
                <div
                  className="ml-4 flex h-24 w-24 flex-col items-center justify-center gap-2"
                  key={id}
                >
                  <img
                    className=" h-[50px] w-[60px] bg-contain bg-no-repeat"
                    src={skillsImage(skill)}
                    alt={skill}
                  />
                  <p className="text-gray-100">{skill}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
        <div className=" flex h-[500px] w-full items-center justify-center  overflow-hidden  ">
          <ThreeScene2 />
        </div>
      </div>
    </div>
  );
}

export default About;
