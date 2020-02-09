import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';

const userManagerConfig = {
  client_id: '43374848214-hl38qlsqb3a3splnoljs4shmm900d0ep.apps.googleusercontent.com',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile email',
  authority: 'https://accounts.google.com',
  automaticSilentRenew: true,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
};

const userManager = createUserManager(userManagerConfig);

export default userManager;