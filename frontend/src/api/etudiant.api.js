import client from './client';

export const getMe = () => client.get('/etudiant/me');
export const getTransactions = () => client.get('/etudiant/transactions');
export const scanQr = (token) => client.post('/etudiant/scan', { token });
export const getRecompenses = () => client.get('/etudiant/recompenses');
export const reclamerRecompense = (id) => client.post(`/etudiant/recompenses/${id}/reclamer`);
export const deleteAccount = () => client.delete('/etudiant/me');
