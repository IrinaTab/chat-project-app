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
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        {/* Кнопка для отправки сообщения */}
        <button className="input-btn" onClick={handleSendMessage}>Отправить</button>
      </div>

      <div className="messages-container">
        {/* Маппинг списка сообщений и рендеринг каждого сообщ */}
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
    </div>
  );
};

export default Chat;
