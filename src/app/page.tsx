import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-auto w-full font-sans text-gray-800 antialiased  bg-gray-100">
      <div className="w-full h-2  z-10  headergradient"></div>
      {/* header section */}
      <div className="relative flex items-center justify-center md:justify-between px-8 py-4 md:mt-6 border-b-2 md:border-0 border-gray-300 mx-2">
        <div className="flex items-center">
          <Image
            src="/images/schemalogo.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <p className="text-lg text-black ps-3">Schema Designer</p>
        </div>
        <div className="flex items-center">
          <Link
            href="/login"
            className="hidden lg:block font-medium text-gray-500 hover:text-gray-900 ml-6 cursor-pointer"
          >
            Log in
          </Link>
          <Link href="/login">
            <Button
              variant="solid"
              className="ms-4 text-white bg-[#6366f1] w-[120px] shadow-md hover:shadow-lg"
              radius="sm"
            >
              Try Schema
            </Button>
          </Link>
        </div>
      </div>
      {/* Info header section  */}
      <section className="bg-gray-100 h-full pt-3 md:pt-8 relative pb-28">
        <div className="w-5/6 max-w-7xl mx-auto h-full pb-8">
          <div className="flex items-center justify-center text-center h-full mt-3 pb-8">
            <div className="mt-4 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6">
              <h1 className="text-[32px] tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                <span className="text-gray-900 opacity-90">Beautiful </span>
                <span className="text-transparent bg-clip-text textgradient">
                  database diagrams
                </span>
              </h1>
              <h2 className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:text-2xl md:max-w-3xl">
                Design, visualize and collaborate on entity relationship
                diagrams for your databases
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:mt-12 md:mb-4">
            <Button
              variant="solid"
              radius="sm"
              className="bg-white 
              leading-none text-indigo text-xt-base font-medium hover:text-indigo-500 h-12 px-8 rounded-lg 
              shadow-md text-black  w-[200px]  "
            >
              Learn more
            </Button>
            <Link href="/login">
              <Button
                variant="solid"
                radius="sm"
                className=" w-[200px] h-[48px] ms-4 text-white bg-[#6366f1] shadow-md"
                endContent={<i className="fa-solid fa-arrow-right-long"></i>}
              >
                Get Started
              </Button>
            </Link>
          </div>
          <div className="absolute w-5/6 max-w-3xl mt-4 inset-x-0 mx-auto bg-indigo-500 text-white rounded-lg shadow-lg overflow-hidden z-50">
            <Image
              src="/images/demoimage.png"
              alt="test"
              unoptimized
              className="!w-full !h-full"
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>
      <section className="mt-8 bg-skew skew-gradient skew-shadow">
        <div className="w-5/6 max-w-4xl mx-auto mt-8 mb-4 content">
          <div className="flex flex-col justify-center text-center -mx-6 -my-6">
            <p className="text-4xl sm:text-5xl font-medium leading-none !mb-4 mt-8 text-grey-800">
              <i className="fa-regular fa-heart text-pink-400"></i> Loved by
              Developers
            </p>
            <h2 className="text-lg sm:text-xl w-[90%] m-auto md:text-2xl text-gray-500 leading-normal mb-8">
              Database design tool for creating schema diagrams, built for the
              modern development workflow.
            </h2>
          </div>
          <div className="flex flex-col-reverse sm:flex-row flex-wrap pt-20">
            <div className="w-full sm:w-7/12">
              <h3 className="text-4xl font-medium leading-none mb-4 mt-4 text-grey-800">
                See the big picture
              </h3>
              <p className="text-xl leading-normal opacity-75 pt-4">
                Visualize your database schema and gain a birds-eye view of how
                different models fits together. Create a living document of your
                database schema that helps when architecting new features or
                onboarding new team members.
              </p>
              <Image
                alt="wave"
                className="mt-4"
                src="/images/bluewave.svg"
                width={60}
                height={20}
              ></Image>
            </div>
            <div className="w-full sm:w-5/12 px-8 text-center sm:px-0 sm:text-right flex justify-center sm:justify-end items-start">
              <Image
                src="/images/infosvg1.svg"
                className="!w-[89%] !h-[89%]"
                width={200}
                alt="awdadw"
                height={200}
              ></Image>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row flex-wrap pt-20">
            <div className="w-full sm:w-5/12 px-8 text-left sm:px-0 sm:text-left flex justify-start sm:justify-start items-start">
              <Image
                src="/images/infosvg2.svg"
                className="!w-[89%] !h-[89%]"
                width={200}
                alt="awdadw"
                height={200}
              ></Image>
            </div>
            <div className="w-full sm:w-7/12">
              <h3 className="text-4xl font-medium leading-none mb-4 mt-4 text-grey-800">
                Streamline your team's development workflow
              </h3>
              <p className="text-xl leading-normal opacity-75 pt-4">
                Schema Designer makes it easy for teams to collaborate on
                creating and maintaining schema diagrams. With a single source
                of truth, there's no need for manually syncing diagram files
                between different developers and offline tools anymore.
              </p>
              <Image
                alt="wave"
                className="mt-4"
                src="/images/bluewave.svg"
                width={60}
                height={20}
              ></Image>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row flex-wrap pt-20">
            <div className="w-full sm:w-7/12">
              <h3 className="text-4xl font-medium leading-none mb-4 mt-4 text-grey-800">
                Visually stunning
              </h3>
              <p className="text-xl leading-normal opacity-75 pt-4">
                We've sweated the details in designing DrawSQL's visual
                interface. With very little effort, you'll get beautiful
                entity-relationship diagrams that stand out. The database
                modeling process is just simple and intuitive, unlike any other
                database diagramming tool out there.
              </p>
              <Image
                alt="wave"
                className="mt-4"
                src="/images/bluewave.svg"
                width={60}
                height={20}
              ></Image>
            </div>
            <div className="w-full sm:w-5/12 px-8 text-center sm:px-0 sm:text-right flex justify-center sm:justify-end items-start">
              <Image
                src="/images/infosvg3.svg"
                className="!w-[89%] !h-[89%]"
                width={200}
                alt="awdadw"
                height={200}
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-indigo-800 text-white">
        <div className="relative z-10 container mx-auto sm:flex sm:items-center justify-center px-6 md:px-12">
          <div className="p-12 max-w-2xl">
            <blockquote className="text-lg italic text-gray-800">
              <div className="absolute pin-t pin-l -mt-3 -ml-2 text-indigo-500">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.264 19.552C15.264 23.2 17.664 25.12 20.352 25.12C23.328 25.12 26.112 22.624 26.112 19.456C26.112 16.864 24.288 15.136 22.08 15.136C21.888 15.136 21.408 15.136 21.312 15.136C22.368 12.064 25.824 8.8 29.376 7.072L26.4 4C20.448 6.976 15.264 13.504 15.264 19.552ZM0 19.552C0 23.2 2.304 25.12 5.088 25.12C8.064 25.12 10.848 22.624 10.848 19.456C10.848 16.864 8.928 15.136 6.72 15.136C6.528 15.136 6.048 15.136 5.952 15.136C7.008 12.064 10.56 8.8 14.016 7.072L11.136 4C5.184 6.976 0 13.504 0 19.552Z"
                    className="fill-current text-indigo-500"
                  ></path>
                </svg>
              </div>
              <div className="relative text-indigo-200">
                <p>
                  Been using DrawSQL lately by @dennisongkj . Really enjoy the
                  simplicity and the design of this product. For most of my
                  projects, this is all I need for my DB architecture. Great
                  work 👍
                </p>
              </div>
            </blockquote>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex">
                <div>
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-4"
                    src="/images/cr_square.jpg"
                    alt="Avatar of Christoph Rumpel"
                  />
                </div>
                <div>
                  <div className="uppercase font-semibold tracking-wider">
                    Christoph Rumpel
                  </div>
                  <div className="text-white">
                    Creator of{" "}
                    <a
                      href="https://laravelcoreadventures.com/"
                      target="_blank"
                      className="hover:underline !text-white"
                    >
                      Laravel Core Adventures
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <a
                  href="https://twitter.com/christophrumpel/status/1089826914091655168"
                  target="_blank"
                >
                  <svg
                    className="h-6 w-auto"
                    viewBox="0 0 30 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.4344 24C20.7552 24 26.9472 14.7658 26.9472 6.75787C26.9472 6.49559 26.9472 6.23449 26.9292 5.97457C28.1338 5.11673 29.1736 4.05457 30 2.83781C28.8767 3.32788 27.685 3.64927 26.4648 3.79125C27.7497 3.03391 28.7113 1.84276 29.1708 0.439464C27.9626 1.14533 26.6408 1.64279 25.2624 1.91037C23.3545 -0.0869983 20.3229 -0.575862 17.8675 0.717909C15.4121 2.01168 14.1435 4.76633 14.7732 7.43721C9.82427 7.19294 5.21337 4.89156 2.088 1.1058C0.454347 3.87471 1.28879 7.41696 3.9936 9.19521C3.01409 9.16663 2.05594 8.90648 1.2 8.43672C1.2 8.46153 1.2 8.48752 1.2 8.51351C1.2008 11.3981 3.2661 13.8827 6.138 14.4539C5.23184 14.6972 4.2811 14.7327 3.3588 14.5578C4.16514 17.0264 6.47589 18.7175 9.1092 18.7662C6.92968 20.4526 4.23727 21.3681 1.4652 21.3654C0.975484 21.3644 0.486245 21.3352 0 21.2779C2.81476 23.0563 6.0899 23.9997 9.4344 23.9953"
                      className="fill-current text-gray-400 hover:text-gray-500"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="border max-w-6xl mx-auto border-gray-100 my-10"></hr>
      <section className="w-5/6 max-w-6xl pt-8 mt-2 mb-8 text-center mx-auto">
        <h3 className="text-3xl text-gray-700 opacity-75 font-light leading-10 mb-8">
          Trusted and loved by developer teams, <br />
          from startups to enterprises
        </h3>
      </section>
      <section className="my-8 bg-gray-100">
        <div className="w-5/6 max-w-2xl ml-auto mr-auto mt-16 mb-4">
          <div id="cta" className="flex flex-wrap -mx-6 -my-6 pt-8">
            <div className="flex flex-col justify-center text-center pb-8">
              <h2 className="text-4xl sm:text-5xl font-medium leading-none tracking-tighter mb-8 text-grey-800">
                Ready to get started?
              </h2>
              <h3 className="text-2xl sm:text-3xl text-gray-700 opacity-75 font-light leading-tight mb-8">
                Create a 🔥 diagram for your app database in less than 15
                minutes.
              </h3>
              <Link className="text-center my-2 sm:my-0" href="/login">
                <button
                  className="focus:outline-none self-center tracking-wider bg-indigo-500 hover:bg-indigo-600 text-base leading-none text-white font-medium h-12 px-8 rounded-lg shadow-md hover:shadow-lg whitespace-nowrap mb-2 sm:mb-0 sm:mr-2"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.20)" }}
                >
                  Start diagramming
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
