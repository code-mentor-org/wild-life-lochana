import React, { useEffect, useState } from 'react';
import aboutImg from '../assets/about.jpeg';
import { RiDoubleQuotesL } from 'react-icons/ri';
import CountUp from 'react-countup';

const About = () => {
  const statistics = [
    { lable: 'Informative Blogs', value: '10' },
    { lable: 'Wildlife Experts', value: '3' },
    { lable: 'Happy Clients', value: '31' },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      {/* {container} */}
      <div className="flex flex-col xl:flex-row gap-10">
        {/* {left side} */}
        <div className="flex-1 relative">
          <img
            src={aboutImg}
            alt=""
            className="rounded-3xl rounded-tr-[155px] w-[488px]"
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col">
            <span className="relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full">
              <RiDoubleQuotesL className="text-2xl" />
            </span>
            <p className="text-center relative bottom-3">
              {' '}
              Driven by a love for nature, we help photographers explore, learn
              and capture wildlife responsibly - building a platform dedicated
              to excellence in wildlife photography.
            </p>
          </div>
        </div>
        {/* {right side} */}
        <div className="flex-1 flex justify-center flex-col">
          <span className="medium-18">Unveilling Our Journey</span>
          <h2 className="h2">
            Our Commitment Empowering Unforgettable Wildlife Photography
            Journeys
          </h2>
          <p className="py-5">
            Our journey began with a vision to bridge technology and nature.
            Inspired by the needs of wildlife photographers, we built a platform
            that empowers safe, ethical and informed exploration. Recognizing
            the challenges they face, we created a platform that combines
            real-time data, ethical guidance and community connection. helping
            users capture stunning wildlife moments while promoting conservation
            and responsible photography practices across Sri Lanka.
          </p>
          {/* {statistics container} */}
          <div className="flex flex-wrap gap-4">
            {statistics.map((statistics, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistics.value}
                    duration={10}
                    delay={3}
                  >
                    {({ countUpRef }) => (
                      <h3
                        ref={countUpRef}
                        className="text-2xl font-semibold"
                      ></h3>
                    )}
                  </CountUp>
                  <h4 className="bold-22">k+</h4>
                </div>
                <p>{statistics.lable}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
