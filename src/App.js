import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { API, Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import './App.css';
import {
  createCert as createCertMutation,
  deleteCert as deleteCertMutation,
} from './graphql/mutations';
import { listCerts } from './graphql/queries';

const initialFormState = { name: '', description: '' };

function App() {
  const [certs, setCerts] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    const apiData = await API.graphql({ query: listCerts });
    const certsFromAPI = apiData.data.listCerts.items;
    await Promise.all(
      certsFromAPI.map(async (cert) => {
        if (cert.image) {
          const image = await Storage.get(cert.image);
          cert.image = image;
        }
        return cert;
      })
    );
    setCerts(apiData.data.listCerts.items);
  }

  async function createCert() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createCertMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setCerts([...certs, formData]);
    setFormData(initialFormState);
  }

  async function deleteCert({ id }) {
    const newCertsArray = certs.filter((cert) => cert.id !== id);
    setCerts(newCertsArray);
    await API.graphql({
      query: deleteCertMutation,
      variables: { input: { id } },
    });
  }

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCerts();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Cert Master</h1>
      </header>
      <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Cert name"
        value={formData.name}
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Cert description"
        value={formData.description}
      />
      <input type="file" onChange={onChange} />
      <button onClick={createCert}>Create Cert</button>
      <div style={{ marginBottom: 30 }}>
        {certs.map((cert) => (
          <div key={cert.id || cert.name}>
            <h2>{cert.name}</h2>
            <p>{cert.description}</p>
            <button onClick={() => deleteCert(cert)}>Delete cert</button>
            {cert.image && (
              <img src={cert.image} style={{ width: 400 }} alt="cert" />
            )}
          </div>
        ))}
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
