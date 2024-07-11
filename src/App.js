import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './components/ContactForm';
import { Mail, Phone, MapPin, ShoppingCart, Calendar, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

emailjs.init('E5wHxyFgSkrjQhYVG');
const Header = () => (
  <motion.header 
    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto flex justify-between items-center">
      <motion.h1 
        className="text-7xl font-bold font-bombaram"
        whileHover={{ scale: 1.1 }}
      >
        세민
      </motion.h1>
      <nav>
        <ul className="flex space-x-6">
          {['소개', '음악', '공연일정', '음반구매', '섭외 및 문의'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <a href={`#${item}`} className="hover:text-pink-200 transition duration-300 font-wanted-sans text-lg">
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  </motion.header>
);

const Section = ({ title, children, id }) => (
  <motion.section 
    id={id}
    className="mb-16"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-4xl font-bold mb-6 text-pink-700 font-santokki">{title}</h2>
    {children}
  </motion.section>
);

const MusicCard = ({ title, description, coverUrl, musicUrl }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <a href={musicUrl} target="_blank" rel="noopener noreferrer">
      <img src={coverUrl} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-2xl font-bold mb-3 text-pink-600 font-santokki">{title}</h3>
      <p className="text-gray-600 font-wanted-sans">{description}</p>
    </a>
  </motion.div>
);

const ConcertSlider = ({ concerts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % concerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [concerts.length]);

  return (
    <div className="relative h-64 overflow-hidden rounded-lg bg-gray-100">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center p-6"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href={concerts[currentIndex].ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-2xl font-bold mb-2 font-santokki text-pink-600">{concerts[currentIndex].title}</h3>
            <p className="text-lg font-wanted-sans mb-1">{concerts[currentIndex].date}</p>
            <p className="text-md font-wanted-sans mb-4">{concerts[currentIndex].location}</p>
            <motion.span
              className="inline-flex items-center bg-pink-500 text-white px-4 py-2 rounded-full font-wanted-sans text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Calendar className="mr-2" size={16} />
              공연정보
            </motion.span>
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
const AlbumPurchase = ({ album }) => (
  <motion.div 
    className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.img 
      src={album.coverUrl} 
      alt={album.title} 
      className="w-full md:w-1/2 h-auto object-cover rounded mb-6 md:mb-0 md:mr-8 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => window.open(album.purchaseUrl, '_blank')}
    />
    <div className="md:w-1/2">
      <h3 className="text-3xl font-bold mb-4 text-pink-600 font-santokki">{album.title}</h3>
      <p className="text-xl mb-4 font-wanted-sans">{album.price}</p>
      <p className="text-gray-600 mb-6 font-wanted-sans">{album.description}</p>
      <motion.button 
        className="bg-pink-500 text-white px-6 py-3 rounded-full font-wanted-sans hover:bg-pink-600 transition duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(album.purchaseUrl, '_blank')}
      >
        <ShoppingCart className="mr-2" size={20} />
        구매하기
      </motion.button>
    </div>
  </motion.div>
);

const ContactInfo = ({ icon: Icon, title, content }) => (
  <div className="flex items-center mb-8">
    <div className="bg-pink-100 p-4 rounded-full mr-4">
      <Icon className="text-pink-600" size={28} />
    </div>
    <div>
      <h4 className="font-bold text-gray-700 text-lg mb-1">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const App = () => {
  const concerts = [
    { title: "딱따구리 포크", date: "2024년 7월 13일", location: "딱따구리 책방", ticketUrl: "https://hwangtab.github.io/poster/" },
    { title: "한국옵티컬하이테크 연대공연", date: "2024년 7월 18일", location: "삼성동 닛토 한국지사", ticketUrl: "https://www.facebook.com/candlechurch09/" },
    { title: "명동2지구 연대공연", date: "2024년 7월 25일", location: "명동2지구 농성장", ticketUrl: "https://www.facebook.com/myeongdongdistrict2/?locale=tr_TR&paipv=0&eav=AfY8OTUxscNfICkKsjf5JB5IBcd4PmHYTOqQ0VPHbZNVV4OpQKxo_mb66ENyD2tsX30&_rdr" },
  ];

  const album = {
    title: "여린 잎 (2024)",
    price: "15,000원",
    description: "세민의 첫 정규 앨범 '여린 잎'은 2024년 1월에 발매되었어요. 이 앨범은 그녀의 음악적 성장과 사회적 경험을 담아낸 작품입니다. 앨범에는 철거민, 해고된 노동자, 이산가족 등 우리 사회의 다양한 이야기가 담겨 있어요. 세민은 이들의 아픔을 노래하면서도, 동시에 우리 모두의 일상적인 감정도 섬세하게 표현합니다.",
    coverUrl: "https://image.bugsm.co.kr/album/images/original/206169/20616910.jpg?version=undefined",
    purchaseUrl: "https://smartstore.naver.com/koreasmartcoop/products/9683214738?NaPm=ct%3Dlygspdyo%7Cci%3D9149d6d7b19b5d8cccaefa48464c604c4afe05fb%7Ctr%3Dslsl%7Csn%3D4388281%7Chk%3Dcd10becf3b7efab676843769daf0c31da3d3d666"
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-purple-100 min-h-screen font-wanted-sans">
      <Header />
      
      <main className="container mx-auto mt-12 p-6">
        <Section title="소개" id="소개">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.img
              src="https://image.bugsm.co.kr/artist/images/original/202031/20203192.jpg?version=391774&d=20240110020840?version=undefined"
              alt="세민"
              className="w-full md:w-1/3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="w-full md:w-2/3">
            <p className="text-lg text-gray-700 leading-relaxed">
세민은 한국의 싱어송라이터로, 그녀의 음악은 사회정의와 연대의 메시지를 담고 있습니다. '세상 사람'이라는 뜻의 이름처럼, 세민은 평범한 사람들의 이야기를 노래합니다. 그녀의 음악 여정은 특별한 방식으로 시작되었어요. 퇴거 위기에 처한 족발집에서의 농성 중 현장 음악가들에게 배우며 성장했죠. 이 경험은 세민의 음악 세계를 형성하는 데 큰 영향을 미쳤습니다.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
세민의 음악은 장르의 경계를 자유롭게 넘나들어요. 포크, 록, 신국악, 신스팝 등 다양한 스타일을 자신만의 방식으로 녹여냅니다. 그녀의 목소리는 맑고 힘이 있어서, 때로는 부드럽게 때로는 강렬하게 메시지를 전달해요. 풍부한 상상력으로 만들어낸 가사와 멜로디는 듣는 이의 마음을 깊이 울립니다.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
'가져가세요'라는 노래에서 세민은 이렇게 노래해요. "당신의 눈물을 먹은 입으로 노래해요. 이 눈물의 향이 더 넓게 퍼지길 바라죠" 이 가사는 세민이 음악을 통해 하고 싶은 이야기를 잘 보여줍니다. 그녀는 소외된 이들의 목소리를 대신해 노래하고, 그 이야기를 더 많은 사람들에게 전하고 싶어 해요.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
세민의 음악 활동은 2018년부터 본격적으로 시작되었어요. 황경하와 함께 EP를 발표하고, 여러 음악가들과 협업하며 자신의 음악 세계를 넓혀갔습니다. 특히 사회적 의미가 있는 앨범들에 참여하며, 음악을 통한 연대의 힘을 보여주었죠.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
세민의 노래는 단순한 음악 그 이상이에요. 그녀의 곡들은 우리 사회의 모습을 비추는 거울이자, 더 나은 세상을 향한 희망의 메시지를 담고 있습니다. 때로는 가슴 아픈 현실을 노래하지만, 그 안에는 언제나 따뜻한 위로와 연대의 마음이 담겨 있어요.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
세민의 음악적 재능은 다재다능합니다. 감성적인 멜로디, 섬세한 가사, 그리고 독특한 보컬 스타일이 조화를 이루어 그녀만의 독특한 사운드를 만들어냅니다. 그녀의 노래는 듣는 이의 마음을 편안하게 해주면서도, 동시에 깊은 생각에 잠기게 만드는 힘이 있어요.
</p>
<p className="text-lg text-gray-700 leading-relaxed">
앞으로 세민의 음악은 더욱 성장하고 발전할 거예요. 그녀는 계속해서 우리 주변의 이야기에 귀 기울이고, 그것을 아름다운 음악으로 만들어낼 겁니다. 세민의 노래를 들으면, 우리는 서로의 아픔에 공감하고 함께 웃을 수 있는 힘을 얻게 될 거예요.
</p>
            </div>
          </div>
        </Section>

        <Section title="음악" id="음악">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MusicCard 
              title="꽃가루 (2024)" 
              description="장위7구역 재개발 지역에서 쫓겨나는 이들의 이야기를 음악으로 다뤘습니다. 국악에서 차용한 듯한 창의적인 음악적 터치가 신선합니다."
              coverUrl="http://archivenew.vop.co.kr/images/4d4e55c5c6e8884b26ac2881eb2769f6/2018-04/16124316_102.jpg"
              musicUrl="https://www.youtube.com/watch?app=desktop&v=ZNnRIV8kYIA"
            />
            <MusicCard 
              title="가져가세요 (2024)" 
              description="세상에서 버림받고 쫓겨난 이들을 위한 세민의 간절한 기도를 담은 노래입니다."
              coverUrl="https://www.bbb.or.kr/files/attach/images/49311/044/583/%EA%B8%B0%EB%8F%84%ED%95%98~1.JPG"
              musicUrl="https://www.youtube.com/watch?v=WvdLuVffMxc"
            />
            <MusicCard 
              title="혼약의 기도 (2020)" 
              description="경하와 세민의 듀엣 싱글로, 삶의 방향과 세상에서의 약속에 대한 메시지를 담고 있습니다."
              coverUrl="https://ifh.cc/g/2yDdbc.jpg"
              musicUrl="https://www.youtube.com/watch?app=desktop&v=EsFqpkUfxxE"
            />
            <MusicCard 
              title="갈릴래아 (2019)" 
              description="복음을 가난하고 고통 받는 이들에게 전하라는 의미를 담아 노래했습니다. 뮤지션 김이슬기의 커버입니다."
              coverUrl="https://www.catholicpress.kr/data/cheditor4/1904/1888857055_AQ3qTzap_Son-Of-God.jpg"
              musicUrl="https://www.youtube.com/watch?v=XDWiVsZcMv0"
            />
            <MusicCard 
              title="소성리지킴이 조현철 (2019)" 
              description="이 땅의 평화와 소성리의 할머니들을 지키려 애쓰다 먼저 떠나간 조현철을 추모하기 위한 노래입니다."
              coverUrl="https://ifh.cc/g/J6YADf.jpg"
              musicUrl="https://www.youtube.com/watch?v=q1F7Y6ztZMM"
            />
            <MusicCard 
              title="눈녹듯 (2019)" 
              description="전쟁과 국가폭력, 자본에 의해 자식을 잃은 어머니들의 마음을 표현한 노래입니다."
              coverUrl="https://ifh.cc/g/cHDowm.jpg"
              musicUrl="https://www.youtube.com/watch?v=_9asDwfYryU"
            />
          </div>
        </Section>

        <Section title="공연일정" id="공연일정">
          <ConcertSlider concerts={concerts} />
        </Section>

        <Section title="음반구매" id="음반구매">
          <AlbumPurchase album={album} />
        </Section>

        <Section title="섭외 및 문의" id="섭외 및 문의">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-pink-600 font-santokki">연락처</h3>
              <ContactInfo 
                icon={Mail} 
                title="이메일" 
                content="contact@kosmart.org" 
              />
              <ContactInfo 
                icon={Phone} 
                title="전화" 
                content="02-764-3114" 
              />
              <ContactInfo 
                icon={MapPin} 
                title="주소" 
                content="서울특별시 은평구 통일로 68길 4 302호 한국스마트협동조합" 
              />
            </motion.div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6 mt-12">
        <div className="container mx-auto text-center font-wanted-sans">
          <p>&copy; 2024 세민. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;