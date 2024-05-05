// auth routes
export const LOGIN_ROUTE = 'auth/login';
export const REGISTER_ROUTE = 'auth/register';

//base feature routes
export const CAMPAIGNS_BASE_ROUTE = 'campaigns';
export const USER_BASE_ROUTE = 'users';

//endpoints
export const OWN_CAMPAIGNS_PATH = 'own';
export const NEW_CAMPAIGNS_PATH = 'new';
export const DETAIL_CAMPAIGNS_PATH = 'detail';
export const EDIT_CAMPAIGNS_PATH = 'edit';
export const DETAIL_CAMPAIGNS_PATH_DECLARATION = 'detail/:id';
export const EDIT_CAMPAIGNS_PATH_DECLARATION = 'edit/:id';
//absolute routes
export const USER_PROFILE_ROUTE = `${USER_BASE_ROUTE}/:id`;

export const OWN_CAMPAIGNS_ROUTE = `${CAMPAIGNS_BASE_ROUTE}/${OWN_CAMPAIGNS_PATH}`;
export const CREATE_CAMPAIGN_ROUTE = `${CAMPAIGNS_BASE_ROUTE}/${NEW_CAMPAIGNS_PATH}`;
export const EDIT_CAMPAIGN_ROUTE = `${CAMPAIGNS_BASE_ROUTE}/${EDIT_CAMPAIGNS_PATH}`;
export const REMOVE_CAMPAIGN_ROUTE = `${CAMPAIGNS_BASE_ROUTE}/${NEW_CAMPAIGNS_PATH}`;
export const DETAIL_CAMPAIGN_ROUTE = `${CAMPAIGNS_BASE_ROUTE}/${DETAIL_CAMPAIGNS_PATH}`;
