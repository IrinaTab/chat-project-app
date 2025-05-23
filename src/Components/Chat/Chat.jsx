import React, { useState, useEffect } from 'react';
import './../Chat/Chat-styles.css'

// Компонент Chat представляет собой основной блок чата
const Chat = () => {
  // Состояние для хранения списка сообщений
  const [messages, setMessages] = useState([]);
  // Состояние для хранения нового сообщения, которое пользователь вводит
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Получаем сохранённые сообщения из localStorage при загрузке компонента
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    // Сохраняем сообщения в localStorage при изменении массива сообщений
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Удаляем старые сообщения старше 10 дней при каждом рендере компонента
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const filteredMessages = messages.filter((message) => {
      return new Date(message.timestamp) > tenDaysAgo;
    });

    if (filteredMessages.length !== messages.length) {
      setMessages(filteredMessages);
    }
  }, [messages]);


  // Функция для обработки отправки нового сообщения
  const handleSendMessage = () => {
    // Проверка, чтобы убедиться, что сообщение не пустое
    if (newMessage.trim() === '') return;

    // Создание нового объекта сообщения с текстом, временем отправки и флагом, указывающим, что это своё сообщение
    const newMessageObj = {
      text: newMessage,
      timestamp: new Date(),
      isOwnMessage: true, // Помечаем сообщение как своё
    };

    // Добавление нового сообщения в список сообщений
    setMessages([...messages, newMessageObj]);
    // Очистка поля ввода после отправки сообщения
    setNewMessage('');
  };


  // Функция для рендеринга каждого сообщения в списке
  const renderMessage = (message, index) => {
    // Определение, является ли сообщение своим
    const isOwnMessage = message.isOwnMessage;
    // Класс CSS для сообщения в зависимости от того, своё оно или чужое
    const messageClassName = isOwnMessage ? 'own-message' : 'other-message';
    // Форматирование времени отправки сообщения
    const dateString = new Date(message.timestamp).toLocaleString();

    // Возвращаемый элемент сообщения
    return (
      <div key={index} className={messageClassName}>
        <p>{message.text}</p>
        <small className="timestamp">{dateString}</small>
      </div>
    );
  };

  // Основной HTML-разметку компонента Chat
  return (
    <div className="chat-container">
      {/* Контейнер для всех сообщений */}
      {/* Контейнер для ввода нового сообщения */}
      <div className="input-container">
        <input
          className="input-input"
          placeholder="Введите сообщение..."
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        {/* Кнопка для отправки сообщения */}
        <button className="input-btn" onClick={handleSendMessage}>Отправить</button>
        <button className="input-btn-mob" onClick={handleSendMessage}>
          <svg className="input-img" id="Layer_1" enable-background="new 0 0 73 73" viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg"><g id="_x31_90"><path d="m63.6756783 32.2260208c-14.9692727-10.0356846-33.3505078-19.3330536-49.4345694-27.5595713h-.0004883c-.7548828-.3857422-1.6186523-.3857422-2.3706055.0019531-.0505981.0258789-.090332.0644531-.1386108.0932617-2.2101831.5891252-2.7511911 3.0751295-3.0844116 5.315918-.6893921 4.6352539-1.3052368 9.2963858-1.3456421 13.9824209-.0111694 1.2910156.0385742 2.6464844.6884766 3.762207 1.1589136 1.9894714 3.545742 2.4948387 5.809021 2.7241211 7.2974463 1.6127377 14.6168776 3.774847 22.0083618 5.4794941-20.4164352 3.9348183-22.1128693 3.9804993-24.8719482 5.8989258-3.3059535 2.2985916-3.0228758 5.3966141-3.0428467 9.1696777-.0231934 4.3649902.1514893 8.744873.8527222 13.0593262.2270508 1.3969727.5657959 2.8886719 1.6221313 3.8305664.5861816.5227051 1.4573364.7299805 2.2172852.6010742.0482788.0029297.09552.0185547.1438599.0185547.434082 0 .8686523-.1103516 1.2646484-.3310547 20.7841797-11.5908203 37.5546875-22.5820313 49.8457031-32.6669922 1.0886411-.8934058 1.0134153-2.5907553-.1630869-3.3798827zm-.788086 2.2197266c-12.2226563 10.0292969-28.9189453 20.9697266-49.625 32.5166016-.7074852.3944016-1.5923023-.085144-1.6264648-.9091797-.2544699-6.0865822-.4557333-15.2473335-.7241211-20.9296875-.0244141-.5253906.3344727-.9892578.8535156-1.1044922 10.0230837-2.2273521 17.7325821-3.3572006 28.7338867-7.0898438.723568-.2459488.6565399-1.2983208-.0976563-1.4462891-8.9269772-1.7379608-19.8130951-5.161562-28.9262695-6.9658222-.5097656-.1015625-.8696289-.5244141-.8754883-1.0292969-.0766602-6.90625.4086914-14.2441397 1.3676758-20.6621094.1125402-.7509527.9183512-1.1682296 1.5898438-.8232422 16.0355778 8.2013503 34.3823776 17.479971 49.2827148 27.4697286.1606445.1074219.2578125.28125.2675781.4755859.0092774.1943359-.071289.3759766-.2202148.4980469z"/><path d="m48.0164986 17.946722c.409668-.0625.6904297-.4453125.6274414-.8554688l-.7841797-5.0966787c-.0634766-.4082031-.4511719-.6933594-.8549805-.6269531-.409668.0625-.6904297.4453125-.6274414.8554688l.7841797 5.0966787c.0624962.4048901.4410744.6898251.8549805.6269531z"/><path d="m53.074604 18.7777767 2.5483398-8.42871c.1201172-.3964844-.1040039-.8144531-.5004883-.9345703s-.8154296.1035156-.9350585.5009766l-2.5483398 8.42871c-.1201172.3964844.1044922.8144531.5009766.9345703.385662.1198692.8131828-.0979691.9345702-.5009766z"/><path d="m65.576561 17.1752377c-.2280273-.3457031-.6928711-.4394531-1.0390625-.2148438l-7.8144569 5.1367188c-.3457031.2275391-.4423828.6923828-.2148438 1.0390625.2286034.347168.6931381.4410267 1.0390625.2148438l7.8144569-5.1367188c.3461914-.2275391.4423828-.6923829.2148438-1.0390625z"/></g></svg>
        </button>

      </div>

      <div className="messages-container">
        {/* Маппинг списка сообщений и рендеринг каждого сообщ */}
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
    </div>
  );
};

export default Chat;
