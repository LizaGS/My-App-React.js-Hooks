import React, { useState } from 'react';
import './App.css';

const leftThemeStyles = {
  light: {
    background: '#cecece',
    color: '#2f4f4f'
  },
  dark: {
    background: 'white',
    color: '#696969'
  }
}

const rightThemeStyles = {
  light: {
    background: 'white',
    color: '#000000'
  },
  dark: {
    background: '#008080',
    color: 'white'
  }
}

const buttonStyles = {
  light: {
    background: '#cc0000',
    color: 'white'
  },
  dark: {
    background: '#f0f8ff',
    color: '#800080'
  }
}

const formatedTimestamp = () => {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`
}


function App() {

  const [datas, setDatas] = useState([]);

  const [theme, setTheme] = useState('light');
  const handleClick = (event) => {
    event.preventDefault();
    theme === 'light' ? setTheme('dark') : setTheme('light');
    setDatas([
      ...datas,
      formatedTimestamp().concat(` Theme was set to ${theme === 'light' ? 'dark' : 'light'}`)
    ]);
  }
  //------------------------------------------------------------------------------------
  const [message, setMessage] = useState('');
  const handleMessage = (event) => {
    event.preventDefault();
    event.currentTarget.disabled = true;
    setDatas([
      ...datas,
      formatedTimestamp().concat(` Message Sent: ${message}`)
    ]);
    setMessage('')
  }
  //------------------------------------------------------------------------------------
  const [count, setCount] = useState(1);
  const [button, setButton] = useState([]);
  const handleAddButton = (event) => {
    event.preventDefault();
    setCount(count + 1)
    setButton([
      ...button,
      count + 1
    ])
    setDatas([
      ...datas,
      formatedTimestamp().concat(` Button ${count} added`)
    ])
  }
  //------------------------------------------------------------------------------------
  const handleClicked = (event) => {
    event.preventDefault();
    setDatas([
      ...datas,
      formatedTimestamp().concat(` Button ${event.target.value} clicked`)
    ])
  }

  return (
    <div className="container">
      <div
        className='leftside'
        style={leftThemeStyles[theme]}
      >
        <button
          onClick={handleClick}
          style={buttonStyles[theme]}
        >
          Set {theme === 'light' ? 'dark' : 'light'} theme
        </button>
        <hr />
        <div>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
          <button
            style={buttonStyles[theme]}
            onClick={handleMessage}
            disabled={!message}
          >
            Click
          </button>
        </div>
        <hr />
        <div className='buttonContainer'>
          <button
            style={buttonStyles[theme]}
            onClick={handleAddButton}
          >
            Add Button {count}
          </button>
          {button && button.map((button, index) => {
            return (
              <button
                value={button - 1}
                key={index}
                className='button'
                style={buttonStyles[theme]}
                onClick={handleClicked}
              >
                Button {button - 1}
              </button>)
          })
          }

        </div>
      </div>
      <div
        className='rightside'
        style={rightThemeStyles[theme]}
      >
        {datas && datas.map((data, index) => (
          <div key={index}>{data}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
