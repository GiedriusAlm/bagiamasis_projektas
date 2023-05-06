import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ICONS from './shared/icons';

function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/customers', {
      name: name,
      surname: surname,
      email: email,
      age: age,
    });

    setName('');
    setSurname('');
    setEmail('');
    setAge('');

    const response = await axios.get('/api/customers');
    setData(response.data);
  };

  useEffect(() => {
    axios.get('/api/customers').then((response) => {
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    await axios.delete(`/api/customers/${id}`);
    setData(
      data.filter((item) => {
        return item._id !== id;
      })
    );

    const response = await axios.get('/api/customers');
    setData(response.data);
  };

  return (
    <div className='container'>
      <h1 className='title'>Event Registry</h1>
      <div className='form__wrapper'>
        <form onSubmit={handleSubmit}>
          <input
            name='Name'
            type='text'
            placeholder='Enter name...'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            name='Surname'
            type='text'
            placeholder='Enter surname...'
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />

          <input
            name='Email'
            type='email'
            placeholder='Enter email...'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            name='Age'
            type='text'
            placeholder='Enter age...'
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <div className='btn-wrapper'>
            <button className='btn-submit'>SUBMIT</button>
          </div>
        </form>
      </div>

      <section>
        <div className='table__wrapper'>
          {loading ? ( // show loading message while waiting for data
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className='collapsible'>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.email}</td>
                    <td>{item.age}</td>
                    <td className='action-btns'>
                      <span className='btn-pencil'>{ICONS.pencil}</span>
                      <span className='btn-trash' onClick={(e) => handleDelete(item._id, e)}>
                        {ICONS.trash}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
