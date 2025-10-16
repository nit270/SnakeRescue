import React from 'react';
export default function RequestCard({ r }) {
  return (
    <div className="card">
      <h3 style={{margin:0}}>{r.title}</h3>
      <p style={{color:'#6b7280',fontSize:13}}>{r.location} • {new Date(r.createdAt).toLocaleString()}</p>
      <p style={{marginTop:8}}>{r.description}</p>
      {r.images?.length > 0 && <img src={(r.images[0].startsWith('/uploads')? (process.env.REACT_APP_API_URL?.replace('/api','')||'http://localhost:5000')+r.images[0] : r.images[0])} alt="request" style={{width:'100%',maxHeight:180,objectFit:'cover',marginTop:8}} />}
      <p style={{marginTop:8,fontSize:13}}>Status: <strong>{r.status}</strong></p>
    </div>
  );
}
