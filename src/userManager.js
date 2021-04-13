import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';
import { GOOGLE_CLIENT_ID } from './env';

const userManagerConfig = {
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email',
  authority: 'https://accounts.google.com',
  automaticSilentRenew: true,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
};

const userManager = createUserManager(userManagerConfig);

export default userManager;