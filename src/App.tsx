import { useState, useEffect } from 'react';
import { ShoppingCart, Eye, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  city: string;
}

const COMMENTS = [
  {
    name: 'Valdemar Macamo',
    text: 'Nunca imaginei que um truque tão fácil pudesse fazer tanta diferença. Estou dormindo melhor, com mais energia e sem aquela dor de cabeça chata que eu sentia todo dia.',
    time: '3h',
    likes: 213,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Vilanculo Nguenha',
    text: 'Tenho 48 anos e não uso mais remédios todos os dias como antes. Estou controlando minha pressão com hábitos naturais e esse método foi essencial.',
    time: '5h',
    likes: 1542,
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Bernardo Banto',
    text: 'Só digo uma coisa: FUNCIONA MESMO! Faço parte de um grupo de risco e tinha muito medo. Hoje estou mais tranquilo e feliz com minha saúde. Muito obrigado por esse conteúdo!',
    time: '13h',
    likes: 997,
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Madalena Nhalure',
    text: 'Eu tenho 52 anos. Me senti acolhida, amada e compreendida. A solução é simples, mas muito poderosa. Meu médico até comentou a diferença no meu último exame.',
    time: '19h',
    likes: 1822,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Jorge Maquamana',
    text: 'Sou Jorge, tenho 46 anos e a minha pressão vivia oscilando... Agora me sinto muito mais segura. Recomendo pra todo mundo que sofre com esse problema. Khanimambo!',
    time: '23h',
    likes: 2568,
    avatar: 'https://images.pexels.com/photos/1222365/pexels-photo-1222365.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

function App() {
  const [isButtonUnlocked, setIsButtonUnlocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(420);
  const [viewCount, setViewCount] = useState(847);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsButtonUnlocked(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const viewTimer = setInterval(() => {
      setViewCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(700, Math.min(1098, newCount));
      });
    }, 3000);

    return () => clearInterval(viewTimer);
  }, []);

  useEffect(() => {
    const names = [
      'Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira',
      'Carla Mendes', 'Fernando Lima', 'Juliana Rocha', 'Ricardo Alves',
      'Patricia Souza', 'Carlos Pereira', 'Beatriz Martins', 'Lucas Fernandes'
    ];
    const cities = [
      'Maputo', 'Matola', 'Beira', 'Nampula', 'Chimoio', 'Nacala',
      'Quelimane', 'Tete', 'Xai-Xai', 'Pemba', 'Inhambane', 'Lichinga'
    ];

    const notificationTimer = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      const newNotification = {
        id: notificationId,
        name: randomName,
        city: randomCity
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 2)]);
      setNotificationId(prev => prev + 1);

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(notificationTimer);
  }, [notificationId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-white border-2 border-red-500 rounded-lg shadow-lg p-3 animate-slide-in max-w-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">{notification.name}</p>
                <p className="text-gray-600">de {notification.city} acabou de comprar!</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-600 text-white text-center py-4 px-4 rounded-lg mb-6 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            <span className="text-white">AVISO:</span> ESTA NOVA <span className="text-yellow-300">MISTURA</span> DE <span className="text-green-300">PEPINO</span>
          </h1>
          <h2 className="text-xl md:text-3xl font-bold mb-3">
            CONTROLA A <span className="bg-yellow-300 text-red-600 px-2">PRESSÃO</span> EM 7 DIAS <span className="text-yellow-300">SEM REMÉDIOS</span> DA FARMÁCIA
          </h2>
          <p className="text-lg md:text-xl font-semibold">
            Disponível até <span className="text-yellow-300 font-bold">25/10/2025</span>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4 text-red-600">
            <Eye size={24} />
            <span className="text-lg font-semibold">{viewCount} pessoas assistindo agora</span>
          </div>

          <div className="video-container mb-6" dangerouslySetInnerHTML={{
            __html: `
              <script type="text/javascript">
                var s=document.createElement("script");
                s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
                s.async=true;
                document.head.appendChild(s);
              </script>
              <div id="ifr_68f358b6019e17c093bae860_wrapper" style="margin: 0 auto; width: 100%; max-width: 400px;">
                <div style="position: relative; padding: 133.33333333333331% 0 0 0;" id="ifr_68f358b6019e17c093bae860_aspect">
                  <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_68f358b6019e17c093bae860" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload="this.onload=null, this.src='https://scripts.converteai.net/5c3c166f-7066-46d8-9cce-371214eda90b/players/68f358b6019e17c093bae860/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe>
                </div>
              </div>
            `
          }} />

          <div className="text-center">
            {!isButtonUnlocked ? (
              <div className="bg-gray-300 text-gray-600 py-4 px-8 rounded-full text-xl font-bold inline-flex items-center gap-3 cursor-not-allowed">
                <ShoppingCart size={24} />
                <span>Aguarde {formatTime(timeRemaining)}</span>
              </div>
            ) : (
              <a
                href="https://pay.lojou.app/p/DtcJZ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-5 px-12 rounded-full text-2xl font-bold inline-flex items-center gap-3 shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
              >
                <ShoppingCart size={28} />
                <span>QUERO BAIXAR MINHA PRESSÃO</span>
              </a>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-2xl font-bold text-center mb-6 text-red-600">Veja o que as pessoas estão dizendo:</h3>
          <div className="space-y-4">
            {COMMENTS.map((comment, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{comment.name}</p>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{comment.time}</span>
                      <button className="text-red-600 hover:text-red-700 font-semibold">Curtir</button>
                      <button className="text-red-600 hover:text-red-700 font-semibold">Responder</button>
                      <span className="ml-auto">{comment.likes} ❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2025 - Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default App;
