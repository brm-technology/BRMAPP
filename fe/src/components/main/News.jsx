import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsTimeline = () => {
  const [news, setNews] = useState([]);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) {
      import('./NewsMobile.css');
    } else {
      import('./News.css'); 
    }

    axios.get('/api/news/')
      .then(response => {
        console.log(response.data); // Log the data to check the format
        const sortedNews = response.data.sort((a, b) => {
          const dateA = new Date(a.date); // Ensure the field name is correct
          const dateB = new Date(b.date);
          return dateB - dateA; // Sort in descending order
        });
        setNews(sortedNews);
      })
      .catch(error => {
        console.error('There was an error fetching the news!', error);
      });
  }, [isMobile]);

  return (
    <div className="timeline-container">
      {news.map((item, index) => (
        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
          <div className="content">
            <h6>{item.date}</h6> {/* Ensure 'item.date' matches the correct field name */}
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsTimeline;
