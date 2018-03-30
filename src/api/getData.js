import { base_url } from './api'
/**
 * 登陆
 */
export const login = data => fetch('/admin/login', data, 'POST');