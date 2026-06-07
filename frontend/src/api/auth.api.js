import client from './client';

export const registerEtudiant = (data) =>
  client.post('/auth/etudiant/register', data);

export const loginEtudiant = (data) =>
  client.post('/auth/etudiant/login', data);

export const registerCommercant = (data) =>
  client.post('/auth/commercant/register', data);

export const loginCommercant = (data) =>
  client.post('/auth/commercant/login', data);
