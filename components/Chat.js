"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [animationTimeline, setAnimationTimeline] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const timeline = gsap.timeline({
      repeat: -1,
    });

    timeline
      .to(".chat-btn svg", {
        rotationZ: 15,
        duration: 0.1,
        ease: "power1.inOut",
      })
      .to(".chat-btn svg", {
        rotationZ: -15,
        duration: 0.2,
        ease: "power1.inOut",
      })
      .to(".chat-btn svg", {
        rotationZ: 15,
        duration: 0.2,
        ease: "power1.inOut",
      })
      .to(".chat-btn svg", {
        rotationZ: -15,
        duration: 0.2,
        ease: "power1.inOut",
      })
      .to(".chat-btn svg", {
        rotationZ: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        {},
        {
          duration: 4,
        },
      );

    setAnimationTimeline(timeline);

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatElement = document.querySelector(".chat");
      if (chatElement && !chatElement.contains(event.target)) {
        handleChatClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [animationTimeline]);

  useEffect(() => {
    let timer;
    if (isChatOpen && messages.length === 0) {
      timer = setTimeout(() => {
        const greetingMessage = {
          role: "assistant",
          content: "안녕하세요! <br />무엇을 도와드릴까요?",
        };
        setMessages([greetingMessage]);
      }, 500); // 0.5초 후에 인사말 표시
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isChatOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 여기에 OpenAI API 키를 입력하세요.
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              ...messages,
              userMessage,
              {
                role: "system",
                content: `
                우리의 업체명은 인코딩(Incoding) 입니다.
            
                회사 정보 및 서비스에 대해 전문적인 답변을 제공해야 합니다.
            
                회사 소개
                저희는 주로 중대기업의 오피셜 사이트, 랜딩 페이지, 마이크로사이트 등을 전문적으로 제작해 왔습니다.  
                고객이 원하는 맞춤형 웹사이트를 제작하며, UI/UX 디자인과 최신 기술을 활용한 인터랙티브한 웹 경험을 제공합니다.
            
                주요 고객사
                일반 대기업: 현대백화점, LG전자, 삼성SDS, SK텔레콤, 기아자동차, 이마트, 엔비디아, 오클리, 골프존, 리바이스, 교보문고, 아모레퍼시픽, 네파 등  
                공공기관 및 정부기관: 국무조정실, 나눔로또, 대한무역투자진흥공사, 한국보건산업진흥원, 한국전력공사, 예금보험공사, 서대문구청, 은평구청 등  
                그 외: 다양한 중소기업 및 스타트업 사이트 제작
            
                제작 방식 및 강점
                - 사용자 친화적인 인터페이스: 직관적인 UI/UX 설계를 통해 방문자가 쉽게 원하는 정보를 찾을 수 있도록 구성  
                - 애니메이션과 인터랙션 활용: GSAP, Three.js 등을 활용하여 동적인 웹 경험을 제공합니다.  
                - 기획 및 디자인 컨펌 가능: 프로젝트 진행 전에 메인 페이지, 사이트 레이아웃, 주요 페이지 디자인을 컨펌할 수 있습니다.  
                - 맞춤형 개발: Vue.js, React, PHP 백엔드 개발 등 최신 기술을 사용하여 고객 요구사항을 반영한 커스텀 웹사이트를 제작합니다.  
                - 차별화된 웹사이트 제작: 단순한 웹사이트가 아닌, 인터랙티브하고 독창적인 웹사이트 제작에 강점을 가지고 있습니다.  
                - 프로젝트 맞춤형 솔루션: 고객의 니즈에 맞춘 벤치마킹 및 창의적 해결책을 제공합니다.  
            
                포트폴리오
                저희가 제작한 웹사이트들은 기업의 브랜드 가치를 극대화하며, 세련된 디자인과 최적의 사용자 경험을 제공합니다.  
                아래는 저희가 직접 제작하고 현재 운영 중인 대표적인 웹사이트입니다.
            
                Standard Energy - https://stndenergy.com/ko/battery/ (반응형) 기업 오피셜 사이트  
                Graph-ite - https://graph-ite.com/ (적응형) 기업 오피셜 사이트  
                MMPX - https://mmpx.pdosoft.com/ (적응형) 기업 오피셜 사이트  
                Design M4 - http://www.designm4.com/ (반응형) 기업 오피셜 사이트  
                Deep Bio - https://deepbio.co.kr/ (반응형) 기업 오피셜 사이트  
                Quadro Center - https://quadro.center/ (반응형) 기업 오피셜 사이트  
                Luritech - http://www.luritech.com/ (반응형) 기업 오피셜 사이트  
            
                추가 포트폴리오 사이트:
                RealSecu - http://www.realsecu.co.kr/kr/index/index (반응형) 보안 솔루션 사이트  
                Standard Energy - https://stndenergy.com/ (반응형) 에너지 솔루션 사이트  
                Graphite - https://graph-ite.com/ (적응형) 모션 그래픽 스튜디오 사이트  
                KGM Motors Online Store - https://buy.kg-mobility.com/ (반응형) 자동차 온라인 스토어  
                ME2ON - https://www.me2on.com/ (반응형) 모바일 게임 및 엔터테인먼트 사이트  
            
                중요한 응답 가이드라인
                - 사용자의 질문이 웹사이트 제작과 관련된 경우에만 답변하세요.
                - 실제 개발 방법, 코드 작성법에 대한 질문에는 답변하지 마세요. 대신, 우리가 제공하는 서비스를 설명해주세요.
                - 그림을 그리거나 코드를 작성하는 것은 제공하지 않습니다.
                - 사용자가 연락처를 요청하면, 아래의 정보를 제공하세요.
                  이메일: contact@incoding.co.kr  
                  전화번호: 010-8584-2855  
                - 답변은 한국어로 하며, 답변은 최대한 간결하게 200자 이내로 해주세요.
                - 연락처는 꼭! 연락처를 물어볼때만 알려주세요.
                - 포트폴리오를 제공할때 사이트 주소가 있다면 링크를 함께 제공해 주세요 그리고 링크가 두번씩 나오지 않도록해주세요 바로가기는 제공하지 않습니다.
                - 사이트의 주소는 한줄씩 줄바꿈해서 적어주세요.
                - 답변을 할때는 로봇이 아닌 인간이 말하는 것처럼 딱딱하지 않고 친근하지만 예의있게 말해주세요.
                - 대답하는 사용자가 읽기 쉽도록 줄바꿈을 해주세요.
                - 연락처를 물어보면 이메일 주소를 알려주고 전화번호가 필요하다고 하면 그때 알려주도록 해.
                `,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    }

    setInput("");
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    const chatElement = document.querySelector(".chat");
    if (chatElement) {
      chatElement.classList.toggle("active");
    }
    if (animationTimeline) {
      animationTimeline.pause();
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    if (animationTimeline) {
      animationTimeline.restart();
    }
  };

  return (
    <div className="chat-wrap">
      <button className="chat-btn" onClick={handleChatToggle}>
        <span>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 123 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_315_2)">
              <path
                d="M65.3899 29.2001V23.5301C66.0793 23.2717 66.748 22.9608 67.3899 22.6001C69.9035 21.108 71.7967 18.7617 72.7238 15.9895C73.6509 13.2173 73.5502 10.2042 72.4399 7.50011C71.8229 6.02547 70.9264 4.68415 69.7999 3.55011C68.6767 2.4268 67.3452 1.53344 65.8799 0.920112C64.4034 0.30601 62.819 -0.00678321 61.2199 0.000111548C58.8175 -0.000227108 56.469 0.712245 54.4717 2.04733C52.4744 3.38242 50.9181 5.28009 49.9999 7.50011C48.7737 10.4685 48.7737 13.8018 49.9999 16.7701C50.6109 18.245 51.5082 19.5841 52.6399 20.7101L52.6999 20.7701C53.4121 21.4705 54.2042 22.0847 55.0599 22.6001C55.6945 22.9748 56.3644 23.2863 57.0599 23.5301V29.2001H28.5799C24.4926 29.2133 20.5766 30.8435 17.6873 33.7346C14.7981 36.6258 13.1704 40.5428 13.1599 44.6301V46.9201H7.87988C5.78538 46.928 3.77907 47.7643 2.29896 49.2462C0.818846 50.7282 -0.0148512 52.7356 -0.0201187 54.8301V73.2001C-0.0148512 75.2946 0.818846 77.302 2.29896 78.784C3.77907 80.266 5.78538 81.1022 7.87988 81.1101H13.1299V83.1801C13.1431 87.2718 14.7757 91.1918 17.6709 94.0832C20.566 96.9746 24.4882 98.6022 28.5799 98.6101H67.6499L91.0699 118.72C91.3281 118.942 91.6276 119.11 91.9511 119.216C92.2747 119.321 92.616 119.362 92.9552 119.335C93.2945 119.308 93.6251 119.214 93.928 119.059C94.2308 118.904 94.5 118.69 94.7199 118.43C95.1597 117.917 95.3853 117.255 95.3499 116.58L94.0999 98.5801H94.3099C98.3919 98.5696 102.304 96.944 105.191 94.0585C108.079 91.173 109.707 87.2621 109.72 83.1801V81.1101H114.97C117.066 81.1048 119.075 80.2698 120.557 78.7875C122.04 77.3052 122.875 75.2964 122.88 73.2001V54.8301C122.875 52.7356 122.041 50.7282 120.561 49.2462C119.081 47.7643 117.074 46.928 114.98 46.9201H109.72V44.6201C109.712 40.5346 108.086 36.6186 105.198 33.7288C102.31 30.839 98.3954 29.2107 94.3099 29.2001H65.3899ZM40.1399 47.3201C38.2887 47.3201 36.479 47.8691 34.9397 48.8976C33.4005 49.926 32.2008 51.3879 31.4924 53.0982C30.7839 54.8085 30.5986 56.6905 30.9597 58.5062C31.3209 60.3218 32.2123 61.9896 33.5214 63.2986C34.8304 64.6076 36.4982 65.4991 38.3138 65.8603C40.1295 66.2214 42.0115 66.0361 43.7218 65.3276C45.4321 64.6192 46.8939 63.4195 47.9224 61.8802C48.9509 60.341 49.4999 58.5313 49.4999 56.6801C49.4999 54.1977 48.5137 51.8169 46.7584 50.0616C45.0031 48.3063 42.6223 47.3201 40.1399 47.3201ZM82.7199 47.3201C80.8686 47.3201 79.059 47.8691 77.5197 48.8976C75.9805 49.926 74.7808 51.3879 74.0724 53.0982C73.3639 54.8085 73.1786 56.6905 73.5397 58.5062C73.9009 60.3218 74.7923 61.9896 76.1014 63.2986C77.4104 64.6076 79.0782 65.4991 80.8938 65.8603C82.7095 66.2214 84.5915 66.0361 86.3018 65.3276C88.0121 64.6192 89.4739 63.4195 90.5024 61.8802C91.5309 60.341 92.0799 58.5313 92.0799 56.6801C92.0799 54.1977 91.0937 51.8169 89.3384 50.0616C87.5831 48.3063 85.2023 47.3201 82.7199 47.3201ZM76.3399 78.6801C76.4811 78.5689 76.6086 78.4413 76.7199 78.3001C77.044 77.9198 77.2275 77.4396 77.2399 76.9401C77.2489 76.438 77.0867 75.9477 76.7799 75.5501C76.6653 75.4056 76.5344 75.2747 76.3899 75.1601C75.8398 74.7267 75.1635 74.4844 74.4633 74.4699C73.7631 74.4555 73.0773 74.6697 72.5099 75.0801C70.8009 76.4284 68.9043 77.5199 66.8799 78.3201C65.1357 78.9947 63.2799 79.3339 61.4099 79.3201C59.5164 79.2799 57.6446 78.9076 55.8799 78.2201C53.8315 77.4011 51.8985 76.3187 50.1299 75.0001C49.5496 74.6044 48.8564 74.408 48.1548 74.4405C47.4532 74.473 46.7812 74.7325 46.2399 75.1801C46.1042 75.3051 45.9803 75.4424 45.8699 75.5901C45.5759 75.996 45.4278 76.4894 45.4499 76.9901C45.4926 77.4909 45.696 77.9644 46.0299 78.3401C46.1567 78.4843 46.3012 78.612 46.4599 78.7201C48.7089 80.3822 51.1752 81.7281 53.7899 82.7201C56.1984 83.6282 58.7461 84.112 61.3199 84.1501C63.8967 84.1861 66.4585 83.7523 68.8799 82.8701C71.5486 81.8717 74.0478 80.4686 76.2899 78.7101L76.3399 78.6801ZM28.5899 34.4001H94.3099C97.0189 34.4107 99.6138 35.4922 101.528 37.4087C103.443 39.3252 104.522 41.9211 104.53 44.6301V83.1801C104.522 85.8891 103.443 88.4851 101.528 90.4016C99.6138 92.3181 97.0189 93.3996 94.3099 93.4101H91.1399C90.4543 93.4614 89.8167 93.781 89.3655 94.2997C88.9142 94.8183 88.6858 95.4941 88.7299 96.1801L89.7299 110.76L70.4299 94.1501C70.1898 93.91 69.9044 93.72 69.5902 93.5913C69.2761 93.4625 68.9394 93.3975 68.5999 93.4001H28.5999C25.8909 93.3896 23.296 92.3081 21.3814 90.3916C19.4668 88.4751 18.3878 85.8791 18.3799 83.1701V44.6201C18.3852 41.9129 19.4622 39.318 21.3755 37.4028C23.2889 35.4876 25.8827 34.408 28.5899 34.4001Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_315_2">
                <rect
                  width="122.88"
                  height="119.35"
                  fill="white"
                  transform="matrix(-1 0 0 1 122.88 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>
      <div className={`chat ${isChatOpen ? "active" : ""}`}>
        <div className="chat-header">
          <h2>
            <img src="/images/img-logo.svg" alt="" />
            Incoding Chatbot from GPT-4o <FontAwesomeIcon icon={faFaceSmile} />
          </h2>
          <button onClick={handleChatClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="avatar">
                  <img src="/images/img-logo.svg" alt="avatar" />
                </div>
              )}
              <div className="chat-content">
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                <div className="timestamp">{formatTime(new Date())}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력해주세요."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
