import client from './client';

export const getMe = () => client.get('/commercant/me');
export const genererQr = (montant) => client.post('/commercant/qr/generer', { montant });
export const getTransactions = () => client.get('/commercant/transactions');
export const getStats = () => client.get('/commercant/stats');
export const getRecompenses = () => client.get('/commercant/recompenses');
export const createRecompense = (data) => client.post('/commercant/recompenses', data);
export const updateRecompense = (id, data) => client.patch(`/commercant/recompenses/${id}`, data);
export const deleteRecompense = (id) => client.delete(`/commercant/recompenses/${id}`);
export const deleteAccount = () => client.delete('/commercant/me');
