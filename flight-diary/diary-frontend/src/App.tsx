import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState ('')
  const [visibility, setVisibility] = useState ('')
  const [comment, setComment] = useState ('')
  const [weather, setWeather] = useState ('')
  const [error, setError ] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
      console.log('data---', data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    console.log('creating new diary---');
    event.preventDefault();
    const id = diaries.length + 1;
    const content = { id, date, visibility, weather, comment };
    console.log('content----', content);
    createDiary(content)
      .then(data => {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch(error => {
        console.error('Error creating diary:', error);
        console.log('error---', error.response.data)
        setError(error.response.data)
        setTimeout( () => {
          setError('') }, 3000
        )

      });
  };


  return (
    <div>
      <h2>Add new entries</h2>
      <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
      <form onSubmit={diaryCreation}>
      <div>
    <label htmlFor="date">date:</label>
    <input
      id="date"
      type="date"
      onChange={(event) => setDate(event.target.value)}
    />
  </div>
  <div>
        great         <input type="radio" name="visibility"
          onChange={() => setVisibility('great')} />
        good    <input type="radio" name="visibility"
          onChange={() => setVisibility('good')} />
        ok <input type="radio" name="visibility"
          onChange={() => setVisibility('ok')} />
        poor <input type="radio" name="visibility"
          onChange={() => setVisibility('poor')} />
  </div>
  <div>
        sunny         <input type="radio" name="weather"
          onChange={() => setWeather('sunny')} />
        rainy    <input type="radio" name="weather"
          onChange={() => setWeather('rainy')} />
        cloudy <input type="radio" name="weather"
          onChange={() => setWeather('cloudy')} />
        stormy <input type="radio" name="weather"
          onChange={() => setWeather('stormy')} />
        windy <input type="radio" name="weather"
          onChange={() => setWeather('windy')} />
  </div>


  <div>
    <label htmlFor="comment">comment:</label>
    <input
      id="comment"
      type="text"
      value={comment}
      onChange={(event) => setComment(event.target.value)}
    />
  </div>
        <button type='submit'>add</button>
      </form>
      <h2>entries</h2>
      <ul>
        {diaries.map(diary => <li key={diary.id}>
          <div><h4>{diary.date}</h4></div>
          <div>
            <p>{diary.visibility}</p>
            <p>{diary.weather}</p>
            <p>{diary.comment}</p>
          </div>

        </li>)}
      </ul>
    </div>
  )
}

export default App;
